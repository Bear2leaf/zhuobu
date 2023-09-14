import { WorkerDecoderDataType } from "../decoder/WorkerDecoder.js";
import WorkerProcessor from "./WorkerProcessor.js";

export default class MiniGameProcessor extends WorkerProcessor {
    constructor(private readonly worker: any) {
        super();
        worker.onMessage((data: WorkerDecoderDataType) => this.onMessage(data));
    }
    postMessage(data: WorkerDecoderDataType): void {
        this.worker.postMessage(data);
    }

}