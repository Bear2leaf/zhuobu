
export default interface WorkerDecoder {
    decode(worker: Worker, data: {type: string, args: unknown[]}): void;
}
