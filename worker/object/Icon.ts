import Island from "../island/Island.js";
import SeedableRandom from "../util/SeedableRandom.js";

export default class Icon {
    private readonly scales: number[] = []
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    private readonly colorRNG = new SeedableRandom(1)
    private readonly textureSize: number = 64;
    private readonly tileSize: number = 16;
    private readonly scale = 50;
    constructor() {
        this.scales = [
        ];
        this.vertices = [
        ];
        this.colors = [
        ];
    }
    static create(island: Island) {
        const object = new Icon();
        object.vertices.push(...island.positions);
        for (let index = 0; index < object.vertices.length / 3; index++) {
            object.scales.push(object.scale)
            const frames = Math.floor(object.textureSize / object.tileSize);
            object.colors.push(
                0
                , Math.floor(object.colorRNG.nextFloat() * frames)
                , 0
                , frames
            );
            
        }
        return object;
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
    getRandomAttributes(island: Island): {
        object: string
        name: string;
        start: number;
        value: number[];
    }[] {
        const oldvertices = this.vertices.slice();
        island.updateVertices(this.vertices);
        return [
            {
                object: "icon.feedback", name: "a_position", start: 0, value: oldvertices,
            },
            {
                object: "icon.feedback", name: "a_positionTo", start: 0, value: this.vertices,
            },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            { name: "u_size", type: "1f", value: [this.tileSize] },
        ];
    }
}