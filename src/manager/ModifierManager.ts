import TextureContainer from "../container/TextureContainer.js";
import Component from "../entity/Component.js";
import Modifier from "../modifier/Modifier.js";
import SceneInfoModifier from "../modifier/SceneInfoModifier.js";
import TimestepModifier from "../modifier/TimestepModifier.js";
import Scene from "../scene/Scene.js";
import Node from "../transform/Node.js";
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
        this.get(SceneInfoModifier).setScene(this.getScene());
    }
    update(): void {
        this.get(SceneInfoModifier).updateSceneNumber(this.getSceneManager().all().length);
        this.get(SceneInfoModifier).updateFirstSceneEntityNumber(this.getSceneManager().first().getDefaultEntities().length);
        this.get(SceneInfoModifier).updateSecondNodeWorldMatrix(this.getSceneManager().first().getComponents(Node)[1].getWorldMatrix().getVertics());
        this.get(TimestepModifier).updateTimestepInfo(`Fps: ${this.getTimestepManager().getFPS()}, Frames: ${this.getTimestepManager().getFrames()}, Delta: ${this.getTimestepManager().getDelta()}`);
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