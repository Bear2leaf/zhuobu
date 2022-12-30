import ready, {clear} from "./global.js";
import { PointRenderer, TriangleRenderer } from "./Renderer.js";


ready(() => {
  clear();
  const renderer = new TriangleRenderer();
  const pointRenderer = new PointRenderer();
  renderer.render();
  pointRenderer.render()
})
