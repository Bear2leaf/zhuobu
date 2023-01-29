import ready, { device, ViewPortType } from "./Device.js";
import PointerRenderer from "./renderer/PointerRenderer.js";
import TextRenderer from "./renderer/TextRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";
import { LineRenderer } from "./renderer/LineRenderer.js";
import Text from "./drawobject/Text.js";
import CameraCube from "./drawobject/CameraCube.js";
ready(() => {
    const pointerRenderer = new PointerRenderer();
    const textRenderer = new TextRenderer();
    const renderer = new TriangleRenderer();
    const cameraRenderer = new LineRenderer();
    cameraRenderer.add(new CameraCube(renderer.getCamera()));
    textRenderer.add(new Text(0, 0, 5, [1, 1, 1, 1], 0, ..."Hello"));
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