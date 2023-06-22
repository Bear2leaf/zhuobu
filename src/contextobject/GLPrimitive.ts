import Primitive, { PrimitiveType } from "./Primitive.js";

export default class GLPrimitive implements Primitive {
    private readonly primitiveType: number;
    constructor(gl: WebGL2RenderingContext, primitiveType: PrimitiveType) {
        if (primitiveType === PrimitiveType.POINTS)
        {
            this.primitiveType = gl.POINTS;
        } else if (primitiveType === PrimitiveType.LINES) {
            this.primitiveType = gl.LINES;
        } else if (primitiveType === PrimitiveType.TRIANGLES) {
            this.primitiveType = gl.TRIANGLES;
        } else {
            throw new Error("primitiveType is not supported");
        }


    }
    getMode(): number {
        return this.primitiveType;
    }
}