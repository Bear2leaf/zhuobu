import MessageProcessor, { WorkerRequest } from "./MessageProcessor.js";
import Worker from "./Worker.js";

export default class ConsoleProcessor extends MessageProcessor {
    execute(processor: Worker): void {
        if (this.getValid()) {
            console.debug(this.getType(), this.getArgs())
        }
    }
}