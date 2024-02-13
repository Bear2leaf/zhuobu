import AnimationController from "../controller/AnimationController.js";
import CameraController from "../controller/CameraController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import MoveCircleController from "../controller/MoveCircleController.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import AnimationManager from "../manager/AnimationManager.js";
import CameraManager from "../manager/CameraManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";
import DrawObject from "../drawobject/DrawObject.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";

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
            entity.all(Mesh).forEach(mesh => mesh.update());
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
        if ((entity.has(TerrainMesh)) && this.cameraManager) {

            const gltf = entity.get(TerrainMesh).getGLTF();
            const cameraNode = gltf.getNodeByName("Camera");
            if (!cameraNode) {
                throw new Error("camera node not found");
            }
            const camera = gltf.getCameraByIndex(cameraNode.getCamera());
            const cameraTarget = gltf.getCameraTarget();
            const aspect = camera.getPerspective().getAspectRatio();
            const fov = camera.getPerspective().getYFov();
            const near = camera.getPerspective().getZNear();
            const far = camera.getPerspective().getZFar();

            const trs =cameraNode.getNode().getSource();
            if (!trs) {
                throw new Error("trs not found");
            }
            const targetSource = cameraTarget.getNode().getSource();
            if (!targetSource) {
                throw new Error("targetSource not found");
            }
            this.cameraManager.getMainCamera().fromGLTF(targetSource.getPosition(), trs.getPosition(), fov, near, far);
        }
        if (entity.has(Pointer)) {
            entity.get(Pointer).update();
        }
        if (entity.has(DrawObject)) {
            entity.all(DrawObject).forEach(drawobject => drawobject.updateModel());
        }
    }

}
