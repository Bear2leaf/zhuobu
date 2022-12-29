import ready, {clear} from "./global.js";
import { PointRenderer, TriangleRenderer } from "./Renderer.js";


ready(() => {
  clear();
  const renderer = new TriangleRenderer();
  const rendererRed = new PointRenderer();
  renderer.render();
  rendererRed.render()
})
