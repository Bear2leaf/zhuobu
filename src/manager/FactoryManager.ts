import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import Factory from "../factory/Factory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import CacheManager from "./CacheManager.js";
import InputManager from "./InputManager.js";
import Manager from "./Manager.js";


export default class FactoryManager implements Manager {
    private readonly factories: Factory[];
    constructor(gl: RenderingContext, cacheManager: CacheManager, inputManager: InputManager) {
        const textureFactory = new TextureFactory(gl, cacheManager);
        this.factories = [];
        this.factories.push(new CameraFactory(gl.getCanvasWidth(), gl.getCanvasHeight()));
        this.factories.push(textureFactory);
        this.factories.push(new DrawObjectFactory(gl, cacheManager, textureFactory, inputManager));
        this.factories.push(new RendererFactory(gl, cacheManager));
    }

}