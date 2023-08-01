import Component from "./Component.js";
import TRS from "./TRS.js";


export default class BackgroundFrame extends Component {
    initTRS(): void {
        this.getEntity().get(TRS).getPosition().set(0, 0, -30, 1);
        this.getEntity().get(TRS).getScale().set(0.04, 0.04, 1, 1);
    }
}