
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
        object: string
        name: string;
        type?: "FLOAT";
        value: number[];
        size?: number;
    }[] {
        return [
            { object: "sky", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "4fv" | "Matrix4fv"; value: number[]; }[] {
        const up = [0, 1, 0];

        return [
            { name: "rayleigh", type: "1f", value: [5.5] },
            { name: "turbidity", type: "1f", value: [2] },
            { name: "exposure", type: "1f", value: [0.4] },
            { name: "mieCoefficient", type: "1f", value: [0.005] },
            { name: "mieDirectionalG", type: "1f", value: [0.8] },
            { name: "u_up", type: "3fv", value: up },
            { name: "u_cameraPosition", type: "3fv", value: [0, 0, 0.5] },
            { name: "sunPosition", type: "3fv", value: [0, 1, 2] },
        ]
    }
}