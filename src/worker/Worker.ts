


export default class Worker {
    constructor() {
        (globalThis as unknown as { worker: Worker }).worker = this;
    }
    onMessage?: (data: WorkerRequest[]) => void;
    postMessage(data: WorkerResponse[]): void {
        throw new Error("Method not implemented.");
    };
}