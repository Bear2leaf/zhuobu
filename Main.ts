
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Player from "./Player.js";
import { gl } from "./utils.js";
import playAudio from "./audio.js";
class Game {
  movePlayerTo(position: [number, number]) {
    this.player.destX = position[0];
    this.player.destY = position[1];
    this.player.update();
    this.drawSomething();
  }
  private readonly textRenderer: Renderer;
  private readonly player: Player;
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
wx.onTouchStart((event) => {
  const position: [number, number] = [0, 0];
  if (typeof PointerEvent !== 'undefined' && event instanceof PointerEvent && gl.canvas instanceof HTMLCanvasElement) {// desktop browser
    position[0] = event.clientX * (gl.canvas.width / gl.canvas.clientWidth);
    position[1] = event.clientY * (gl.canvas.height / gl.canvas.clientHeight);
  } else if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent && gl.canvas instanceof HTMLCanvasElement) {// mobile browser
    const { touches } = event;
    position[0] = touches[0].clientX * (gl.canvas.width / gl.canvas.clientWidth);
    position[1] = touches[0].clientY * (gl.canvas.height / gl.canvas.clientHeight);
  } else {// wechat minigame
    const { touches } = event;
    position[0] = touches[0].clientX;
    position[1] = touches[0].clientY;

  }
  game.movePlayerTo(position)
  // playAudio();
})
