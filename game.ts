import ready, { device, ViewPortType } from "./device/Device.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Gasket from "./drawobject/Gasket.js";
import TexturedCube from "./drawobject/TexturedCube.js";
import { DebugSystem as DebugSystem } from "./system/DebugSystem.js";
import { PerspectiveCamera } from "./camera/PerspectiveCamera.js";
import UISystem from "./system/UISystem.js";
import GLTF from "./loader/gltf/GLTF.js";
import GLTFMeshRenderer from "./renderer/MeshRenderer.js";
import { Vec3 } from "./math/Vector.js";


ready(() => {


  const windowInfo = device.getWindowInfo();
  const fov = Math.PI / 180 * 60;
  const mainCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 10);
  const mainRenderer = new TriangleRenderer();
  const debugCamera = new PerspectiveCamera(fov, windowInfo.windowWidth / windowInfo.windowHeight, 1, 500);
  const gasket = new Gasket();
  const cube = new TexturedCube();
  const debugSystem = new DebugSystem(mainCamera, debugCamera);
  const uiSystem = new UISystem(mainRenderer);

//gltf - start
  const gltf = new GLTF();
  const gltfObj = gltf.createDrawObject();
  gltfObj.getNode().getWorldMatrix().translate(new Vec3(0, -4, -8)).rotateY(Math.PI / 180 * 60).rotateX(Math.PI / 180 * 30);
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
    gltfRenderer.render(mainCamera, gltfObj);
    uiSystem.render(frame);
    debugSystem.renderCamera();
    debugSystem.render(gasket, mainRenderer)
    debugSystem.render(cube, mainRenderer);
    debugSystem.render(gltfObj, gltfRenderer);
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})