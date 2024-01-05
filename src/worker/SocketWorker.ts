import Worker from "./Worker.js";
export default class SocketWorker extends Worker {
    private readonly messageQueue: WorkerRequest[] = [];
    private readonly reconnectTimeout = 1000;
    private reconnectCount = 0;
    constructor() {
        super();
        self.addEventListener("message", (event: { data: WorkerRequest }) => {
            this.messageQueue.push(event.data);
        });
        this.connectWebsocket();
        setInterval(() => this.processMessageQueue(), 100);
    }
    processMessageQueue() {
        if (this.onMessage) {
            while(this.messageQueue.length) {
                const request = this.messageQueue.shift();
                if (request === undefined) {
                    throw new Error("message queue is empty.");
                }
                this.onMessage(request);
            }
        }
    }
    connectWebsocket() {
        try {
            console.debug("connecting");
            const ws = new WebSocket('ws://localhost:4000');
            ws.onmessage = (event) => {
                console.debug("onmessage");
                this.postMessage(JSON.parse(event.data))
            }
            ws.onopen = () => {
                console.debug("onopen");
                this.reconnectCount = 0;
                this.onMessage = (data: WorkerRequest) => {
                    ws.send(JSON.stringify(data))
                };
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
        this.reconnectCount++;
        if (this.reconnectCount > 10) {
            throw new Error("reconnect count is too high, wait for double the reconnect timeout")
        }
        console.debug("reconnect in " + this.reconnectTimeout + " milliseconds...");
        setTimeout(() => {
            this.connectWebsocket();
        }, this.reconnectTimeout * 2);
    }
    postMessage(data: WorkerResponse): void {
        self.postMessage(data);
    }

}