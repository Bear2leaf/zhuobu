import Component from "./Component.js";
import TRS from "./TRS.js";


export default class SinAnimation extends Component {
    private frame: number = 0;
    update(): void {
        this.frame++;
        this.getEntity().get(TRS).getPosition().set(Math.sin(this.frame * 0.05) * 150 + 150, 40, 0, 1);
    }
}