import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import device, { ViewPortType } from "../device/Device.js";
import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import DrawObject from "../drawobject/DrawObject.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import Point from "../geometry/Point.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Renderer from "../renderer/Renderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";

export class DebugSystem {
    private readonly lineRenderer: LineRenderer;
    private readonly xyzAxis: ColorArrowLine;
    private readonly frustumCube: BlackWireCube;
    private readonly cameraCube: BlackWireCube;
    private readonly lenCone: BlackWireCone;
    private readonly upCube: BlackWireCube;
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
        device.viewportTo(ViewPortType.TopRight)
        device.clearRenderer();
        this.frustumCube.setWorldMatrix(mainCamera.getFrustumTransformMatrix())
        this.cameraCube.setWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.lenCone.setWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.upCube.setWorldMatrix(mainCamera.getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)))
        this.lineRenderer.render(this.debugCamera, this.frustumCube)
        this.lineRenderer.render(this.debugCamera, this.cameraCube)
        this.lineRenderer.render(this.debugCamera, this.lenCone)
        this.lineRenderer.render(this.debugCamera, this.upCube)
    }
    render(drawObject: DrawObject, renderer: Renderer): void {
        renderer.render(this.debugCamera, drawObject);
        this.xyzAxis.getNode().updateWorldMatrix(drawObject.getNode().getWorldMatrix())
        this.lineRenderer.render(this.debugCamera, this.xyzAxis)
    }
}