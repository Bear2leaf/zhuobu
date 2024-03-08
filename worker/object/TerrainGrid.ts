import Water from "./Water.js";

export default class TerrainGrid extends Water {
    static create() {
        return new TerrainGrid();
    }
    getAttributes(): {
        object: string
        name: string;
        type: GLType;
        value: number[];
        size: number;
    }[] {
        return super.getAttributes().map(a => { a.object = "terrain"; return a; });
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "Matrix4fv"; value: number[]; }[] {
        return [
        ]
    }
}