import BrowserDevice from "../device/BrowserDevice.js";

export default class StateViewer extends HTMLElement {

    constructor() {
        super();
        const device = new BrowserDevice();
        console.log("StateView.")
        const title = document.createElement("h4");
        title.innerText = "State:"
        document.body.append(title)
        document.body.append(document.createElement("pre"))
        device.hideCanvas();
        device.createWorker("/dist/worker/index.js", (data, sendMessage) => {
            switch (data.type) {
                case "WorkerInit":
                    sendMessage({
                        type: "GetState"
                    });
                    break;
                case "SendState":
                    this.decodeState(...data.args);
                    break;
                case "Refresh":
                    device.reload();
                    break;
            }
        })
    }
    decodeState(state: StateData) {
        const codeBox = document.querySelector("pre")!;
        const listOfState: string[] = [];
        for (const key in state) {
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                const element = state[key as keyof StateData];
                listOfState.push(`${key}=${element}`)
            }
        }
        codeBox.innerText = listOfState.join("\n");
    }

}
