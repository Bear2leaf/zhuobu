import State from "./State.js";

export default class StandaloneState extends State {
    init(): void {
        super.init();
        this.device.onmessage = (data) => {
            this.onRequest(data);
        };
        console.log("This is StandaloneState.")
    }
    send(data: WorkerResponse) {
        this.onResponse(data);
        this.device.emit(data);
    }
}