import { MainCamera } from "../camera/MainCamera.js";
import { UniformBinding } from "../contextobject/UniformBufferObject.js";
import Matrix from "../geometry/Matrix.js";
import { Vec4 } from "../geometry/Vector.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Renderer from "./Renderer.js";

export class SkyboxRenderer extends Renderer {
    getCamera(): MainCamera {
        const camera = super.getCamera();
        if (!(camera instanceof MainCamera)) {
            throw new Error("camera is not MainCamera");
        }
        return camera;
    }
    render() {
        this.prepareUBOs();
        const camera = this.getCamera();
        const viewInverse = camera.getView().inverse().getVertics();
        const projection = Matrix.perspective(Math.PI / 4, camera.getAspect(), 0.1, 1000).getVertics();
        this.updateUBO(UniformBinding.Camera, new Float32Array([...viewInverse, ...projection]));
        const objectList = this.getObjectList();
        objectList.forEach(drawObject => {
            drawObject.bind();
            drawObject.getTexture().active();
            drawObject.getTexture().bind()
            drawObject.getEntity().get(TRS).getScale().set(100, 100, 100);
            const scale = new Vec4();
            const translation = new Vec4();
            const rotation = new Vec4();
            Matrix.decompose(this.getCamera().getView(), translation, rotation, scale);
            drawObject.getEntity().get(TRS).getPosition().from(translation);
            drawObject.getEntity().get(Node).updateWorldMatrix();
            this.getShader().setInteger("u_texture", drawObject.getTexture().getBindIndex());
            drawObject.draw();
        });
        objectList.splice(0, objectList.length);
    }
}