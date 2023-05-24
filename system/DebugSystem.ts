import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import device, { ViewPortType } from "../device/Device.js";
import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import DrawObject from "../drawobject/DrawObject.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Renderer from "../renderer/Renderer.js";
import Node from "../structure/Node.js";

export default class DebugSystem {
    private readonly lineRenderer: LineRenderer;
    private readonly xyzAxis: Node;
    private readonly frustumCube: Node;
    private readonly cameraCube: Node;
    private readonly lenCone: Node;
    private readonly upCube: Node;
    private readonly debugCamera: PerspectiveCamera;
    constructor(cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {

        this.lineRenderer = rendererFactory.createLineRenderer();

        this.debugCamera = cameraFactory.createDebugCamera();
        this.xyzAxis = drawObjectFactory.createColorArrowLine();
        this.frustumCube = drawObjectFactory.createBlackWireCube() ; 
        this.cameraCube = drawObjectFactory.createBlackWireCube(); 
        this.lenCone = drawObjectFactory.createBlackWireCone();
        this.upCube = drawObjectFactory.createBlackWireCube();
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