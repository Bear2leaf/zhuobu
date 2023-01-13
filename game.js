import RendererDecorator from "./RendererDecorator.js";
import ready, { device, ViewPortType } from "./Device.js";
import PointerRenderer from "./PointerRenderer.js";
import { TriangleRenderer } from "./Renderer.js";
import Text from "./Text.js";
import TextRenderer from "./TextRenderer.js";
ready(() => {
    const pointerRenderer = new PointerRenderer();
    const textRenderer = new TextRenderer();
    const renderer = new TriangleRenderer();
    const cameraRenderer = new RendererDecorator(renderer);
    textRenderer.add(new Text(0, 0, 5, [1, 1, 1, 1], 0, ..."h`elE_lo\n12D3\n*_+\nFGS"));
    function tick(frame) {
        device.clearRenderer();
        device.viewportTo(ViewPortType.Full);
        pointerRenderer.render();
        renderer.render();
        textRenderer.render();
        device.viewportTo(ViewPortType.TopRight);
        cameraRenderer.render();
        requestAnimationFrame(() => tick(frame++));
    }
    tick(0);
});
//# sourceMappingURL=game.js.map