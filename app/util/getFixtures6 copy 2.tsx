import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;

// Redis setup
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL5;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN5;

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error("🚨 Redis environment variables are missing.");
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

const leagues =    [
    {league: 224,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 225,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 226,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 227,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 228,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 229,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 230,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 231,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 232,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 222,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 221,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 223,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-07-01',country: "Austria",name: "EPL"},
{league: 418,yearr:-1,startmonth: '2024-09-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
{league: 420,yearr:-1,startmonth: '2024-10-01',endmonth: '2025-05-01',country: "Azerbaijan",name: "EPL"},
{league: 419,yearr:-1,startmonth: '2024-08-01',endmonth: '2025-06-01',country: "Azerbaijan",name: "EPL"},
{league: 1049,yearr:-1,startmonth: '2025-01-01',endmonth: '2025-05-01',country: "Bahrain",name: "EPL"},
]

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number,
    lastWeek: string,
    nextWeek: string
): Promise<Fixture[]> {
    const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek}&to=${nextWeek}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
        next: {
            revalidate: 1 * 1 * 15,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.response ?? [];
    } catch (err) {
        console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
        return [];
    }
}

export default async function getFixtures(): Promise<AllFixtures[]> {
    try {
        const now = moment();
        const midnight = moment().endOf('day').add(1, 'second'); // tiny buffer
        const secondsUntilMidnight = midnight.diff(now, 'seconds');
        const allFixturesByLeague: AllFixtures[] = [];
        const currentTime = moment();
        const currentTimeFormat = moment().format('YYYY-MM-DD');
        const year = currentTime.year();
        const month = currentTime.month() + 1; // Month is 0-indexed, so add 1
        const lastWeek = currentTime.add(1, 'days').format('YYYY-MM-DD');
        const nextWeek = currentTime.add(3, 'days').format('YYYY-MM-DD');

        // Process 30 leagues at a time
        const leagueChunks = [];
        for (let i = 0; i < leagues.length; i += 80) {
            leagueChunks.push(leagues.slice(i, i + 80));
        }

        for (const chunk of leagueChunks) {
            // Fetch data in parallel for each chunk of 30 leagues
            const fixturePromises = chunk.map(async (league) => {
                // Check if league is within valid time range using `if`
                if (currentTimeFormat > league.startmonth && currentTimeFormat < league.endmonth) {
                    const cacheKey = `fixtures:league-${league.league}`;
                    const cachedDataPromise = redis.get(cacheKey); // Fetch async immediately
                    const cachedData = await cachedDataPromise; // Wait here, but started fetching earlier

                    if (cachedData) {
                        console.log(`✅ Returning cached data for ${league.name} from Redis`);

                        // If cached data is empty, delete it from Redis and fetch fresh data
                        if (typeof cachedData === 'string' && JSON.parse(cachedData).length === 2) {
                            console.log(`⚠️ Empty cache for ${league.name}. Deleting from Redis...`);
                            await redis.del(cacheKey); // Remove the empty data from Redis
                            console.log(`❌ Empty data in cache, fetching fresh data for ${league.name}`);
                            const fixtures = await fetchFixturesByLeague(year, league.league, league.yearr, lastWeek, nextWeek);
                            
                            // Store the fresh data in Redis
                            
                            return {
                                name: league.name,
                                fixtures,
                            };
                        }
                        
                        return {
                            name: league.name,
                            fixtures: typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData,
                        };
                    }

                    // Cache miss, fetch fresh data
                    console.log(`⏳ Fetching fresh data for ${league.name}...`);
                    const fixtures = await fetchFixturesByLeague(year, league.league, league.yearr, lastWeek, nextWeek);

                    // If fixtures are empty, don't cache and skip
                    if (fixtures.length === 0) {
                        console.log(`⚠️ No fixtures found for ${league.name}. Skipping cache.`);
                        return { name: league.name, fixtures: [] };
                    }

                   // Separate fixtures into finished (FT) and ongoing
                   const finishedFixtures = fixtures.filter(f => f.fixture.status.short === "FT");
                   const ongoingFixtures = fixtures.filter(f => f.fixture.status.short !== "FT");

                   // Store FT fixtures in Redis for 7 days
                   if (finishedFixtures.length > 0) {
                       await redis.set(`${cacheKey}:FTT`, JSON.stringify(finishedFixtures), {ex: 86400});
                   }

                   // Store ongoing fixtures in Redis for 3 minutes, ensuring they persist until refresh
                   if (ongoingFixtures.length > 0) {
                       await redis.set(`${cacheKey}:LIVEE`, JSON.stringify(ongoingFixtures), {ex: secondsUntilMidnight});
                   }

                    return {
                        name: league.name,
                        fixtures,
                    };
                }

                return { name: league.name, fixtures: [] };
            });

            // Wait for all 30 leagues in the chunk to finish before processing the next chunk
            const results = await Promise.all(fixturePromises);
            allFixturesByLeague.push(...results);
        }

        return allFixturesByLeague;
    } catch (error) {
        console.error('An error occurred while fetching fixtures:', error);
        throw error;
    }
}

