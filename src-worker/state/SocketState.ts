import State from "./State.js";

export default class SocketState extends State {
    private ws?: WebSocket;
    private connectWebsocket() {
        const ws = this.ws = new WebSocket('ws://localhost:4000');
        self.onclose = () => ws.close();
        ws.onopen = () => {
            this.device.onmessage = (data) => {
                this.onRequest(data);
            };
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.onResponse(data);
            this.device.emit(data)
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
            broadcast: true,
            args: [state]
        });
    }
    sync() {
        this.send({
            type: "RequestSync",
            broadcast: true
        })
    }
    changeModelTranslation(translation: [number, number, number]): void {
        this.send({
            type: "SendModelTranslation",
            broadcast: true,
            args: [translation]
        })
    }

}