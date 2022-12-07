
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Character from "./Character.js";
import Camera from "./Camera.js";
import TiledRenderer from "./TiledRenderer.js";
import Input from "./Input.js";
import GraphicsRenderer from "./GraphicsRenderer.js";
import Point from "./Point.js";
import GameObject from "./GameObject.js";
import PostPocessor from "./PostPocessor.js";
import Text from "./Text.js";
export default class Main {
  private readonly renderers: Renderer[];
  private readonly postProcessor: PostPocessor;
  private readonly input: Input;
  private readonly objects: GameObject[];
  constructor() {
    this.renderers = [];
    this.input = new Input();
    const camera = new Camera();
    const textRenderer = new TextRenderer(camera);
    const character = new Character()
    const origin = new Point(this.input.origin, [1, 1, 0, 1]);
    const cursor = new Point(this.input.current, [0, 0, 1, 1]);
    const text = new Text(0, 0, 5, [1, 1, 1, 1], 1, ...'!"#$%&\'()*+,-./\n0123456789\n:;<=>?@\nABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n[\\]^_`{|}~\nabcdefghijklmn\nopqrstuvwxyz');

    this.objects = [];
    this.objects.push(text);
    this.objects.push(character);
    this.objects.push(origin);
    this.objects.push(cursor);
    textRenderer.add(text);
    textRenderer.add(character);
    this.renderers.push(new TiledRenderer(camera, "DemoWorld"));
    const graphicsRenderer = new GraphicsRenderer(camera);
    this.renderers.push(textRenderer);
    this.renderers.push(graphicsRenderer);
    graphicsRenderer.add(origin);
    graphicsRenderer.add(cursor);
    this.postProcessor = new PostPocessor();
  }
  updateInput(current: [number, number], pressed: boolean) {
    this.input.update(current, pressed);
  }
  async init() {
    for (const renderer of this.renderers) {
      await renderer.init();
    }
    await this.postProcessor.init();

  }
  update() {
    for (const object of this.objects) {
      object.update();
    }
  }

  render() {
    this.postProcessor.beginRender();
    for (const renderer of this.renderers) {
      renderer.render();
    }
    this.postProcessor.endRender();
    this.postProcessor.render();

  }
}
