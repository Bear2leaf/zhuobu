export default class TerrainGrid {
    private readonly vertices: number[] = [];
    private readonly resolution = 64;
    static create() {
        const grid = new TerrainGrid();
        const vertices: number[] = grid.vertices;
        const resolution = grid.resolution;
        for (let i = -resolution; i < resolution; i++) {
            for (let j = -resolution; j < resolution; j++) {
                const x0 = i / resolution;
                const x1 = (i + 1) / resolution;
                const z0 = j / resolution;
                const z1 = (j + 1) / resolution;
                vertices.push(
                    x0, z1,
                    x1, z1,
                    x1, z0,
                    x1, z0,
                    x0, z0,
                    x0, z1,
                );
            }
        }
        return grid;
    }
    getAttributes(): {
        object: string
        name: string;
        type: GLType;
        value: number[];
        size: number;
        divisor?: number;
    }[] {
        return [
            { object: "terrain", name: "a_position", type: "FLOAT", value: this.vertices, size: 2 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            { name: "u_texture", type: "1i", value: [0] },
            { name: "u_textureNormal", type: "1i", value: [1] },
            { name: "u_textureDepth", type: "1i", value: [2] },
        ]
    }
}