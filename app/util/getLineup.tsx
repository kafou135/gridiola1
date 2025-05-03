import "server-only";
import { Lineups } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL1!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN1!,
});

// Function to fetch lineup data for a single fixture
async function fetchLineup(id: number, API_KEY: string){
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${id}`;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 15 }, // Not needed for Redis caching
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response[0];
    } catch (err) {
        console.error(`❌ Error fetching lineup for fixture ${id}:`, err);
        return [];
    }
}

// Function to fetch lineup data in batches of 60 fixtures
export default async function getLineupBatch(ids: number[]): Promise<Record<number, Lineups[]>> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    const API_KEY: string = process.env.API_KEY;
    const results: Record<number, Lineups[]> = {};
    const cacheKeys = ids.map(id => `lineup:${id}`);

    try {
        // Check Redis cache for all requested lineups
        const cachedResults = await redis.mget(...cacheKeys);

        const idsToFetch: number[] = [];
        cachedResults.forEach((data, index) => {
            if (data) {
                results[ids[index]] = typeof data === "string" ? JSON.parse(data) : data;
            } else {
                idsToFetch.push(ids[index]);
            }
        });

        

        console.log(`⏳ Fetching fresh lineup data for ${idsToFetch.length} fixtures...`);

        // Fetch lineup data in batches of 60 fixtures
        const fetchPromises: Promise<{ key: number; lineup: Lineups[] }>[] = [];
        for (let i = 0; i < idsToFetch.length; i += 60) {
            const batch = idsToFetch.slice(i, i + 60);
            fetchPromises.push(
                ...batch.map(async (id) => {
                    const lineup = await fetchLineup(id, API_KEY);
                    return { key: id, lineup };
                })
            );
        }

        // Process all fetched results
        const freshResults = await Promise.all(fetchPromises);
        freshResults.forEach(({ key, lineup }) => {
            results[key] = lineup;
        });

        // Store fresh results in Redis (expires in 2 weeks)
        const redisSetOperations = freshResults.map(({ key, lineup }) =>
            redis.set(`lineup:${key}`, JSON.stringify(lineup), { ex: 60 }) // Cache for 2 weeks
        );
        await Promise.all(redisSetOperations);

        return results;
    } catch (error) {
        console.error("❌ Error fetching lineup data batch:", error);
        return results;
    }
}
