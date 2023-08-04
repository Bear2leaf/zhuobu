import Component from "./Component.js";
import Node from "./Node.js";
import TRS from "./TRS.js";
import VisualizeCamera from "./VisualizeCamera.js";


export default class FrontgroundFrame extends Component {
    init(): void {
        this.getEntity().get(TRS).getScale().set(0.01, 0.01, 1, 1);
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix(this.getEntity().get(VisualizeCamera).getViewInverse())
    }
}