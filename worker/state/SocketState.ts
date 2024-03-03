import State from "./State.js";

export default class SocketState extends State {
    private readonly ws: WebSocket = new WebSocket('ws://localhost:4000/ws');
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private ready = false;
    private connectWebsocket() {
        const ws = this.ws;
        self.onclose = () => ws.close();
        ws.onopen = () => {
            this.ready = true;
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.device.emit(data);
        }
    }
    process() {
        if (this.ready && this.responseQueue.length) {
            const data = this.responseQueue.shift()!;
            this.ws.send(JSON.stringify(data));
        } else if (this.ready && this.requestQueue.length) {
            const data = this.requestQueue.shift()!
            this.onRequest(data);
        } else {
        }
    }
    send(data: WorkerResponse) {
        this.onResponse(data);
        this.responseQueue.push(data);
    }
    init() {
        this.device.onmessage = (data) => {
            this.requestQueue.push(data);
        };
        super.init();
        this.connectWebsocket();
        setInterval(() => {
            this.process();
        }, 10);
    }

}