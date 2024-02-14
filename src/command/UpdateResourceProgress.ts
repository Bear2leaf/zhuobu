import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateResourceProgress extends WorkerMessageCommand {
    private readonly progress: number;
    constructor(progress: number) {
        super();
        this.progress = progress;
    }
    execute(): void {
        this.getEnvironmentScene!().updateResourceProgress(this.progress);
    }
}