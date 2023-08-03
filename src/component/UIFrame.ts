import Component from "./Component.js";
import Node from "./Node.js";
import TRS from "./TRS.js";
import VisualizeCamera from "./VisualizeCamera.js";


export default class UIFrame extends Component {
    init(): void {

        this.getEntity().get(TRS).getPosition().set(0, 0, -0.5, 1);
        this.getEntity().get(TRS).getScale().set(0.0015, 0.0015, 1, 1);
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix(this.getEntity().get(VisualizeCamera).getViewInverse())
    }
}