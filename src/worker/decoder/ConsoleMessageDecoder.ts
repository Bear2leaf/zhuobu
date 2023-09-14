import WorkerProcessor from "../WorkerProcessor.js";
import MessageDecoder, { MessageDecoderDataType } from "./MessageDecoder.js";

export default class ConsoleMessageDecoder extends MessageDecoder {
    private args: unknown[] = [];
    private type?: string;
    decode(data: MessageDecoderDataType): void {
        this.setValid(data.subject === 'Console');
        this.args = data.args;
        this.type = data.type;
    }
    getType() {
        if (this.type === undefined) {
            throw new Error("type is not defined")
        }
        return this.type;
    }
    execute(processor: WorkerProcessor): void {
        if (this.getValid()) {
            console.debug(this.type, this.args)
            if (this.type === "Ping") {
                processor.postMessage({ type: "Pong", args: [1, 2, 3], subject: "Console" });
            }
        }
    }
}