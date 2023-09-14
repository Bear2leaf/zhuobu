import WorkerProcessor from "../WorkerProcessor.js";
import MessageDecoder, { MessageDecoderDataType } from "./MessageDecoder.js";

export default class ConsoleMessageDecoder extends MessageDecoder {
    decode(data: MessageDecoderDataType): void {
        super.decode(data);
        if (this.getValid()) {
            this.setValid(data.subject === 'Console');
        }
    }
    execute(processor: WorkerProcessor): void {
        if (this.getValid()) {
            console.debug(this.getType(), this.getArgs())
        }
    }
}