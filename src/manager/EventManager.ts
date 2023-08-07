import DemoObserver from "../observer/DemoObserver.js";
import Scene from "../scene/Scene.js";
import DemoSubject from "../subject/DemoSubject.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";


export default class EventManager extends Manager<unknown> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
        ].forEach(ctor => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }
    init(): void {
        this.getScene().getComponents(DemoSubject).forEach(subject => {
            this.getScene().getComponents(DemoObserver).forEach(component => {
                component.setSubject(subject);
                subject.register(component);
            });
        });
    }
    update(): void {
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}