
import TextRenderer from "./TextRenderer.js";
import playAudio from "./audio.js";
class Game {
  constructor() {
    /**
     * @type {TextRenderer}
     */
    this.textRenderer = new TextRenderer();
    this.textRenderer.init().then(() => this.drawSomething())

  }
  drawSomething() {
    this.textRenderer.drawText(10, 100, 2, [1, 1, 1, 1], ..."abc", "nono", ..."def")

    playAudio();
  }
}
const game = new Game();
console.log(game);
