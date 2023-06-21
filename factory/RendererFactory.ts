import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import ShaderFactory from "./ShaderFactory.js";
import { PrimitiveType } from "../contextobject/Primitive.js";

export default class RendererFactory {
    private readonly gl: RenderingContext;
    private readonly shaderFactory: ShaderFactory;
    constructor(gl: RenderingContext, shaderFactory: ShaderFactory) {
        this.gl = gl;
        this.shaderFactory = shaderFactory;
    }
    createPointRenderer() {
        return new PointRenderer(this.shaderFactory.createShader("Point"), this.gl.makePrimitive(PrimitiveType.POINTS));
    }
    createSpriteRenderer() {
        this.gl.useBlendFuncOneAndOneMinusSrcAlpha();
        return new SpriteRenderer(this.shaderFactory.createShader("Sprite"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createLineRenderer() {
        return new LineRenderer(this.shaderFactory.createShader("Line"), this.gl.makePrimitive(PrimitiveType.LINES))
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer(this.shaderFactory.createShader("Mesh"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createGLTFSkinMeshRenderer() {
        return new GLTFSkinMeshRenderer(this.shaderFactory.createShader("SkinMesh"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createMainRenderer() {
        return new TriangleRenderer(this.shaderFactory.createShader("VertexColorTriangle"), this.gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
}