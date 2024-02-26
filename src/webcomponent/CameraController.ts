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
        const label = document.createElement("label");
        label.innerText = "CameraY:"
        this.addChildren(label)
        const inputModelTranslation = this.translation;
        inputModelTranslation.type = "number";
        inputModelTranslation.step = "0.1";
        inputModelTranslation.onchange = (ev) => {
            this.sendMessage!({
                type: "SyncState",
                broadcast: true,
                args: [{ modelTranslation: [0, parseFloat(inputModelTranslation.value), 0] }]
            })
        }
        this.addChildren(inputModelTranslation)
        const checkboxAnimation = this.animation;
        checkboxAnimation.type = "checkbox";

        checkboxAnimation.onchange = (ev) => {
            this.sendMessage!({
                type: "SyncState",
                broadcast: true,
                args: [{ animation: checkboxAnimation.checked }]
            })
        }
        this.addChildren(checkboxAnimation)
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        const device = new BrowserDevice();
        device.hideCanvas();
        console.log("CameraController.")
        device.createWorker("/dist-worker/index.js", (data, sendMessage) => {
            this.sendMessage = sendMessage;
            switch (data.type) {
                case "WorkerInit":
                    sendMessage({
                        type: "GetState"
                    });
                    break;
                case "SendState":
                    this.animation.checked = !!data.args[0].animation;
                    this.translation.value = data.args[0].modelTranslation? data.args[0].modelTranslation[1].toString() : "";
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }

}
