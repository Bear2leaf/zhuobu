import Device from "../device/Device.js";
import Worker from "../worker/Worker.js";
import Renderer from "../renderer/Renderer.js";
import Ticker from "../ticker/Ticker.js";

export default class Engine {
    private readonly renderer: Renderer;
    private readonly worker: Worker;
    private readonly ticker: Ticker;

    constructor(device: Device) {
        this.ticker = new Ticker();
        this.renderer = new Renderer(device);
        this.worker = new Worker();
        this.worker.init(device);
        this.worker.updateModelTranslation = (translation) => this.renderer.updateUniform(this.renderer.terrainProgram, "u_model", "Matrix4fv",
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            ...translation, 1,);
        this.worker.initTerrainFBOAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.renderer.terrainFBO, this.renderer.terrainFBOProgram, name, type, size, attribute);
        };
        this.worker.initTerrainAttr = (name, type, size, attribute) => {
            this.renderer.createAttributes(this.renderer.terrain, this.renderer.terrainProgram, name, type, size, attribute);
        };
        this.worker.updateTerrainUniforms = (edges: number[], scales: number[], offsets: number[]) => {
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
            this.worker.requestTerrain();
            requestAnimationFrame((t) => {
                this.ticker.now = t;
                this.ticker.tick(t, () => {
                    this.worker.process();
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
