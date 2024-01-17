import Observer from "./Observer.js";
import WorkerMessageSubject from "../subject/WorkerMessageSubject.js";

export default class OnWorkerMessage extends Observer {
    getSubject(): WorkerMessageSubject {
        if (!(super.getSubject() instanceof WorkerMessageSubject)) {
            throw new Error("subject is not WorkerMessageSubject!");
        }
        return super.getSubject() as WorkerMessageSubject;
    }
    public notify(): void {
        const subject = this.getSubject();
        const command = subject.getCommand();
        command.setReceiver(this);
        command.execute();
    }
}
