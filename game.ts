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
import LineSegment from "./geometry/LineSegment.js";
import Point from "./geometry/Point.js";


ready(() => {
  const windowInfo = device.getWindowInfo();

  const pointRenderer = new PointRenderer();
  const fov = Math.PI / 180 * 60;
  const uiCamera = new OrthoCamera(0, windowInfo.windowWidth, windowInfo.windowHeight, 0, 1, -1);
  const pointer = new Pointer();
  const textRenderer = new TextRenderer();
  const framesText = new Text(0, 100, 2, [1, 1, 1, 1], 0)
  const fpsText = new Text(0, 100, 2, [1, 1, 1, 1], 0)
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
  const xAxis = new Lines(new LineSegment(new Point(0, 0, 0, 1), new Point(2, 0, 0, 1)));
  xAxis.setColors([new Vec4(1, 0, 0, 1), new Vec4(1, 0, 0, 1)])
  const yAxis = new Lines(new LineSegment(new Point(0, 0, 0, 1), new Point(0, 2, 0, 1)));
  yAxis.setColors([new Vec4(0, 1, 0, 1), new Vec4(0, 1, 0, 1)])
  const zAxis = new Lines(new LineSegment(new Point(0, 0, 0, 1), new Point(0, 0, 2, 1)));
  zAxis.setColors([new Vec4(0, 0, 1, 1), new Vec4(0, 0, 1, 1)])
  gasket.setWorldMatrix(Matrix.translation(new Vec3(0, 0, -5)));
  Matrix.lookAt(new Vec3(10, 10, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0)).inverse(debugCamera.view)
  let lastTime = 0;
  function tick(frame: number) {
    const fps = Math.round(1000 / (device.now() - lastTime));
    lastTime = device.now();
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
    framesText.updateChars(`frames: ${frame}`);
    if (frame % 100 === 0) {
      fpsText.updateChars(`\nfps: ${fps}`);
    }
    device.viewportTo(ViewPortType.Full)
    device.clearRenderer();
    textRenderer.render(uiCamera, framesText);
    textRenderer.render(uiCamera, fpsText);
    pointRenderer.render(uiCamera, pointer);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    device.viewportTo(ViewPortType.TopRight)
    device.clearRenderer();
    debugRenderer.render(debugCamera, gasket)
    xAxis.setWorldMatrix(gasket.getWorldMatrix());
    yAxis.setWorldMatrix(gasket.getWorldMatrix());
    zAxis.setWorldMatrix(gasket.getWorldMatrix());
    lineRenderer.render(debugCamera, xAxis);
    lineRenderer.render(debugCamera, yAxis);
    lineRenderer.render(debugCamera, zAxis);
    debugRenderer.render(debugCamera, cube);
    xAxis.setWorldMatrix(cube.getWorldMatrix());
    yAxis.setWorldMatrix(cube.getWorldMatrix());
    zAxis.setWorldMatrix(cube.getWorldMatrix());
    lineRenderer.render(debugCamera, xAxis);
    lineRenderer.render(debugCamera, yAxis);
    lineRenderer.render(debugCamera, zAxis);
    lineRenderer.render(debugCamera, frustumCube)
    lineRenderer.render(debugCamera, cameraCube)
    lineRenderer.render(debugCamera, lenCone)
    lineRenderer.render(debugCamera, upCube)
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})
