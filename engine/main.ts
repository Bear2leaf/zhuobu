import Device from "./device/Device.js";
import Worker, { scriptModule } from "./worker/Worker.js";
import Renderer from "./renderer/Renderer.js";
import Ticker from "./ticker/Ticker.js";
import Texture from "./texture/Texture.js";
import Framebuffer from "./framebuffer/Framebuffer.js";
import Drawobject from "./drawobject/Drawobject.js";
import { m4 } from "./third/twgl/m4.js";
import Program from "./program/Program.js";

type ScriptType = Awaited<ReturnType<typeof scriptModule>>;

export default class Engine {
    readonly updateCalls: (keyof ScriptType["updateCalls"])[] = [];
    private readonly worker: Worker;
    private script?: ScriptType;
    readonly framebuffers: Framebuffer[] = [];
    readonly textures: Texture[] = [];
    readonly renderer: Renderer;
    readonly ticker: Ticker;
    readonly programs: Program[] = [];
    readonly objects: Drawobject[] = [];
    readonly renderCalls: [string, string, string, boolean][] = [];
    constructor(device: Device) {
        this.ticker = new Ticker();
        this.renderer = new Renderer(device);
        this.worker = new Worker();
        const windowInfo = device.getWindowInfo();
        const w = windowInfo.width;
        const h = windowInfo.height;
        this.worker.init(device);
        this.worker.createObjects = (programs: string[], objects: string[], textures: [string, number, string][], framebuffers: string[], textureFBOBindings: string[][]) => {
            this.clean();
            programs.forEach(name => this.programs.push(Program.create(name)));
            objects.forEach(name => this.objects.push(Drawobject.create(name)));
            textures.forEach(([name, unit, p]) => this.textures.push(Texture.create(name, unit, p, w, h)));
            framebuffers.forEach(name => this.framebuffers.push(Framebuffer.create(name)));
            this.load(device).then(() => this.worker.callScript!.onEngineLoaded(textureFBOBindings));
        }
        const renderer = this.renderer;
        renderer.initContextState();

        this.ticker.callback = () => {
            this.worker.process();
            if (this.ticker.pause) {
                requestAnimationFrame(t => this.ticker.tick(t));
                return;
            }
            for (const iterator of this.updateCalls) {
                this.script!.updateCalls[iterator](this, m4);
            }
            for (const iterator of this.renderCalls) {
                const object = this.objects.find(o => o.name === iterator[0])!;
                const program = this.programs.find(o => o.name === iterator[1])!;
                const framebuffer = this.framebuffers.find(o => o.name === iterator[2])!;
                const clear = iterator[3];
                const textures = this.textures.filter(t => t.program === program.name);
                this.renderer.render(program, object, windowInfo, textures, framebuffer, clear);
            }
            requestAnimationFrame(t => this.ticker.tick(t));
        }
        requestAnimationFrame(t => this.ticker.tick(t));

    }
    start() {
        this.ticker.pause = false;
    }
    stop() {
        this.ticker.pause = true;
    }
    clean() {
        const programs = this.programs.splice(0, this.programs.length)
        const objects = this.objects.splice(0, this.objects.length)
        const textures = this.textures.splice(0, this.textures.length)
        const framebuffers = this.framebuffers.splice(0, this.framebuffers.length)
        for (const iterator of programs) {
            this.renderer.destoryProgram(iterator);
        }
        for (const iterator of objects) {
            this.renderer.destoryObject(iterator);
        }
        for (const iterator of textures) {
            this.renderer.destoryTexture(iterator);
        }
        for (const iterator of framebuffers) {
            this.renderer.destoryFramebuffer(iterator);
        }
        this.renderCalls.splice(0, this.renderCalls.length)
        this.updateCalls.splice(0, this.updateCalls.length)
    }
    async load(device: Device) {
        await device.loadSubpackage();
        for await (const iterator of this.programs) {
            await iterator.loadShaderSource(device);
        }
        await scriptModule()
            .then((m) => {
                m.initSubpackage(this, m4);
                this.script = m;
                this.worker.callScript = m.workerCalls;
                this.worker.engineLoaded();
            });
    }

}
