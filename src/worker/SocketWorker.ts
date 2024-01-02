import { WorkerRequest, WorkerResponse } from "../type/index.js";
import Worker from "./Worker.js";
export default class SocketWorker extends Worker {
    private readonly reconnectTimeout = 2000;
    constructor() {
        super();
        self.addEventListener("message", (event: { data: WorkerRequest }) => {
            this.onMessage(event.data);
        });
        this.connectWebsocket();
    }
    connectWebsocket() {
        try {
            const ws = new WebSocket('ws://localhost:4000');
            ws.onmessage = (event) => {
                this.postMessage(JSON.parse(event.data))
            }
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    ping: "Hello World!"
                }));
            }
            ws.onclose = () => {
                console.log("onclose");
                this.handleReconnect();
            }
            ws.onerror = () => {
                console.log("onerror");
                this.handleReconnect();
            }
        } catch (e) {
            console.error("catch error", e);
            this.handleReconnect();
        }
    }
    handleReconnect() {

        console.log("reconnect in " + this.reconnectTimeout + " milliseconds...");
        setTimeout(() => {
            this.postRefresh();
        }, this.reconnectTimeout);
    }
    postMessage(data: WorkerResponse): void {
        self.postMessage(data);
    }
    postRefresh() {
        this.postMessage({
            type: "Refresh",
            args: []
        })
    }

}