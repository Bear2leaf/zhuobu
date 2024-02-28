import BrowserDevice from "../device/BrowserDevice.js";

export default class CameraController extends HTMLElement {
    private readonly elChildren: HTMLElement[] = []
    private readonly translation = document.createElement("input");
    private readonly animation = document.createElement("input");
    private sendMessage?: (data: WorkerRequest) => void;
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.addChildren(Object.assign(document.createElement("h4"), { innerText: "Camera:" }))
        this.addChildren(Object.assign(document.createElement("p"), { innerText: "modelY:" }))
        this.addChildren(Object.assign(this.translation, {
            type: "number", step: "0.1", onchange: () => {
                this.sendMessage!({
                    type: "SyncState",
                    broadcast: true,
                    args: [{ modelTranslation: [0, parseFloat(this.translation.value), 0] }]
                })
            }
        }))
        this.addChildren(Object.assign(document.createElement("p"), { innerText: "animation:" }))
        this.addChildren(Object.assign(this.animation, {
            type: "checkbox", onchange: () => {
                this.sendMessage!({
                    type: "SyncState",
                    broadcast: true,
                    args: [{ animation: this.animation.checked }]
                })
            }
        }))
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        const device = new BrowserDevice();
        device.hideCanvas();
        console.log("CameraController.")
        device.createWorker("/dist/worker/index.js", (data, sendMessage) => {
            this.sendMessage = sendMessage;
            switch (data.type) {
                case "WorkerInit":
                    break;
                case "SendState":
                    this.animation.checked = !!data.args[0].animation;
                    this.translation.value = data.args[0].modelTranslation ? data.args[0].modelTranslation[1].toString() : "";
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }

}
