import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class ToggleUICommand extends WorkerMessageCommand {
    execute(): void {
        this.getReceiver().getSceneManager().toggleUIScene();
    }
}