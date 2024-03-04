
export default class Sky {
    private readonly vertices: number[] = []
    constructor() {
        this.vertices = [
            -1.0,  1.0, -1.0,
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
    
            -1.0, -1.0,  1.0,
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0,
    
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
    
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
    
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
    
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0
        ];
    }
    static create() {
        const object = new Sky();
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
        const up = [0, 1, 0];
        const fov = Math.PI / 8;
        const aspect = 1;
        const near = 0.1;
        const far = 1;
        const perspective = [fov, aspect, near, far];

        return [
            {
                name: "u_model", type: "Matrix4fv", value: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]
            },
            { name: "rayleigh", type: "1f", value: [5.5] },
            { name: "turbidity", type: "1f", value: [2] },
            { name: "exposure", type: "1f", value: [0.4] },
            { name: "mieCoefficient", type: "1f", value: [0.005] },
            { name: "mieDirectionalG", type: "1f", value: [0.8] },
            { name: "u_up", type: "3fv", value: up },
            { name: "u_cameraPosition", type: "3fv", value: [0, 0, 0.5] },
            { name: "sunPosition", type: "3fv", value: [0, 1, 2] },
            { name: "u_perspective", type: "4fv", value: perspective },
        ]
    }
}