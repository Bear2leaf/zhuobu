import { OrthoCamera } from "../camera/OrthoCamera.js";
import { FontInfo } from "../drawobject/Text.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import CacheManager from "../manager/CacheManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Node from "../component/Node.js";
import Texture from "../texture/Texture.js";

export default class UISystem {
    private readonly pointRenderer: PointRenderer;
    private readonly spriteRenderer: SpriteRenderer;
    private readonly pointer: Node;
    private readonly framesText: Node;
    private readonly fpsText: Node;
    private readonly uiCamera: OrthoCamera;
    private readonly histogram: Node;
    private mainRenderer?: Renderer;
    private readonly sprites: Node[];
    constructor(gl: RenderingContext , texture: Texture, fontInfo: FontInfo, factoryManager: FactoryManager, cacheManager:CacheManager, fontTexture: Texture, onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function, cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {
        this.sprites = [];
        this.pointRenderer = rendererFactory.createPointRenderer();
        this.spriteRenderer = rendererFactory.createSpriteRenderer();
        this.pointer = drawObjectFactory.createPointer();
        this.uiCamera = cameraFactory.createOrthoCamera();

        this.framesText = drawObjectFactory.createFramesText();
        this.fpsText = drawObjectFactory.createFpsText();
        this.histogram = drawObjectFactory.createHistogram();
    }
    getFPS() {
        // return this.clock.getFPS();
    }
    getFrames() {
        // return this.clock.getFrames();
    }
    addSprite(sprite: Node) {
        this.sprites.push(sprite);
    }
    setMainRenderer(renderer: Renderer) {
        this.mainRenderer = renderer;
    }
    update() {
    }
    render(gl: RenderingContext) {
        if (!this.mainRenderer) {
            throw new Error("mainRenderer not exist");
        }
        gl.switchDepthWrite(false);
        gl.switchDepthTest(false);
        gl.switchBlend(true);
        gl.switchUnpackPremultiplyAlpha(true);
        this.sprites.forEach((sprite) => {
            this.spriteRenderer.render(this.uiCamera, sprite);
        });
        gl.switchUnpackPremultiplyAlpha(false);
        gl.switchBlend(true);
        this.mainRenderer.render(this.uiCamera, this.histogram);
        this.spriteRenderer.render(this.uiCamera, this.framesText);
        this.spriteRenderer.render(this.uiCamera, this.fpsText);
        this.pointRenderer.render(this.uiCamera, this.pointer);
        gl.switchDepthTest(true);
        gl.switchDepthWrite(true);
    }
}