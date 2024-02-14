import Observer from "./Observer.js";
import Command from "../command/Command.js";

export default class OnWorkerMessage extends Observer {
    command?: Command;

    public notify(): void {
        const command = this.command!;
        command.execute();
    }
}
