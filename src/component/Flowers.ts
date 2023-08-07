import Component from "./Component.js";
import TRS from "./TRS.js";


export default class Flowers extends Component {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getScale().set(1.2, 1.2, 1, 1);
    }
}