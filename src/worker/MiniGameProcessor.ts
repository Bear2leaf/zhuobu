import WorkerProcessor from "./WorkerProcessor.js";

export default class MiniGameProcessor extends WorkerProcessor {
    constructor(private readonly worker: any) {
        super();
        worker.onMessage((data: {type: string, args: unknown[]}) => this.onMessage(data));
    }
    postMessage(data: {type: string, args: unknown[]}): void {
        this.worker.postMessage(data);
    }

}