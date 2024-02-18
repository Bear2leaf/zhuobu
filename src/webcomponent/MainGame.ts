import BrowserDevice from "../device/BrowserDevice.js";
import Device from "../device/Device.js";
import Renderer from "../renderer/Renderer.js";

export default class MainGame extends HTMLElement {
    private readonly renderer: Renderer;
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
        this.initWorker(device);
        this.load(device).then(() => {
            this.renderer.init();
        });
    }
    async load(device: Device) {
        await device.loadSubpackage();
        await this.renderer.load(device);
    }
    initWorker(device: Device) {
        device.createWorker("dist/worker/index.js", (data, sendMessage) => {
            switch (data.type) {
                case "WorkerInit":
                    sendMessage({
                        type: "SyncState",
                        args: [{
                            foo: "bar"
                        }]
                    });
                    break;
                case "RequestSync":
                    sendMessage({
                        type: "SyncState"
                    });
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }

}
