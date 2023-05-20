import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/MeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TextRenderer from "../renderer/TextRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";

export default class RendererFactory {
    private readonly fontCache: Map<string, any>;
    private readonly gl: WebGL2RenderingContext;
    private readonly textCache: Map<string, string>;
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>, fontCache: Map<string, any>) {
        this.gl = gl;
        this.fontCache = fontCache;
        this.textCache = textCache;
    }
    createPointRenderer() {
        return new PointRenderer(this.gl, this.textCache);
    }
    createSpriteRenderer() {
        return new SpriteRenderer(this.gl, this.textCache)
    }
    createTextRenderer() {
        const fontInfo = this.fontCache.get("resource/font/boxy_bold_font.json");
        if (!fontInfo) {
            throw new Error("fontInfo not exist")
        }
        return new TextRenderer(this.gl, this.textCache, fontInfo)
    }
    createLineRenderer() {
        return new LineRenderer(this.gl, this.textCache)
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer(this.gl, this.textCache)
    }
    createMainRenderer() {
        return new TriangleRenderer(this.gl, this.textCache)
    }
}