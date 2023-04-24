import Camera from "../Camera.js";
import { device } from "../device/Device.js";
import DrawObject from "../drawobject/DrawObject.js";
import XYZAxis from "../drawobject/XYZAxis.js";
import { LineRenderer } from "./LineRenderer.js";
import { TriangleRenderer } from "./TriangleRenderer.js";

export class GizmoRenderer extends TriangleRenderer {
    private readonly lineRenderer: LineRenderer;
    private readonly xyzAxis: XYZAxis;
    constructor(lineRenderer: LineRenderer) {
        super()
        this.lineRenderer = lineRenderer;
        this.xyzAxis = new XYZAxis();
    }
    render(camera: Camera, drawObject: DrawObject): void {
        super.render(camera, drawObject);
        drawObject.draw(device.gl.TRIANGLES);
        this.xyzAxis.render(camera, this.lineRenderer, drawObject.getNode().getWorldMatrix());
    }
}