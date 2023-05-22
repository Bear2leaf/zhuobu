import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TextRenderer from "../renderer/TextRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";

export default class RendererFactory {
    private readonly gl: WebGL2RenderingContext;
    private readonly textCache: Map<string, string>;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        this.gl = gl;
        this.textCache = textCache;
    }
    createPointRenderer() {
        return new PointRenderer(this.gl, this.textCache);
    }
    createSpriteRenderer() {
        return new SpriteRenderer(this.gl, this.textCache)
    }
    createTextRenderer() {
        return new TextRenderer(this.gl, this.textCache)
    }
    createLineRenderer() {
        return new LineRenderer(this.gl, this.textCache)
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer(this.gl, this.textCache)
    }
    createGLTFSkinMeshRenderer() {
        return new GLTFSkinMeshRenderer(this.gl, this.textCache)
    }
    createMainRenderer() {
        return new TriangleRenderer(this.gl, this.textCache)
    }
}