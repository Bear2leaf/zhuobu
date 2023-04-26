import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import { ViewPortType, device } from "../device/Device.js";
import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import DrawObject from "../drawobject/DrawObject.js";
import Point from "../geometry/Point.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";

export class DebugSystem {
    private readonly lineRenderer: LineRenderer;
    private readonly mainRenderer: TriangleRenderer;
    private readonly xyzAxis: ColorArrowLine;
    private readonly frustumCube: BlackWireCube;
    private readonly cameraCube: BlackWireCube;
    private readonly lenCone: BlackWireCone;
    private readonly upCube: BlackWireCube;
    private readonly mainCamera: PerspectiveCamera;
    private readonly debugCamera: PerspectiveCamera;
    constructor(mainRenderer: TriangleRenderer, mainCamera: PerspectiveCamera, debugCamera: PerspectiveCamera) {
        this.mainRenderer = mainRenderer;
        this.lineRenderer = new LineRenderer();
        this.mainCamera = mainCamera;
        this.debugCamera = debugCamera;
        this.xyzAxis = new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5));
        this.frustumCube = new BlackWireCube();
        this.cameraCube = new BlackWireCube();
        this.lenCone = new BlackWireCone();
        this.upCube = new BlackWireCube();
        this.debugCamera.lookAtInverse(new Vec3(5, 5, 10), new Vec3(0, 0, -10), new Vec3(0, 1, 0));
    }
    renderCamera(): void {
        device.viewportTo(ViewPortType.TopRight)
        device.clearRenderer();
        this.frustumCube.setWorldMatrix(this.mainCamera.getFrustumTransformMatrix())
        this.cameraCube.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.lenCone.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.upCube.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)))
        this.lineRenderer.render(this.debugCamera, this.frustumCube)
        this.lineRenderer.render(this.debugCamera, this.cameraCube)
        this.lineRenderer.render(this.debugCamera, this.lenCone)
        this.lineRenderer.render(this.debugCamera, this.upCube)
    }
    render(drawObject: DrawObject): void {
        this.mainRenderer.render(this.debugCamera, drawObject);
        this.xyzAxis.getNode().updateWorldMatrix(drawObject.getNode().getWorldMatrix())
        this.lineRenderer.render(this.debugCamera, this.xyzAxis)
    }
}