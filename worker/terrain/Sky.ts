
export default class Sky {
    private readonly vertices: number[] = []
    private readonly indices: number[] = []
    constructor() {
        this.vertices = [
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,
        ];
        this.indices = [
            // cull Front
            0, 1, 2,
            0, 2, 3,
            // cull Back
            6, 5, 4,
            7, 6, 4,
            // cull Top
            3, 2, 6,
            3, 6, 7,
            // cull Bottom
            0, 4, 5,
            0, 5, 1,
            // cull Left
            0, 3, 7,
            0, 7, 4,
            // cull Right
            1, 5, 6,
            1, 6, 2,
        ]
    }
    static create() {
        const object = new Sky();
        const vertices: number[] = object.vertices;
        const indices: number[] = object.indices;
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
            { name: "indices", value: this.indices }
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        const up = [0, 1, 0];
        const fov = Math.PI / 8;
        const aspect = 1;
        const near = 0.1;
        const far = 1;
        const perspective = [fov, aspect, near, far];

        return [
            {
                name: "modelMatrix", type: "Matrix4fv", value: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]
            },
            { name: "rayleigh", type: "1f", value: [5.5] },
            { name: "turbidity", type: "1f", value: [2] },
            { name: "exposure", type: "1f", value: [0.5] },
            { name: "mieCoefficient", type: "1f", value: [0.005] },
            { name: "mieDirectionalG", type: "1f", value: [0.8] },
            { name: "u_up", type: "3fv", value: up },
            { name: "u_eye", type: "3fv", value: [0, 0, 0] },
            { name: "cameraPosition", type: "3fv", value: [0, 0, 0.5] },
            { name: "sunPosition", type: "3fv", value: [0, 1, 5] },
            { name: "u_target", type: "3fv", value: [0, 0, 1] },
            { name: "u_perspective", type: "4fv", value: perspective },
        ]
    }
}