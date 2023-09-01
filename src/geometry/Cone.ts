import { Vec4 } from "./Vector.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";
import Triangle from "./Triangle.js";

export default class Cone {
    private readonly points: readonly [Point, Point, Point, Point, Point];
    
    constructor(tip: Vec4 = new Vec4(0, 0, 1, 1), tr: Vec4 = new Vec4(1, 1, -1, 1), br: Vec4 = new Vec4(1, -1, -1, 1), bl: Vec4 = new Vec4(-1, -1, -1, 1), tl: Vec4 = new Vec4(-1, 1, -1, 1), color: Vec4 = new Vec4(1, 1, 1, 1)) {
        this.points = [
            new Point(tip.x, tip.y, tip.z, tip.w, color, 0)
            , new Point(tr.x, tr.y, tr.z, tr.w, color, 1)
            , new Point(br.x, br.y, br.z, br.w, color, 2)
            , new Point(bl.x, bl.y, bl.z, bl.w, color, 3)
            , new Point(tl.x, tl.y, tl.z, tl.w, color, 4)
        ];
    }
    getTriangles(): Triangle[] {
        throw new Error("Method not implemented.");
    }
    getLines(): LineSegment[] {
        const indices = [
            0, 1,
            0, 2,
            0, 3,
            0, 4,
            1, 2,
            2, 3,
            3, 4,
            4, 1
        ]
        const lines: LineSegment[] = [];
        for (let i = 0; i < indices.length; i += 2) {
            lines.push(new LineSegment(this.points[indices[i]], this.points[indices[i + 1]]));
        }
        return lines;
    }
    getPoints(): Point[] {
        return [...this.points];
    }


}