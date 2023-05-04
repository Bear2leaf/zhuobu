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
import CameraFactory from "./factory/CameraFactory.js";
import DrawObjectFactory from "./factory/DrawObjectFactory.js";
import RendererFactory from "./factory/RendererFactory.js";


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

  const cameraFactory = new CameraFactory();
  const drawObjectFactory = new DrawObjectFactory();
  const rendererFactory = new RendererFactory();

  const mainCamera = cameraFactory.createMainCamera()
  const mainRenderer = rendererFactory.createMainRendererSingleton();
  const gasket = drawObjectFactory.createGasket();
  const cube = drawObjectFactory.createTexturedCube();

  const debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
  const uiSystem = new UISystem(cameraFactory, rendererFactory, drawObjectFactory);

  const gltf = new GLTF(drawObjectFactory, device.getGltfCache().get("static/gltf/whale.CYCLES.gltf"));
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
    requestAnimationFrame(() => tick(++frame));
  }
  tick(0);
})