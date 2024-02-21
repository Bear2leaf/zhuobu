import BrowserDevice from "../device/BrowserDevice.js";
import Device from "../device/Device.js";
import WorkerManager from "../manager/WorkerManager.js";
import Renderer from "../renderer/Renderer.js";
import Ticker from "../ticker/Ticker.js";

export default class MainGame extends HTMLElement {
    private readonly renderer: Renderer;
    private readonly workerManager: WorkerManager;
    private readonly ticker: Ticker;
    private readonly elChildren: HTMLElement[] = []
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        this.ticker = new Ticker();
        const device = new BrowserDevice();
        this.renderer = new Renderer(device);
        this.workerManager = new WorkerManager();
        this.workerManager.init(device);
        this.workerManager.updateModelTranslation = (translation) => this.renderer.updateUniform(this.renderer.terrainProgram, "u_model", "Matrix4fv",
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            ...translation, 1,);
        this.workerManager.initTerrainFBOAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.renderer.terrainFBO, this.renderer.terrainFBOProgram, name, type, size, attribute);
        };
        this.workerManager.initTerrainAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.renderer.terrain, this.renderer.terrainProgram, name, type, size, attribute);
        };
        this.workerManager.updateTerrainUniforms = (edges: number[], scales: number[], offsets: number[]) => {
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_texture", "1i", 0);
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_textureDepth", "1i", 1);
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_textureNormal", "1i", 2);
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_edges", "1iv", ...edges);
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_scales", "1fv", ...scales);
            this.renderer.updateUniform(this.renderer.terrainProgram, "u_offsets", "2fv", ...offsets);
            this.renderer.terrain.instanceCount = edges.length;
        };
        this.load(device).then(() => {
            this.renderer.init();
            this.workerManager.requestTerrain();
            requestAnimationFrame((t) => {
                this.ticker.now = t;
                this.ticker.tick(t, () => {
                    this.workerManager.process();
                    this.renderer.renderTerrainFramebuffer();
                    this.renderer.render();
                });
            })
        });
    }
    async load(device: Device) {
        await device.loadSubpackage();
        await this.renderer.load(device);
    }

}
