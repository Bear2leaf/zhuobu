import WorkerProcessor from "../WorkerProcessor.js";
import MessageDecoder, { MessageDecoderDataType } from "./MessageDecoder.js";
import '../adarkroom/worker.js'

export default class AdarkroomMessageDecoder extends MessageDecoder {
    constructor() {
        super();
    }
    decode(data: MessageDecoderDataType): void {
        if (this.getValid()) {
            this.setValid(data.subject === 'Adarkroom');
        }
    }
    execute(processor: WorkerProcessor): void {
        if (this.getValid()) {
        }
    }
}