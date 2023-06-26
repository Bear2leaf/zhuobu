import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import EntityFactory from "../factory/EntityFactory.js";
import Factory from "../factory/Factory.js";
import RendererFactory from "../factory/RendererFactory.js";
import SceneFactory from "../factory/SceneFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import Game from "../game/Game.js";
import WithAddGet from "../interface/WithAddGet.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import CacheManager from "./CacheManager.js";
import InputManager from "./InputManager.js";
import Manager from "./Manager.js";


export default class FactoryManager implements Manager, WithAddGet<Factory, FactoryManager> {
    private readonly factories: Factory[] = [];
    private readonly gl = this.game.getDevice().gl;
    constructor(private readonly game: Game) {
        [
            TextureFactory,
            CameraFactory,
            DrawObjectFactory,
            RendererFactory,
            SceneFactory,
            EntityFactory
        ].forEach(ctor => this.add<Factory>(ctor));

    }
    add<T extends Factory>(ctor: new (from: FactoryManager) => T): void {
        const factories = this.factories.filter(f => f instanceof ctor);
        if (factories.length !== 0) {
            throw new Error(`addFactory error, factory ${ctor.name} already exist`);
        } else {
            this.factories.push(new ctor(this));
        }
    }
    get<T extends Factory>(ctor: new (from: FactoryManager) => T): T {
        const factories = this.factories.filter(factory => factory instanceof ctor);
        if (factories.length === 0) {
            throw new Error(`factory ${ctor.name} not exist`);
        } else if (factories.length > 1) {
            throw new Error(`factory ${ctor.name} is duplicated`);
        } else {
            return factories[0] as T;
        }
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    tick(): void {
        throw new Error("Method not implemented.");
    }
    getCacheManager() {
        return this.game.get(CacheManager); 
    }
    getInputManager(): InputManager {
        return this.game.get(InputManager);
    }
    getRenderingContext(): RenderingContext {
        return this.gl;
    }
    getWidth(): number {
        return this.gl.getCanvasWidth();
    }
    getHeight(): number {
        return this.gl.getCanvasHeight();
    }


}