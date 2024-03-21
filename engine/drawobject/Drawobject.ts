import Program from "../program/Program.js";
import { m4 } from "../third/twgl/m4.js";

export default class Drawobject {
    private readonly bufferMap: Map<string, WebGLBuffer | null>;
    readonly vaos: WebGLVertexArrayObject[] = [];
    private readonly first = 0;
    readonly name: string;
    readonly model: Matrix = m4.identity();
    vaoIndex = 0;
    private count = 0;
    instanceCount = 0;
    constructor(name: string) {
        this.name = name;
        this.bufferMap = new Map();
    }
    static create(name: string) {
        return new Drawobject(name);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindVertexArray(this.vaos[this.vaoIndex]);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindVertexArray(null)
    }
    generateVAO(context: WebGL2RenderingContext) {
        this.vaos.push(context.createVertexArray()!)
    }
    bindFeedbackBuffers(context: WebGL2RenderingContext, program: Program) {
        program.varyings?.forEach((key) => {
            const attribute = key.replace("v_", "a_");
            const buffer = this.bufferMap.get(attribute + this.vaoIndex);
            if (!buffer) {
                throw new Error("feedback source buffer not exist")
            }
            context.bindBufferBase(context.TRANSFORM_FEEDBACK_BUFFER, program.cacheAttrLoc(context, attribute), buffer);
        })
    }
    unbindFeedbackBuffers(context: WebGL2RenderingContext, program: Program) {
        program.varyings?.forEach((key) => {
            const attribute = key.replace("v_", "a_");
            context.bindBufferBase(context.TRANSFORM_FEEDBACK_BUFFER, program.cacheAttrLoc(context, attribute), null);
        })
    }
    bindFeedbackTarget(context: WebGL2RenderingContext) {
        context.bindVertexArray(this.vaos[(this.vaoIndex + 1) % this.vaos.length])
    }
    draw(context: WebGL2RenderingContext) {
        if (this.name === "sky") {
            context.disable(context.DEPTH_TEST);
            context.depthMask(false);
        }
        if (this.name === "icon") {
            context.depthMask(false);
        }
        if (this.name === "water" || this.name === "terrain" || this.name === "icon") {
            context.enable(context.BLEND);
        }
        if (this.bufferMap.has("indices")) {
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.bufferMap.get("indices") || null);
            this.count && context.drawElements(context.TRIANGLES, this.count, context.UNSIGNED_SHORT, this.first);
            context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
        } else {
            if (this.name === "icon" || this.name.endsWith(".feedback")) {
                this.count && context.drawArrays(context.POINTS, this.first, this.count)
            } else {
                this.count && context.drawArrays(context.TRIANGLES, this.first, this.count)
            }
        }
        if (this.name === "water" || this.name === "terrain" || this.name === "icon") {
            context.disable(context.BLEND);
        }
        if (this.name === "icon") {
            context.depthMask(true);
        }
        if (this.name === "sky") {
            context.depthMask(true);
            context.enable(context.DEPTH_TEST);
        }

    }
    drawInstanced(context: WebGL2RenderingContext) {
        this.instanceCount && this.count && context.drawArraysInstanced(context.TRIANGLES, this.first, this.count, this.instanceCount);
    }
    createAttribute(context: WebGL2RenderingContext, program: Program, name: string, data: Float32Array | Int32Array | Uint8Array, type: number, size: number, divisor = 0) {
        for (let index = 0; index < this.vaos.length; index++) {
            const vao = this.vaos[index];
            context.bindVertexArray(vao);
            let buffer = this.bufferMap.get(name + index);
            if (!buffer) {
                buffer = context.createBuffer();
                this.bufferMap.set(name + index, buffer);
            }
            context.bindBuffer(context.ARRAY_BUFFER, buffer);
            context.bufferData(context.ARRAY_BUFFER, data.byteLength, context.STATIC_DRAW);
            context.bufferSubData(context.ARRAY_BUFFER, 0, data);
            program.activeVertexAttribArray(context, name, size, type, divisor);
            context.bindBuffer(context.ARRAY_BUFFER, null);
            if (!divisor) {
                this.count = data.length / size;
            }
            context.bindVertexArray(null);
        }
    }
    updateAttribute(context: WebGL2RenderingContext, name: string, start: number, data: ArrayBufferLike) {
        for (let index = 0; index < this.vaos.length; index++) {
            const vao = this.vaos[index];
            context.bindVertexArray(vao);
            let buffer = this.bufferMap.get(name + index);
            if (!buffer) {
                throw new Error("buffer not exist");
            }
            context.bindBuffer(context.ARRAY_BUFFER, buffer);
            context.bufferSubData(context.ARRAY_BUFFER, start, data);
            context.bindBuffer(context.ARRAY_BUFFER, null);
            context.bindVertexArray(null);
        }
    }
    createIndices(context: WebGL2RenderingContext, name: string, data: Uint16Array) {
        let buffer = this.bufferMap.get(name);
        if (!buffer) {
            buffer = context.createBuffer();
            this.bufferMap.set(name, buffer);
        }
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, buffer);
        context.bufferData(context.ELEMENT_ARRAY_BUFFER, data, context.STATIC_DRAW);
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
        this.count = data.length;
    }
}