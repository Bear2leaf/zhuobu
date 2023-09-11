import WorkerDecoder from "./WorkerDecoder.js";

export default class InitDecoder implements WorkerDecoder {
    decode(worker: Worker, data: { type: string, args: unknown[] }): void {
        if (data.type !== "WorkerInit") {
            return
        }
        worker.postMessage({ type: "Ping", args: [4, 5, 6] })
    }
}