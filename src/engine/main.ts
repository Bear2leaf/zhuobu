import Device from "./device/Device.js";
import Worker from "./worker/Worker.js";
import Renderer from "./renderer/Renderer.js";
import Ticker from "./ticker/Ticker.js";
import Texture from "./texture/Texture.js";
import Framebuffer from "./framebuffer/Framebuffer.js";
import Drawobject from "./drawobject/Drawobject.js";
import { m4 } from "./third/twgl/m4.js";
import Program from "./program/Program.js";

export default class Engine {
    readonly renderer: Renderer;
    readonly ticker: Ticker;
    readonly programs: Program[] = [];
    readonly objects: Drawobject[] = [];
    private readonly worker: Worker;
    private readonly textures: Texture[] = [];
    private readonly framebuffers: Framebuffer[] = [];
    private readonly renderCalls: [string, string, string, [string, GLUniformType, m4.Mat4][]][] = [];
    private readonly updateCalls: "rotateTerrain"[] = [];
    private readonly scripts: Record<string, scriptCallback> = {};
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
        this.worker.updateUniforms = (programName: string, uniformName: string, type: GLUniformType, values: number[]) => {
            const program = this.programs.find(p => p.name === programName)!;
            this.renderer.updateUniform(program, uniformName, type, ...values);
        };
        this.worker.updateInstanceCount = (objectName: string, count: number) => {
            const object = this.objects.find(o => o.name === objectName)!;
            object.instanceCount = count;
        }
        this.worker.updateRenderCalls = (program, object, framebuffer, uniforms) => {
            this.renderCalls.push([program, object, framebuffer, uniforms]);
        }
        this.worker.updateCamera = (
            programName: string,
            eye: [number, number, number],
            target: [number, number, number],
            up: [number, number, number],
            fieldOfViewYInRadians: number,
            aspect: number,
            zNear: number,
            zFar: number) => {
            const program = this.programs.find(p => p.name === programName)!;
            const viewInverse = m4.identity();
            const projection = m4.identity();
            m4.inverse(m4.lookAt(eye, target, up), viewInverse);
            m4.perspective(fieldOfViewYInRadians, aspect, zNear, zFar, projection);
            this.renderer.updateUniform(program, "u_viewInverse", "Matrix4fv", ...viewInverse)
            this.renderer.updateUniform(program, "u_projection", "Matrix4fv", ...projection)
        }
        this.worker.updateUpdateCalls = (callbackNames) => {
            this.updateCalls.splice(0, this.updateCalls.length, ...callbackNames);
        }
        this.worker.createObjects = (programs: string[], objects: string[], textures: string[], framebuffers: string[]) => {
            programs.forEach(name => this.programs.push(Program.create(name)));
            objects.forEach(name => this.objects.push(Drawobject.create(name)));
            textures.forEach(name => this.textures.push(Texture.create(name, this.textures.length, w, h)));
            framebuffers.forEach(name => this.framebuffers.push(Framebuffer.create(name)));
            this.load(device).then((m) => {
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
                m.resourcesInited({
                    m4,
                    engine: this
                })
                Object.assign(this.scripts, m)
            });
        }
        const renderer = this.renderer;
        renderer.initContextState();

        this.ticker.callback = () => {
            this.worker.process();
            if (!this.ticker.pause) {
                for (const iterator of this.updateCalls) {
                    this.scripts[iterator](this);
                }
                for (const iterator of this.renderCalls) {
                    const program = this.programs.find(o => o.name === iterator[0])!;
                    const object = this.objects.find(o => o.name === iterator[0])!;
                    const framebuffer = this.framebuffers.find(o => o.name === iterator[0])!;
                    const uniforms = iterator[3];
                    this.renderer.render(program, object, windowInfo, uniforms, framebuffer);
                }
            }
            requestAnimationFrame(t => this.ticker.tick(t));
        }
        this.ticker.tick(0)
        this.worker.requestTerrain();
    }
    async load(device: Device) {
        const m = await device.loadSubpackage();
        for await (const iterator of this.programs) {
            await iterator.loadShaderSource(device);
        }
        return m;
    }

}
