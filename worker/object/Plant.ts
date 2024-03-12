import Map, { BiomeColor } from "../map/Map.js";
import SeedableRandom from "../util/SeedableRandom.js";

export default class Plant {
    private readonly translations: number[] = []
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    private readonly rng = new SeedableRandom(1)
    constructor() {
        this.translations = [
        ];
        this.colors = [
        ]

        const size = 0.01;
        const k = size / 2;

        this.vertices = [
            -1, -1,  -1,
            -1,  1,  -1,
             1, -1,  -1,
            -1,  1,  -1,
             1,  1,  -1,
             1, -1,  -1,
        
            -1, -1,   1,
             1, -1,   1,
            -1,  1,   1,
            -1,  1,   1,
             1, -1,   1,
             1,  1,   1,
        
            -1,   1, -1,
            -1,   1,  1,
             1,   1, -1,
            -1,   1,  1,
             1,   1,  1,
             1,   1, -1,
        
            -1,  -1, -1,
             1,  -1, -1,
            -1,  -1,  1,
            -1,  -1,  1,
             1,  -1, -1,
             1,  -1,  1,
        
            -1,  -1, -1,
            -1,  -1,  1,
            -1,   1, -1,
            -1,  -1,  1,
            -1,   1,  1,
            -1,   1, -1,
        
             1,  -1, -1,
             1,   1, -1,
             1,  -1,  1,
             1,  -1,  1,
             1,   1, -1,
             1,   1,  1,
        
            ].map(v => v * k);

            this.colors.push(1, 0, 0);
    }
    static create(map: Map) {
        const object = new Plant();
        object.generatePoints(map, 500);
        return object;
    }
    generatePoints(map: Map, count: number) {
        this.translations.splice(0, this.translations.length);
        for (let index = 0; index < count; index++) {
            const r = parseInt((this.rng.nextFloat() * map.mesh.numRegions).toFixed())
            this.generatePointByRegion(map, r);
        }
    }
    generatePointByRegion(map: Map, r: number) {
        const elevation = map.r_elevation[r];
        const x = map.mesh.r_x(r);
        const y = map.mesh.r_y(r);
        const translations: number[] = this.translations;
        translations.push(x / 500 - 1);
        translations.push(elevation / 8);
        translations.push(y / 500 - 1);
    }
    getAttributes(): {
        object: string
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
        divisor?: number;
    }[] {
        return [
            { object: "plant", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "plant", name: "a_translation", type: "FLOAT", value: this.translations, size: 3, divisor: 1 },
            { object: "plant", name: "a_color", type: "FLOAT", value: this.colors, size: 3, divisor: this.translations.length / 3 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
        ];
    }
    getInstanceCount() {
        return this.translations.length / 3;
    }
}