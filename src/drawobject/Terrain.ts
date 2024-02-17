import Program from "../program/Program.js";
import Drawobject from "./Drawobject.js";


enum Edge {
    NONE = 0,
    TOP = 1,
    LEFT = 2,
    BOTTOM = 4,
    RIGHT = 8,
};

export default class Terrain extends Drawobject {
    private readonly scales: number[] = [];
    private readonly offsets: number[] = [];
    private readonly edges: number[] = [];
    static create(context: WebGL2RenderingContext) {
        return new Terrain(context.createVertexArray()!);
    }
    init(context: WebGL2RenderingContext, program: Program) {

        this.initGridTiles();
        const vertices: number[] = [];
        const TILE_RESOLUTION = 64;
        for (let i = 0; i < TILE_RESOLUTION; i++) {
            for (let j = 0; j < TILE_RESOLUTION; j++) {
                const x0 = i / TILE_RESOLUTION;
                const x1 = (i + 1) / TILE_RESOLUTION;
                const z0 = j / TILE_RESOLUTION;
                const z1 = (j + 1) / TILE_RESOLUTION;
                vertices.push(
                    x0, 0, z0,
                    x1, 0, z0,
                    x1, 0, z1,
                    x1, 0, z1,
                    x0, 0, z1,
                    x0, 0, z0,
                );
            }
        }
        program.active(context);
        this.bind(context);
        program.updateTerrainFBOUniforms(context, this.edges, this.scales, this.offsets);
        this.createAttribute(context, program, "a_position", new Float32Array(vertices), context.FLOAT, 3);
        this.unbind(context);
        program.deactive(context);
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
        this.instanceCount++;
        this.scales.push(scale);
        this.offsets.push(x, y);
        this.edges.push(edge);

    }
}