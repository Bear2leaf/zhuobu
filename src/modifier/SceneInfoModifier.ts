import CircleAnimator from "../animator/CircleAnimator.js";
import SceneManager from "../manager/SceneManager.js";
import Node from "../transform/Node.js";
import Modifier from "./Modifier.js";

export default class SceneInfoModifier extends Modifier {
    private sceneManager?: SceneManager;
    private sceneNumber: number = 0;
    private firstSceneEntityNumber: number = 0;
    private secondNodeWorldMatrix: Float32Array = new Float32Array(12);
    private updateSceneNumber() {
        this.sceneNumber = this.getSceneManager().all().length;
    }
    private updateFirstSceneEntityNumber() {
        this.firstSceneEntityNumber = this.getSceneManager().first().getDefaultEntities().length;
    }
    private updateSpriteNodeWorldMatrix() {
        this.secondNodeWorldMatrix = this.getSceneManager().first().getComponents(CircleAnimator)[0].getEntity().get(Node).getWorldMatrix().getVertics();
    }
    update(): void {
        this.updateSceneNumber();
        this.updateFirstSceneEntityNumber();
        this.updateSpriteNodeWorldMatrix();
        super.update();
    }
    toggleSecondNodeScale(checked: boolean) {
        if (checked) {
            this.getSceneManager().first().getComponents(CircleAnimator)[0].getEntity().get(Node).getSource()?.getScale().set(20, 20, 20);
        } else {
            this.getSceneManager().first().getComponents(CircleAnimator)[0].getEntity().get(Node).getSource()?.getScale().set(10, 10, 10);
        }
    }
    getSceneNumber() {
        return this.sceneNumber;
    }
    getFirstSceneEntityNumber() {
        return this.firstSceneEntityNumber;
    }
    getSpriteNodeWorldMatrix() {
        return this.secondNodeWorldMatrix;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }

}