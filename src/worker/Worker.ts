import { WorkerRequest, WorkerResponse } from "./MessageProcessor.js";
import PingProcessor from "./PingProcessor.js";


export default class Worker {
    private readonly pingProcessor: PingProcessor;
    constructor() {
        this.pingProcessor = new PingProcessor();
    }
    onMessage(data: WorkerRequest): void {
        this.pingProcessor.decode(data)
        this.pingProcessor.execute(this);
    }
    postMessage(data: WorkerResponse): void { throw new Error("Method not implemented.") };
}