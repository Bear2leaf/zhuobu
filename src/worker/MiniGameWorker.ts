import { WorkerRequest, WorkerResponse } from "./MessageProcessor.js";
import Worker from "./Worker.js";

export default class MiniGameWorker extends Worker {
    constructor(private readonly worker: any) {
        super();
        worker.onMessage((data: WorkerRequest) => this.onMessage(data));
    }
    postMessage(data: WorkerResponse): void {
        this.worker.postMessage(data);
    }
}