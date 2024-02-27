

import Device from "../device/Device.js";
import Texture from "../texture/Texture.js";
import Program from "../program/Program.js";
import Drawobject from "../drawobject/Drawobject.js";
import Framebuffer from "../framebuffer/Framebuffer.js";




export default class Renderer {
    private readonly context: WebGL2RenderingContext;
    constructor(device: Device) {
        this.context = device.contextGL;
    }
    initContextState() {
        const context = this.context;
        context.clearColor(0, 0, 0, 1);
        context.enable(context.DEPTH_TEST);
        context.enable(context.CULL_FACE);
        context.enable(context.SCISSOR_TEST)
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
        context.blendFuncSeparate(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA, context.ONE, context.ONE);
    }
    prepare(windowInfo: WindowInfo) {
        const context = this.context;
        const width = windowInfo.width;
        const height = windowInfo.height;
        context.viewport(0, 0, width, height);
        context.scissor(0, 0, width, height);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
    }
    enableTexture(texture: Texture) {
        const context = this.context;
        texture.active(context);
        texture.bind(context);
    }
    createAttributes(drawobject: Drawobject, program: Program, name: string, type: "FLOAT" | "INT", size: number, attribute: number[], divisor = 0) {
        const context = this.context
        program.active(context);
        drawobject.bind(context);
        drawobject.createAttribute(context, program, name, type === "FLOAT" ? new Float32Array(attribute) : new Int32Array(attribute), context[type], size, divisor);
        drawobject.unbind(context);
        program.deactive(context);
    }
    updateUniform(program: Program, name: string, type: '1iv' | '1i' | '1fv' | '2fv' | '3fv' | 'Matrix4fv', ...values: number[]): void {
        const context = this.context;
        program.active(context);
        if (type === '1i') {
            program.updateUniform1i(context, name, values);
        } else if (type === '1iv') {
            program.updateUniform1iv(context, name, values);
        } else if (type === '2fv') {
            program.updateUniform2fv(context, name, values);
        } else if (type === '1fv') {
            program.updateUniform1fv(context, name, values);
        } else if (type === '3fv') {
            program.updateUniform3fv(context, name, values);
        } else if (type === 'Matrix4fv') {
            program.updateUniformMatrix4fv(context, name, values);
        } else {
            throw new Error("Not implemented.");
        }
        program.deactive(context);
    }
    renderDrawobject(drawobject: Drawobject) {
        const context = this.context;
        drawobject.bind(context);
        if (drawobject.instanceCount) {
            drawobject.drawInstanced(context);
        } else {
            drawobject.draw(context);
        }
        drawobject.unbind(context);
    }
    initShaderProgram(program: Program) {
        const context = this.context;
        program.init(context);
    }
    activeFramebuffer(framebuffer: Framebuffer) {
        framebuffer.bind(this.context);
    }
    deactiveFramebuffer(framebuffer: Framebuffer) {
        framebuffer.unbind(this.context);
    }
    activeProgram(program: Program) {
        program.active(this.context);
    }
    deactiveProgram(program: Program) {
        program.deactive(this.context);
    }
    createTexture(texture: Texture) {
        if (texture.name === "diffuse") {
            texture.generateDiffuse(this.context)
        } else if (texture.name === "depth") {
            texture.generateDepth(this.context)
        } else if (texture.name === "normal") {
            texture.generateNormal(this.context)
        } else {
            throw new Error("unsupport texture name.")
        }
    }
    createDepthTexture(texture: Texture) {
        texture.generateDepth(this.context)
    }
    createNormalTexture(texture: Texture) {
        texture.generateNormal(this.context)
    }
    createTerrainFramebuffer(framebuffer: Framebuffer, diffuseTexture: Texture, depthTexture: Texture, normalTexture: Texture) {
        framebuffer.generateTerrainFramebuffer(this.context, diffuseTexture, depthTexture, normalTexture);

    }
    createDrawobject(drawobject: Drawobject) {
        drawobject.generateVAO(this.context);
    }
}