import ready, { device, ViewPortType } from "./device/Device.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera, PerspectiveCamera } from "./Camera.js";
import { Vec3, Vec4 } from "./math/Vector.js";
import { PointRenderer } from "./renderer/PointRenderer.js";
import Pointer from "./drawobject/Pointer.js";
import TexturedCube from "./drawobject/TexturedCube.js";
import Histogram from "./drawobject/Histogram.js";
import Sprite from "./drawobject/Sprite.js";
import SpriteRenderer from "./renderer/SpriteRenderer.js";
import GLTF from "./loader/gltf/GLTF.js";
import { DebugRenderer as DebugRenderer } from "./renderer/GizmoRenderer.js";


ready(() => {


  const windowInfo = device.getWindowInfo();
  const gltf = new GLTF();
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
  const lineRenderer = new LineRenderer();
  const debugRenderer = new DebugRenderer(lineRenderer, mainCamera);
  const spriteRenderer = new SpriteRenderer();
  const gasket = new Gasket();
  const cube = new TexturedCube();
  const histogram = new Histogram();
  const happySprite = new Sprite(0, 150, 10, [1, 1, 1, 1], [0, 0], "happy");
  debugCamera.lookAtInverse(new Vec3(5, 5, 10), new Vec3(0, 0, -10), new Vec3(0, 1, 0));
  let lastTime = 0;
  function tick(frame: number) {
    const fps = Math.round(1000 / (device.now() - lastTime));
    lastTime = device.now();
    device.viewportTo(ViewPortType.Full)
    device.clearRenderer();
    gasket.rotatePerFrame(frame);
    cube.rotatePerFrame(frame);
    // mainCamera.rotateViewPerFrame(frame);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    device.gl.depthMask(false);
    framesText.updateChars(`frames: ${frame}`);
    fpsText.updateChars(`\nfps: ${fps}`);
    histogram.updateHistogram(fps);
    mainRenderer.render(uiCamera, histogram);
    textRenderer.render(uiCamera, framesText);
    textRenderer.render(uiCamera, fpsText);
    pointRenderer.render(uiCamera, pointer);
    spriteRenderer.render(uiCamera, happySprite);
    device.gl.depthMask(true);
    device.viewportTo(ViewPortType.TopRight)
    device.clearRenderer();
    debugRenderer.renderCamera(debugCamera);
    debugRenderer.render(debugCamera, gasket)
    debugRenderer.render(debugCamera, cube);
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})