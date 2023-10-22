import Modifier from "../modifier/Modifier.js";
import SceneInfoModifier from "../modifier/SceneInfoModifier.js";
import TimestepModifier from "../modifier/TimestepModifier.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import TimestepManager from "./TimestepManager.js";

export default class ModifierManager extends Manager<Modifier> {
    private timestepManager?: TimestepManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            SceneInfoModifier,
            TimestepModifier
        ].forEach(ctor => {
            this.add<Modifier>(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.get(SceneInfoModifier).setSceneManager(this.getSceneManager());
        this.get(TimestepModifier).setTimestepManager(this.getTimestepManager());
    }
    update(): void {
        this.all().forEach(modifier => modifier.update());
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
    setTimestepManager(timestepManager: TimestepManager) {
        this.timestepManager = timestepManager;
    }
    getTimestepManager(): TimestepManager {
        if (this.timestepManager === undefined) {
            throw new Error("timestepManager is undefined");
        }
        return this.timestepManager;
    }

}