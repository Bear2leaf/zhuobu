
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
import CharacterRenderer from "./CharacterRenderer.js";
export default class Main {
  private readonly camera: Camera;
  private readonly renderers: Renderer[];
  private readonly postProcessor: PostPocessor;
  private readonly input: Input;
  private readonly objects: GameObject[];
  constructor() {
    this.renderers = [];
    this.input = new Input();
    this.camera = new Camera();
    const uiCamera = new Camera();
    const textRenderer = new TextRenderer(uiCamera);
    const characterRenderer = new CharacterRenderer(this.camera);
    const character = new Character()
    const origin = new Point(this.input.origin, [1, 1, 0, 1]);
    const cursor = new Point(this.input.current, [0, 0, 1, 1]);
    const text = new Text(0, 0, 3, [1, 1, 1, 1], 1, ...'Hello!');

    this.objects = [];
    this.objects.push(text);
    this.objects.push(character);
    this.objects.push(origin);
    this.objects.push(cursor);
    textRenderer.add(text);
    characterRenderer.add(character);
    this.renderers.push(new TiledRenderer(this.camera));
    const graphicsRenderer = new GraphicsRenderer(uiCamera);
    this.renderers.push(textRenderer);
    this.renderers.push(characterRenderer);
    this.renderers.push(graphicsRenderer);
    graphicsRenderer.add(origin);
    graphicsRenderer.add(cursor);
    this.postProcessor = new PostPocessor();
  }
  updateInput(current: [number, number], pressed: boolean) {
    this.input.update(current, pressed);
    this.camera.moveBy(this.input.delta[0], this.input.delta[1])
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
