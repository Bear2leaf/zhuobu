import astar_plan from "../third/goap/astar.js";
import { actionplanner_t, goap_set_pre, goap_set_pst, goap_set_cost, goap_description, worldstate_t, goap_worldstate_clear, goap_worldstate_set, goap_worldstate_description } from "../third/goap/goap.js";
import { LOGI } from "../third/goap/log.js";
import { createap } from "../third/goap/main.js";
import IslandMap, { BiomeColor } from "../third/map/Map.js";
import SeedableRandom from "../util/SeedableRandom.js";

export default class Icon {
    private readonly scales: number[] = []
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    private readonly colorRNG = new SeedableRandom(1)
    private readonly textureSize: number = 64;
    private readonly tileSize: number = 16;
    private readonly aps: actionplanner_t[];
    private readonly regions: number[];
    constructor() {
        this.scales = [
        ];
        this.vertices = [
        ];
        this.colors = [
        ];
        this.regions = [];
        this.aps = [];
    }
    static create(map: IslandMap) {
        const object = new Icon();
        object.generateBorderPoints(map);
        return object;
    }
    generateBorderPoints(map: IslandMap) {
        this.scales.splice(0, this.scales.length);
        this.vertices.splice(0, this.vertices.length);
        this.colors.splice(0, this.colors.length);
        for (let index = 0; index < map.mesh.numBoundaryRegions; index++) {
            this.regions.push(index);
            this.aps.push(createap());
            this.generatePointByRegion(map, index);
        }
    }
    generatePointByRegion(map: IslandMap, r: number) {
        const scale = 50;
        const elevation = map.r_elevation[r];
        const x = map.mesh.r_x(r);
        const y = map.mesh.r_y(r);
        const colors: number[] = this.colors;
        const vertices: number[] = this.vertices;
        const scales: number[] = this.scales;
        vertices.push(x / 500 - 1);
        vertices.push((elevation) / 8);
        vertices.push(y / 500 - 1);
        scales.push(scale)
        const frames = this.textureSize / this.tileSize;
        colors.push(
            0
            , Math.floor(this.colorRNG.nextFloat() * frames)
            , 0
            , frames - 1
        );
    }
    getAttributes(): {
        object: string
        name: string;
        type?: GLType;
        value: number[];
        size?: number;
        divisor?: number;
    }[] {
        return [
            { object: "icon", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "icon", name: "a_scale", type: "FLOAT", value: this.scales, size: 1 },
            { object: "icon", name: "a_color", type: "UNSIGNED_BYTE", value: this.colors, size: 4 },
        ]
    }
    getFeedbackAttributes(): {
        object: string
        name: string;
        type?: GLType;
        value: number[];
        size?: number;
    }[] {
        return [
            { object: "icon.feedback", name: "a_scale", type: "FLOAT", value: this.scales, size: 1 },
            { object: "icon.feedback", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "icon.feedback", name: "a_positionTo", type: "FLOAT", value: this.vertices, size: 3 },
        ]
    }
    getRandomAttributes(map: IslandMap): {
        object: string
        name: string;
        start: number;
        value: number[];
    }[] {
        const oldvertices = this.vertices.slice();
        for(let index = 0; index < map.mesh.numBoundaryRegions; index++) {
            const region: number = this.regions[index];
            const costMap = new Map<string, number>();
            costMap.set("move_to_beach", this.toBeachPoints(map, region).length);
            const plancost = this.executeReachBeachPlan(this.aps[index], costMap);
            if (plancost !== 0) {
                const higherRegion = this.findHigherRegion(map, region);
                if (higherRegion) {
                    const position = this.getRegionPosition(map, higherRegion);
                    const elevation = map.r_elevation[higherRegion];
                    this.vertices[index * 3 + 0] = position[0] / 500 - 1;
                    this.vertices[index * 3 + 1] = elevation / 8;
                    this.vertices[index * 3 + 2] = position[1] / 500 - 1;
                    this.regions[index] = higherRegion;
                }
            }
        }
        return [
            {
                object: "icon.feedback", name: "a_position", start: 0, value: oldvertices,
            },
            {
                object: "icon.feedback", name: "a_positionTo", start: 0, value: this.vertices,
            },
        ]
    }
    private executeReachBeachPlan(ap: actionplanner_t, costMap: Map<string, number>) {
        goap_set_pre(ap, "move_to_beach", "region_biome_ocean", true);
        goap_set_pst(ap, "move_to_beach", "ship_reach_beach", true);
        goap_set_pst(ap, "move_to_beach", "region_biome_ocean", false);
        costMap.forEach(function (value, key) {
            goap_set_cost(ap, key, value);
        });
        const desc: [string] = ["actions:\n"];
        goap_description(ap, desc);
        LOGI(desc[0]);
        const fr: worldstate_t = { values: 0, dontcare: 0 };
        goap_worldstate_clear(fr);
        goap_worldstate_set(ap, fr, "region_biome_ocean", true);
        const goal: worldstate_t = {
            values: 0,
            dontcare: 0
        };
        goap_worldstate_clear(goal);
        goap_worldstate_set(ap, goal, "region_biome_ocean", false);
        goap_worldstate_set(ap, goal, "ship_reach_beach", true);
        const STATESIZE = 16;
        const states = Array<worldstate_t>(STATESIZE);
        for (let index = 0; index < STATESIZE; index++) {
            states[index] = { values: 0, dontcare: 0 };
        }
        const plan = Array<string>(STATESIZE).fill("");
        const plansz: [number] = [STATESIZE];
        const plancost = astar_plan(ap, fr, goal, plan, states, plansz);
        LOGI(`plancost = ${plancost}`);
        desc[0] = "init states:\n";
        goap_worldstate_description(ap, fr, desc);
        LOGI(`${desc[0]}`);
        LOGI("plan actions:");
        for (let i = 0; i < plansz[0] && i < STATESIZE; ++i) {
            desc[0] = "";
            goap_worldstate_description(ap, states[i], desc);
            LOGI(`${i}: [${plan[i]}] ${desc[0]}`);
        }
        return plancost;
    }
    private findHigherRegion(map: IslandMap, region: number) {
        const circulateRegions: number[] = [];
        map.mesh.r_circulate_r(circulateRegions, region);
        return circulateRegions.find(v => v > region)!;
    }
    private toCenterRegionPoints(map: IslandMap, region: number) {
        const regions: [number, number][] = [];
        let start = region;
        while (start !== undefined && start < map.mesh.numRegions) {
            const x = map.mesh.r_x(start);
            const y = map.mesh.r_y(start);
            regions.push([x, y]);
            start = this.findHigherRegion(map, start);
        }
        return regions
    }
    private toBeachPoints(map: IslandMap, region: number) {
        const regions: [number, number][] = [];
        let start = region;
        while (start !== undefined && start < map.mesh.numRegions && map.r_biome[region] !== BiomeColor.BEACH) {
            const x = map.mesh.r_x(start);
            const y = map.mesh.r_y(start);
            regions.push([x, y]);
            start = this.findHigherRegion(map, start);
        }
        return regions
    }
    private isRegionBeach(map: IslandMap, region: number) {
        return map.r_biome[region] === BiomeColor.BEACH;
    }
    private isRegionOcean(map: IslandMap, region: number) {
        return map.r_biome[region] === BiomeColor.OCEAN;
    }
    private getRegionPosition(map: IslandMap, region: number): [number, number] {
        return map.mesh.r_pos([], region);
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            { name: "u_size", type: "1f", value: [this.tileSize] },
        ];
    }
}