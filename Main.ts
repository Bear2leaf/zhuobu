
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import Text from "./Text.js";
import TiledRenderer from "./TiledRenderer.js";
export default class Main {
  onClick(position: [number, number]) {
    console.log(...position)
    this.player.setSpawnPosition(...position);
  }
  private readonly textRenderer: Renderer;
  private readonly tiledRenderer: Renderer;
  private readonly player: Player;
  private readonly text: Text;
  private readonly camera: Camera;
  constructor() {
    this.camera = new Camera();
    this.textRenderer = new TextRenderer(this.camera);
    this.tiledRenderer = new TiledRenderer(this.camera, "DemoWorld");
    this.player = new Player();
    this.text = new Text(0, 0, 1, [1, 1, 1, 1], 1, ...'!"#$%&\'()*+,-./\n0123456789\n:;<=>?@\nABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n[\\]^_`{|}~\nabcdefghijklmn\nopqrstuvwxyz');

  }
  async init() {

    await this.textRenderer.init();
    await this.tiledRenderer.init();

    // this.textRenderer.add(this.text);
    this.textRenderer.add(this.player);
  }
  update() {
    this.player.update();
  }

  render() {
    this.tiledRenderer.render();
    this.textRenderer.render();

  }
}
