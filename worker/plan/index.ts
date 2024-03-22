export function createShipMoveToBeachPlan(cost: number, runningCallback: VoidFunction): GOAPPlan {
    return {
        actions: [
            {
                name: "move_to_beach",
                preconditions: {
                    "region_biome_ocean": true,
                    "region_biome_beach": false,
                },
                cost,
                effects: {
                    "region_biome_ocean": false,
                    "region_biome_beach": true,
                }
            }
        ],
        currentState: {
            region_biome_ocean: true,
            region_biome_beach: false,
        },
        goalState: {
            region_biome_ocean: false,
            region_biome_beach: true,
        },
        callbacks: {
            pathNotFoundCallback: () => {
                console.log("Plan Not Found!")
            },
            completeCallback: () => {
                console.log("Plan Complete!")
            },
            runningCallback
        }
    }
}