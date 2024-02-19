import WorkerDevice from "./WorkerDevice";

export default class BrowserWorker implements WorkerDevice {
    private readonly requestQueue: WorkerRequest[] = [];
    private readonly responseQueue: WorkerResponse[] = [];
    private readonly interval = 100;
    constructor() {
        self.onmessage = result => this.requestQueue.push(result.data);
        setInterval(() => {
            if (this.onmessage && this.requestQueue.length) {
                this.onmessage(this.requestQueue.shift()!);
            } else if (this.responseQueue.length) {
                self.postMessage(this.responseQueue.shift())
            }
        }, this.interval);
    }
    onmessage?: (data: WorkerRequest)=> void;
    emit(data: WorkerResponse): void {
        this.responseQueue.push(data);
    }
}