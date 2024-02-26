

import Device from "../device/Device.js";
import Texture from "../texture/Texture.js";
import Framebuffer from "../framebuffer/Framebuffer.js";
import Program from "../program/Program.js";
import Drawobject from "../drawobject/Drawobject.js";




export default class Renderer {
    private readonly context: WebGL2RenderingContext;
    private readonly terrainFramebuffer: Framebuffer;
    private readonly depthTexture: Texture;
    private readonly diffuseTexture: Texture;
    private readonly normalTexture: Texture;
    private readonly windowInfo: WindowInfo;
    private readonly mapSize = 512;
    readonly terrainFBOProgram: Program;
    readonly terrainProgram: Program;
    readonly terrainFBO: Drawobject;
    readonly terrain: Drawobject;
    animation: boolean = false;
    constructor(device: Device) {
        const context = this.context = device.contextGL;
        this.windowInfo = device.getWindowInfo();
        this.terrainFBOProgram = Program.create(context);
        this.terrainProgram = Program.create(context);
        this.depthTexture = Texture.create(context);
        this.diffuseTexture = Texture.create(context);
        this.normalTexture = Texture.create(context);
        this.terrain = Drawobject.create(context);
        this.terrainFBO = Drawobject.create(context);
        this.terrainFramebuffer = Framebuffer.create(context);
        this.terrainFBOProgram.name = "terrainFBO";
        this.terrainProgram.name = "terrain";
    }
    async load(device: Device) {
        await this.terrainFBOProgram.loadShaderSource(device);
        await this.terrainProgram.loadShaderSource(device);
    }
    init() {
        const context = this.context;
        this.initShaderProgram();
        const size = this.mapSize;
        this.diffuseTexture.generateDiffuse(context, size, size);
        this.depthTexture.generateDepth(context, size, size);
        this.normalTexture.generateNormal(context, size, size);
        this.terrainFramebuffer.createTerrainFramebuffer(context, this.depthTexture, this.diffuseTexture, this.normalTexture);
        this.initContextState();
        this.enableTextures(context);
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
    render() {
        const context = this.context;
        this.terrainProgram.active(context);
        const width = this.windowInfo.width;
        const height = this.windowInfo.height;
        context.viewport(0, 0, width, height);
        context.scissor(0, 0, width, height);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        this.terrain.bind(context);
        this.terrain.drawInstanced(context);
        this.terrain.unbind(context);
        this.terrainProgram.deactive(context);
    }
    enableTextures(context: WebGL2RenderingContext) {
        this.diffuseTexture.active(context, 0);
        this.diffuseTexture.bind(context);
        this.depthTexture.active(context, 1);
        this.depthTexture.bind(context);
        this.normalTexture.active(context, 2);
        this.normalTexture.bind(context);
    }
    createAttributes(drawobject: Drawobject, program: Program, name: string, type: "FLOAT", size: number, attribute: number[]) {
        const context = this.context
        program.active(context);
        drawobject.bind(context);
        drawobject.createAttribute(context, program, name, new Float32Array(attribute), context[type], size);
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
    renderTerrainFramebuffer() {
        const context = this.context;
        this.terrainFBOProgram.active(context);
        this.terrainFramebuffer.bind(context);
        const size = this.mapSize;
        context.viewport(0, 0, size, size);
        context.scissor(0, 0, size, size);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        this.terrainFBO.bind(context);
        this.terrainFBO.draw(context);
        this.terrainFBO.unbind(context);
        this.terrainFramebuffer.unbind(context);
        this.terrainFBOProgram.deactive(context);

    }
    initShaderProgram() {
        const context = this.context;
        this.terrainFBOProgram.name = "terrainFBO";
        this.terrainFBOProgram.init(context);
        this.terrainProgram.name = "terrain";
        this.terrainProgram.init(context);
    }
    update(time: number) {
        this.updateUniform(this.terrainProgram, "u_model", "Matrix4fv", ...this.terrain.model)
        if (this.animation) {
            this.updateUniform(this.terrainProgram, "u_model", "Matrix4fv", ...this.rotationY(time / 1000, this.terrain.model))
        }
    }
    rotationY(angleInRadians: number, dst: Matrix) {
        dst = dst || new Float32Array(16);

        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);

        dst[0] = c;
        dst[1] = 0;
        dst[2] = -s;
        dst[3] = 0;
        dst[4] = 0;
        dst[5] = 1;
        dst[6] = 0;
        dst[7] = 0;
        dst[8] = s;
        dst[9] = 0;
        dst[10] = c;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;

        return dst;
    }
}