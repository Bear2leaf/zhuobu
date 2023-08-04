import SkinMesh from "./SkinMesh.js";

export default class WhaleMesh extends SkinMesh {
    init(): void {
        this.setNodeIndex(4);
        super.init();
    }
}