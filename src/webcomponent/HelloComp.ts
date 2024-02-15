import { WorkerResponse } from "../types/index.js";
import SocketWorker from "../worker/SocketWorker.js";

export default class HelloComp extends HTMLElement {
    private readonly socket: SocketWorker;
    constructor() {
        super();
        this.socket = new SocketWorker();
        this.socket.postMessage = this.onMessage.bind(this);
        setTimeout(() => {
            this.socket.onMessage!([
                { type: "HelloCompInit" }
            ]);
        }, 1000);
    }

    onMessage(data: WorkerResponse[]) {
        let res;
        while (res = data.shift()) {
            switch (res.type) {
                case "Refresh":
                    window.location.reload();
                    break;
                case "HelloCompInitWorker":
                    this.socket.onMessage!([
                        {
                            type: "GetCameraFov"
                        }
                    ])
                    break;
                case "SendCameraFov":
                    this.innerText = `Fov: ${res.args[0]}`
                default:
                    break;
            }
        }
    }

}
