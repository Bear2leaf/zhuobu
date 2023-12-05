
import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";
import { TextureBindIndex } from "./Texture.js";

export default class JointTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        this.setBindIndex(TextureBindIndex.Joint);

        // this.getSceneManager().first().getComponents(SkinMesh).forEach(comp => {
        //     comp.getEntity().get(DrawObject).setTexture(this, this.getBindIndex());
        // });
    }
}