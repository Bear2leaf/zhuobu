import BrowserDevice from "../device/BrowserDevice.js";

export default class StateViewer extends HTMLElement {
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
        console.log("StateView.")
        device.createWorker("/dist-worker/index.js", (data, sendMessage) => {
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
