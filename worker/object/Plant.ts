
export default class Plant {
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    constructor() {
        this.vertices = [
            0, 0.1, 0
        ];
        this.colors = [
            1, 0, 0
        ]
    }
    static create() {
        const object = new Plant();
        return object;
    }
    getAttributes(): {
        object: string
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
    }[] {
        return [
            { object: "plant", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "plant", name: "a_color", type: "FLOAT", value: this.colors, size: 3 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
        ];
    }
}