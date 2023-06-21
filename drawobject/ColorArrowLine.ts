import LineSegment from "../geometry/LineSegment.js";
import Point from "../geometry/Point.js";
import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import GLTexture from "../texture/GLTexture.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import DrawObject from "./DrawObject.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class ColorArrowLine extends DrawObject {
    constructor(gl: RenderingContext, texture: GLTexture, from: Point, to: Point, ...others: Point[]) {
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
        super(gl, texture, new Map<number, GLArrayBufferObject>(), 2 + otherLineVertCount);
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

