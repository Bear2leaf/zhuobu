import { OrthoCamera } from "../camera/OrthoCamera.js";
import device, { ViewPortType } from "../device/Device.js";
import Histogram from "../drawobject/Histogram.js";
import Pointer from "../drawobject/Pointer.js";
import Sprite from "../drawobject/Sprite.js";
import Text from "../drawobject/Text.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TextRenderer from "../renderer/TextRenderer.js";
import Texture from "../texture/Texture.js";

export default class UISystem {
    private readonly pointRenderer: PointRenderer;
    private readonly spriteRenderer: SpriteRenderer;
    private readonly textRenderer: TextRenderer;
    private readonly pointer: Pointer;
    private readonly framesText: Text;
    private readonly fpsText: Text;
    private readonly uiCamera: OrthoCamera;
    private readonly histogram: Histogram;
    private readonly happySprite: Sprite;
    private readonly mainRenderer: Renderer;
    private lastframe: number;
    private lasttime: number;
    private fps: number;
    constructor(happySpriteTexture: Texture, fontTexture: Texture, onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function, cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {
        this.lastframe = 0;
        this.lasttime = 0;
        this.fps = 0;
        this.mainRenderer = rendererFactory.createMainRendererSingleton();
        this.pointRenderer = rendererFactory.createPointRenderer();
        this.spriteRenderer = rendererFactory.createSpriteRenderer();
        this.textRenderer = rendererFactory.createTextRenderer();
        this.pointer = drawObjectFactory.createPointer(onTouchStart, onTouchMove, onTouchEnd, onTouchCancel);

        this.framesText = drawObjectFactory.createFramesText(fontTexture);
        this.fpsText = drawObjectFactory.createFpsText(fontTexture);
        this.uiCamera = cameraFactory.createOrthoCamera();
        this.histogram = drawObjectFactory.createHistogram();
        this.happySprite = drawObjectFactory.createHappySprite(happySpriteTexture);
    }
    render(gl: WebGL2RenderingContext, now: number, frame: number) {
        if (now - this.lasttime >= 1000) {
            this.lasttime = now;
            this.fps = frame - this.lastframe;
            this.lastframe = frame;
        }
        gl.depthMask(false);
        gl.disable(gl.DEPTH_TEST)
        this.framesText.updateChars(`frames: ${frame}`);
        this.fpsText.updateChars(`\nfps: ${this.fps}`);
        this.histogram.updateHistogram(this.fps);
        this.mainRenderer.render(this.uiCamera, this.histogram);
        this.textRenderer.render(this.uiCamera, this.framesText);
        this.textRenderer.render(this.uiCamera, this.fpsText);
        this.spriteRenderer.render(this.uiCamera, this.happySprite);
        this.pointRenderer.render(this.uiCamera, this.pointer);
        gl.enable(gl.DEPTH_TEST)
        gl.depthMask(true);
    }
}