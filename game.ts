import device, { loadFontCache, loadGLTFCache, loadImage, loadShaderTxtCache } from "./device/Device.js";
import { DebugSystem as DebugSystem } from "./system/DebugSystem.js";
import UISystem from "./system/UISystem.js";
import GLTF from "./loader/gltf/GLTF.js";
import MsgDispatcher from "./handler/MsgDispatcher.js";
import CameraFactory from "./factory/CameraFactory.js";
import DrawObjectFactory from "./factory/DrawObjectFactory.js";
import RendererFactory from "./factory/RendererFactory.js";

const cameraFactory = new CameraFactory();
const drawObjectFactory = new DrawObjectFactory();
const rendererFactory = new RendererFactory();
let requestAnimationFrameId = 0;
let uiSystem: UISystem;
(async function () {

  await loadShaderTxtCache("Sprite")
  await loadShaderTxtCache("Point")
  await loadShaderTxtCache("VertexColorTriangle")
  await loadShaderTxtCache("Line")
  await loadShaderTxtCache("Mesh")
  await loadFontCache("boxy_bold_font")
  await loadImage("resource/sprite/happy.png");
  await loadImage("resource/texture/test.png");
  uiSystem = new UISystem(cameraFactory, rendererFactory, drawObjectFactory)
  function tick(frame: number) {
    device.clearRenderer();
    uiSystem.render(frame);
    requestAnimationFrameId = requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
  console.log("pre init tick start")
})()
.then(() => device.loadSubpackage()).then(async () => {

  await loadGLTFCache("hello")
  await loadGLTFCache("hello-multi")
  await loadGLTFCache("whale.CYCLES");


  (async () => {
  const msgDispatcher = new MsgDispatcher();
  device.createWorker("static/worker/nethack.js", msgDispatcher.operation.bind(msgDispatcher));
  })();
  device.gl.enable(device.gl.CULL_FACE)
  device.gl.enable(device.gl.DEPTH_TEST)
  device.gl.enable(device.gl.SCISSOR_TEST)
}).then(() => {


  const mainCamera = cameraFactory.createMainCameraSingleton()
  const mainRenderer = rendererFactory.createMainRendererSingleton();
  const gasket = drawObjectFactory.createGasket();
  const cube = drawObjectFactory.createTexturedCube();
  const debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
  const gltf = new GLTF(drawObjectFactory);
  const gltfObjs = gltf.createDrawObjects();
  const gltfRenderer = rendererFactory.createGLTFMeshRenderer();


  function tick(frame: number) {

    device.clearRenderer();
    gasket.rotatePerFrame(frame);
    cube.rotatePerFrame(frame);
    mainCamera.rotateViewPerFrame(frame);
    mainRenderer.render(mainCamera, gasket);
    mainRenderer.render(mainCamera, cube);
    gltfObjs.forEach(gltfObj => gltfRenderer.render(mainCamera, gltfObj));
    debugSystem.renderCamera(mainCamera);
    debugSystem.render(gasket, mainRenderer)
    debugSystem.render(cube, mainRenderer);
    gltfObjs.forEach(gltfObj => debugSystem.render(gltfObj, gltfRenderer));
    uiSystem.render(frame);
    requestAnimationFrameId = requestAnimationFrame(() => tick(++frame));
  }
  cancelAnimationFrame(requestAnimationFrameId);
  console.log("pre init tick end")
  tick(0);
})
