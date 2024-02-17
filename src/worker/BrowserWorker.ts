import WorkerDevice from "./WorkerDevice";

export default class BrowserWorker implements WorkerDevice {
    constructor() {
        self.onmessage = result => this.onmessage(result.data);
    }
    onmessage(data: WorkerRequest): void {
        console.log(data)
    }
    emit(data: WorkerResponse): void {
        self.postMessage(data)
    }
}