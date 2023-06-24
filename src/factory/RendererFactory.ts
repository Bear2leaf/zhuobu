import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import ShaderFactory from "./ShaderFactory.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Factory from "./Factory.js";
import FactoryManager from "../manager/FactoryManager.js";
import CacheManager from "../manager/CacheManager.js";

export default class RendererFactory implements Factory {
    createPointRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        return new PointRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "Point"), gl.makePrimitive(PrimitiveType.POINTS));
    }
    createSpriteRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        gl.useBlendFuncOneAndOneMinusSrcAlpha();
        return new SpriteRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "Sprite"), gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createLineRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        return new LineRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "Line"), gl.makePrimitive(PrimitiveType.LINES))
    }
    createGLTFMeshRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        return new GLTFMeshRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "Mesh"), gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createGLTFSkinMeshRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        return new GLTFSkinMeshRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "SkinMesh"), gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
    createMainRenderer(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager) {
        return new TriangleRenderer(factoryManager.getShaderFactory().createShader(gl, cacheManager, "VertexColorTriangle"), gl.makePrimitive(PrimitiveType.TRIANGLES))
    }
}