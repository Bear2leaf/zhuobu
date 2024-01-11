import WorkerMessageCommand from "./WorkerMessageCommand.js";

export default class EngineInit extends WorkerMessageCommand {
    execute(): void {
        this.getReceiver().getSceneManager().loadInitScene();
    }
}