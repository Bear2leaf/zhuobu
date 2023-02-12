import ready, { device, ViewPortType } from "./Device.js";
import PointerRenderer from "./renderer/PointerRenderer.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import LineCube from "./drawobject/LineCube.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import Matrix from "./Matrix.js";
import { Vec2, Vec3, Vec4 } from "./Vector.js";
import TriangleCube from "./drawobject/TriangleCube.js";
import LineCone from "./drawobject/LineCone.js";


ready(() => {
  const windowInfo = device.getWindowInfo();

  const pointerRenderer = new PointerRenderer();

  const fov = Math.PI / 180 * 60;
  const uiCamera = new OrthoCamera(-windowInfo.windowWidth / 2, windowInfo.windowWidth / 2, windowInfo.windowHeight / 2, -windowInfo.windowHeight / 2, 1, -1);
  const textRenderer = new TextRenderer(uiCamera);
  textRenderer.add(new Text(0, 0, 5, [1, 1, 1, 1], 0, ..."Hello"))
  const mainCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 0.01, 10);
  const mainRenderer = new TriangleRenderer(mainCamera);
  const topRightCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 500);
  const topRightRenderer = new TriangleRenderer(topRightCamera);
  const frustumRenderer = new LineRenderer(topRightCamera);
  const frustumCube = new LineCube();
  const cameraCube = new LineCube();
  const lenCone = new LineCone();
  const upCube = new LineCube();
  const gasket = new Gasket();
  const cube = new TriangleCube();
  gasket.setWorldMatrix(Matrix.translation(new Vec3(0, 0, -5)));
  mainRenderer.add(gasket)
  topRightRenderer.add(gasket);
  mainRenderer.add(cube)
  topRightRenderer.add(cube);
  frustumRenderer.add(upCube);
  frustumRenderer.add(lenCone);
  frustumRenderer.add(frustumCube);
  frustumRenderer.add(cameraCube);
  Matrix.lookAt(new Vec3(10, 10, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).inverse(topRightCamera.view)
  function tick(frame: number) {
    mainCamera.view.rotateY((Math.PI / 180))
    cube.setWorldMatrix(Matrix.translation(new Vec3(0, 0, -10)).rotateY(Math.PI / 180 * frame).rotateX(Math.PI / 180 * frame).rotateZ(Math.PI / 180 * frame));
    frustumCube.setWorldMatrix(
      mainCamera.view.inverse()
        .multiply(mainCamera.projection.inverse())
    )
    cameraCube.setWorldMatrix(
      mainCamera.view.inverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))
    )
    lenCone.setWorldMatrix(
      mainCamera.view.inverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))
    )
    upCube.setWorldMatrix(
      mainCamera.view.inverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1))
    )
    device.viewportTo(ViewPortType.Full)
    device.clearRenderer();
    pointerRenderer.render()
    mainRenderer.render()
    textRenderer.render();
    device.viewportTo(ViewPortType.TopRight)
    device.clearRenderer();
    topRightRenderer.render()
    frustumRenderer.render()
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})
