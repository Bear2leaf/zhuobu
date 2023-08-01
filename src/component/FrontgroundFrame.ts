import Component from "./Component.js";
import TRS from "./TRS.js";


export default class FrontgroundFrame extends Component {
    initTRS(): void {
        this.getEntity().get(TRS).getScale().set(0.005, 0.005, 1, 1);
    }
}