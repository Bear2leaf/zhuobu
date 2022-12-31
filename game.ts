import ready, { device } from "./global.js";
import { PointRenderer, TriangleRenderer } from "./Renderer.js";


ready(() => {
  device.clearRenderer();
  const renderer = new TriangleRenderer();
  const pointRenderer = new PointRenderer();
  renderer.render();
  pointRenderer.render()
})
