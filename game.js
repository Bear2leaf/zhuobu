import ready, { device, ViewPortType } from "./Device.js";
import PointerRenderer from "./renderer/PointerRenderer.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import CameraCube from "./drawobject/CameraCube.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import Matrix from "./Matrix.js";
import { Vec3 } from "./Vector.js";
ready(() => {
    const windowInfo = device.getWindowInfo();
    const pointerRenderer = new PointerRenderer();
    const near = 1;
    const far = 500;
    const fov = Math.PI / 180 * 60;
    const uiCamera = new OrthoCamera(-windowInfo.windowWidth / 2, windowInfo.windowWidth / 2, windowInfo.windowHeight / 2, -windowInfo.windowHeight / 2, near, far);
    const textRenderer = new TextRenderer(uiCamera);
    textRenderer.add(new Text(0, 0, 5, [1, 1, 1, 1], 0, ..."Hello"));
    const mainCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, near, 10);
    const mainRenderer = new TriangleRenderer(mainCamera);
    const topRightCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, near, far);
    const topRightRenderer = new TriangleRenderer(topRightCamera);
    const frustumRenderer = new LineRenderer(topRightCamera);
    const frustumCube = new CameraCube();
    const len = new CameraCube();
    const gasket = new Gasket();
    gasket.setWorldMatrix(Matrix.translation(new Vec3(0, 0, -5)));
    mainRenderer.add(gasket);
    topRightRenderer.add(gasket);
    frustumRenderer.add(frustumCube);
    frustumRenderer.add(len);
    Matrix.lookAt(new Vec3(10, -20, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).inverse(topRightCamera.view);
    function tick(frame) {
        mainCamera.view.rotateY((Math.PI / 180));
        frustumCube.setWorldMatrix(mainCamera.view.inverse()
            .multiply(mainCamera.projection.inverse()));
        len.setWorldMatrix(mainCamera.view.inverse());
        device.viewportTo(ViewPortType.Full);
        device.clearRenderer();
        pointerRenderer.render();
        mainRenderer.render();
        textRenderer.render();
        device.viewportTo(ViewPortType.TopRight);
        device.clearRenderer();
        topRightRenderer.render();
        frustumRenderer.render();
        requestAnimationFrame(() => tick(++frame));
    }
    tick(0);
});
//# sourceMappingURL=game.js.map