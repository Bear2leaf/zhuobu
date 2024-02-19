import BrowserDevice from "../device/BrowserDevice.js";

export default class CameraController extends HTMLElement {
    private readonly elChildren: HTMLElement[] = []
    private sendMessage?: (data: WorkerRequest) => void;
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        const input = document.createElement("input");
        input.type = "number";
        input.step = "0.1";
        input.onchange = (ev) => {
            this.sendMessage!({
                type: "ChangeModelTranslation",
                broadcast: true,
                args: [[0, parseFloat(input.value), 0]]
            })
        }
        this.addChildren(input)
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        const device = new BrowserDevice();
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
                    console.log("Received: ", data);
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }

}
