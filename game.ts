import ready, { device, ViewPortType } from "./Device.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import Cube, { PrimitiveType } from "./geometry/Cube.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import Matrix from "./math/Matrix.js";
import { Vec3, Vec4 } from "./math/Vector.js";
import { PointRenderer } from "./renderer/PointRenderer.js";
import Pointer from "./drawobject/Pointer.js";
import DrawObject from "./drawobject/DrawObject.js";
import LineSegment from "./geometry/LineSegment.js";
import Point from "./geometry/Point.js";
import FrustumCube from "./drawobject/BlackWireCube.js";
import BlackWireCone from "./drawobject/BlackWireCone.js";
import BlackWireCube from "./drawobject/BlackWireCube.js";
import ColorfulCube from "./drawobject/ColorfulCube.js";
import ColorArrowLine from "./drawobject/ColorArrowLine.js";
import Histogram from "./drawobject/Histogram.js";


ready(() => {
  const windowInfo = device.getWindowInfo();

  const pointRenderer = new PointRenderer();
  const fov = Math.PI / 180 * 60;
  const uiCamera = new OrthoCamera(0, windowInfo.windowWidth, windowInfo.windowHeight, 0, 1, -1);
  const pointer = new Pointer();
  const textRenderer = new TextRenderer();
  const framesText = new Text(0, 40, 2, [1, 1, 1, 1], 0)
  const fpsText = new Text(0, 40, 2, [1, 1, 1, 1], 0)
  const mainCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 10);
  const mainRenderer = new TriangleRenderer();
  const debugCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 500);
  const debugRenderer = new TriangleRenderer();
  const lineRenderer = new LineRenderer();
  const frustumCube = new FrustumCube();
  const cameraCube = new BlackWireCube();
  const lenCone = new BlackWireCone();
  const upCube = new BlackWireCube();
  const gasket = new Gasket();
  const cube = new ColorfulCube();
  const xAxis = new ColorArrowLine(new Point(0, 0, 0, 1), new Point(2, 0, 0, 1), new Vec4(1, 0, 0, 1));
  const yAxis = new ColorArrowLine(new Point(0, 0, 0, 1), new Point(0, 2, 0, 1), new Vec4(0, 1, 0, 1));
  const zAxis = new ColorArrowLine(new Point(0, 0, 0, 1), new Point(0, 0, 2, 1), new Vec4(0, 0, 1, 1));
  const histogram = new Histogram();
  gasket.worldMatrix.translate(new Vec3(-1, 2, -8))
  Matrix.lookAt(new Vec3(5, 5, 10), new Vec3(0, 0, -10), new Vec3(0, 1, 0)).inverse(debugCamera.view)
  let lastTime = 0;
  function tick(frame: number) {
    const fps = Math.round(1000 / (device.now() - lastTime));
    lastTime = device.now();
    // mainCamera.view.rotateY((Math.PI / 180))
    gasket.worldMatrix.rotateY((Math.PI / 180))
    cube.worldMatrix.set(Matrix.translation(new Vec3(0, -1, -8)).rotateY(Math.PI / 180 * frame).rotateX(Math.PI / 180 * frame).rotateZ(Math.PI / 180 * frame));
    frustumCube.worldMatrix.set(
      mainCamera.view.inverse()
        .multiply(mainCamera.projection.inverse())
    )
    cameraCube.worldMatrix.set(
      mainCamera.view.inverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))
    )
    lenCone.worldMatrix.set(
      mainCamera.view.inverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))
    )
    upCube.worldMatrix.set(
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
    mainRenderer.render(uiCamera, histogram);
    device.viewportTo(ViewPortType.TopRight)
    device.clearRenderer();
    debugRenderer.render(debugCamera, gasket)
    xAxis.worldMatrix.set(gasket.worldMatrix);
    yAxis.worldMatrix.set(gasket.worldMatrix);
    zAxis.worldMatrix.set(gasket.worldMatrix);
    lineRenderer.render(debugCamera, xAxis);
    lineRenderer.render(debugCamera, yAxis);
    lineRenderer.render(debugCamera, zAxis);
    debugRenderer.render(debugCamera, cube);
    xAxis.worldMatrix.set(cube.worldMatrix);
    yAxis.worldMatrix.set(cube.worldMatrix);
    zAxis.worldMatrix.set(cube.worldMatrix);
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
