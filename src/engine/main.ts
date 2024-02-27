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
    private readonly programs: Program[] = [];
    private readonly objects: Drawobject[] = [];
    private readonly textures: Texture[] = [];
    constructor(device: Device) {
        this.ticker = new Ticker();
        this.renderer = new Renderer(device);
        this.worker = new Worker();
        const windowInfo = device.getWindowInfo();
        const w = windowInfo.width;
        const h = windowInfo.height;
        this.worker.init(device);
        this.worker.updateModelAnimation = (animation) => {
            this.ticker.pause = !animation;
            const timer = requestAnimationFrame(time => {
                this.ticker.now = time;
                this.ticker.tick(time)
            });
            if (!animation) {
                cancelAnimationFrame(timer)
            }
        };
        this.worker.updateModelTranslation = (translation) => {
            const model = this.objects.find(o => o.name === "terrain")?.model;
            if (model) {
                model[12] = translation[0];
                model[13] = translation[1];
                model[14] = translation[2];
            }
        }
        this.worker.initAttributes = (objectName, programName, name, type, size, attribute) => {
            const object = this.objects.find(o => o.name === objectName)!
            const program = this.programs.find(p => p.name === programName)!
            this.renderer.createAttributes(object, program, name, type, size, attribute);
        };
        this.worker.updateUniforms = (programName: string, uniformName: string, type: '1iv' | '1i' | '1fv' | '2fv' | '3fv' | 'Matrix4fv', values: number[]) => {
            const program = this.programs.find(p => p.name === programName)!;
            this.renderer.updateUniform(program, uniformName, type, ...values);
        };
        this.worker.updateInstanceCount = (objectName: string, count: number) => {
            const object = this.objects.find(o => o.name === objectName)!;
            object.instanceCount = count;
        }
        this.worker.createObjects = (programs: string[], objects: string[], textures: string[]) => {
            programs.forEach(name => this.programs.push(Program.create(name)));
            objects.forEach(name => this.objects.push(Drawobject.create(name)));
            textures.forEach(name => this.textures.push(Texture.create(name, this.textures.length, w, h)));
            this.load(device).then(() => this.worker.requestObjectCreated());
        }
        this.worker.onObjectCreated = () => {
            this.programs.forEach(program => renderer.initShaderProgram(program))
            this.objects.forEach(object => renderer.createDrawobject(object))
            this.textures.forEach(texture => {
                renderer.createTexture(texture);
            });
            this.textures.forEach(texture => {
                renderer.enableTexture(texture);
            });
            renderer.createTerrainFramebuffer(terrainFramebuffer,
                this.textures.find(t => t.name === "diffuse")!,
                this.textures.find(t => t.name === "depth")!,
                this.textures.find(t => t.name === "normal")!
            );
            this.worker.requestTerrain();
            this.worker.initStates();
        }
        const terrainFramebuffer = Framebuffer.create();
        const renderer = this.renderer;
        renderer.initContextState();
        this.worker.requestLoadStart()

        this.ticker.callback = () => {
            this.worker.process();
            if (!this.ticker.pause) {
                const terrainFBOProgram = this.programs.find(p => p.name === "terrainFBO")
                const terrainProgram = this.programs.find(p => p.name === "terrain")
                const terrainFBO = this.objects.find(o => o.name === "terrainFBO");
                const terrain = this.objects.find(o => o.name === "terrain");
                if (terrainFBOProgram && terrainProgram && terrainFBO && terrain) {
                    renderer.activeProgram(terrainFBOProgram);
                    renderer.activeFramebuffer(terrainFramebuffer);
                    renderer.prepare(windowInfo);
                    renderer.renderDrawobject(terrainFBO);
                    renderer.deactiveFramebuffer(terrainFramebuffer);
                    renderer.deactiveProgram(terrainFBOProgram);
                    const viewInverse = m4.identity();
                    const projection = m4.identity();
                    m4.rotateY(terrain.model, 0.001 * this.ticker.delta, terrain.model)
                    m4.inverse(m4.lookAt(v3.create(0, 1, 3), v3.create(), v3.create(0, 1, 0)), viewInverse)
                    m4.perspective(Math.PI / 8, 1, 0.1, 10, projection)
                    renderer.updateUniform(terrainProgram, "u_model", "Matrix4fv", ...terrain.model)
                    renderer.updateUniform(terrainProgram, "u_viewInverse", "Matrix4fv", ...viewInverse)
                    renderer.updateUniform(terrainProgram, "u_projection", "Matrix4fv", ...projection)

                    renderer.activeProgram(terrainProgram);
                    renderer.prepare(windowInfo);
                    renderer.renderDrawobject(terrain);
                    renderer.deactiveProgram(terrainProgram);
                }
            }
            requestAnimationFrame(t => this.ticker.tick(t));
        }
        this.ticker.tick(0)
    }
    async load(device: Device) {
        await device.loadSubpackage();
        for await (const iterator of this.programs) {
            await iterator.loadShaderSource(device);
        }
    }

}
