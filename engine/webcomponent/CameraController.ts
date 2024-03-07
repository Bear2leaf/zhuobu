import BrowserDevice from "../device/BrowserDevice.js";

export default class CameraController extends HTMLElement {
    private readonly elChildren: HTMLElement[] = []
    private readonly modelY = document.createElement("input");
    private readonly eyeY = document.createElement("input");
    private readonly eyeZ = document.createElement("input");
    private readonly animation = document.createElement("input");
    private sendMessage?: (data: WorkerRequest) => void;
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.addChildren(Object.assign(document.createElement("h4"), { innerText: "Island:" }))
        this.addChildren(Object.assign(document.createElement("p"), { innerText: "modelY:" }))
        this.addChildren(Object.assign(this.modelY, {
            type: "number", step: "0.1", onchange: () => {
                this.sendMessage!({
                    type: "SyncState",
                    broadcast: true,
                    args: [{ modelTranslation: [0, parseFloat(this.modelY.value), 0] }]
                })
            }
        }))
        this.addChildren(Object.assign(document.createElement("h4"), { innerText: "Camera:" }))
        this.addChildren(Object.assign(document.createElement("p"), { innerText: "eyeY:" }))
        this.addChildren(Object.assign(this.eyeY, {
            type: "number", step: "0.1", onchange: () => {
                this.sendMessage!({
                    type: "SyncState",
                    broadcast: true,
                    args: [{
                        cameras: [
                            {
                                name: "refract",
                                eye: [0, parseFloat(this.eyeY.value), parseFloat(this.eyeZ.value)]
                            },
                            {
                                name: "reflect",
                                eye: [0, -parseFloat(this.eyeY.value), parseFloat(this.eyeZ.value)]
                            }
                        ]
                    }]
                })
            }
        }))
        this.addChildren(Object.assign(document.createElement("p"), { innerText: "eyeZ:" }))
        this.addChildren(Object.assign(this.eyeZ, {
            type: "number", step: "0.1", onchange: () => {
                this.sendMessage!({
                    type: "SyncState",
                    broadcast: true,
                    args: [{
                        cameras: [
                            {
                                name: "refract",
                                eye: [0, parseFloat(this.eyeY.value), parseFloat(this.eyeZ.value)]
                            },
                            {
                                name: "reflect",
                                eye: [0, -parseFloat(this.eyeY.value), parseFloat(this.eyeZ.value)]
                            }
                        ]
                    }]
                })
            }
        }))
        this.addChildren(Object.assign(document.createElement("h4"), { innerText: "Animation:" }))
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
                case "SendState":
                    if (data.args[0].animation !== undefined) {
                        this.animation.checked = data.args[0].animation;
                    }
                    if (data.args[0].modelTranslation !== undefined) {
                        this.modelY.value = data.args[0].modelTranslation[1].toString();
                    }
                    if (data.args[0].cameras !== undefined) {
                        this.eyeY.value = data.args[0].cameras[0].eye![1].toString();
                        this.eyeZ.value = data.args[0].cameras[0].eye![2].toString();
                    }
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }

}
