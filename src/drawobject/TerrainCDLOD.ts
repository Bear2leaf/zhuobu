import { PrimitiveType } from "../contextobject/Primitive.js";
import { Tuple } from "../map/util.js";
import TerrainCDLODRenderer from "../renderer/TerrainCDLODRenderer.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import DrawObject from "./DrawObject.js";

enum Edge {
    NONE = 0,
    TOP = 1,
    LEFT = 2,
    BOTTOM = 4,
    RIGHT = 8,
};
export default class TerrainCDLOD extends DrawObject {
    private depthTexture?: Texture;
    setDepthTexture(texture: Texture) {
        this.depthTexture = texture;
    }
    getDepthTexture() {
        if (!this.depthTexture) {
            throw new Error("depthTexture is not set");
        }
        return this.depthTexture;
    }
    initContextObjects(): void {
        super.initContextObjects();
        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES))
    }
    private readonly TILE_RESOLUTION = 64;
    private readonly TILE_LEVEL = 4;
    private tiles: number = 0;
    private scales: number[] = [];
    private offsets: Tuple<number, 2>[] = [];
    private edges: Edge[] = [];
    drawByRenderer(renderer: TerrainCDLODRenderer) {
        const perspective: Tuple<number, 4> = [Math.PI / 4, 1, 0.01, 100];
        const up: Tuple<number, 3> = [0, 1, 0];
        const target: Tuple<number, 3> = [0, 0, 0];
        // const eye: Tuple<number, 3> = [0 , 0.0, -1 ];
        const eye: Tuple<number, 3> = [1, 0.5, 1];
        this.updatePerspective(renderer, ...perspective);
        this.updateLookAt(renderer, eye, target, up);
        renderer.getShader().updateUniform("u_resolution", this.TILE_RESOLUTION);
        renderer.getShader().updateUniform("u_lightDirection", [1, 1, 1]);
        this.getTexture().active();
        this.getTexture().bind();
        renderer.getShader().updateUniform("u_texture", this.getTexture().getBindIndex());
        this.getDepthTexture().active();
        this.getDepthTexture().bind();
        renderer.getShader().updateUniform("u_texture7", this.getDepthTexture().getBindIndex());
        const model: Tuple<number, 16> = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        renderer.getShader().updateUniform("u_model", model);
        const context = this.getRenderingContext();
        context.clear();
        this.bind();
        for (let i = 0; i < this.tiles; i++) {
            const scale = this.scales[i];
            const offset = this.offsets[i];
            const edge = this.edges[i];
            renderer.getShader().updateUniform("u_scale", scale);
            renderer.getShader().updateUniform("u_offset", offset);
            renderer.getShader().updateUniform("u_edge", edge);
            this.draw();

            // context.drawArrays(context.LINES, 0, this.TILE_RESOLUTION * this.TILE_RESOLUTION * 6);
        }

    }
    updateLookAt(renderer: TerrainCDLODRenderer, eye: Tuple<number, 3>, target: Tuple<number, 3>, up: Tuple<number, 3>) {
        renderer.getShader().updateUniform("u_up", up);
        renderer.getShader().updateUniform("u_eye", eye);
        renderer.getShader().updateUniform("u_target", target);
    }
    updatePerspective(renderer: TerrainCDLODRenderer, fov: number, aspect: number, near: number, far: number) {
        renderer.getShader().updateUniform("u_perspective", [fov, aspect, near, far]);
    }
    updateLightDirection(renderer: TerrainCDLODRenderer, lightDirection: Tuple<number, 3>) {
        renderer.getShader().updateUniform("u_lightDirection", lightDirection);
    }
    createBuffers() {
        const subdivided: number[] = [];
        const colors: number[] = [];
        const indices: number[] = [];
        for (let i = 0; i < this.TILE_RESOLUTION; i++) {
            for (let j = 0; j < this.TILE_RESOLUTION; j++) {
                const x0 = i / this.TILE_RESOLUTION;
                const x1 = (i + 1) / this.TILE_RESOLUTION;
                const z0 = j / this.TILE_RESOLUTION;
                const z1 = (j + 1) / this.TILE_RESOLUTION;
                subdivided.push(
                    x0, 0, z0,
                    x0, 0, z1,
                    x1, 0, z1,
                    x1, 0, z1,
                    x1, 0, z0,
                    x0, 0, z0,
                );
                colors.push(
                    1, 1, 1,
                    1, 1, 1,
                    1, 1, 1,
                    1, 1, 1,
                    1, 1, 1,
                    1, 1, 1,
                )

                indices.push((i * this.TILE_RESOLUTION + j) * 6);
                indices.push((i * this.TILE_RESOLUTION + j) * 6 + 1);
                indices.push((i * this.TILE_RESOLUTION + j) * 6 + 2);
                indices.push((i * this.TILE_RESOLUTION + j) * 6 + 3);
                indices.push((i * this.TILE_RESOLUTION + j) * 6 + 4);
                indices.push((i * this.TILE_RESOLUTION + j) * 6 + 5);
            }
        }
        this.bind();
        this.createABO(ArrayBufferIndex.Position, new Float32Array(subdivided), 3);
        this.createABO(ArrayBufferIndex.Color, new Float32Array(colors), 3);
        this.updateEBO(new Uint16Array(indices));
    }
    createTile(x: number, y: number, scale: number, edge: Edge) {
        this.tiles++;
        this.scales.push(scale);
        this.offsets.push([x, y]);
        this.edges.push(edge);

    }
    create() {
        let initialScale = 1 / Math.pow(2, this.TILE_LEVEL);

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
}