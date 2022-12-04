
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Player from "./Player.js";
import {  gl } from "./global.js";
import Camera from "./Camera.js";
import Text from "./Text.js";
export default class Main {
  onClick(position: [number, number]) {
    console.log(...position)
    this.player.setSpawnPosition(...position);
  }
  private readonly renderer: Renderer;
  private readonly player: Player;
  private readonly text: Text;
  private readonly camera: Camera;
  constructor() {
    this.camera = new Camera();
    this.renderer = new TextRenderer(this.camera);
    this.player = new Player();
    this.text = new Text(0, 0, 1, [1, 1, 1, 1], 1, ...'!"#$%&\'()*+,-./\n0123456789\n:;<=>?@\nABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n[\\]^_`{|}~\nabcdefghijklmn\nopqrstuvwxyz');

  }
  async init() {

    await this.renderer.init();

    this.renderer.add(this.text);
    this.renderer.add(this.player);
  }
  update() {
    this.player.update();
  }

  render() {

    gl.clearColor(0.3, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.renderer.render();

  }
}
