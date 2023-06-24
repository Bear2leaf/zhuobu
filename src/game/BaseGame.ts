// import DebugSystem from "../system/DebugSystem.js";
// import UISystem from "../system/UISystem.js";
// import GLTF from "../loader/gltf/GLTF.js";
// import CameraFactory from "../factory/CameraFactory.js";
// import DrawObjectFactory from "../factory/DrawObjectFactory.js";
// import RendererFactory from "../factory/RendererFactory.js";
// import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
// import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
// import Device, { DeviceInfo, ViewPortType } from "../device/Device.js";
// import TextureFactory from "../factory/TextureFactory.js";
// import Renderer from "../renderer/Renderer.js";
// import Node from "../structure/Node.js";
// import Matrix from "../math/Matrix.js";
// import { Vec3 } from "../math/Vector.js";
// import Clock from "../clock/Clock.js";
// import ShaderFactory from "../factory/ShaderFactory.js";
// import FactoryManager from "../manager/FactoryManager.js";
// import CacheManager from "../manager/CacheManager.js";
// import DeviceManager from "../manager/DeviceManager.js";
// import Game from "./Game.js";

// export default abstract class BaseGame implements Game {
//   private readonly debugSystem: DebugSystem;
//   private readonly uiSystem: UISystem;
//   private readonly mainCamera: PerspectiveCamera;
//   private readonly mainRenderer: TriangleRenderer;
//   private readonly gasket: Node;
//   private readonly cube: Node;
//   private readonly gltfRootNode: Node;
//   private readonly gltfSkinMeshRenderer: Renderer;
//   private readonly gltfMeshRenderer: Renderer;
//   private readonly device: Device;
//   private readonly clock: Clock;
//   private readonly factoryManager: FactoryManager;
//   private readonly cacheManager: CacheManager;
//   private readonly deviceManager: DeviceManager
//   constructor(device: Device) {
//     this.device = device;
//     this.clock = new Clock(device);
//     this.device.gl.init();
//     const deviceInfo = this.device.getDeviceInfo();
//     this.cacheManager = new CacheManager();
//     this.deviceManager = new DeviceManager(device);
//     this.factoryManager = new FactoryManager(device);
//     const fontTexture = this.textureFactory.createFontTexture();
//     this.uiSystem = new UISystem(this.clock, fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), this.cameraFactory, this.rendererFactory, this.drawObjectFactory)
//     this.debugSystem = new DebugSystem(this.cameraFactory, this.rendererFactory, this.drawObjectFactory);
//     const gltf = new GLTF("whale.CYCLES", this.drawObjectFactory, this.textureFactory, this.device.getGLTFCache(), this.device.getGLBCache());
//     this.mainCamera = (this.cameraFactory.createMainCamera());
//     this.gltfSkinMeshRenderer = this.rendererFactory.createGLTFSkinMeshRenderer();
//     this.gltfMeshRenderer = this.rendererFactory.createGLTFMeshRenderer();
//     this.mainRenderer = this.rendererFactory.createMainRenderer();
//     this.gasket = this.drawObjectFactory.createGasket();
//     this.cube = this.drawObjectFactory.createTexturedCube();
//     this.gltfRootNode = (gltf.createRootNode());
//     this.uiSystem.setMainRenderer(this.mainRenderer);
//     this.load().then(() => {
//       this.tick();
//     });
//   }

//   getFrames() {
//     return this.clock.getFrames();
//   }

//   async load() {
//     await this.device.loadShaderTxtCache("Sprite")
//     await this.device.loadShaderTxtCache("Point")
//     await this.device.loadShaderTxtCache("VertexColorTriangle")
//     await this.device.loadShaderTxtCache("Line")
//     await this.device.loadShaderTxtCache("Mesh")
//     await this.device.loadShaderTxtCache("SkinMesh")
//     await this.device.loadFontCache("boxy_bold_font")
//     await this.device.loadSubpackage()
//     await this.device.loadImageCache("happy");
//     await this.device.loadGLTFCache("hello")
//     await this.device.loadGLTFCache("hello-multi")
//     await this.device.loadGLTFCache("whale.CYCLES");
//   }
//   tick() {
//     this.clock.tick()
//     this.gasket.getDrawObjects().forEach((drawObject) => {
//       drawObject.update(this.gasket!);
//     });
//     this.cube.getDrawObjects().forEach((drawObject) => {
//       drawObject.update(this.cube!);
//     });
//     this.gltfRootNode.updateWorldMatrix(Matrix.translation(new Vec3(0, 0, 10)))
//     this.mainCamera.rotateViewPerFrame(this.getFrames());
//     this.device.viewportTo(ViewPortType.Full)
//     this.mainRenderer.render(this.mainCamera, this.gasket);
//     this.mainRenderer.render(this.mainCamera, this.cube);
//     this.gltfSkinMeshRenderer.render(this.mainCamera, this.gltfRootNode);
//     this.uiSystem.update();
//     this.uiSystem.render(this.device.gl);
//     this.device.viewportTo(ViewPortType.TopRight)
//     this.debugSystem.renderCamera(this.mainCamera);
//     this.debugSystem.render(this.gasket, this.mainRenderer)
//     this.debugSystem.render(this.cube, this.mainRenderer);
//     this.debugSystem.render(this.gltfRootNode, this.gltfSkinMeshRenderer);
//     requestAnimationFrame(() => this.tick())
//   }
// }