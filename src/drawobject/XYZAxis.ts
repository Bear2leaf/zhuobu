import LineSegment from "../math/LineSegment.js";
import { Vec4, flatten } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import Point from "../math/Point.js";

export default class XYZAxis extends DrawObject {
    init() {
        const from = new Point();
        const to = new Point(1, 0, 0);
        const others: Point[] = [
            new Point(0, 0, 0),
            new Point(0, 1, 0),
            new Point(0, 0, 0),
            new Point(0, 0, 1)
        ];
        const line = new LineSegment(from, to);
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        line.appendTo(vertices, colors, indices);
        let otherLineVertCount = 0;
        if (others.length > 0) {
            if (others.length % 2 !== 0) {
                throw new Error("The number of points must be even.");
            }
            for (let i = 0; i < others.length; i += 2) {
                const otherLine = new LineSegment(others[i], others[i + 1]);
                otherLine.appendTo(vertices, colors, indices);
                otherLineVertCount += 2;
            }
        }
        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        
        this.updateEBO(new Uint16Array(indices));
    }
    update(): void {
        
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
}

