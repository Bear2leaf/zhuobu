import { flatten, Vec3, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import Map from "../map/Map.js";
import TriangleMesh from "../map/TriangleMesh.js";
import MeshBuilder from "../map/create.js";
import PoissonDiskSampling from "../poisson/index.js";
import { createNoise2D } from "../map/simplex-noise.js";
import SeedableRandom from "../map/SeedableRandom.js";


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

export default class TerrainDepth extends DrawObject {
    private depthTexture?: Texture;
    private readonly spacing = 16;
    private readonly distanceRNG = new SeedableRandom(40);
    private readonly simplex = { noise2D: createNoise2D(() => this.distanceRNG.nextFloat()) };
    private readonly rng = new SeedableRandom(25);
    private readonly map = new Map(new TriangleMesh(new MeshBuilder({ boundarySpacing: this.spacing }).addPoisson(PoissonDiskSampling, this.spacing, () => this.rng.nextFloat()).create()), {
        amplitude: 0.5,
        length: 4,
    }, () => (N) => Math.round(this.rng.nextFloat() * N));
    setDepthTexture(texture: Texture) {
        this.depthTexture = texture;
    }
    getDepthTexture() {
        if (!this.depthTexture) {
            throw new Error("depthTexture is not set");
        }
        return this.depthTexture;
    }
    initContextObjects() {
        super.initContextObjects();
        this.map.calculate({
            noise: this.simplex,
            shape: { round: 0.5, inflate: 0.3, amplitudes: [1 / 3, 1 / 4, 1 / 8, 1 / 16] },
            numRivers: 20,
            drainageSeed: 0,
            riverSeed: 0,
            noisyEdge: { length: 10, amplitude: 0.2, seed: 0 },
            biomeBias: { north_temperature: 0, south_temperature: 0, moisture: 0 },
        })
        const vertices: Vec4[] = []
        const colors: Vec4[] = []
        const indices: number[] = []
        const normals: Vec4[] = []

        const map = this.map;
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
            // const r0 = map.mesh.s_begin_r(s),
            //     r1 = map.mesh.s_end_r(s);
            // if (((map.s_flow[s] > 0 || map.s_flow[map.mesh.s_opposite_s(s)] > 0)
            //     && !map.r_water[r0] && !map.r_water[r1])) {
            //     const flow = 2 * Math.sqrt(map.s_flow[s]);
            //     rivers.push([[...pos2, adjustHeight(map.t_elevation[t1]), flow], [...pos3, adjustHeight(map.t_elevation[t2]), flow]]);
            // }
            pos1[0] = pos1[0] / 512.0 - 1.0;
            pos1[1] = pos1[1] / 512.0 - 1.0;
            pos2[0] = pos2[0] / 512.0 - 1.0;
            pos2[1] = pos2[1] / 512.0 - 1.0;
            pos3[0] = pos3[0] / 512.0 - 1.0;
            pos3[1] = pos3[1] / 512.0 - 1.0;
            vertices.push(new Vec3(...pos1, this.adjustHeight(map.r_elevation[r])));
            vertices.push(new Vec3(...pos2, this.adjustHeight(map.t_elevation[t1])));
            vertices.push(new Vec3(...pos3, this.adjustHeight(map.t_elevation[t2])));
            colors.push(new Vec3(...[
                color >> 16
                , color >> 8
                , color
            ].map(x => (x & 0xff) / 255)));
            colors.splice(colors.length, 0, ...colors.slice(colors.length - 1, colors.length))
            colors.splice(colors.length, 0, ...colors.slice(colors.length - 1, colors.length))
            indices.push(s * 3);
            indices.push(s * 3 + 1);
            indices.push(s * 3 + 2);
        }
        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 3);
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 3);
        this.updateEBO(new Uint16Array(indices));
        this.updateMaterial();
    }
    adjustHeight(height: number) {

        // return smoothstep(-1.0, 1.0, Math.pow(height, 3));
        // return Math.pow(height, 3);
        return height;
    }
}