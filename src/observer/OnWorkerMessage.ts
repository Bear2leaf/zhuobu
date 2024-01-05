import Observer from "./Observer.js";
import WorkerMessageSubject from "../subject/WorkerMessageSubject.js";
import SceneManager from "../manager/SceneManager.js";

export default class OnWorkerMessage extends Observer {
    private sceneManager?: SceneManager;
    getSubject(): WorkerMessageSubject {
        if (!(super.getSubject() instanceof WorkerMessageSubject)) {
            throw new Error("subject is not WorkerMessageSubject!");
        }
        return super.getSubject() as WorkerMessageSubject;
    }
    public notify(): void {
        const subject = this.getSubject();
        const command = subject.getCommand();
        command.setReceiver(this);
        command.execute();
    }
    setSceneManager(sceneManager: SceneManager): void {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (!this.sceneManager) {
            throw new Error("sceneManager is undefined!");
        }
        return this.sceneManager;
    }
}
