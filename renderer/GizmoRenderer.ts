import Camera, { PerspectiveCamera } from "../Camera.js";
import { device } from "../device/Device.js";
import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import DrawObject from "../drawobject/DrawObject.js";
import Point from "../geometry/Point.js";
import { Vec4 } from "../math/Vector.js";
import { LineRenderer } from "./LineRenderer.js";
import { TriangleRenderer } from "./TriangleRenderer.js";

export class DebugRenderer extends TriangleRenderer {
    private readonly lineRenderer: LineRenderer;
    private readonly xyzAxis: ColorArrowLine;
    private readonly frustumCube: BlackWireCube;
    private readonly cameraCube: BlackWireCube;
    private readonly lenCone: BlackWireCone;
    private readonly upCube: BlackWireCube;
    private readonly mainCamera: PerspectiveCamera;
    constructor(lineRenderer: LineRenderer, mainCamera: PerspectiveCamera) {
        super()
        this.lineRenderer = lineRenderer;
        this.mainCamera = mainCamera;
        this.xyzAxis = new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5));
        this.frustumCube = new BlackWireCube();
        this.cameraCube = new BlackWireCube();
        this.lenCone = new BlackWireCone();
        this.upCube = new BlackWireCube();
    }
    renderCamera(camera: Camera): void {
        this.frustumCube.setWorldMatrix(this.mainCamera.getFrustumTransformMatrix())
        this.cameraCube.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.lenCone.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
        this.upCube.setWorldMatrix(this.mainCamera.getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)))
        this.lineRenderer.render(camera, this.frustumCube)
        this.lineRenderer.render(camera, this.cameraCube)
        this.lineRenderer.render(camera, this.lenCone)
        this.lineRenderer.render(camera, this.upCube)
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);
        this.xyzAxis.getNode().updateWorldMatrix(drawObject.getNode().getWorldMatrix())
        this.lineRenderer.render(camera, this.xyzAxis)
    }
}