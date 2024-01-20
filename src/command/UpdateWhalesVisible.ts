import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateWhalesVisible extends WorkerMessageCommand {
    private readonly visible: boolean;
    constructor(visible: boolean) {
        super();
        this.visible = visible;
    }
    execute(): void {
        this.getReceiver().getSubject().getSceneManager().getEnvironmentScene().setWhalesVisible(this.visible);
    }
}