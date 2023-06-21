import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export default class RendererFactory {
    private readonly gl: RenderingContext;
    constructor(gl: RenderingContext) {
        this.gl = gl;
    }
    createPointRenderer() {
        return new PointRenderer(this.gl);
    }
    createSpriteRenderer() {
        return new SpriteRenderer(this.gl)
    }
    createLineRenderer() {
        return new LineRenderer(this.gl)
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer(this.gl)
    }
    createGLTFSkinMeshRenderer() {
        return new GLTFSkinMeshRenderer(this.gl)
    }
    createMainRenderer() {
        return new TriangleRenderer(this.gl)
    }
}