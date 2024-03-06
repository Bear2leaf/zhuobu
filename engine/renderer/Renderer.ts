

import Device from "../device/Device.js";
import Texture from "../texture/Texture.js";
import Program from "../program/Program.js";
import Drawobject from "../drawobject/Drawobject.js";
import Framebuffer from "../framebuffer/Framebuffer.js";
import { m4 } from "../third/twgl/m4.js";




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
        context.enable(context.SCISSOR_TEST);
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
    createAttributes(drawobject: Drawobject, program: Program, name: string, type: GLType, size: number, attribute: number[], divisor = 0) {
        const context = this.context
        program.active(context);
        drawobject.bind(context);
        drawobject.createAttribute(context, program, name, type === "FLOAT" ? new Float32Array(attribute) : new Int32Array(attribute), context[type], size, divisor);
        drawobject.unbind(context);
        program.deactive(context);
    }
    createIndices(drawobject: Drawobject, program: Program, name: string, attribute: number[]) {
        const context = this.context
        program.active(context);
        drawobject.bind(context);
        drawobject.createIndices(context, name, new Uint16Array(attribute));
        drawobject.unbind(context);
        program.deactive(context);
    }
    updateUniform(program: Program, name: string, type: GLUniformType, ...values: number[]): void {
        const context = this.context;
        program.active(context);
        if (type === '1i') {
            program.updateUniform1i(context, name, values);
        } else if (type === '1iv') {
            program.updateUniform1iv(context, name, values);
        } else if (type === '2fv') {
            program.updateUniform2fv(context, name, values);
        } else if (type === '1f') {
            program.updateUniform1fv(context, name, values);
        } else if (type === '3fv') {
            program.updateUniform3fv(context, name, values);
        } else if (type === '4fv') {
            program.updateUniform4fv(context, name, values);
        } else if (type === 'Matrix4fv') {
            program.updateUniformMatrix4fv(context, name, values);
        } else {
            throw new Error("Not implemented.");
        }
        program.deactive(context);
    }
    draw(drawobject: Drawobject) {
        const context = this.context;
        drawobject.bind(context);
        if (drawobject.instanceCount) {
            drawobject.drawInstanced(context);
        } else {
            drawobject.draw(context);
        }
        drawobject.unbind(context);
    }
    updateCamera(
        program: Program,
        eye: [number, number, number],
        target: [number, number, number],
        up: [number, number, number],
        fieldOfViewYInRadians: number,
        aspect: number,
        zNear: number,
        zFar: number
    ) {
        const viewInverse = m4.identity();
        const projection = m4.identity();
        m4.inverse(m4.lookAt(eye, target, up), viewInverse);
        m4.perspective(fieldOfViewYInRadians, aspect, zNear, zFar, projection);
        this.updateUniform(program, "u_viewInverse", "Matrix4fv", ...viewInverse);
        this.updateUniform(program, "u_projection", "Matrix4fv", ...projection);
    }

    render(program: Program, object: Drawobject, windowInfo: WindowInfo, textures: Texture[], camera?: Camera, framebuffer?: Framebuffer, clear?: boolean) {
        if (camera) {
            this.updateCamera(program, camera.eye!, camera.target!, camera.up!, camera.fieldOfViewYInRadians!, windowInfo.width / windowInfo.height, camera.zNear!, camera.zFar!)
        }
        this.activeProgram(program);
        textures.forEach(texture => {
            texture.active(this.context);
            texture.bind(this.context);
        });
        if (framebuffer) {
            this.activeFramebuffer(framebuffer);
        }
        if (clear) {
            this.prepare(windowInfo);
        }
        this.draw(object);
        if (framebuffer) {
            this.deactiveFramebuffer(framebuffer);
        }
        textures.forEach(texture => {
            texture.unbind(this.context);
        });
        this.deactiveProgram(program);
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
        } else if (texture.name === "refract") {
            texture.generateDiffuse(this.context)
        } else if (texture.name === "reflect") {
            texture.generateDiffuse(this.context)
        } else if (texture.name === "waterDepth") {
            texture.generateDepth(this.context)
        } else {
            throw new Error("unsupport texture name.")
        }
    }
    createFramebuffer(fboName: string, framebuffer: Framebuffer, ...textures: Texture[]): void {
        if (fboName === "terrainFBO") {
            framebuffer.generateTerrainFramebuffer(this.context, ...textures);
        } else if (fboName === "refractFBO") {
            framebuffer.generateRefractFramebuffer(this.context, ...textures);
        } else if (fboName === "reflectFBO") {
            framebuffer.generateReflectFramebuffer(this.context, ...textures);
        } else {
            throw new Error("unsupoort FBO name.")
        }
    }
    createDrawobject(drawobject: Drawobject) {
        drawobject.generateVAO(this.context);
    }
    destoryProgram(iterator: Program) {
        iterator.destory(this.context);
    }
    destoryObject(iterator: Drawobject) {
        iterator.destory(this.context);
    }
    destoryTexture(iterator: Texture) {
        iterator.destory(this.context);
    }
    destoryFramebuffer(iterator: Framebuffer) {
        iterator.destory(this.context);
    }
}