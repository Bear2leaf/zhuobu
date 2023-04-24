
import Camera from "../Camera.js";
import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import Matrix from "../math/Matrix.js";
import { Vec4, flatten } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import ColorArrowLine from "./ColorArrowLine.js";
import DrawObject from "./DrawObject.js";

export default class XYZAxis {
    private readonly lineX: ColorArrowLine;
    private readonly lineY: ColorArrowLine;
    private readonly lineZ: ColorArrowLine;
    constructor() {
        this.lineX = new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1));
        this.lineY = new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 0), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 1));
        this.lineZ = new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 0), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 1));
    }
    render(camera: Camera, lineRenderer: LineRenderer, worldMatrix: Matrix) {
        this.lineX.getNode().updateWorldMatrix(worldMatrix);
        lineRenderer.render(camera, this.lineX);
        this.lineY.getNode().updateWorldMatrix(worldMatrix);
        lineRenderer.render(camera, this.lineY);
        this.lineZ.getNode().updateWorldMatrix(worldMatrix);
        lineRenderer.render(camera, this.lineZ);
    }

}