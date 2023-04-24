import { Vec4 } from "../math/Vector.js";
import LineSegment from "./LineSegment.js";
import Point from "./Point.js";
import Triangle from "./Triangle.js";


export default class Cube {
    private readonly points: readonly [Point, Point, Point, Point, Point, Point, Point, Point];

    constructor(min: Vec4 = new Vec4(-1, -1, -1, 1), max: Vec4 = new Vec4(1, 1, 1, 1), color: Vec4 = new Vec4(1, 1, 1, 1)) {
        this.points = [
            new Point(min.x, min.y, min.z, 1, color, 0), new Point(max.x, min.y, min.z, 1, color, 1), new Point(min.x, max.y, min.z, 1, color, 2), new Point(max.x, max.y, min.z, 1, color, 3),
            new Point(min.x, min.y, max.z, 1, color, 4), new Point(max.x, min.y, max.z, 1, color, 5), new Point(min.x, max.y, max.z, 1, color, 6), new Point(max.x, max.y, max.z, 1, color, 7)
        ];

    }
    getTriangles(): [Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle, Triangle] {
        const indices = [
            1, 0, 2, 2, 3, 1, // back
            5, 7, 6, 6, 4, 5, // front
            1, 3, 7, 7, 5, 1, // right
            0, 4, 6, 6, 2, 0, // left
            6, 7, 3, 3, 2, 6, // top
            4, 0, 1, 1, 5, 4, // bottom
        ]

        return [
            Triangle.fromPoints(this.points[indices[0]], this.points[indices[1]], this.points[indices[2]]),
            Triangle.fromPoints(this.points[indices[3]], this.points[indices[4]], this.points[indices[5]]),
            Triangle.fromPoints(this.points[indices[6]], this.points[indices[7]], this.points[indices[8]]),
            Triangle.fromPoints(this.points[indices[9]], this.points[indices[10]], this.points[indices[11]]),
            Triangle.fromPoints(this.points[indices[12]], this.points[indices[13]], this.points[indices[14]]),
            Triangle.fromPoints(this.points[indices[15]], this.points[indices[16]], this.points[indices[17]]),
            Triangle.fromPoints(this.points[indices[18]], this.points[indices[19]], this.points[indices[20]]),
            Triangle.fromPoints(this.points[indices[21]], this.points[indices[22]], this.points[indices[23]]),
            Triangle.fromPoints(this.points[indices[24]], this.points[indices[25]], this.points[indices[26]]),
            Triangle.fromPoints(this.points[indices[27]], this.points[indices[28]], this.points[indices[29]]),
            Triangle.fromPoints(this.points[indices[30]], this.points[indices[31]], this.points[indices[32]]),
            Triangle.fromPoints(this.points[indices[33]], this.points[indices[34]], this.points[indices[35]]),
        ];

    }
    getLines(): LineSegment[] {
        const indices = [
            0, 1, 1, 3, 3, 2, 2, 0, // front
            4, 5, 5, 7, 7, 6, 6, 4, // back
            0, 4, 1, 5, 2, 6, 3, 7, // sides
        ]

        return [
            new LineSegment(this.points[indices[0]], this.points[indices[1]]),
            new LineSegment(this.points[indices[2]], this.points[indices[3]]),
            new LineSegment(this.points[indices[4]], this.points[indices[5]]),
            new LineSegment(this.points[indices[6]], this.points[indices[7]]),
            new LineSegment(this.points[indices[8]], this.points[indices[9]]),
            new LineSegment(this.points[indices[10]], this.points[indices[11]]),
            new LineSegment(this.points[indices[12]], this.points[indices[13]]),
            new LineSegment(this.points[indices[14]], this.points[indices[15]]),
            new LineSegment(this.points[indices[16]], this.points[indices[17]]),
            new LineSegment(this.points[indices[18]], this.points[indices[19]]),
            new LineSegment(this.points[indices[20]], this.points[indices[21]]),
            new LineSegment(this.points[indices[22]], this.points[indices[23]]),
        ]
    }
    getPoints(): Point[] {
        return [...this.points];
    }


}

