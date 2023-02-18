import ready, { device, ViewPortType } from "./Device.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import Cube from "./geometry/Cube.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import Matrix from "./math/Matrix.js";
import { Vec3, Vec4 } from "./math/Vector.js";
import { PointRenderer } from "./renderer/PointRenderer.js";
import Pointer from "./drawobject/Pointer.js";
import Lines from "./drawobject/Lines.js";
import Cone from "./geometry/Cone.js";
import Triangles from "./drawobject/Triangles.js";


ready(() => {
  const windowInfo = device.getWindowInfo();

  const pointRenderer = new PointRenderer();

  const fov = Math.PI / 180 * 60;
  const uiCamera = new OrthoCamera(0, windowInfo.windowWidth, windowInfo.windowHeight, 0, 1, -1);
  const pointer = new Pointer();
  const textRenderer = new TextRenderer();
  const str = new Text(0, 0, 5, [1, 1, 1, 1], 0, ..."Hello")
  const mainCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 0.01, 20);
  const mainRenderer = new TriangleRenderer();
  const debugCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 500);
  const debugRenderer = new TriangleRenderer();
  const lineRenderer = new LineRenderer();
  const frustumCube = new Lines(new Cube());
  const cameraCube = new Lines(new Cube());
  const lenCone = new Lines(new Cone());
  const upCube = new Lines(new Cube());
  const gasket = new Gasket();
  const cube = new Triangles(new Cube());
  gasket.setWorldMatrix(Matrix.translation(new Vec3(0, 0, -5)));
  Matrix.lookAt(new Vec3(10, 10, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).inverse(debugCamera.view)
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
    textRenderer.render(uiCamera, str);
    pointRenderer.render(uiCamera, pointer);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    device.viewportTo(ViewPortType.TopRight)
    device.clearRenderer();
    debugRenderer.render(debugCamera, gasket)
    debugRenderer.render(debugCamera, cube);
    lineRenderer.render(debugCamera, frustumCube)
    lineRenderer.render(debugCamera, cameraCube)
    lineRenderer.render(debugCamera, lenCone)
    lineRenderer.render(debugCamera, upCube)
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})
