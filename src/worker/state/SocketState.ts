import State from "./State.js";

export default class SocketState extends State {
    private ws?: WebSocket;
    private connectWebsocket() {
        const ws = this.ws = new WebSocket('ws://localhost:4000');
        self.onclose = () => ws.close();
        ws.onopen = () => {
            this.device.onmessage = this.decode.bind(this);
        }
        ws.onmessage = (event) => {
            this.device.emit(JSON.parse(event.data))
        }
    }
    private send(data: WorkerResponse) {
        this.ws!.send(JSON.stringify(data))
    }
    init() {
        super.init();
        this.connectWebsocket();
    }
    get(): void {
        const state = this.state;
        this.send({
            type: "SendState",
            target: "broadcast",
            args: [state]
        });
    }
    sync() {
        this.send({
            type: "RequestSync",
            target: "broadcast"
        })
    }

}