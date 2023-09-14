import { WorkerDecoderDataType } from "../decoder/WorkerDecoder.js";
import ConsoleMessageDecoder from "./decoder/ConsoleMessageDecoder.js";


export default class WorkerProcessor {
    private readonly consoleDecoder: ConsoleMessageDecoder;
    constructor() {
        this.consoleDecoder = new ConsoleMessageDecoder();
    }
    onMessage(data: WorkerDecoderDataType): void {
        this.consoleDecoder.decode(data)
        this.consoleDecoder.execute(this);
    }
    postMessage(data: WorkerDecoderDataType): void { throw new Error("Method not implemented.") };
}