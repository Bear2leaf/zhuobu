import WorkerDevice from "./WorkerDevice";

export default class BrowserWorker implements WorkerDevice {
    private readonly messageQueue: WorkerRequest[] = [];
    private readonly interval = 100;
    constructor() {
        self.onmessage = result => this.messageQueue.push(result.data);
        setInterval(() => {
            if (this.onmessage && this.messageQueue.length) {
                this.onmessage(this.messageQueue.shift()!);
            }
        }, this.interval);
    }
    onmessage?: (data: WorkerRequest)=> void;
    emit(data: WorkerResponse): void {
        self.postMessage(data)
    }
}