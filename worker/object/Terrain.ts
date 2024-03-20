import Map, { BiomeColor } from "../third/map/Map.js";
import MeshBuilder from "../third/map/MeshBuilder.js";
import TriangleMesh from "../third/map/TriangleMesh.js";
import PoissonDiskSampling from "../poisson/PoissonDiskSampling.js";
import SeedableRandom from "../util/SeedableRandom.js";
import { createNoise2D } from "../util/simplex-noise.js";

export default class Terrain {
    private readonly spacing = 16;
    private readonly distanceRNG = new SeedableRandom(42);
    private readonly simplex = { noise2D: createNoise2D(() => this.distanceRNG.nextFloat()) };
    private readonly rng = new SeedableRandom(25);
    readonly map: Map;
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    constructor() {
        this.map = new Map(new TriangleMesh(new MeshBuilder({ boundarySpacing: this.spacing }).addPoisson(PoissonDiskSampling, this.spacing, () => this.rng.nextFloat()).create()), {
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
    static create() {
        const terrain = new Terrain();
        const vertices: number[] = terrain.vertices;
        const colors: number[] = terrain.colors;
        const map = terrain.map;
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
            pos1[0] = pos1[0] / 500.0 - 1.0;
            pos1[1] = pos1[1] / 500.0 - 1.0;
            pos2[0] = pos2[0] / 500.0 - 1.0;
            pos2[1] = pos2[1] / 500.0 - 1.0;
            pos3[0] = pos3[0] / 500.0 - 1.0;
            pos3[1] = pos3[1] / 500.0 - 1.0;
            vertices.push(...pos1, terrain.adjustHeight(map.r_elevation[r]));
            vertices.push(...pos2, terrain.adjustHeight(map.t_elevation[t1]));
            vertices.push(...pos3, terrain.adjustHeight(map.t_elevation[t2]));
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
        return terrain;
    }
    adjustHeight(height: number) {
        return height / 8;
    }
    getAttributes(): {
        object: string
        name: string;
        type: "FLOAT";
        value: number[];
        size: number;
    }[] {
        return [
            { object: "terrainFBO", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "terrainFBO", name: "a_color", type: "FLOAT", value: this.colors, size: 3 }
        ]
    }
}