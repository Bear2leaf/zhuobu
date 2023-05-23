import { OrthoCamera } from "../camera/OrthoCamera.js";
import Clock from "../device/Clock.js";
import DrawObject from "../drawobject/DrawObject.js";
import Histogram from "../drawobject/Histogram.js";
import Pointer from "../drawobject/Pointer.js";
import Text from "../drawobject/Text.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Node from "../structure/Node.js";
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
    private readonly clock: Clock;
    constructor(clock: Clock,fontTexture: Texture, onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function, cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {
        this.clock = clock;
        this.sprites = [];
        this.pointRenderer = rendererFactory.createPointRenderer();
        this.spriteRenderer = rendererFactory.createSpriteRenderer();
        this.pointer = drawObjectFactory.createPointer(onTouchStart, onTouchMove, onTouchEnd, onTouchCancel);

        this.framesText = drawObjectFactory.createFramesText(this, fontTexture);
        this.fpsText = drawObjectFactory.createFpsText(this, fontTexture);
        this.uiCamera = cameraFactory.createOrthoCamera();
        this.histogram = drawObjectFactory.createHistogram(this);
    }
    getFPS() {
        return this.clock.getFPS();
    }
    getFrames() {
        return this.clock.getFrames();
    }
    addSprite(sprite: Node) {
        this.sprites.push(sprite);
    }
    setMainRenderer(renderer: Renderer) {
        this.mainRenderer = renderer;
    }
    update() {

        if (!this.mainRenderer) {
            throw new Error("mainRenderer not exist")
        }
        this.framesText.getDrawObjects().forEach(drawObject => {
            drawObject.update(this.framesText);
        });
        this.fpsText.getDrawObjects().forEach(drawObject => {
            drawObject.update(this.fpsText);
        });
        this.histogram.getDrawObjects().forEach(drawObject => {
            drawObject.update(this.histogram);
        });
        this.pointer.getDrawObjects().forEach(drawObject => {
            drawObject.update(this.pointer);
        });
    }
    render(gl: WebGL2RenderingContext) {
        gl.depthMask(false);
        gl.disable(gl.DEPTH_TEST)
        this.sprites.forEach(sprite => {
            this.spriteRenderer.render(this.uiCamera, sprite);
        });
        if (!this.mainRenderer) {
            throw new Error("mainRenderer not exist");
        }
        this.mainRenderer.render(this.uiCamera, this.histogram);
        this.spriteRenderer.render(this.uiCamera, this.framesText);
        this.spriteRenderer.render(this.uiCamera, this.fpsText);
        this.pointRenderer.render(this.uiCamera, this.pointer);
        gl.enable(gl.DEPTH_TEST)
        gl.depthMask(true);
    }
}