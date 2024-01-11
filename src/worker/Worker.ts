import { WorkerRequest, WorkerResponse } from "./script/WorkerMessageType.js";



export default class Worker {
    constructor() {
        (globalThis as unknown as { worker: Worker }).worker = this;
        this.postMessage([{ type: "WorkerInit" }]);
    }
    onMessage?: (data: WorkerRequest[]) => void;
    postMessage(data: WorkerResponse[]): void {
        throw new Error("Method not implemented.");
    };
}