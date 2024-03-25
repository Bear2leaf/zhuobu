import IslandMap, { BiomeColor } from "../third/map/Map.js";
import MeshBuilder from "../third/map/MeshBuilder.js";
import TriangleMesh from "../third/map/TriangleMesh.js";
import PoissonDiskSampling from "../poisson/PoissonDiskSampling.js";
import SeedableRandom from "../util/SeedableRandom.js";
import { createNoise2D } from "../util/simplex-noise.js";
import { execute } from "../third/goap/index.js";
import { createOnBeachPlan, createOnDesertPlan } from "../plan/index.js";

export default class Island {
    private readonly spacing = 16;
    private readonly distanceRNG = new SeedableRandom(42);
    private readonly simplex = { noise2D: createNoise2D(() => this.distanceRNG.nextFloat()) };
    private readonly rng = new SeedableRandom(25);
    private readonly regions: number[];
    private readonly allplans: GOAPPlan[][];
    readonly positions: number[];
    readonly map: IslandMap;
    constructor() {
        this.regions = [];
        this.allplans = [];
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
        const currentStates: GOAPState[] = [];
        for (let index = 0; index < this.map.mesh.numBoundaryRegions; index++) {
            positions.push(...this.generatePointByRegion(index));
            this.regions.push(index);
            currentStates.push({
                has_higher_region: true,
                ship_on_ocean: true,
                ship_on_beach: false,
                on_desert: false,
                on_ship: true,
            });
            this.allplans.push([
                createOnBeachPlan(this, this.allplans, currentStates, this.regions, index),
                createOnDesertPlan(this, this.allplans, currentStates, this.regions, index)
            ]);
        }
        this.positions.splice(0, this.positions.length, ...positions);
    }
    updatePlans() {
        for (let index = 0; index < this.regions.length; index++) {
            this.allplans[index].forEach(execute);
        }
    }
    updateVertices(vertices: number[]) {
        const map = this.map;
        for (let index = 0; index < this.regions.length; index++) {
            const region = this.regions[index];
            const position = this.getRegionPosition(region);
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
    borderRegions() {
        const regions: [number, number][] = []
        for (let r = 0; r < this.map.mesh.numBoundaryRegions; r++) {
            const x = this.map.mesh.r_x(r);
            const y = this.map.mesh.r_y(r);
            regions.push([x, y]);
        }
        return regions;
    }
    centerRegionPoint(): [number, number] {
        const num = this.map.mesh.numRegions;
        const x = this.map.mesh.r_x(num - 1);
        const y = this.map.mesh.r_y(num - 1);
        return [x, y]
    }
    findHigherRegion(region: number) {
        const map = this.map;
        const circulateRegions: number[] = [];
        map.mesh.r_circulate_r(circulateRegions, region);
        return circulateRegions.find(v => map.r_elevation[v] > map.r_elevation[region])!;
    }
    findHigherBeachRegion(region: number) {
        const map = this.map;
        const circulateRegions: number[] = [];
        map.mesh.r_circulate_r(circulateRegions, region);
        return circulateRegions.find(v => map.r_elevation[v] > map.r_elevation[region] && map.r_biome[v] === BiomeColor.BEACH)!;
    }
    findHigherOceanRegion(region: number) {
        const map = this.map;
        const circulateRegions: number[] = [];
        map.mesh.r_circulate_r(circulateRegions, region);
        return circulateRegions.find(v => map.r_elevation[v] > map.r_elevation[region] && map.r_biome[v] === BiomeColor.OCEAN)!;
    }
    findHigherDesertRegion(region: number) {
        const map = this.map;
        const circulateRegions: number[] = [];
        map.mesh.r_circulate_r(circulateRegions, region);
        return circulateRegions.find(v => map.r_elevation[v] > map.r_elevation[region] && map.r_biome[v] === BiomeColor.SUBTROPICAL_DESERT)!;
    }
    isOceanRegion(region: number): boolean {
        return this.map.r_biome[region] === BiomeColor.OCEAN;
    }
    isBeachRegion(region: number): boolean {
        return !!region && this.map.r_biome[region] === BiomeColor.BEACH;
    }
    isDesertRegion(region: number): boolean {
        return !!region && this.map.r_biome[region] === BiomeColor.SUBTROPICAL_DESERT;
    }
    toCenterRegionPoints(region: number) {
        const regions: [number, number][] = [];
        let start = region;
        while (start !== undefined && start < this.map.mesh.numRegions) {
            const x = this.map.mesh.r_x(start);
            const y = this.map.mesh.r_y(start);
            regions.push([x, y]);
            start = this.findHigherRegion(start);
        }
        return regions
    }
    toBeachPoints(region: number) {
        const regions: [number, number][] = [];
        let start = region;
        while (start !== undefined && start < this.map.mesh.numRegions && this.map.r_biome[start] !== BiomeColor.BEACH) {
            const x = this.map.mesh.r_x(start);
            const y = this.map.mesh.r_y(start);
            regions.push([x, y]);
            start = this.findHigherRegion(start);
        }
        return regions
    }
    toDesertPoints(region: number) {
        const regions: [number, number][] = [];
        let start = region;
        while (start !== undefined && start < this.map.mesh.numRegions && this.map.r_biome[start] !== BiomeColor.SUBTROPICAL_DESERT) {
            const x = this.map.mesh.r_x(start);
            const y = this.map.mesh.r_y(start);
            regions.push([x, y]);
            start = this.findHigherDesertRegion(start);
        }
        return regions
    }
    getRegionPosition(region: number): [number, number] {
        return this.map.mesh.r_pos([], region);
    }
}