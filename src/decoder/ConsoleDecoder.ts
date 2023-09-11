import WorkerDecoder from "./WorkerDecoder.js";

export default class ConsoleDecoder implements WorkerDecoder {
    decode(worker: Worker, data: { type: string; args: unknown[]; }): void {
        console.log(data);
    }
}