import device, { ViewPortType, loadFontCache, loadGLTFCache, loadImage, loadShaderTxtCache } from "./device/Device.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import Gasket from "./drawobject/Gasket.js";
import TexturedCube from "./drawobject/TexturedCube.js";
import { DebugSystem as DebugSystem } from "./system/DebugSystem.js";
import { PerspectiveCamera } from "./camera/PerspectiveCamera.js";
import UISystem from "./system/UISystem.js";
import GLTF from "./loader/gltf/GLTF.js";
import GLTFMeshRenderer from "./renderer/MeshRenderer.js";
import { FontInfo } from "./renderer/TextRenderer.js";
import MsgDispatcher from "./handler/MsgDispatcher.js";


device.loadSubpackage().then(async () => {
    await loadShaderTxtCache("VertexColorTriangle")
    await loadShaderTxtCache("Sprite")
    await loadShaderTxtCache("Point")
    await loadShaderTxtCache("Line")
    await loadShaderTxtCache("Mesh")

    await loadGLTFCache("hello")
    await loadGLTFCache("hello-multi")
    await loadGLTFCache("whale.CYCLES")

    await loadFontCache("boxy_bold_font")
    
    await loadImage("static/sprite/happy.png");
    await loadImage("static/texture/test.png");

    const msgDispatcher = new MsgDispatcher();
    device.createWorker("static/worker/nethack.js", msgDispatcher.operation.bind(msgDispatcher));

    device.gl.enable(device.gl.CULL_FACE)
    device.gl.enable(device.gl.DEPTH_TEST)
    device.gl.enable(device.gl.SCISSOR_TEST)
}).then(() => {


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
    device.clearRenderer();
    gasket.rotatePerFrame(frame);
    cube.rotatePerFrame(frame);
    // mainCamera.rotateViewPerFrame(frame);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    gltfObjs.forEach(gltfObj => gltfRenderer.render(mainCamera, gltfObj));
    debugSystem.renderCamera();
    debugSystem.render(gasket, mainRenderer)
    debugSystem.render(cube, mainRenderer);
    gltfObjs.forEach(gltfObj => debugSystem.render(gltfObj, gltfRenderer));
    uiSystem.render(frame);
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})