import Worker from "./Worker.js";

export type MiniGameWorkerType = { onMessage: (callback: (data: WorkerRequest) => void) => void, postMessage: (data: WorkerResponse) => void }

export default class MiniGameWorker extends Worker {
    constructor(private readonly worker: MiniGameWorkerType) {
        super();
        this.onMessage = console.log
        worker.onMessage((data: WorkerRequest) => {

            if (this.onMessage === undefined) {
                throw new Error("onMessage is undefined");
            }
            this.onMessage(data);
        });
    }
    postMessage(data: WorkerResponse): void {
        this.worker.postMessage(data);
    }
}