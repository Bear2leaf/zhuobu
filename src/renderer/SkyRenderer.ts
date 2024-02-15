import { MainCamera } from "../camera/MainCamera.js";
import { UniformBinding } from "../contextobject/UniformBufferObject.js";
import Matrix from "../geometry/Matrix.js";
import { Tuple } from "../map/util.js";
import Renderer from "./Renderer.js";

export class SkyRenderer extends Renderer {
    getCamera(): MainCamera {
        const camera = super.getCamera();
        if (!(camera instanceof MainCamera)) {
            throw new Error("camera is not MainCamera");
        }
        return camera;
    }
    updateLookAt(eye: Tuple<number, 3>, target: Tuple<number, 3>, up: Tuple<number, 3>) {
        this.getShader().updateUniform("u_up", up);
        this.getShader().updateUniform("u_eye", eye);
        this.getShader().updateUniform("cameraPosition", [0, 0, 0]);
        this.getShader().updateUniform("u_target", target);
    }
    updateSun(sun: Tuple<number, 3>) {
        this.getShader().updateUniform("sunPosition", sun);
    }
    updatePerspective(fov: number, aspect: number, near: number, far: number) {
        this.getShader().updateUniform("u_perspective", [fov, aspect, near, far]);
    }
    render() {
        this.prepareUBOs();
        const objectList = this.getObjectList();
        objectList.forEach(drawObject => {
            drawObject.bind();

            const perspective: Tuple<number, 4> = [Math.PI / 4, 1, 0.01, 100];
            const up: Tuple<number, 3> = [0, 1, 0];
            const target: Tuple<number, 3> = [0, 0, 0];
            const scaledTime = 0 / 3000;
            // const eye: Tuple<number, 3> = [0 , 0.0, -1 ];
            const eye: Tuple<number, 3> = [1 * Math.sin(scaledTime), 0.1, -1 * Math.cos(scaledTime)];
            const sun: Tuple<number, 3> = [0.5, 1, 0]
            this.updatePerspective(...perspective);
            this.updateLookAt(eye, target, up);
            this.updateSun(sun);
            this.getShader().updateUniform("modelMatrix", [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            this.getShader().updateUniform("rayleigh", 5.5);
            this.getShader().updateUniform("turbidity", 2);
            this.getShader().updateUniform("exposure", 0.5);
            this.getShader().updateUniform("mieCoefficient", 0.005);
            this.getShader().updateUniform("mieDirectionalG", 0.8);
            drawObject.draw();
        });
        objectList.splice(0, objectList.length);
    }
}