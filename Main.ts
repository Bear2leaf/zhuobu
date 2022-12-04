
import TextRenderer from "./TextRenderer.js";
import Renderer from "./Renderer.js";
import Player from "./Player.js";
import { device, gl } from "./global.js";
import playAudio from "./audio.js";
import Camera from "./Camera.js";
class Game {
  onClick(position: [number, number]) {
    const playerWorldPos = this.camera.getWorldPosition([...position, 0, 0]);
    this.player.destX = position[0];
    this.player.destY = position[1];
    this.player.update();
    // this.camera.moveTo(...position)
    this.drawSomething();
  }
  private readonly textRenderer: Renderer;
  private readonly player: Player;
  private readonly camera: Camera;
  constructor() {
    this.camera = new Camera();
    this.textRenderer = new TextRenderer(this.camera);
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
device.onTouchStart((event: { clientX?: number; clientY?: number; touches?: any; }) => {
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
  game.onClick(position)
  // playAudio();
})
