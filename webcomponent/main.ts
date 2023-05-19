import DrawObjectFactory from "./DrawObjectFactory.js";
import GameCanvas from "./GameCanvas.js";
import Hello from "./Hello.js";





customElements.define('hello-world', Hello);
customElements.define('draw-object-factory', DrawObjectFactory);
customElements.define('game-canvas', GameCanvas, { extends: 'canvas' });
