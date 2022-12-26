import ready from "./global.js";
import { GasketRenderer, DemoRenderer } from "./Renderer.js";
ready(() => {
    const renderer = new DemoRenderer();
    const rendererRed = new GasketRenderer();
    renderer.render();
    rendererRed.render();
});
//# sourceMappingURL=game.js.map