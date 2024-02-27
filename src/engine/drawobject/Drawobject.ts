import Program from "../program/Program.js";
import { m4 } from "../third/twgl/m4.js";

export default class Drawobject {
    readonly buffers: WebGLBuffer[] = [];
    private vao: WebGLVertexArrayObject | null = null;
    private readonly first = 0;
    readonly name: string;
    readonly model: Matrix = m4.identity();
    private count = 0;
    instanceCount = 0;
    constructor(name: string) {
        this.name = name;
    }
    static create(name: string) {
        return new Drawobject(name);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindVertexArray(this.vao);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindVertexArray(null)
    }
    generateVAO(context: WebGL2RenderingContext) {
        this.vao = context.createVertexArray()!
    }
    draw(context: WebGL2RenderingContext) {
        this.count && context.drawArrays(context.TRIANGLES, this.first, this.count)
    }
    drawInstanced(context: WebGL2RenderingContext) {
        this.instanceCount && this.count && context.drawArraysInstanced(context.TRIANGLES, this.first, this.count, this.instanceCount);
    }
    createAttribute(context: WebGL2RenderingContext, program: Program, name: string, data: Float32Array | Int32Array, type: number, size: number, divisor = 0) {
        const buffer = context.createBuffer()!;
        context.bindBuffer(context.ARRAY_BUFFER, buffer);
        context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW);
        program.activeVertexAttribArray(context, name, size, type, divisor);
        context.bindBuffer(context.ARRAY_BUFFER, null);
        this.buffers.push(buffer);
        if (!divisor) {
            this.count = data.length / size;
        }
    }
}