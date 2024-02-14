import Matrix from "../geometry/Matrix.js";
import { Component } from "../entity/Entity.js";
import Node from "../transform/Node.js";
import VisualizeCamera from "./VisualizeCamera.js";
import TRS from "../transform/TRS.js";


export default class BackgroundFrame extends Component {
    init(): void {
        const trs = this.getEntity().get(TRS);
        this.getEntity().get(TRS).getScale().set(0.01, 0.01, 1, 1);
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getViewInverse());
        this.getEntity().get(Node).setLocalMatrix(localMatrix.multiply(trs.getMatrix()))
        this.getEntity().get(Node).setSource();
    }
}