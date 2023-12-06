import Entity from "../../entity/Entity.js";
import SceneManager from "../../manager/SceneManager.js";

export default abstract class AdrAdapter {
    private sceneManager?: SceneManager;
    private root?: Entity;
    private entity?: Entity;
    getSceneManager() {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    getEntity() {
        if (!this.entity) {
            throw new Error("Entity not found");
        }
        return this.entity;
    }
    setRoot(root: Entity) {
        this.root = root;
    }
    getRoot() {
        if (!this.root) {
            throw new Error("Root not found");
        }
        return this.root;
    }
    abstract init(): void;
}