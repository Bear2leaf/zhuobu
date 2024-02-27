import Device from "./device/Device.js";
import Worker from "./worker/Worker.js";
import Renderer from "./renderer/Renderer.js";
import Ticker from "./ticker/Ticker.js";
import Texture from "./texture/Texture.js";
import Framebuffer from "./framebuffer/Framebuffer.js";
import Drawobject from "./drawobject/Drawobject.js";
import { m4 } from "./third/twgl/m4.js";
import { v3 } from "./third/twgl/v3.js";
import Program from "./program/Program.js";

export default class Engine {
    private readonly renderer: Renderer;
    private readonly worker: Worker;
    private readonly ticker: Ticker;
    private terrainFBO?: Drawobject;
    private terrain?: Drawobject;
    private animation = false;
    private terrainFBOProgram?: Program;
    private terrainProgram?: Program;
    constructor(device: Device) {
        this.ticker = new Ticker();
        this.renderer = new Renderer(device);
        this.worker = new Worker();
        const windowInfo = device.getWindowInfo();
        const w = windowInfo.width;
        const h = windowInfo.height;
        this.worker.init(device);
        this.worker.updateModelAnimation = (animation) => { this.animation = !!animation };
        this.worker.updateModelTranslation = (translation) => {
            this.terrain!.model[12] = translation[0];
            this.terrain!.model[13] = translation[1];
            this.terrain!.model[14] = translation[2];
        }
        this.worker.initTerrainFBOAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.terrainFBO!, this.terrainFBOProgram!, name, type, size, attribute);
        };
        this.worker.initTerrainAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.terrain!, this.terrainProgram!, name, type, size, attribute);
        };
        this.worker.updateTerrainUniforms = (edges: number[], scales: number[], offsets: number[]) => {
            this.renderer.updateUniform(this.terrainProgram!, "u_texture", "1i", 0);
            this.renderer.updateUniform(this.terrainProgram!, "u_textureDepth", "1i", 1);
            this.renderer.updateUniform(this.terrainProgram!, "u_textureNormal", "1i", 2);
            this.renderer.updateUniform(this.terrainProgram!, "u_edges", "1iv", ...edges);
            this.renderer.updateUniform(this.terrainProgram!, "u_scales", "1fv", ...scales);
            this.renderer.updateUniform(this.terrainProgram!, "u_offsets", "2fv", ...offsets);
            this.terrain!.instanceCount = edges.length;
        };
        this.terrainFBOProgram = Program.create();
        this.terrainProgram = Program.create();
        this.terrainFBOProgram.name = "terrainFBO";
        this.terrainProgram.name = "terrain";
        this.terrain = Drawobject.create();
        this.terrainFBO = Drawobject.create();
        const diffuseTexture = Texture.create(0, w, h);
        const depthTexture = Texture.create(1, w, h);
        const normalTexture = Texture.create(2, w, h);
        const terrainFramebuffer = Framebuffer.create();
        this.load(device).then(() => {
            const renderer = this.renderer;
            renderer.initShaderProgram(this.terrainFBOProgram!);
            renderer.initShaderProgram(this.terrainProgram!);
            renderer.initContextState();
            renderer.createDrawobject(this.terrainFBO!);
            renderer.createDrawobject(this.terrain!);
            renderer.createDiffuseTexture(diffuseTexture);
            renderer.createDepthTexture(depthTexture);
            renderer.createNormalTexture(normalTexture);
            renderer.enableTexture(diffuseTexture);
            renderer.enableTexture(depthTexture);
            renderer.enableTexture(normalTexture);
            renderer.createTerrainFramebuffer(terrainFramebuffer, diffuseTexture, depthTexture, normalTexture);
            this.worker.requestTerrain();
            this.worker.requestAnimation();
            requestAnimationFrame((t) => {
                this.ticker.now = t;
                this.ticker.tick(t, () => {
                    this.worker.process();
                    renderer.activeProgram(this.terrainFBOProgram!);
                    renderer.activeFramebuffer(terrainFramebuffer);
                    renderer.prepare(windowInfo);
                    renderer.renderDrawobject(this.terrainFBO!);
                    renderer.deactiveFramebuffer(terrainFramebuffer);
                    renderer.deactiveProgram(this.terrainFBOProgram!);
                    {

                        const viewInverse = m4.identity();
                        const projection = m4.identity();
                        if (this.animation) {
                            m4.rotateY(this.terrain!.model, 0.001 * this.ticker.delta, this.terrain!.model)
                        }
                        m4.inverse(m4.lookAt(v3.create(0, 1, 3), v3.create(), v3.create(0, 1, 0)), viewInverse)
                        m4.perspective(Math.PI / 8, 1, 0.1, 10, projection)
                        renderer.updateUniform(this.terrainProgram!, "u_model", "Matrix4fv", ...this.terrain!.model)
                        renderer.updateUniform(this.terrainProgram!, "u_viewInverse", "Matrix4fv", ...viewInverse)
                        renderer.updateUniform(this.terrainProgram!, "u_projection", "Matrix4fv", ...projection)

                    }
                    renderer.activeProgram(this.terrainProgram!);
                    renderer.prepare(windowInfo);
                    renderer.renderDrawobject(this.terrain!);
                    renderer.deactiveProgram(this.terrainProgram!);
                });
            })
        });
    }
    async load(device: Device) {
        await device.loadSubpackage();
        await this.terrainFBOProgram!.loadShaderSource(device);
        await this.terrainProgram!.loadShaderSource(device);
    }

}
