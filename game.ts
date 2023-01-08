import ready from "./Device.js";
import ObjRenderer from "./ObjRenderer.js";
import PointerRenderer from "./PointerRenderer.js";
import { TriangleRenderer } from "./Renderer.js";
import Text from "./Text.js";
import TextRenderer from "./TextRenderer.js";


ready(() => {
  const pointerRenderer = new PointerRenderer();
  const renderer = new TriangleRenderer();
  const textRenderer = new TextRenderer();
  const objRenderer = new ObjRenderer();
  textRenderer.add(new Text(0, 0, 5, [1,1,1,1], 0, ..."h`elE_lo\n12D3\n*_+\nFGS"))
  function tick (frame: number) {
    pointerRenderer.render()
    renderer.render()
    objRenderer.render()
    textRenderer.render();
    requestAnimationFrame(() => tick(frame++));
  }
  tick(0);
})
