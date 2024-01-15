import AnimationController from "../controller/AnimationController.js";
import CameraController from "../controller/CameraController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import MoveCircleController from "../controller/MoveCircleController.js";
import AdrText from "../drawobject/Message.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import AnimationManager from "../manager/AnimationManager.js";
import CameraManager from "../manager/CameraManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import TerrianMesh from "../drawobject/TerrianMesh.js";

export default class OnEntityUpdate extends Observer {

    private cameraManager?: CameraManager;
    private animationManager?: AnimationManager;
    setCameraManager(cameraManager: CameraManager) {
        this.cameraManager = cameraManager;
    }
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    setAnimationManager(animationManager: AnimationManager) {
        this.animationManager = animationManager;
    }
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.has(Mesh)) {
            entity.get(Mesh).update();
        }
        if (entity.has(AnimationController) && this.animationManager) {
            entity.get(AnimationController).update();
            if (entity.has(GLTFAnimationController)) {
                this.animationManager.gltfAnimator.animate(entity.get(GLTFAnimationController));
            } else if (entity.has(MoveCircleController)) {
                this.animationManager.circleAnimator.animate(entity.get(MoveCircleController));
            } else if (entity.has(CameraController) && this.cameraManager) {
                entity.get(CameraController).setCamera(this.cameraManager.getMainCamera());
                this.animationManager.cameraAnimator.animate(entity.get(CameraController));
            }
        }
        if ((entity.has(TerrianMesh) ) && this.cameraManager) {

            const gltf = entity.get(TerrianMesh).getGLTF();
            if (!gltf) {
                throw new Error("gltf not found");
            }
            const camera = gltf.getCameraByIndex(0);
            const aspect = camera.getPerspective().getAspectRatio();
            const fov = camera.getPerspective().getYFov();
            const near = camera.getPerspective().getZNear();
            const far = camera.getPerspective().getZFar();

            const node = gltf.getNodeByIndex(1);
            if (!node) {
                throw new Error("node not found");
            }
            const trs =node.getNode().getSource();
            if (!trs) {
                throw new Error("trs not found");
            }
            this.cameraManager.getMainCamera().fromGLTF(trs.getPosition(), trs.getRotation(), aspect, fov, near, far);
        }
        if (entity.has(Pointer)) {
            entity.get(Pointer).update();
        }
        if (entity.has(DrawObject)) {
            entity.all(DrawObject).forEach(drawobject => drawobject.updateModel());
        }
    }

}
