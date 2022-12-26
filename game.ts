import ready from "./global.js";
import { DemoRenderer } from "./Renderer.js";


ready(() => {
  const renderer = new DemoRenderer();
  renderer.render();
})
