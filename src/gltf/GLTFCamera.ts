import GLTFCameraOrthographic from "./GLTFCameraOrthographic.js";
import GLTFCameraPerspective from "./GLTFCameraPerspective.js";

export default class GLTFCamera {
    private readonly name: string;
    private readonly type: string;
    private readonly orthographic: GLTFCameraOrthographic;
    private readonly perspective: GLTFCameraPerspective;
    constructor(camera: GLTFCamera) {
        this.name = camera.name;
        this.type = camera.type;
        this.orthographic = new GLTFCameraOrthographic(camera.orthographic);
        this.perspective = new GLTFCameraPerspective(camera.perspective);
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getOrthographic() {
        return this.orthographic;
    }
    getPerspective() {
        return this.perspective;
    }
}