import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import CacheManager from "../manager/CacheManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Renderer from "../renderer/Renderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";

export default class DebugSystem {
    private readonly lineRenderer: LineRenderer;
    private readonly xyzAxis: Node;
    private readonly frustumCube: Node;
    private readonly cameraCube: Node;
    private readonly lenCone: Node;
    private readonly upCube: Node;
    private readonly debugCamera: PerspectiveCamera;
    constructor(factoryManager: FactoryManager, gl: RenderingContext, cacheManager: CacheManager, texture: Texture) {
        const cameraFactory = factoryManager.getCameraFactory();
        const rendererFactory = factoryManager.getRendererFactory();
        const drawObjectFactory = factoryManager.getDrawObjectFactory();

        this.lineRenderer = rendererFactory.createLineRenderer(factoryManager, gl, cacheManager);

        this.debugCamera = cameraFactory.createDebugCamera(gl.getCanvasWidth(), gl.getCanvasHeight());
        this.xyzAxis = drawObjectFactory.createColorArrowLine(gl, texture);
        this.frustumCube = drawObjectFactory.createBlackWireCube(gl, texture) ; 
        this.cameraCube = drawObjectFactory.createBlackWireCube(gl, texture); 
        this.lenCone = drawObjectFactory.createBlackWireCone(gl, texture);
        this.upCube = drawObjectFactory.createBlackWireCube(gl, texture);
        this.debugCamera.lookAtInverse(new Vec3(5, 5, 10), new Vec3(0, 0, -10), new Vec3(0, 1, 0));
    }
    renderCamera(mainCamera: PerspectiveCamera): void {
        this.frustumCube.updateWorldMatrix(mainCamera.getFrustumTransformMatrix())
        this.cameraCube.updateWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.lenCone.updateWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.upCube.updateWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)))
        this.lineRenderer.render(this.debugCamera, this.frustumCube)
        this.lineRenderer.render(this.debugCamera, this.cameraCube)
        this.lineRenderer.render(this.debugCamera, this.lenCone)
        this.lineRenderer.render(this.debugCamera, this.upCube)
    }
    render(node: Node, renderer: Renderer): void {
        renderer.render(this.debugCamera, node);
        this.xyzAxis.updateWorldMatrix(node.getWorldMatrix())
        this.lineRenderer.render(this.debugCamera, this.xyzAxis)
    }
}