
enum Edge {
    NONE = 0,
    TOP = 1,
    LEFT = 2,
    BOTTOM = 4,
    RIGHT = 8,
};
export default class CdlodGrid {
    private readonly vertices: number[] = [];
    private readonly scales: number[] = [];
    private readonly offsets: number[] = [];
    private readonly edges: number[] = [];
    private readonly resolution = 64;
    static create() {
        const grid = new CdlodGrid();
        grid.initGridTiles();
        const vertices: number[] = grid.vertices;
        const resolution = grid.resolution;
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const x0 = i / resolution;
                const x1 = (i + 1) / resolution;
                const z0 = j / resolution;
                const z1 = (j + 1) / resolution;
                vertices.push(
                    x0, 0, z1,
                    x1, 0, z1,
                    x1, 0, z0,
                    x1, 0, z0,
                    x0, 0, z0,
                    x0, 0, z1,
                );
            }
        }
        return grid;
    }
    initGridTiles() {
        const TILE_LEVEL = 4;
        let initialScale = 1 / Math.pow(2, TILE_LEVEL);

        // Create center layer first
        //    +---+---+
        //    | O | O |
        //    +---+---+
        //    | O | O |
        //    +---+---+
        this.createTile(-initialScale, -initialScale, initialScale, Edge.NONE);
        this.createTile(-initialScale, 0, initialScale, Edge.NONE);
        this.createTile(0, 0, initialScale, Edge.NONE);
        this.createTile(0, -initialScale, initialScale, Edge.NONE);
        // Create "quadtree" of tiles, with smallest in center
        // Each added layer consists of the following tiles (marked 'A'), with the tiles
        // in the middle being created in previous layers
        // +---+---+---+---+
        // | A | A | A | A |
        // +---+---+---+---+
        // | A |   |   | A |
        // +---+---+---+---+
        // | A |   |   | A |
        // +---+---+---+---+
        // | A | A | A | A |
        // +---+---+---+---+
        for (let scale = initialScale; scale < 1; scale *= 2) {
            this.createTile(-2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT);

            this.createTile(-2 * scale, -scale, scale, Edge.LEFT);
            this.createTile(-2 * scale, 0, scale, Edge.LEFT);
            this.createTile(-2 * scale, scale, scale, Edge.TOP | Edge.LEFT);

            this.createTile(-scale, -2 * scale, scale, Edge.BOTTOM);

            // 2 tiles 'missing' here are in previous layer
            this.createTile(-scale, scale, scale, Edge.TOP);

            this.createTile(0, -2 * scale, scale, Edge.BOTTOM);
            // 2 tiles 'missing' here are in previous layer
            this.createTile(0, scale, scale, Edge.TOP);

            this.createTile(scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT);

            this.createTile(scale, -scale, scale, Edge.RIGHT);
            this.createTile(scale, 0, scale, Edge.RIGHT);
            this.createTile(scale, scale, scale, Edge.TOP | Edge.RIGHT);
        }
    }
    createTile(x: number, y: number, scale: number, edge: Edge) {
        this.scales.push(scale);
        this.offsets.push(x, y);
        this.edges.push(edge);

    }
    getAttributes(): {
        name: string;
        type: GLType;
        value: number[];
        size: number;
        divisor?: number;
    }[] {
        return [
            { name: "a_position", type: "FLOAT", value: this.vertices, size: 3 },
            { name: "a_scale", type: "FLOAT", value: this.scales, size: 1, divisor: 1 },
            { name: "a_offset", type: "FLOAT", value: this.offsets, size: 2, divisor: 1 },
            { name: "a_edge", type: "INT", value: this.edges, size: 1, divisor: 1 },
        ]
    }
    getUniforms(): { name: string; type: "1iv" | "1i" | "1f" | "2fv" | "3fv" | "Matrix4fv"; value: number[]; }[] {
        return [
            {
                name: "u_model", type: "Matrix4fv", value: [

                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, -0.02, 0, 1
                ]
            },
            { name: "u_texture", type: "1i", value: [0] },
            { name: "u_textureDepth", type: "1i", value: [1] },
            { name: "u_textureNormal", type: "1i", value: [2] },
            { name: "u_resolution", type: "1f", value: [this.resolution] },
        ]
    }
    getInstanceCount() {
        return this.scales.length;
    }
}