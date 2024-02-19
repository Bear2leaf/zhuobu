import BrowserDevice from "../device/BrowserDevice.js";
import Device from "../device/Device.js";
import WorkerManager from "../manager/WorkerManager.js";
import Renderer from "../renderer/Renderer.js";

export default class MainGame extends HTMLElement {
    private readonly renderer: Renderer;
    private readonly workerManager: WorkerManager;
    private readonly elChildren: HTMLElement[] = []
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        const device = new BrowserDevice();
        this.renderer = new Renderer(device);
        this.workerManager = new WorkerManager();
        this.workerManager.init(device);
        this.workerManager.updateModelTranslation = this.renderer.updateModelTranslation.bind(this.renderer);
        this.load(device).then(() => {
            this.renderer.init();
        });
    }
    async load(device: Device) {
        await device.loadSubpackage();
        await this.renderer.load(device);
    }

}
