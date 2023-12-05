import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";
import { TextureBindIndex } from "./Texture.js";

export default class PickTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        this.setBindIndex(TextureBindIndex.Pick);
        // this.getSceneManager().first().getComponents(PickMap).forEach(comp => {
        //     comp.getEntity().get(DrawObject).setTexture(this);
        // });
    }
}