import Island from "../island/Island.js";
import IslandMap from "../third/map/Map.js";

export default class Plant {
    private readonly translations: number[] = []
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    constructor() {
        this.translations = [
        ];
        this.colors = [
        ];

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
    static create(island: Island) {
        const object = new Plant();
        object.translations.push(...island.positions);
        return object;
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
    getFeedbackAttributes(): {
        object: string
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
    }[] {
        return [
            { object: "plant.feedback", name: "a_translation", type: "FLOAT", value: this.translations, size: 3 },
            { object: "plant.feedback", name: "a_translationTo", type: "FLOAT", value: this.translations, size: 3 },
        ]
    }
    getRandomAttributes(island: Island): {
        object: string
        name: string;
        start: number;
        value: number[];
    }[] {
        const oldTranslations = this.translations.slice();
        island.updateVertices(this.translations);
        return [
            {
                object: "plant.feedback", name: "a_translation", start: 0, value: oldTranslations,
            },
            {
                object: "plant.feedback", name: "a_translationTo", start: 0, value: this.translations,
            },
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