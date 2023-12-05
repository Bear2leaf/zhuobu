import Component from "../entity/Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";

export default class AdrRoot extends Component {
    init(): void {
        this.getEntity().get<TRS>(TRS).getScale().set(0.025, 0.025, 0.25);
    }
    frames: number = 0;
    update(): void {
        this.getEntity().get<TRS>(TRS).getPosition().x = Math.sin(this.frames++ / 100);
        this.getEntity().get(Node).updateWorldMatrix()
    }
}