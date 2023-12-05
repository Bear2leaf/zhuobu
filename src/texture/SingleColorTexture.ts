import Device from "../device/Device.js";
import OffscreenCanvasTexture from "./OffscreenCanvasTexture.js";

export default class SingleColorTexture extends OffscreenCanvasTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        // this.getSceneManager().first().getComponents(SingleColorCanvasMap).forEach(comp => {
        //     comp.getEntity().get(DrawObject).setTexture(this);
        // });
    }
}