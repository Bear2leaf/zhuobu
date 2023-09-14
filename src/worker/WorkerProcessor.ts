import AdarkroomMessageDecoder from "./decoder/AdarkroomMessageDecoder.js";
import { MessageDecoderDataType } from "./decoder/MessageDecoder.js";
import PingMessageDecoder from "./decoder/PingMessageDecoder.js";

declare module globalThis {
    var processor: WorkerProcessor;
}

export default class WorkerProcessor {
    private readonly pingDecoder: PingMessageDecoder;
    private readonly adarkroomDecoder: AdarkroomMessageDecoder;
    constructor() {
        this.pingDecoder = new PingMessageDecoder();
        this.adarkroomDecoder = new AdarkroomMessageDecoder();
        globalThis.processor = this;
    }
    onMessage(data: MessageDecoderDataType): void {
        this.pingDecoder.decode(data)
        this.adarkroomDecoder.decode(data);
        this.pingDecoder.execute(this);
        this.adarkroomDecoder.execute(this);
    }
    postMessage(data: MessageDecoderDataType): void { throw new Error("Method not implemented.") };
}