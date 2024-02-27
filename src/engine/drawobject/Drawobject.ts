import Program from "../program/Program.js";

export default class Drawobject {
    readonly buffers: WebGLBuffer[] = [];
    private vao: WebGLVertexArrayObject | null = null;
    private readonly first = 0;
    readonly model: Matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    private count = 0;
    instanceCount = 0;
    static create() {
        return new Drawobject()
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
        this.count && context.drawArrays(context.TRIANGLES, 0, this.count)
    }
    drawInstanced(context: WebGL2RenderingContext) {
        this.instanceCount && this.count && context.drawArraysInstanced(context.TRIANGLES, this.first, this.count, this.instanceCount);
    }
    createAttribute(context: WebGL2RenderingContext, program: Program, name: string, data: Float32Array, type: number, size: number) {
        const buffer = context.createBuffer()!;
        context.bindBuffer(context.ARRAY_BUFFER, buffer);
        context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW);
        program.activeVertexAttribArray(context, name, size, type);
        context.bindBuffer(context.ARRAY_BUFFER, null);
        this.buffers.push(buffer);
        this.count = data.length / size;
    }
}