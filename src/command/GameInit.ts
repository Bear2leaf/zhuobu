import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class GameInit extends WorkerMessageCommand {
    execute(): void {
        this.getReceiver().getSceneManager().loadInitScene();
    }
}