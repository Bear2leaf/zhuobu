import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import Factory from "../factory/Factory.js";
import RendererFactory from "../factory/RendererFactory.js";
import ShaderFactory from "../factory/ShaderFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import Game from "../game/Game.js";
import Manager from "./Manager.js";


export default class FactoryManager implements Manager {
    private readonly factories: Factory[];
    constructor(private readonly game: Game) {
        this.factories = [];
        this.factories.push(new CameraFactory());
        this.factories.push(new TextureFactory());
        this.factories.push(new DrawObjectFactory());
        this.factories.push(new ShaderFactory());
        this.factories.push(new RendererFactory());
    }
    getCameraFactory(): CameraFactory {
        for (const factory of this.factories) {
            if (factory instanceof CameraFactory) {
                return factory;
            }
        }
        throw new Error("CameraFactory not found");
    }
    getTextureFactory(): TextureFactory {
        for (const factory of this.factories) {
            if (factory instanceof TextureFactory) {
                return factory;
            }
        }
        throw new Error("TextureFactory not found");
    }
    getDrawObjectFactory(): DrawObjectFactory {
        for (const factory of this.factories) {
            if (factory instanceof DrawObjectFactory) {
                return factory;
            }
        }
        throw new Error("DrawObjectFactory not found");
    }
    getShaderFactory(): ShaderFactory {
        for (const factory of this.factories) {
            if (factory instanceof ShaderFactory) {
                return factory;
            }
        }
        throw new Error("ShaderFactory not found");
    }
    getRendererFactory(): RendererFactory {
        for (const factory of this.factories) {
            if (factory instanceof RendererFactory) {
                return factory;
            }
        }
        throw new Error("RendererFactory not found");
    }

}