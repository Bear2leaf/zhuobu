import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateResourceProgress extends WorkerMessageCommand {
    private readonly progress: number;
    constructor(progress: number) {
        super();
        this.progress = progress;
    }
    execute(): void {
        this.getReceiver().getSubject().getSceneManager().getEnvironmentScene().updateResourceProgress(this.progress);
    }
}