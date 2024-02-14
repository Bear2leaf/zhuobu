import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateEagleVisible extends WorkerMessageCommand {
    private readonly visible: boolean;
    constructor(visible: boolean) {
        super();
        this.visible = visible;
    }
    execute(): void {
        this.getEnvironmentScene!().setEagleVisible(this.visible);
    }
}