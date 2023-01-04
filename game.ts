import ready, { device } from "./Device.js";
import PointerRenderer from "./PointerRenderer.js";
import { TriangleRenderer } from "./Renderer.js";


ready(() => {
  const pointerRenderer = new PointerRenderer();
  const renderer = new TriangleRenderer();
  function tick (frame: number) {
    pointerRenderer.render()
    renderer.render()
    requestAnimationFrame(() => tick(frame++));
  }
  tick(0);
})
