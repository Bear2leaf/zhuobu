import { OrthoCamera } from "../camera/OrthoCamera.js";
import device, { ViewPortType } from "../device/Device.js";
import Histogram from "../drawobject/Histogram.js";
import Pointer from "../drawobject/Pointer.js";
import Sprite from "../drawobject/Sprite.js";
import Text from "../drawobject/Text.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TextRenderer from "../renderer/TextRenderer.js";

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
    private lastTime: number;
    constructor(mainRenderer: Renderer) {
        this.lastTime = 0;
        this.mainRenderer = mainRenderer;
        const windowInfo = device.getWindowInfo();
        this.pointRenderer = new PointRenderer();
        this.spriteRenderer = new SpriteRenderer();
        this.textRenderer = new TextRenderer();
        this.pointer = new Pointer();
        this.framesText = new Text(0, 40, 2, [1, 1, 1, 1], 0)
        this.fpsText = new Text(0, 40, 2, [1, 1, 1, 1], 0)
        this.uiCamera = new OrthoCamera(0, windowInfo.windowWidth, windowInfo.windowHeight, 0, 1, -1);
        this.histogram = new Histogram();
        this.happySprite = new Sprite(0, 150, 10, [1, 1, 1, 1], [0, 0], "happy");
    }
    render(frame: number) {
        const now = device.now();
        const fps = Math.round(1000 / (now - this.lastTime));
        this.lastTime = now;
        device.viewportTo(ViewPortType.Full)
        device.gl.depthMask(false);
        device.gl.disable(device.gl.DEPTH_TEST)
        this.framesText.updateChars(`frames: ${frame}`);
        this.fpsText.updateChars(`\nfps: ${fps}`);
        this.histogram.updateHistogram(fps);
        this.mainRenderer.render(this.uiCamera, this.histogram);
        this.textRenderer.render(this.uiCamera, this.framesText);
        this.textRenderer.render(this.uiCamera, this.fpsText);
        this.spriteRenderer.render(this.uiCamera, this.happySprite);
        this.pointRenderer.render(this.uiCamera, this.pointer);
        device.gl.enable(device.gl.DEPTH_TEST)
        device.gl.depthMask(true);
    }
}