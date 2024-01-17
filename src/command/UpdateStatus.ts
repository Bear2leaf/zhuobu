import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateStatus extends WorkerMessageCommand {
    private readonly message: string;
    constructor(message: string) {
        super();
        this.message = message;
    }
    execute(): void {
        this.getReceiver().getSubject().getSceneManager().updateStatus(this.message);
    }
}