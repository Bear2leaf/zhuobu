import ready, { device, ViewPortType } from "./device/Device.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import Gasket from "./drawobject/Gasket.js";
import TexturedCube from "./drawobject/TexturedCube.js";
import { DebugSystem as DebugSystem } from "./system/DebugSystem.js";
import { PerspectiveCamera } from "./camera/PerspectiveCamera.js";
import UISystem from "./system/UISystem.js";
import GLTF from "./loader/gltf/GLTF.js";
import GLTFMeshRenderer from "./renderer/MeshRenderer.js";


ready(() => {


  const windowInfo = device.getWindowInfo();
  const fov = Math.PI / 180 * 60;
  const aspect = windowInfo.windowWidth / windowInfo.windowHeight;
  const mainCamera = new PerspectiveCamera(fov, aspect, 1, 10);
  const mainRenderer = new TriangleRenderer();
  const gasket = new Gasket();
  const cube = new TexturedCube();
  const debugSystem = new DebugSystem(mainCamera);
  const uiSystem = new UISystem(mainRenderer);

  //gltf - start
  const gltf = new GLTF(device.getGltfCache().get("static/gltf/whale.CYCLES.gltf"));
  const gltfObjs = gltf.createDrawObjects();
  const gltfRenderer = new GLTFMeshRenderer();
  //gltf - end

  function tick(frame: number) {
    device.viewportTo(ViewPortType.Full)
    device.clearRenderer();
    gasket.rotatePerFrame(frame);
    cube.rotatePerFrame(frame);
    // mainCamera.rotateViewPerFrame(frame);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    gltfObjs.forEach(gltfObj => gltfRenderer.render(mainCamera, gltfObj));
    uiSystem.render(frame);
    debugSystem.renderCamera();
    debugSystem.render(gasket, mainRenderer)
    debugSystem.render(cube, mainRenderer);
    gltfObjs.forEach(gltfObj => debugSystem.render(gltfObj, gltfRenderer));
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})