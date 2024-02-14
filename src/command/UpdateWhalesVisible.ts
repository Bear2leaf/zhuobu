import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class UpdateWhalesVisible extends WorkerMessageCommand {
    private readonly visible: boolean;
    constructor(visible: boolean) {
        super();
        this.visible = visible;
    }
    execute(): void {
        this.getEnvironmentScene!().setWhalesVisible(this.visible);
    }
}