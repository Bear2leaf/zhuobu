import Worker from "./Worker.js";
let interval = 0;
export default class SocketWorker extends Worker {
    constructor() {
        super();
        self.addEventListener("message", (event) => {
            this.onMessage(event.data);
        });
        this.connectWebsocket();
    }
    connectWebsocket() {
        clearInterval(interval);
        const ws = new WebSocket('ws://localhost:4000');
        ws.onmessage = (event) => {
            this.postMessage(JSON.parse(event.data))
        }
        ws.onopen = () => {
            ws.send(JSON.stringify({
                ping: "Hello World!"
            }));
            interval = setInterval(() => {
                this.postMessage({
                    type: "Refresh",
                    args: []
                })
            }, 10000)
        }
        ws.onclose = () => {
            setTimeout(() => {
                this.connectWebsocket();
            }, 1000);
        }
    }
    postMessage(data: {type: string, args: unknown[]}): void {
        self.postMessage(data);
    }
    
}