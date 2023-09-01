import Camera from "../camera/Camera.js";
import Matrix from "../geometry/Matrix.js";
import Component from "./Component.js";


export default class VisualizeCamera extends Component {
    private camera?: Camera;
    getCamera(): Camera {
        if (this.camera === undefined) {
            throw new Error("camera is not set");
        }
        return this.camera;
    }
    setCamera(camera: Camera) {
        this.camera = camera;
    }
    getFrustumTransformMatrix(): Matrix {
        return this.getCamera().getFrustumTransformMatrix();
    }
    getViewInverse(): Matrix {
        return this.getCamera().getViewInverse();
    }
}