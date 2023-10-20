import Scene from "../scene/Scene.js";
import Node from "../transform/Node.js";
import Modifier from "./Modifier.js";

export default class SceneInfoModifier implements Modifier {
    private scene?: Scene;
    private sceneNumber: number = 0;
    private firstSceneEntityNumber: number = 0;
    private secondNodeWorldMatrix: Float32Array = new Float32Array(12);
    updateSceneNumber(length: number) {
        this.sceneNumber = length;
    }
    updateFirstSceneEntityNumber(length: number) {
        this.firstSceneEntityNumber = length;
    }
    updateSecondNodeWorldMatrix(matrix: Float32Array) {
        this.secondNodeWorldMatrix = matrix;
    }
    getSceneNumber() {
        return this.sceneNumber;
    }
    getFirstSceneEntityNumber() {
        return this.firstSceneEntityNumber;
    }
    getSecondNodeWorldMatrix() {
        return this.secondNodeWorldMatrix;
    }
    setScene(scene: Scene) {
        this.scene = scene;
    }
    toggleSecondNodeScale(checked: boolean) {

        if (checked) {
            this.scene?.getComponents(Node)[1].getSource()?.getScale().set(20, 20, 20);
        } else {
            this.scene?.getComponents(Node)[1].getSource()?.getScale().set(10, 10, 10);
        }
    }

}