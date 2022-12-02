
import TextRenderer from "./TextRenderer";
import Renderer from "./Renderer";
import Player from "./Player";
import { gl } from "./utils";
import GameObject from "./GameObject";
import playAudio from "./audio";
export default class Game {
  private readonly textRenderer: Renderer;
  private readonly player: GameObject;
  constructor() {
    this.textRenderer = new TextRenderer();
    this.player = new Player();

  }
  async init() {

    await this.textRenderer.init();
    this.drawSomething();
  }

  private drawSomething() {

    gl.clearColor(0.3, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.player.draw(this.textRenderer);

  }
}

const game = new Game();
game.init();

wx.onTouchStart(() => playAudio())
