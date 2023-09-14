import WorkerProcessor from "../WorkerProcessor.js";
import ConsoleMessageDecoder from "./ConsoleMessageDecoder.js";
import { MessageDecoderDataType } from "./MessageDecoder.js";

export default class PingMessageDecoder extends ConsoleMessageDecoder {
    decode(data: MessageDecoderDataType): void {
        super.decode(data);
        if (this.getValid()) {
            this.setValid(this.getType() === "Ping");
        }
    }
    execute(processor: WorkerProcessor): void {
        super.execute(processor);
        if (this.getValid()) {
            processor.postMessage({ type: "Pong", args: [1, 2, 3], subject: "Console" });
        }
    }
}