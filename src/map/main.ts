import MeshBuilder from "./create.js";
import TriangleMesh from "./TriangleMesh.js";
import PoissonDiskSampling from "../poisson/index.js";
import { createNoise2D } from "./simplex-noise.js";
import SeedableRandom from "../worker/script/SeedableRandom.js";
import Map from "./Map.js";
import { Tuple } from "./util.js";



enum BiomeColor {
    BARE = 136 << 16 | 136 << 8 | 136,
    BEACH = 160 << 16 | 144 << 8 | 119,
    COAST = 51 << 16 | 51 << 8 | 90,
    GRASSLAND = 136 << 16 | 170 << 8 | 85,
    ICE = 153 << 16 | 255 << 8 | 255,
    LAKE = 51 << 16 | 102 << 8 | 153,
    LAKESHORE = 34 << 16 | 85 << 8 | 136,
    MARSH = 47 << 16 | 102 << 8 | 102,
    OCEAN = 68 << 16 | 68 << 8 | 122,
    RIVER = 34 << 16 | 85 << 8 | 136,
    SCORCHED = 85 << 16 | 85 << 8 | 85,
    SHRUBLAND = 136 << 16 | 153 << 8 | 119,
    SNOW = 255 << 16 | 255 << 8 | 255,
    SUBTROPICAL_DESERT = 210 << 16 | 185 << 8 | 139,
    TAIGA = 153 << 16 | 170 << 8 | 119,
    TEMPERATE_DECIDUOUS_FOREST = 103 << 16 | 148 << 8 | 89,
    TEMPERATE_DESERT = 201 << 16 | 210 << 8 | 155,
    TEMPERATE_RAIN_FOREST = 68 << 16 | 136 << 8 | 85,
    TROPICAL_RAIN_FOREST = 51 << 16 | 119 << 8 | 85,
    TROPICAL_SEASONAL_FOREST = 85 << 16 | 153 << 8 | 68,
    TUNDRA = 187 << 16 | 187 << 8 | 170,
};


const distanceRNG = new SeedableRandom(35);
const noise2D = createNoise2D(() => distanceRNG.nextFloat())
const simplex = { noise2D };
const spacing = 32;
// const points: [number, number][] = [];
// for (let i = 0; i < gridSize; i++) {
//     for (let j = 0; j < gridSize; j++) {
//         points.push([i * spacing, j * spacing]);
//     }
// }
// const mesh = new TriangleMesh(new MeshBuilder({ boundarySpacing: spacing }).addPoints(points).create())
const poissonRNG = new SeedableRandom(25);
const mesh = new TriangleMesh(new MeshBuilder({ boundarySpacing: spacing }).addPoisson(PoissonDiskSampling, spacing, () => poissonRNG.nextFloat()).create())
const map = new Map(mesh, {
    amplitude: 0.5,
    length: 4,
}, () => (N) => Math.round(poissonRNG.nextFloat() * N));

map.calculate({
    noise: simplex,
    shape: { round: 0.5, inflate: 0.3, amplitudes: [1 / 3, 1 / 4, 1 / 8, 1 / 16] },
    numRivers: 20,
    drainageSeed: 0,
    riverSeed: 0,
    noisyEdge: { length: 10, amplitude: 0.2, seed: 0 },
    biomeBias: { north_temperature: 0, south_temperature: 0, moisture: 0 },
});
const heightData: number[] = [];
const triangles: {
    positions: Tuple<number, 3>[],
    color: BiomeColor
}[] = [];
const rivers: Tuple<Tuple<number, 4>, 2>[] = [];
// 2 triangles each face, 6 faces
// triangles.push({
//     positions: [[1, 1, -1], [1, -1, -1], [-1, -1, -1]],
//     color: [1, 0, 0]
// });
// triangles.push({
//     positions: [[-1, -1, -1], [-1, 1, -1], [1, 1, -1]],
//     color: [0, 1, 0],
// });
// triangles.push({
//     positions: [[-1, -1, 1], [1, -1, 1], [1, 1, 1]],
//     color: [0, 1, 1],
// });
// triangles.push({
//     positions: [[1, 1, 1], [-1, 1, 1], [-1, -1, 1]],
//     color: [1, 0, 1],
// });




for (let s = 0; s < map.mesh.numSolidSides; s++) {
    const r = map.mesh.s_begin_r(s),
        t1 = map.mesh.s_inner_t(s),
        t2 = map.mesh.s_outer_t(s);
    const biome = map.r_biome[r] as keyof typeof BiomeColor;
    const color: BiomeColor = BiomeColor[biome];
    const pos1: [number, number] = [0, 0];
    const pos2: [number, number] = [0, 0];
    const pos3: [number, number] = [0, 0];
    map.mesh.r_pos(pos1, r);
    map.mesh.t_pos(pos2, t1);
    map.mesh.t_pos(pos3, t2);
    const r0 = map.mesh.s_begin_r(s),
        r1 = map.mesh.s_end_r(s);
    if (((map.s_flow[s] > 0 || map.s_flow[map.mesh.s_opposite_s(s)] > 0)
        && !map.r_water[r0] && !map.r_water[r1])) {
        const flow = 2 * Math.sqrt(map.s_flow[s]);
        rivers.push([[...pos2, adjustHeight(map.t_elevation[t1]), flow], [...pos3, adjustHeight(map.t_elevation[t2]), flow]]);
    }
    pos1[0] = pos1[0] / 512.0 - 1.0;
    pos1[1] = pos1[1] / 512.0 - 1.0;
    pos2[0] = pos2[0] / 512.0 - 1.0;
    pos2[1] = pos2[1] / 512.0 - 1.0;
    pos3[0] = pos3[0] / 512.0 - 1.0;
    pos3[1] = pos3[1] / 512.0 - 1.0;
    triangles.push({
        color,
        positions: [
            [...pos1, adjustHeight(map.r_elevation[r])],
            [...pos2, adjustHeight(map.t_elevation[t1])],
            [...pos3, adjustHeight(map.t_elevation[t2])],
        ]
    });
}
function adjustHeight(height: number) {
    // return smoothstep(-1.0, 1.0, Math.pow(height, 3)) * 2 - 1;
    return Math.pow(height, 3) / 2;
    // return height;
}

// }
// for (let i = 0; i < gridSize; i++) {
//     for (let j = 0; j < gridSize; j++) {
//         const pointA: [number, number] = [i * spacing, j * spacing];
//         const pointB: [number, number] = [(i + 1) * spacing, j * spacing];
//         const pointC: [number, number] = [(i + 1) * spacing, (j + 1) * spacing];
//         const pointD: [number, number] = [i * spacing, (j + 1) * spacing];
//         const heights: Tuple<number, 3> = [0, 0, 0];
//         const color: BiomeColor = [127, 0, 127];
//         const color1: Tuple<number, 3> = [0, 127, 0];
//         triangles.push({
//             positions: [pointA, pointB, pointC],
//             heights,
//             color,
//         });
//         triangles.push({
//             positions: [pointA, pointC, pointD],
//             heights,
//             color: color1,
//         });
//     }
// }


export {
    rivers,
    triangles,
    heightData,
    BiomeColor
}