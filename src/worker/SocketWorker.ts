import { WorkerRequest, WorkerResponse } from "../types/index.js";
import Worker from "./Worker.js";
export default class SocketWorker extends Worker {
    private readonly messageQueue: WorkerRequest[] = [];
    private readonly interval = 100;
    private timerId: number = 0;
    constructor() {
        super();
        self.addEventListener("message", (event: { data: WorkerRequest }) => {
            this.messageQueue.push(event.data);
        });
        this.connectWebsocket();
        setInterval(() => this.processMessageQueue(), this.interval);
    }
    processMessageQueue() {
        if (this.onMessage && this.messageQueue.length) {
            this.onMessage(this.messageQueue.splice(0, this.messageQueue.length));
        }
    }
    connectWebsocket() {
        const ws = new WebSocket('ws://localhost:4000');
        ws.onmessage = (event) => {
            this.postMessage(JSON.parse(event.data))
        }
        ws.onopen = () => {
            if (this.timerId) {
                this.postMessage([{ type: "Reconnect" }])
            }
            this.onMessage = (data: WorkerRequest[]) => {
                ws.send(JSON.stringify(data))
            };
        }
        ws.onclose = () => {
            this.handleReconnect();
        }
        ws.onerror = () => {
            this.handleReconnect();
        }
    }
    handleReconnect() {
        console.debug("reconnect in " + this.interval + " milliseconds...");
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.connectWebsocket();
        }, this.interval) as unknown as number;
    }
    postMessage: (data: WorkerResponse[])=> void = (data) => {
        self.postMessage(data);
    }

}