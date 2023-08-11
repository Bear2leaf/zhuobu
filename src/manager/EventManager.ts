import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import OnClickToggleAudio from "../observer/OnClickToggleAudio.js";
import OnClickToggleScale from "../observer/OnClickToggleScale.js";
import Scene from "../scene/Scene.js";
import OnClickBottomLeftSubject from "../subject/OnClickBottomLeftSubject.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import OnClickSpriteSubject from "../subject/OnClickSpriteSubject.js";
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
        this.getSceneManager().all().forEach(scene => scene.getComponents(OnClickSubject).forEach(subject => {
            scene.getComponents(OnClickToggleAnim).forEach(component => {
                component.setSubject(subject);
                subject.register(component);
            });
        }));
        this.getSceneManager().all().forEach(scene => scene.getComponents(OnClickPickSubject).forEach(subject => {
            const component = subject.getEntity().get(OnClickPickSayHello);
            component.setSubject(subject);
            subject.register(component);
        }));
        this.getSceneManager().all().forEach(scene => scene.getComponents(OnClickBottomLeftSubject).forEach(subject => {
            scene.getComponents(OnClickToggleAudio).forEach(component => {
                component.setSubject(subject);
                subject.register(component);
            });
        }));
        this.getSceneManager().all().forEach(scene => scene.getComponents(OnClickSpriteSubject).forEach(subject => {
            scene.getComponents(OnClickToggleScale).forEach(component => {
                component.setSubject(subject);
                subject.register(component);
            });
        }));
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