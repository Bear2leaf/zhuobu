import Observer from "./Observer.js";
import SceneManager from "../manager/SceneManager.js";
import WorkerMessageSubject from "../subject/WorkerMessageSubject.js";

export default class OnWorkerMessage extends Observer {
    private sceneManager?: SceneManager;
    getSubject(): WorkerMessageSubject {
        const subject = super.getSubject();
        if (!subject || !(subject instanceof WorkerMessageSubject)) throw new Error("subject is not set!");
        return subject;
    }

    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    public notify(): void {
        const command = this.getSubject().getCommand();
        command.addMessage = this.getSceneManager().addMessage.bind(this.getSceneManager());
        command.updateStatus = this.getSceneManager().updateStatus.bind(this.getSceneManager());
        command.toggleUIScene = this.getSceneManager().toggleUIScene.bind(this.getSceneManager());
        command.createMessageUI = this.getSceneManager().createMessageUI.bind(this.getSceneManager());
        command.getEnvironmentScene = this.getSceneManager().getEnvironmentScene.bind(this.getSceneManager());
        command.getInformationObject = this.getSceneManager().getInformationObject.bind(this.getSceneManager());
        command.loadInitScene = this.getSceneManager().loadInitScene.bind(this.getSceneManager());
        command.execute();
    }
}
