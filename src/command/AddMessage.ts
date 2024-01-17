import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class AddMessage extends WorkerMessageCommand {
    private readonly message: string;
    constructor(message: string) {
        super();
        this.message = message;
    }
    execute(): void {
        this.getReceiver().getSubject().getSceneManager().addMessage(this.message);
    }
}