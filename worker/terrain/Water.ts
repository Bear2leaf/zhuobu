
export default class Water {
    private readonly vertices: number[] = []
    constructor() {
        this.vertices = [
            -1, 0, 1,
            1, 0, 1,
            1, 0, -1,
            1, 0, -1,
            -1, 0, -1,
            -1, 0, 1
        ];
    }
    static create() {
        const object = new Water();
        return object;
    }
    getAttributes(): {
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
    }[] {
        return [
            { name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            {
                name: "u_model", type: "Matrix4fv", value: [

                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ],
            },
            { name: "u_textureRefract", type: "1i", value: [0] },
            { name: "u_textureReflect", type: "1i", value: [1] },
        ]
    }
}