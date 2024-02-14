import Subject from "./Subject.js";
import WorkerMessageCommand from "../command/WorkerMessageCommand.js";

export default class WorkerMessageSubject extends Subject {
    private command?: WorkerMessageCommand;
    setCommand(command: WorkerMessageCommand): void {
        this.command = command;
    }
    getCommand(): WorkerMessageCommand {
        if (!this.command) {
            throw new Error("command is undefined!");
        }
        return this.command;
    }
    public notify(): void {
        super.notify();
        this.command = undefined;
    }

}
