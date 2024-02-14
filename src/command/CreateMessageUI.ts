import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class CreateMessageUI extends WorkerMessageCommand {
    execute(): void {
        this.createMessageUI!();
    }
}