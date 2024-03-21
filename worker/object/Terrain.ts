import Island from "../island/Island.js";

export default class Terrain {
    private readonly vertices: number[] = []
    private readonly colors: number[] = []
    static create(island: Island) {
        const terrain = new Terrain();
        const vertices: number[] = terrain.vertices;
        const colors: number[] = terrain.colors;
        island.initTerrain(vertices, colors);
        return terrain;
    }
    getAttributes(): {
        object: string
        name: string;
        type: "FLOAT";
        value: number[];
        size: number;
    }[] {
        return [
            { object: "terrainFBO", name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { object: "terrainFBO", name: "a_color", type: "FLOAT", value: this.colors, size: 3 }
        ]
    }
}