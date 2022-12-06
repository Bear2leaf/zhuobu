
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import TiledRenderer from "./TiledRenderer.js";
import Input from "./Input.js";
import GraphicsRenderer from "./GraphicsRenderer.js";
import Point from "./Point.js";
import GameObject from "./GameObject.js";
export default class Main {
  private readonly renderers: Renderer[];
  private readonly camera: Camera;
  private readonly input: Input;
  private readonly objects: GameObject[];
  constructor() {
    this.renderers = [];
    this.input = new Input();
    this.camera = new Camera();
    const textRenderer = new TextRenderer(this.camera);
    const player = new Player()
    const origin = new Point(this.input.origin, [1, 1, 0, 1]);
    const cursor = new Point(this.input.current, [0, 0, 1, 1]);
    this.objects = [];
    this.objects.push(player);
    this.objects.push(origin);
    this.objects.push(cursor);
    textRenderer.add(player);
    this.renderers.push(new TiledRenderer(this.camera, "DemoWorld"));
    const graphicsRenderer = new GraphicsRenderer(this.camera);
    this.renderers.push(textRenderer);
    this.renderers.push(graphicsRenderer);
    graphicsRenderer.add(origin);
    graphicsRenderer.add(cursor);
  }
  updateInput(current: [number, number], pressed: boolean) {
    this.input.update(current, pressed);
  }
  async init() {
    for (const renderer of this.renderers) {
      await renderer.init();
    }

    // this.textRenderer.add(this.text);
  }
  update() {
    for (const object of this.objects) {
      object.update();
    }
  }

  render() {
    for (const renderer of this.renderers) {
      renderer.render();
    }

  }
}
