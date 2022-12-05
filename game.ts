
import { device, gl } from "./global.js";
import Main from "./Main.js"

const game = new Main();
console.log(game)

device.onTouchStart((event: { clientX?: number; clientY?: number; touches?: {clientX: number, clientY: number}[]; }) => {
  const position: [number, number] = [0, 0];
  if (typeof PointerEvent !== 'undefined' && event instanceof PointerEvent && gl.canvas instanceof HTMLCanvasElement) {// desktop browser
    position[0] = event.clientX * (gl.canvas.width / gl.canvas.clientWidth);
    position[1] = event.clientY * (gl.canvas.height / gl.canvas.clientHeight);
  } else if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent && gl.canvas instanceof HTMLCanvasElement) {// mobile browser
    const { touches } = event;
    position[0] = touches[0].clientX * (gl.canvas.width / gl.canvas.clientWidth);
    position[1] = touches[0].clientY * (gl.canvas.height / gl.canvas.clientHeight);
  } else if (event.touches) {// wechat minigame
    const { touches } = event;
    position[0] = touches[0].clientX;
    position[1] = touches[0].clientY;

  } else {
    throw new Error("unknow event");
    
  }
  game.onClick(position)
  // playAudio();
})
function tick() {
  game.update();
  game.render();
  requestAnimationFrame(tick);
}
game.init().then(tick);

