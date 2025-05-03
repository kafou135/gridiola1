'use client'
import Link from "next/link";
import getFixtureByFixtureId from "@/app/util/getFixtureByFixtureId";
import { Events, Fixture, H2H, Lineups } from "@/types";
import LocalTime from "@/app/components/LocalTime";
import getH2H from "@/app/util/getH2H";
import { log } from "console";
import getLineup from "@/app/util/getLineup";
import { useState } from "react";



type PageProps = {
    
    fixtureByFixtureId: Fixture;
    h2h:H2H[];
    lineups:Lineups[];
    events:Events[]
};

export default async function Match({ fixtureByFixtureId,h2h,lineups,events }: PageProps) {
  
    const [activeTab, setActiveTab] = useState("summary"); // Default tab

    if (!fixtureByFixtureId) {
        return (
            <div className="flex w-full justify-center items-center py-5">
                <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
                    No Fixture Info Available
                </div>
            </div>
        );
    }

    // Fetch lineups
    

    
    const getTopPositionForHome = (position: string, y: number, x: number) => {
        let topPosition = 0;
        
        if (lineups[0].formation === '4-2-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-5-2') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 3: topPosition = (y / 5) * 85; break; // Defenders
                case 4: topPosition = (y / 2) * 66; break; // 2 Midfielders
            }
        } 
        else if (lineups[0].formation === '4-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        } 
        else if (lineups[0].formation === '4-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        } 
        else if (lineups[0].formation === '4-3-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition =50; break;
            }
        }
        else if (lineups[0].formation === '4-3-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '4-2-3-1') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 4) * 80; break; // Defenders
                case 3: topPosition = (y / 2) * 66; break; // 2 Midfielders
                case 4: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 5: topPosition = 50; break; // Striker
            }
        } 
        else if (lineups[0].formation === '4-1-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '3-4-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '4-1-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-4-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '4-1-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[0].formation === '3-2-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '3-2-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '3-1-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '5-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[0].formation === '5-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '3-4-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '4-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '5-2-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '5-2-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '3-2-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0].formation === '3-3-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '4-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0].formation === '4-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '5-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition =50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '5-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-1-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0].formation === '3-1-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '3-1-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-1-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '3-2-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '3-2-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-3-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '3-3-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '3-3-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '3-5-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '4-1-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0].formation === '4-2-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '4-4-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '5-1-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0].formation === '5-1-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0].formation === '5-1-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0].formation === '5-3-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }

        return `${topPosition}%`;
    };

    const getTopPositionForAway = (position: string, y: number, x: number) => {
        let topPosition = 0;
    
        if (lineups[1].formation === '4-2-3-1') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 4) * 80; break; // Defenders
                case 3: topPosition = (y / 2) * 66; break; // 2 Midfielders
                case 4: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 5: topPosition = 50; break; // Striker
            }
        }
        else if (lineups[1].formation === '3-5-2') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 3: topPosition = (y / 5) * 85; break; // Defenders
                case 4: topPosition = (y / 2) * 66; break; // 2 Midfielders
            }
        }
        else if (lineups[1].formation === '4-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        } 
        else if (lineups[1].formation === '4-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        } 
        else if (lineups[1].formation === '4-3-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition =50; break;
            }
        }
        else if (lineups[1].formation === '4-3-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '4-2-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '4-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '4-1-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '4-1-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-4-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '3-4-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-2-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1].formation === '3-3-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '4-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1].formation === '4-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '5-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition =50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '5-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-2-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '3-2-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '3-1-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '5-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[1].formation === '4-1-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[1].formation === '5-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '3-4-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '5-2-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '5-2-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '3-1-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1].formation === '3-1-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '3-1-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-1-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '3-2-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '3-2-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-3-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '3-3-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '3-3-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '3-5-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '4-1-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1].formation === '4-2-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '4-4-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '5-1-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1].formation === '5-1-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1].formation === '5-1-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1].formation === '5-3-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
    
        return `${topPosition}%`;
    };
    

    return (
        <div className="flex flex-col w-full justify-center items-center bg-gray-900 text-neutral-100 py-5 md:py-6">

             <div className="flex w-full max-w-3xl items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
                {/* Home Team */}
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <Link href={`../team/${fixtureByFixtureId.teams.home.id}nm${fixtureByFixtureId.league.name}seas${fixtureByFixtureId.league.season}lid${fixtureByFixtureId.league.id}`}>
                        <img
                            src={`https://media.api-sports.io/football/teams/${fixtureByFixtureId.teams.home.id}.png`}
                            alt="HomeLogoMatch"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="text-center text-sm font-semibold mt-1">
                        {fixtureByFixtureId.teams.home.name}
                    </div>
                </div>

                {/* Match Score */}
                <div className="w-1/3 flex flex-col justify-center items-center text-center">
                    <div className="text-xs md:text-sm text-gray-400">
                        <LocalTime fixture={fixtureByFixtureId} />
                    </div>
                    <div className="text-xl md:text-2xl font-bold py-1">
                            <span className="text-white">
                            {fixtureByFixtureId.goals.home} - {fixtureByFixtureId.goals.away}
                        </span>
                       
                    </div>
                    {fixtureByFixtureId.fixture.status.short === "FT" || fixtureByFixtureId.fixture.status.short === "AET" || fixtureByFixtureId.fixture.status.short === "PEN" && (
                        <div className="text-xs text-gray-400">Match Finished</div>
                    )}
                    {fixtureByFixtureId.fixture.status.long === "Halftime" && (
                        <div className="text-xs text-gray-400">Halftime</div>
                    )}
                    {fixtureByFixtureId.fixture.status.short === "BT" && (
                        <div className="text-xs text-gray-400">Break Time</div>
                    )}
                    {fixtureByFixtureId.fixture.status.short === "P" && (
                        <div className="text-xs text-red-500">PENALTIES!!</div>
                    )}
                </div>

                {/* Away Team */}
                <div className="w-1/3 flex flex-col justify-center items-center">
                <Link href={`../team/${fixtureByFixtureId.teams.away.id}nm${fixtureByFixtureId.league.name}seas${fixtureByFixtureId.league.season}lid${fixtureByFixtureId.league.id}`}>
                <img
                            src={`https://media.api-sports.io/football/teams/${fixtureByFixtureId.teams.away.id}.png`}
                            alt="AwayLogoMatch"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="text-center text-sm font-semibold mt-1">
                        {fixtureByFixtureId.teams.away.name}
                    </div>
                </div>
            </div>

            {/* League Info Section */}
            <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-4 p-2 bg-gray-700 rounded-lg shadow-md">
                <div className="text-sm font-semibold text-gray-200">{fixtureByFixtureId.league.name}</div>
                <div className="text-xs text-gray-400">{fixtureByFixtureId.league.round}</div>
            </div>

            {/* Lineups Section */}
            <div className="flex w-full justify-center gap-4 mb-4">
            <button
                 className={`px-4 py-2 rounded-l-lg ${activeTab === "summary" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                 onClick={() => setActiveTab("summary")}
            >
                Summary
            </button>
                <button
                    className={`px-4 py-2 rounded-l-lg ${activeTab === "matchDetails" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    onClick={() => setActiveTab("matchDetails")}
                >
                    Match Details
                </button>
                <button
                    className={`px-4 py-2 rounded-r-lg ${activeTab === "h2h" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    onClick={() => setActiveTab("h2h")}
                >
                    Head-to-Head
                </button>
            </div>

            {/* Summary Tab Content */}
            
            {activeTab === "summary" && (

                <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-6 p-4 bg-gray-800 rounded-lg shadow-md">

                <div className="w-full mt-4 p-3 bg-gray-900 rounded-lg">
                  <ul className="space-y-2">
                    {events?.map((event, index) => {
                        // Determine if the event is for the home or away team
                        const isHomeTeam = event?.team?.id === fixtureByFixtureId.teams.home.id;
                        const isAwayTeam = event?.team.id === fixtureByFixtureId.teams.away.id;

                        // Define variables for event content
                        let eventContent = null;
                        let iconSrc = "";
                        let textColor = "text-white"; // Default color

                        // Handle different event types
                        if (event?.type === "Goal") {
                            if (event?.detail === "Normal Goal") {
                                eventContent = (
                                    <>
                                        <span className="font-semibold">{event?.player.name}</span>
                                        {event?.assist.name && <span> ({event?.assist.name})</span>}
                                    </>
                                );
                                iconSrc = "/goal.png";
                            }else if (event?.detail === "Own Goal") {
                                eventContent = (
                                    <>
                                        <span className="font-semibold text-red-600">{event?.player.name}(against his team)</span>
                                        {event?.assist.name && <span> ({event?.assist.name})</span>}
                                    </>
                                );
                                iconSrc = "/goal.png";
                            }
                             else if (event?.detail === "Penalty") {
                                eventContent = (
                                    <>
                                        <span className="font-semibold">{event?.player.name}</span> (Penalty)
                                    </>
                                );
                                iconSrc = "/goal.png";
                            } else if (event?.detail === "Missed Penalty") {
                                textColor = "text-red-500"; // Red color for missed penalty
                                eventContent = (
                                    <>
                                        <span className="font-semibold">{event?.player.name}</span> (Missed Penalty)
                                    </>
                                );
                                iconSrc = "/goal.png";
                            }
                        } else if (event?.type === "Card") {
                            if (event?.detail === "Yellow Card") {
                                eventContent = <span className="font-semibold">{event?.player.name}</span>;
                                iconSrc = "/ylwcard.jpg";
                            } else if (event?.detail === "Red Card") {
                                eventContent = <span className="font-semibold">{event?.player.name}</span>;
                                iconSrc = "/redcard.jpg";
                            }
                        } else if (event?.type === "subst") {
                            eventContent = (
                                <>
                                    <span className="font-semibold">{event?.player.name}</span>
                                    {event?.assist.name && <span> ({event?.assist.name})</span>}
                                </>
                            );
                            iconSrc = "/subst.png";
                        } else if (event?.type === "Var") {
                            eventContent = <span className="font-semibold">{event?.detail}</span>;
                            iconSrc = "/var.png";
                        }

                        return (
                            <li key={index} className="flex items-center justify-between p-2 rounded-md">
                                {/* Home Team (Left Side) */}
                                {isHomeTeam && (
                                    <div className="flex items-center"><p className="text-gray-400 text-xs">{event?.time.elapsed}’</p>
                                        <img src={iconSrc} alt="icon" className="w-5 h-5 mr-2" />
                                        <p className={`text-sm ${textColor}`}>{eventContent}</p>
                                    </div>
                                )}

                                {/* Event Time */}
                                <p className="text-gray-400 text-xs">{/*{event?.time.elapsed}’*/}</p>

                                {/* Away Team (Right Side) */}
                                {isAwayTeam && (
                                    <div className="flex items-center">
                                        <p className={`text-sm ${textColor}`}>{eventContent}</p>
                                        <img src={iconSrc} alt="icon" className="w-5 h-5 ml-2" />
                                        <p className="text-gray-400 text-xs">{event.time.elapsed}’</p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
                </div>
                </div>)}


            {activeTab === "matchDetails" && (
                <>
                   <div className="relative w-full max-w-3xl">
                                              {/* Home Team Formation (Top Left) */}
                                                  <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-0 rounded-md text-sm font-bold z-10">
                                                      {lineups?.[0]?.formation}
                                                  </div>
                                              
                                                  {/* Away Team Formation (Top Right) */}
                                                  <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-0 rounded-md text-sm font-bold z-10">
                                                      {lineups?.[1]?.formation}
                                                  </div>
                                              
                                                  {/* Field img */}
                                                  
                                                  <img
                                                    src="/field.jpg"
                                                    alt="Football Field"
                                                    className="z-0 w-full h-full object-contain"
                                                  />
                                              
                                                  {/* Home Team Players */}
                                                  {lineups?.[0]?.startXI.map((player) => {
                                                      if (player.player.grid.length!=3) return null
                                                                  const [x, y] = player.player.grid.split(":").map(Number);
                                                                  const positionTop = getTopPositionForHome(player.player.pos, y,x);
                                                      let leftPosition;
                                                      if (lineups[0].formation.length === 5) {
                                                          leftPosition = `${(x / 5) * 50}%`;
                                                      } else if (lineups[0].formation.length === 7) {
                                                          leftPosition = `${(x / 6.5) * 50}%`;
                                                      }
                                              
                                                      return (
                                                          <div
                                                              key={player.player.id}
                                                              className="absolute flex flex-col items-center text-xs text-white"
                                                              style={{
                                                                  top: positionTop,
                                                                  left: leftPosition,
                                                                  transform: "translate(-50%, -50%)",
                                                                  minHeight: "40px",
                                                                  paddingRight: "0px"
                                                              }}
                                                          >
                                                              {/* Player img */}
                                                              <img
                                                                  src={`https://media.api-sports.io/football/players/${player.player.id}.png`}
                                                                  alt={player.player.name}
                                                                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-md transition-all"
                                                                      />
                                              
                                                              {/* Player Number */}
                                                             {/* <div   className="bg-blue-600 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 rounded-full mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base transition-all"
                                                              >
  {player.player.number}
</div>
*/}
                                              
                                                              {/* Player Name */}
                                                              <div
  className="mt-0 sm:mt-2 md:mt-3 bg-black/50 rounded text-[10px] sm:text-xs md:text-sm lg:text-sm p-0 transition-all"
>         <span   className="bg-blue-600 px-1 py-0.25 sm:px-1 sm:py-0.25 md:px-1 md:py-0.25 lg:px-1 lg:py-0.25 rounded-full mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base transition-all"
                                                              >
  {player.player.number}
</span>
                {(() => {
                           const nameParts = player.player.name.split(" "); // Split the name by space
                           if (nameParts.length > 1) {
                               let remainingName = nameParts.slice(1).join(" "); // Get everything after the first word
                               if (remainingName.length > 12) {
                                   return remainingName.substring(0, 12) + "..."; // Truncate if longer than 12
                               }
                               return remainingName; // Return normally if 12 or less
                           }
                           return player.player.name; // If no space, display the full name
                       })()}
                   </div>
                   
                                                      </div>
                                                      );
                                                  })}
                                              
                                                  {/* Away Team Players */}
                                                  {lineups?.[1]?.startXI.map((player) => {
                                                      if (!player.player.grid) return null
                                                      const [x, y] = player.player.grid.split(":").map(Number);
                                                      const positionTop = getTopPositionForAway(player.player.pos, y, x);
                                                      let leftPosition;
                                                      if (lineups[1].formation.length === 5) {
                                                          leftPosition = `${100 - (x / 5) * 50}%`;
                                                      } else if (lineups[1].formation.length === 7) {
                                                          leftPosition = `${100 - (x / 6.5) * 50}%`;
                                                      }
                                              
                                                      return (
                                                          <div
                                                              key={player.player.id}
                                                              className="absolute flex flex-col items-center text-xs text-white"
                                                              style={{
                                                                  top: positionTop,
                                                                  left: leftPosition,
                                                                  transform: "translate(-50%, -50%)",
                                                                  minHeight: "40px",
                                                                  paddingRight: "0px"
                                                              }}
                                                          >
                                                              {/* Player img */}
                                                              <img
                                                                  src={`https://media.api-sports.io/football/players/${player.player.id}.png`}
                                                                  alt={player.player.name}
                                                                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-md transition-all"
                                                              />
                                              
                                                              {/* Player Number */}
                                                             {/* <div   className="bg-red-600 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 rounded-full mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base transition-all"
                                                              >
                                                                  {player.player.number}
                                                                  
                                                              </div>*/}
                                              
                                                              {/* Player Name */}
                                                              {player.player.pos !== "G" &&(<div
  className="mt-0 sm:mt-2 md:mt-3 bg-black/50 rounded text-[10px] sm:text-xs md:text-sm lg:text-sm p-0 transition-all"
>         <span   className="bg-red-600 px-1 py-0.25 sm:px-1 sm:py-0.25 md:px-1 md:py-0.25 lg:px-1 lg:py-0.25 rounded-full mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base transition-all"
                                                              >
  {player.player.number}
</span>                  {(() => {
                           const nameParts = player.player.name.split(" "); // Split the name by space
                           if (nameParts.length > 1) {
                               let remainingName = nameParts.slice(1).join(" "); // Get everything after the first word
                               if (remainingName.length > 12) {
                                   return remainingName.substring(0, 12) + "..."; // Truncate if longer than 12
                               }
                               return remainingName; // Return normally if 12 or less
                           }
                           return player.player.name; // If no space, display the full name
                       })()}
                   </div>)}




                                                              {player.player.pos == "G" &&(<div
  className="mt-0 sm:mt-2 md:mt-3 bg-black/50 rounded text-[10px] sm:text-xs md:text-sm lg:text-sm p-0 transition-all"
>         <span   className="bg-red-600 px-1 py-0.25 sm:px-1 sm:py-0.25 md:px-1 md:py-0.25 lg:px-1 lg:py-0.25 rounded-full mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base transition-all"
                                                              >
  {player.player.number}
</span>                  {(() => {
                           const nameParts = player.player.name.split(" "); // Split the name by space
                           if (nameParts.length > 1) {
                               let remainingName = nameParts.slice(1).join(" "); // Get everything after the first word
                               if (remainingName.length > 12) {
                                   return remainingName.substring(0, 12) + "..."; // Truncate if longer than 12
                               }
                               return remainingName; // Return normally if 12 or less
                           }
                           return player.player.name; // If no space, display the full name
                       })()}
                   </div>)}
                   
                                              
                                                      </div>
                                                      );
                                                  })}
                    </div> 
                    <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-6 p-4 bg-gray-800 rounded-lg shadow-md"> 
                <h2 className="text-lg font-semibold mb-3 text-white">Lineups</h2>
                <div className="w-full flex justify-between text-white">
                    {/* Home Team Lineup */}
                    <div className="w-1/2 p-2">
                        <h3 className="text-sm font-bold text-center">{fixtureByFixtureId.teams.home.name}</h3>
                        <p className="text-xs text-center text-gray-400">
                            {lineups?.[0]?.formation ? `Formation: ${lineups?.[0]?.formation}` : "Formation data not available"}
                        </p>
                        
                        {/* Starting XI */}
                        <div className="mt-3 bg-gray-700 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-yellow-400">Starting XI</h4>
                            <ul className="text-xs">
                                {lineups?.[0]?.startXI.map((player) => (
                                    <li key={player.player.id} className="py-1">
                                        {player.player.name} ({player.player.number})
                                    </li>
                                ))}
                            </ul>
                        </div>
            
                        {/* Substitutes */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-blue-400">Substitutes</h4>
                            <ul className="text-xs text-gray-300 italic">
                                {lineups?.[0]?.substitutes?.length > 0 ? (
                                    lineups?.[0]?.substitutes?.map((player) => (
                                        <li key={player.player.id} className="py-1">
                                            {player.player.name} ({player.player.number})
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No substitutes available</li>
                                )}
                            </ul>
                        </div>
                        {/* Coach */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-red-400">coach</h4>
                          {lineups?.[0]?.coach && (
                              <div className="text-white text-sm mt-2">
                                  <span className="font-bold"></span>{lineups[0].coach.name}
                              </div>
                          )}
                    </div>
                    </div>
            
                    {/* Away Team Lineup */}
                    <div className="w-1/2 p-2">
                        <h3 className="text-sm font-bold text-center">{fixtureByFixtureId.teams.away.name}</h3>
                        <p className="text-xs text-center text-gray-400">
                            {lineups?.[1]?.formation ? `Formation: ${lineups?.[1]?.formation}` : "Formation data not available"}
                        </p>
                        
                        {/* Starting XI */}
                        <div className="mt-3 bg-gray-700 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-yellow-400">Starting XI</h4>
                            <ul className="text-xs">
                                {lineups?.[1]?.startXI.map((player) => (
                                    <li key={player.player.id} className="py-1">
                                        {player.player.name} ({player.player.number})
                                    </li>
                                ))}
                            </ul>
                        </div>
            
                        {/* Substitutes */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-blue-400">Substitutes</h4>
                            <ul className="text-xs text-gray-300 italic">
                                {lineups?.[1]?.substitutes?.length > 0 ? (
                                    lineups?.[1]?.substitutes?.map((player) => (
                                        <li key={player.player.id} className="py-1">
                                            {player.player.name} ({player.player.number})
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No substitutes available</li>
                                )}
                            </ul>
                        </div>
                        {/* Coach */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-red-400">coach</h4>
                          {lineups?.[1]?.coach && (
                              <div className="text-white text-sm mt-2">
                                  <span className="font-bold"></span>{lineups[1].coach.name}
                              </div>
                          )}
                    </div>
                    </div>
                </div>
                    </div>
                </>
            )}

            {activeTab === "h2h" && (
                <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
                  {h2h?.slice(0, 5).map((match, index) => (
                                              <div key={index} className="flex w-full justify-between items-center bg-gray-700 p-3 my-1 rounded-md">
                                                  <div className="text-xs text-gray-400">
                                                      {new Date(match.fixture.date).toLocaleDateString()}
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                      <img
                                                            src={`https://media.api-sports.io/football/teams/${match.teams.home.id}.png`}
                                                          alt={match.teams.home.name}
                                                          width={40}
                                                          height={40}
                                                      />
                                                      <div className="text-xs">{match.teams.home.name}</div>
                                                  </div>
                                                  <div className="text-lg font-bold">
                                                      {match.fixture.status.short === "FT" ? (
                                                          `${match.goals.home} - ${match.goals.away}`
                                                      ) : (
                                                          "VS"
                                                      )}
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                      <img
                                                            src={`https://media.api-sports.io/football/teams/${match.teams.away.id}.png`}
                                                            alt={match.teams.away.name}
                                                          width={40}
                                                          height={40}
                                                      />
                                                      <div className="text-xs">{match.teams.away.name}</div>
                                                  </div>
                                              </div>
                                          ))}
                </div>
            )}

            
        </div>
    );
}
