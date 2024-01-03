import { WorkerRequest, WorkerResponse } from "../type.js";
import Worker from "./Worker.js";
export default class SocketWorker extends Worker {
    private readonly reconnectTimeout = 1000;
    constructor() {
        super();
        self.addEventListener("message", (event: { data: WorkerRequest }) => {
            this.onMessage(event.data);
        });
        this.connectWebsocket();
    }
    connectWebsocket() {
        try {
            console.debug("connecting");
            const ws = new WebSocket('ws://localhost:4000');
            ws.onmessage = (event) => {
                this.postMessage(JSON.parse(event.data))
            }
            ws.onopen = () => {
                console.debug("onopen");
                ws.send(JSON.stringify({
                    ping: "Hello World!"
                }));
            }
            ws.onclose = () => {
                console.debug("onclose");
                this.handleReconnect();
            }
            ws.onerror = () => {
                console.debug("onerror");
                this.handleReconnect();
            }
        } catch (e) {
            console.error("catch error", e);
            this.handleReconnect();
        }
    }
    handleReconnect() {

        console.debug("reconnect in " + this.reconnectTimeout + " milliseconds...");
        setTimeout(() => {
            this.connectWebsocket();
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