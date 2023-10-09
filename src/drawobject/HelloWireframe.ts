import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import { Vec4 } from "../geometry/Vector.js";
import Mesh from "./Mesh.js";

export default class HelloWireframe extends Mesh {
    draw(mode: number): void {
        this.updateRootTRSFromFirstChild();
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(false);
        this.getEntity().get(GLContainer).getRenderingContext().switchCulling(false);
        super.draw(mode);
        this.getEntity().get(GLContainer).getRenderingContext().switchCulling(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchDepthTest(true);
        this.getEntity().get(GLContainer).getRenderingContext().switchBlend(false);
    }
    updateRootTRSFromFirstChild() {
        this.getEntity().get(TRS).getPosition().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getPosition());
        this.getEntity().get(TRS).getRotation().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getRotation());

    }
}