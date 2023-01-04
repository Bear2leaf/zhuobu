import ready from "./Device.js";
import PointerRenderer from "./PointerRenderer.js";
ready(() => {
    const pointerRenderer = new PointerRenderer();
    function tick(frame) {
        pointerRenderer.render();
        requestAnimationFrame(() => tick(frame++));
    }
    tick(0);
});
//# sourceMappingURL=pointerTest.js.map