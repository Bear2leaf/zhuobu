import Component from "./Component.js";
import TRS from "./TRS.js";


export default class Flowers extends Component {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getScale().set(2.5, 2.5, 1, 1);
    }
}