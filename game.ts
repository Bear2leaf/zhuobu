import ready from "./Device.js";
import PointerRenderer from "./PointerRenderer.js";
import { TriangleRenderer } from "./Renderer.js";
import Text from "./Text.js";
import TextRenderer from "./TextRenderer.js";


ready(() => {
  const pointerRenderer = new PointerRenderer();
  const renderer = new TriangleRenderer();
  const textRenderer = new TextRenderer();
  textRenderer.add(new Text(0, 0, 10, [1,1,1,1], 0, ..."hello\n123"))
  function tick (frame: number) {
    pointerRenderer.render()
    renderer.render()
    textRenderer.render();
    requestAnimationFrame(() => tick(frame++));
  }
  tick(0);
})
