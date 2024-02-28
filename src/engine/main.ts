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
    private readonly framebuffers: Framebuffer[] = [];
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
        this.worker.initAttributes = (objectName, programName, name, type, size, attribute, divisor) => {
            const object = this.objects.find(o => o.name === objectName)!
            const program = this.programs.find(p => p.name === programName)!
            this.renderer.createAttributes(object, program, name, type, size, attribute, divisor);
        };
        this.worker.updateUniforms = (programName: string, uniformName: string, type: '1iv' | '1i' | '1f' | '2fv' | '3fv' | 'Matrix4fv', values: number[]) => {
            const program = this.programs.find(p => p.name === programName)!;
            this.renderer.updateUniform(program, uniformName, type, ...values);
        };
        this.worker.updateInstanceCount = (objectName: string, count: number) => {
            const object = this.objects.find(o => o.name === objectName)!;
            object.instanceCount = count;
        }
        this.worker.createObjects = (programs: string[], objects: string[], textures: string[], framebuffers: string[]) => {
            programs.forEach(name => this.programs.push(Program.create(name)));
            objects.forEach(name => this.objects.push(Drawobject.create(name)));
            textures.forEach(name => this.textures.push(Texture.create(name, this.textures.length, w, h)));
            framebuffers.forEach(name => this.framebuffers.push(Framebuffer.create(name)));
            this.load(device).then(() => {
                this.programs.forEach(program => renderer.initShaderProgram(program))
                this.objects.forEach(object => renderer.createDrawobject(object))
                this.textures.forEach(texture => {
                    renderer.createTexture(texture);
                });
                this.textures.forEach(texture => {
                    renderer.enableTexture(texture);
                });
                renderer.createTerrainFramebuffer(this.framebuffers[0],
                    this.textures.find(t => t.name === "diffuse")!,
                    this.textures.find(t => t.name === "depth")!,
                    this.textures.find(t => t.name === "normal")!
                );
                this.worker.terrainCreated();
            });
        }
        const renderer = this.renderer;
        renderer.initContextState();

        this.ticker.callback = () => {
            this.worker.process();
            if (!this.ticker.pause) {
                const terrainFBOProgram = this.programs.find(p => p.name === "terrainFBO")!
                const terrainProgram = this.programs.find(p => p.name === "terrain")!
                const terrainFBO = this.objects.find(o => o.name === "terrainFBO")!;
                const terrain = this.objects.find(o => o.name === "terrain")!;
                this.renderer.render(terrainFBOProgram, terrainFBO, windowInfo, this.ticker.delta, this.framebuffers[0]);
                this.renderer.render(terrainProgram, terrain, windowInfo, this.ticker.delta);
            }
            requestAnimationFrame(t => this.ticker.tick(t));
        }
        this.ticker.tick(0)
        this.worker.requestTerrain();
    }
    async load(device: Device) {
        await device.loadSubpackage();
        for await (const iterator of this.programs) {
            await iterator.loadShaderSource(device);
        }
    }

}
