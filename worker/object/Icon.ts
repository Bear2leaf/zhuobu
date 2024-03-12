import Map, { BiomeColor } from "../map/Map.js";
import SeedableRandom from "../util/SeedableRandom.js";

export default class Icon {
    private readonly scales: number[] = []
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    private readonly rng = new SeedableRandom(1)
    private readonly colorRNG = new SeedableRandom(1)
    private readonly textureSize: number = 512;
    private readonly tileSize: number = 64;
    constructor() {
        this.scales = [
        ];
        this.vertices = [
        ];
        this.colors = [
        ]
    }
    static create(map: Map) {
        const object = new Icon();
        object.generatePoints(map, 500);
        return object;
    }
    generatePoints(map: Map, count: number) {
        this.scales.splice(0, this.scales.length);
        this.vertices.splice(0, this.vertices.length);
        this.colors.splice(0, this.colors.length);
        for (let index = 0; index < count; index++) {
            const r = parseInt((this.rng.nextFloat() * map.mesh.numRegions).toFixed())
            this.generatePointByRegion(map, r);
        }
    }
    generatePointByRegion(map: Map, r: number) {
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
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            { name: "u_size", type: "1f", value: [this.tileSize] },
        ];
    }
}