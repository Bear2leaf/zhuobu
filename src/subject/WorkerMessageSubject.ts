import WorkerMessageCommand from "../command/WorkerMessageCommand.js";
import ToggleUICommand from "../command/ToggleUICommand.js";
import Subject from "./Subject.js";
import CreateMessageUI from "../command/CreateMessageUI.js";

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
    notifyToggleUI(): void {
        this.setCommand(new ToggleUICommand());
        this.notify();
    }
    notifyCreateMessageUI(): void {
        this.setCommand(new CreateMessageUI());
        this.notify();
    }
    public notify(): void {
        super.notify();
        this.command = undefined;
    }

}
