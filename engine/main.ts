import Device from "./device/Device.js";
import Worker, { scriptModule } from "./worker/Worker.js";
import Renderer from "./renderer/Renderer.js";
import Clock from "./clock/Clock.js";
import Texture from "./texture/Texture.js";
import Framebuffer from "./framebuffer/Framebuffer.js";
import Drawobject from "./drawobject/Drawobject.js";
import { m4 } from "./third/twgl/m4.js";
import Program from "./program/Program.js";
import { v3 } from "./third/twgl/v3.js";

type ScriptType = Awaited<ReturnType<typeof scriptModule>>;

export default class Engine {
    readonly updateCalls: UpdateCalls = [];
    private readonly worker: Worker;
    private script?: ScriptType;
    readonly framebuffers: Framebuffer[] = [];
    readonly textures: Texture[] = [];
    readonly renderer: Renderer;
    readonly ticker: Clock;
    readonly programs: Program[] = [];
    readonly objects: Drawobject[] = [];
    readonly cameras: Camera[] = [];
    readonly renderCalls: [string, string, string, string | null, boolean, number | null][] = [];
    readonly windowInfo: WindowInfo;
    constructor(device: Device) {
        this.ticker = new Clock();
        this.renderer = new Renderer(device);
        this.worker = new Worker();
        this.windowInfo = device.getWindowInfo();
        this.worker.init(device);
        this.worker.createObjects = (programs: string[], varyings: string[][], objects: string[], textures: [string, number, string, number | null, boolean?][], framebuffers: string[], cameras: Camera[], textureFBOBindings: string[][]) => {
            programs.forEach(name => {
                const varing = varyings.find(varing => varing[0] === name);
                if (varing) {
                    this.programs.push(Program.create(name, varing.slice(2)));
                } else {
                    this.programs.push(Program.create(name));
                }
            });
            objects.forEach(name => {
                const varing = varyings.find(varing => varing[1] === name);
                if (varing) {
                    this.objects.push(Drawobject.create(name));
                } else {
                    this.objects.push(Drawobject.create(name));
                }
            });
            textures.forEach(([name, unit, p, size, load]) => this.textures.push(Texture.create(name, unit, p, size || this.windowInfo.width, size || this.windowInfo.height, load)));
            framebuffers.forEach(name => this.framebuffers.push(Framebuffer.create(name)));
            cameras.forEach(c => this.cameras.push(c));
            this.load(device).then(() => this.worker.callScript!.onEngineLoaded(textureFBOBindings));
        }
        const renderer = this.renderer;
        renderer.initContextState();
        const tick = (t: number) => {
            this.worker.process();
            this.ticker.tick(t)
            requestAnimationFrame(t => {
                tick(t);
            });
            if (this.ticker.pause) {
                return;
            }
            for (const iterator of this.updateCalls) {
                this.script!.updateCalls[iterator[0]](iterator.slice(1));
            }
            for (const iterator of this.renderCalls) {
                const object = this.objects.find(o => o.name === iterator[0])!;
                const program = this.programs.find(o => o.name === iterator[1])!;
                const textures = this.textures.filter(t => t.program === program.name)!;
                const camera = this.cameras.find(c => c.name === iterator[2])!;
                const framebuffer = this.framebuffers.find(o => o.name === iterator[3])!;
                const clear = iterator[4];
                const size = iterator[5];
                const aspect = this.windowInfo.width / this.windowInfo.height;
                const width = size || this.windowInfo.width;
                const height = size || this.windowInfo.height;
                if (object.name.endsWith(".feedback") && program.name.endsWith(".feedback")) {
                    this.renderer.transformFeedback(program, object, this.objects.find(o => o.name === object.name.replace(".feedback", ""))!);
                } else {
                    this.renderer.render(program, object, textures, camera, framebuffer, clear, width, height, aspect);
                }
            }
        }
        tick(0);

    }
    start() {
        this.ticker.pause = false;
    }
    stop() {
        this.ticker.pause = true;
    }
    async load(device: Device) {
        await device.loadSubpackage();
        for await (const iterator of this.programs) {
            await iterator.loadShaderSource(device);
        }
        for await (const iterator of this.textures) {
            await iterator.loadImage(device);
        }
        await scriptModule()
            .then((m) => {
                m.initSubpackage(this, m4, v3);
                this.script = m;
                this.worker.callScript = m.workerCalls;
                this.worker.engineLoaded();
            });
    }

}
