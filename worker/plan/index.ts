import { GOAPPlan } from "../third/goap/index.js";
import IslandMap from "../island/Island.js";

function removePlan(this: GOAPPlan, plans: GOAPPlan[]) {
    const planIndex = plans.findIndex(p => p.name === this.name);
    if (planIndex !== -1) {
        plans.splice(planIndex, 1);
    }
    console.log("remove plan", this.name)
}

export function createOnBeachPlan(island: IslandMap, allplans: GOAPPlan[][], currentStates: GOAPState[], regions: number[], index: number): GOAPPlan {
    return {
        onPlanComplete: function () {
            removePlan.call(this, allplans[index]);
        },
        name: "onBeachPlan",
        actions: {
            ship_to_beach: {
                preconditions: {
                    "has_higher_region": true,
                    "ship_on_ocean": true,
                    "ship_on_beach": false,
                },
                cost: 1,
                effects: {
                    "on_ship": true,
                    "ship_on_ocean": false,
                    "ship_on_beach": true,
                    "has_higher_region": true,
                },
                onExecute: function () {
                    const region = regions[index];
                    const higher = island.findHigherRegion(region);
                    if (!higher) return;
                    this.effects.has_higher_region = !!higher;
                    this.cost = island.toBeachPoints(higher).length;
                    regions[index] = higher;
                }
            },
            get_off_ship: {
                preconditions: {
                    "ship_on_beach": true,
                    "on_ship": true,
                },
                cost: 1,
                effects: {
                    "on_ship": false,
                },
                onExecute: function () {
                    this.cost--;
                }
            },
            to_beach: {
                preconditions: {
                    "on_ship": false,
                },
                cost: 1,
                effects: {
                    "on_beach": true,
                },
                onExecute: function () {
                    this.cost--;
                }
            }
        },
        currentState: currentStates[index],
        goalState: {
            on_beach: true,
        }
    };
}



export function createOnDesertPlan(island: IslandMap, allplans: GOAPPlan[][], currentStates: GOAPState[], regions: number[], index: number): GOAPPlan {
    return {
        onPlanComplete() {
            removePlan.call(this, allplans[index]);
        },
        name: "onDesertPlan",
        actions: {
            to_desert: {
                preconditions: {
                    "has_higher_region": true,
                    "on_ship": false,
                    "on_beach": true,
                },
                cost: 1,
                effects: {
                    "on_beach": false,
                    "on_desert": true,
                    "has_higher_region": true,
                },
                onExecute: function () {
                    const region = regions[index];
                    const higher = island.findHigherDesertRegion(region);
                    this.effects.has_higher_region = !!higher;
                    if (!higher) return;
                    this.cost = island.toDesertPoints(higher).length;
                    regions[index] = higher;
                }
            },
        },
        currentState: currentStates[index],
        goalState: {
            on_desert: true,
        }
    };
}