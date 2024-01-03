import { WorkerRequest, WorkerResponse } from "../type.js";
import Worker from "./Worker.js";

export type MiniGameWorkerType = {onMessage: (callback: (data: WorkerRequest) => void) => void, postMessage: (data: WorkerResponse) => void}

export default class MiniGameWorker extends Worker {
    constructor(private readonly worker: MiniGameWorkerType) {
        super();
        worker.onMessage((data: WorkerRequest) => this.onMessage(data));
    }
    postMessage(data: WorkerResponse): void {
        this.worker.postMessage(data);
    }
}