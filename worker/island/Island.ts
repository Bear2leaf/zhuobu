import IslandMap, { BiomeColor } from "../third/map/Map.js";
import MeshBuilder from "../third/map/MeshBuilder.js";
import TriangleMesh from "../third/map/TriangleMesh.js";
import PoissonDiskSampling from "../poisson/PoissonDiskSampling.js";
import SeedableRandom from "../util/SeedableRandom.js";
import { createNoise2D } from "../util/simplex-noise.js";
import astar_plan from "../third/goap/astar.js";
import { actionplanner_t, goap_set_pre, goap_set_pst, goap_set_cost, goap_description, worldstate_t, goap_worldstate_clear, goap_worldstate_set, goap_worldstate_description } from "../third/goap/goap.js";
import { LOGI } from "../third/goap/log.js";
import { createap } from "../third/goap/main.js";

export default class Island {
    private readonly spacing = 16;
    private readonly distanceRNG = new SeedableRandom(42);
    private readonly simplex = { noise2D: createNoise2D(() => this.distanceRNG.nextFloat()) };
    private readonly rng = new SeedableRandom(25);
    private readonly aps: actionplanner_t[];
    private readonly regions: number[];
    readonly positions: number[];
    readonly map: IslandMap;
    constructor() {
        this.aps = [];
        this.regions = [];
        this.positions = [];
        this.map = new IslandMap(new TriangleMesh(new MeshBuilder({ boundarySpacing: this.spacing }).addPoisson(PoissonDiskSampling, this.spacing, () => this.rng.nextFloat()).create()), {
            amplitude: 0.5,
            length: 4,
        }, () => (N) => Math.round(this.rng.nextFloat() * N));
        this.map.calculate({
            noise: this.simplex,
            shape: { round: 0.5, inflate: 0.3, amplitudes: [1 / 3, 1 / 4, 1 / 8, 1 / 16] },
            numRivers: 20,
            drainageSeed: 0,
            riverSeed: 0,
            noisyEdge: { length: 10, amplitude: 0.2, seed: 0 },
            biomeBias: { north_temperature: 0, south_temperature: 0, moisture: 0 },
        });
    }
    initTerrain(vertices: number[], colors: number[]) {
        const map = this.map;
        for (let s = 0; s < map.mesh.numSides; s++) {
            const r = map.mesh.s_begin_r(s),
                t1 = map.mesh.s_inner_t(s),
                t2 = map.mesh.s_outer_t(s);
            const color: BiomeColor = map.r_biome[r];
            const pos1: [number, number] = [0, 0];
            const pos2: [number, number] = [0, 0];
            const pos3: [number, number] = [0, 0];
            map.mesh.r_pos(pos1, r);
            map.mesh.t_pos(pos2, t1);
            map.mesh.t_pos(pos3, t2);
            // const r0 = map.mesh.s_begin_r(s),
            //     r1 = map.mesh.s_end_r(s);
            // if (((map.s_flow[s] > 0 || map.s_flow[map.mesh.s_opposite_s(s)] > 0)
            //     && !map.r_water[r0] && !map.r_water[r1])) {
            //     const flow = 2 * Math.sqrt(map.s_flow[s]);
            //     rivers.push([[...pos2, adjustHeight(map.t_elevation[t1]), flow], [...pos3, adjustHeight(map.t_elevation[t2]), flow]]);
            // }
            pos1[0] = this.adjustXY(pos1[0]);
            pos1[1] = this.adjustXY(pos1[1]);
            pos2[0] = this.adjustXY(pos2[0]);
            pos2[1] = this.adjustXY(pos2[1]);
            pos3[0] = this.adjustXY(pos3[0]);
            pos3[1] = this.adjustXY(pos3[1]);
            vertices.push(...pos1, this.adjustHeight(map.r_elevation[r]));
            vertices.push(...pos2, this.adjustHeight(map.t_elevation[t1]));
            vertices.push(...pos3, this.adjustHeight(map.t_elevation[t2]));
            colors.push(...[
                color >> 16
                , color >> 8
                , color
            ].map(x => (x & 0xff) / 255), ...[
                color >> 16
                , color >> 8
                , color
            ].map(x => (x & 0xff) / 255), ...[
                color >> 16
                , color >> 8
                , color
            ].map(x => (x & 0xff) / 255));

        }
    }
    generateBorderPoints() {
        const positions: number[] = [];
        this.regions.length = this.map.mesh.numBoundaryRegions;
        this.aps.length = this.map.mesh.numBoundaryRegions;
        for (let index = 0; index < this.map.mesh.numBoundaryRegions; index++) {
            this.regions[index] = index;
            this.aps[index] = createap();
            positions.push(...this.generatePointByRegion(index));
        }
        this.positions.splice(0, this.positions.length, ...positions);
    }
    updateRegions() {
        const map = this.map;
        for (let index = 0; index < map.mesh.numBoundaryRegions; index++) {
            const region: number = this.regions[index];
            const costMap = new Map<string, number>();
            costMap.set("move_to_beach", this.toBeachPoints(map, region).length);
            const plancost = this.executeReachBeachPlan(this.aps[index], costMap);
            if (plancost !== 0) {
                const higherRegion = this.findHigherRegion(map, region);
                if (higherRegion) {
                    this.regions[index] = higherRegion;
                }
            }
        }
    }
    updateVertices(vertices: number[]) {
        const map = this.map;
        for (let index = 0; index < this.regions.length; index++) {
            const region = this.regions[index];
            const position = this.getRegionPosition(map, region);
            const elevation = map.r_elevation[region];
            vertices[index * 3 + 0] = this.adjustXY(position[0]);
            vertices[index * 3 + 1] = this.adjustHeight(elevation);
            vertices[index * 3 + 2] = this.adjustXY(position[1]);

        }
    }
    generatePointByRegion(r: number) {
        const map = this.map;
        const elevation = map.r_elevation[r];
        const x = map.mesh.r_x(r);
        const y = map.mesh.r_y(r);
        const translations: number[] = [];
        translations.push(this.adjustXY(x));
        translations.push(this.adjustHeight(elevation));
        translations.push(this.adjustXY(y));
        return translations;
    }
    private adjustXY(x: number) {
        return x / 500 - 1;
    }
    private adjustHeight(height: number) {
        return height / 8;
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
}