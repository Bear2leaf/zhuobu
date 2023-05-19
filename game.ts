import WxGame from "./game/WxGame.js";

if ((globalThis as any).wx === undefined) {
} else {
  new WxGame();
}
