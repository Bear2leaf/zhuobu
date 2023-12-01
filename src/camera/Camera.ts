import Matrix from "../geometry/Matrix.js";
import SceneManager from "../manager/SceneManager.js";

export default abstract class Camera {
    private sceneManager?: SceneManager;
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    abstract init(): void;
    abstract setSize(width: number, height: number): void;
    abstract getView(): Matrix;
    abstract getProjection(): Matrix;

    getFrustumTransformMatrix(): Matrix {
        return this.getView().inverse()
            .multiply(this.getProjection().inverse());
    }
    getViewInverse(): Matrix {
        return this.getView().inverse();
    }
}


