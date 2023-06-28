
import ArrayBufferObject from "../contextobject/ArrayBufferObject.js";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject.js";
import GLElementBufferObject from "../contextobject/GLElementBufferObject.js";
import GLPrimitive from "../contextobject/GLPrimitive.js";
import GLVertexArrayObject from "../contextobject/GLVertexArrayObject.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import GLShader from "../shader/GLShader.js";
import Shader from "../shader/Shader.js";
import GLTexture from "../texture/GLTexture.js";
import Texture from "../texture/Texture.js";
import RenderingContext, { ArrayBufferIndex } from "./RenderingContext.js";

export default class GLRenderingContext implements RenderingContext {
    private readonly gl: WebGL2RenderingContext;
    private readonly width: number;
    private readonly height: number;
    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    getCanvasWidth(): number {
        return this.width;
    }
    getCanvasHeight(): number {
        return this.height;
    }
    makeElementBufferObject(data: Uint16Array): ArrayBufferObject {
        return new GLElementBufferObject(this.gl, data);
    }
    makeVertexArrayObject(): GLVertexArrayObject {
        return new GLVertexArrayObject(this.gl);
    }
    clear(r: number = 0, g: number = 0, b: number = 0, a: number = 1): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        this.gl.clearColor(r, g, b, a);
    }
    init(): void {
        this.gl.enable(this.gl.CULL_FACE)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.enable(this.gl.SCISSOR_TEST)
    }
    draw(mode: number, count: number): void {
        this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0)
    }
    viewportTo(left: number, top: number, width: number, height: number): void {
        this.gl.viewport(left, top, width, height);
        this.gl.scissor(left, top, width, height);
    }
    makeArrayBufferObject(index: ArrayBufferIndex, data: Float32Array | Uint16Array, size: number): ArrayBufferObject {
        return new GLArrayBufferObject(this.gl, index, data, size);
    }
    makeTexture(unit: number): Texture {
        return new GLTexture(this.gl, unit);
    }
    switchDepthTest(enable: boolean): void {
        if (enable) {
            this.gl.enable(this.gl.DEPTH_TEST);
        } else {
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }
    switchDepthWrite(enable: boolean): void {
        this.gl.depthMask(enable);
    }
    switchBlend(enable: boolean): void {
        if (enable) {
            this.gl.enable(this.gl.BLEND);
        } else {
            this.gl.disable(this.gl.BLEND);
        }
    }
    switchUnpackPremultiplyAlpha(enable: boolean): void {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, enable);
    }
    useBlendFuncOneAndOneMinusSrcAlpha(): void {
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    makePrimitive(type: PrimitiveType): Primitive {
        return new GLPrimitive(this.gl, type);
    }
    makeShader(vert: string, frag: string): Shader {
        return new GLShader(this.gl, vert, frag);
    }

}
