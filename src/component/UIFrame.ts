import Component from "./Component.js";
import TRS from "./TRS.js";


export default class UIFrame extends Component {
    init(): void {

        this.getEntity().get(TRS).getPosition().set(0, 0, -0.5, 1);
        this.getEntity().get(TRS).getScale().set(0.0015, 0.0015, 1, 1);
    }
}