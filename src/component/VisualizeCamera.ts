import { MainCamera } from "../camera/MainCamera.js";
import Matrix from "../math/Matrix.js";
import Component from "./Component.js";


export default class VisualizeCamera extends Component {
    private camera?: MainCamera;
    getMainCamera(): MainCamera {
        if (this.camera === undefined) {
            throw new Error("Main camera is not set");
        }
        return this.camera;
    }
    setMainCamera(camera: MainCamera) {
        this.camera = camera;
    }
    getFrustumTransformMatrix(): Matrix {
        return this.getMainCamera().getFrustumTransformMatrix();
    }
    getViewInverse(): Matrix {
        return this.getMainCamera().getViewInverse();
    }
}