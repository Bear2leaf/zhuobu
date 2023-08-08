import DemoObserver from "../observer/DemoObserver.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import Scene from "../scene/Scene.js";
import OnClickSubject from "../subject/OnClickSubject.js";
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
        this.getScene().getComponents(OnClickSubject).forEach(subject => {
            this.getScene().getComponents(OnClickToggleAnim).forEach(component => {
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