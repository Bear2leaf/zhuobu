import ready, { device, ViewPortType } from "./Device.js";
import PointerRenderer from "./renderer/PointerRenderer.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import CameraCube from "./drawobject/CameraCube.js";
import Gasket from "./drawobject/Gasket.js";
import { OrthoCamera } from "./Camera.js";


ready(() => {
  
  const pointerRenderer = new PointerRenderer();
  const textRenderer = new TextRenderer();
  const renderer = new TriangleRenderer();
  const camera = new OrthoCamera(-1, 1, -1, 1, 1, 2000)
  const rendererWithCam = new TriangleRenderer(camera);
  const gasket = new Gasket();
  renderer.add(gasket)
  rendererWithCam.add(gasket);
  const cameraRenderer = new LineRenderer(camera);
  cameraRenderer.add(new CameraCube(renderer.getCamera()));
  textRenderer.add(new Text(0, 0, 5, [1,1,1,1], 0, ..."Hello"))
  function tick (frame: number) {
    renderer.getCamera().view.rotateY((Math.PI / 180 / 2))
    device.clearRenderer();
    device.viewportTo(ViewPortType.Full)
    pointerRenderer.render()
    renderer.render()
    textRenderer.render();
    device.viewportTo(ViewPortType.TopRight)
    cameraRenderer.render()
    rendererWithCam.render()
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})
