import OnWorkerMessage from "../observer/OnWorkerMessage.js";
import { Command } from "./Command.js";

export default abstract class WorkerMessageCommand implements Command {
    private receiver?: OnWorkerMessage;
    setReceiver(receiver: OnWorkerMessage): void {
        this.receiver = receiver;
    }
    getReceiver(): OnWorkerMessage {
        if (!this.receiver) {
            throw new Error("receiver is undefined!");
        }
        return this.receiver;
    }
    abstract execute(): void ;
}