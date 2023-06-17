import ArrayBufferObject from "../contextobject/ArrayBufferObject";
import GLArrayBufferObject from "../contextobject/GLArrayBufferObject";
import GLElementBufferObject from "../contextobject/GLElementBufferObject";
import GLPrimitive from "../contextobject/GLPrimitive";
import GLVertexArrayObject from "../contextobject/GLVertexArrayObject";
import Primitive, { PrimitiveType } from "../contextobject/Primitive";
import GLShader from "../shader/GLShader";
import Shader from "../shader/Shader";
import GLTexture from "../texture/GLTexture";
import RenderingCtx, { ArrayBufferIndex } from "./RenderingCtx";

export default class GLRenderingContext implements RenderingCtx {
    private readonly gl: WebGL2RenderingContext;
    private readonly txtCache: Map<string, string>;
    constructor(canvas: HTMLCanvasElement, txtCache: Map<string, string>) {
        this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
        this.txtCache = txtCache;
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
    makeTexture(unit: number): GLTexture {
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
    makeShader(name: string): Shader {
        const vert = this.txtCache.get(`static/shader/${name}.vert.sk`);
        const frag = this.txtCache.get(`static/shader/${name}.frag.sk`);
        if (vert === undefined || frag === undefined) {
            throw new Error("Shader text not found");
        }
        return new GLShader(this.gl, vert, frag);
    }

}
