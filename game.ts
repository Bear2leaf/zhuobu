import ready from "./global.js";
import { DemoRedRenderer, DemoRenderer } from "./Renderer.js";


ready(() => {
  const renderer = new DemoRenderer();
  const rendererRed = new DemoRedRenderer();
  renderer.render();
  rendererRed.render()
})
