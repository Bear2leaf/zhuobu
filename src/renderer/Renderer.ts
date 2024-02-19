

import { matrix } from "../util/math.js";
import Device from "../device/Device.js";
import Texture from "../texture/Texture.js";
import Framebuffer from "../framebuffer/Framebuffer.js";
import Terrain from "../drawobject/Terrain.js";
import Program from "../program/Program.js";
import TerrainFBO from "../drawobject/TerrainFBO.js";
import Drawobject from "../drawobject/Drawobject.js";
import { hello } from "../../third/hello/lib.js";
import { m4 } from "../../third/twgl/m4.js";
import { v3 } from "../../third/twgl/v3.js";




export default class Renderer {
    private readonly context: WebGL2RenderingContext;
    private readonly terrainFBOProgram: Program;
    private readonly terrainProgram: Program;
    private readonly terrainFramebuffer: Framebuffer;
    private readonly depthTexture: Texture;
    private readonly diffuseTexture: Texture;
    private readonly normalTexture: Texture;
    private readonly terrain: Drawobject;
    private readonly terrainFBO: Drawobject;
    private readonly windowInfo: WindowInfo;
    private readonly mapSize = 512;
    private elapsed = 0;
    private delta = 0;
    private now = 0;
    constructor(device: Device) {
        hello();
        console.log(m4.axisRotate(m4.identity(), v3.create(0, 1, 0), 10))
        const context = this.context = device.contextGL;
        this.windowInfo = device.getWindowInfo();
        this.terrainFBOProgram = Program.create(context);
        this.terrainProgram = Program.create(context);
        this.depthTexture = Texture.create(context);
        this.diffuseTexture = Texture.create(context);
        this.normalTexture = Texture.create(context);
        this.terrain = Terrain.create(context);
        this.terrainFBO = TerrainFBO.create(context);
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
        this.terrain.init(context, this.terrainProgram);
        this.terrainFBO.init(context, this.terrainFBOProgram);
        const size = this.mapSize;
        this.diffuseTexture.generateDiffuse(context, size, size);
        this.depthTexture.generateDepth(context, size, size);
        this.normalTexture.generateNormal(context, size, size);
        this.terrainFramebuffer.createTerrainFramebuffer(context, this.depthTexture, this.diffuseTexture, this.normalTexture);
        this.initContextState();
        this.enableTextures(context);
        requestAnimationFrame((time) => {
            this.now = time;
            this.tick(time)
        });
    }
    tick(time: number) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;

        requestAnimationFrame((time) => {
            this.renderTerrainFramebuffer();
            this.render();
            this.tick(time);
        })
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
        this.terrainProgram.updateTerrainModel(context, matrix.scale(matrix.rotateY(matrix.rotateX(matrix.identity(), -Math.PI / 8), this.elapsed / 1000), [2, 2, 2]))
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
}