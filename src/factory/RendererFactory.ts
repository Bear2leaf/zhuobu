import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Factory from "./Factory.js";
import CacheManager from "../manager/CacheManager.js";

export default class RendererFactory implements Factory {
    constructor(private readonly gl: RenderingContext, private readonly cacheManager: CacheManager) {

    }
    createPointRenderer() {
        return new PointRenderer(this.makeShader("Point"), this.gl.makePrimitive(PrimitiveType.POINTS));
    }
    createSpriteRenderer() {
        this.gl.useBlendFuncOneAndOneMinusSrcAlpha();
        return new SpriteRenderer(this.makeShader("Sprite"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createLineRenderer() {
        return new LineRenderer(this.makeShader("Line"), this.gl.makePrimitive(PrimitiveType.LINES))
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer(this.makeShader("Mesh"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createGLTFSkinMeshRenderer() {
        return new GLTFSkinMeshRenderer(this.makeShader("SkinMesh"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createMainRenderer() {
        return new TriangleRenderer(this.makeShader("VertexColorTriangle"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    private makeShader(name: string) {
        const vert = this.cacheManager.getVertShaderTxt(name);
        const frag = this.cacheManager.getFragShaderTxt(name);
        return this.gl.makeShader(vert, frag);
    }
}