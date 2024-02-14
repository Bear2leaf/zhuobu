import Subject from "./Subject.js";
import WorkerMessageCommand from "../command/WorkerMessageCommand.js";
import OnWorkerMessage from "../observer/OnWorkerMessage.js";
import Observer from "../observer/Observer.js";

export default class WorkerMessageSubject extends Subject {
    private command?: WorkerMessageCommand;
    private readonly observers: OnWorkerMessage[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnWorkerMessage) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
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
        this.observers.forEach(observer => {
            observer.command = this.getCommand();
        })
        super.notify();
        this.observers.forEach(observer => {
            observer.command = undefined;
        });
    }

}
