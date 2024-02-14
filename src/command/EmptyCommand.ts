import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class EmptyCommand extends WorkerMessageCommand {
    execute(): void {
    }
}