import Component from "./Component.js";
import TRS from "./TRS.js";

export default class CameraController extends Component {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getPosition().set(2, 5, 7);
    }
    getEye() {
        return this.getEntity().get(TRS).getPosition();
    }
    private frames = 0;
    update(): void {
        super.update();
        this.frames++;        
        this.getEye().set(2, 5, 10 * Math.sin(this.frames / 100));
    }
}