import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloWireframe extends Mesh {
    draw(): void {
        this.updateRootTRSFromFirstChild();
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchDepthTest(false);
        this.getRenderingContext().switchCulling(false);
        super.draw();
        this.getRenderingContext().switchCulling(true);
        this.getRenderingContext().switchDepthTest(true);
        this.getRenderingContext().switchBlend(false);
    }
    updateRootTRSFromFirstChild() {
        this.getEntity().get(TRS).getPosition().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getPosition());
        this.getEntity().get(TRS).getRotation().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getRotation());

    }
}