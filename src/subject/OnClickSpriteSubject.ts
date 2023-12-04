import Sprite from "../drawobject/Sprite.js";
import Matrix from "../geometry/Matrix.js";
import { Vec4 } from "../geometry/Vector.js";
import TRS from "../transform/TRS.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class OnClickSpriteSubject extends BaseTouchSubject {

    update(): void {
        if (this.getTouch().getIsTouchingStart()) {
            const transform = new Vec4();
            const quat = new Vec4();
            const scale = new Vec4();
            // const rect = this.getEntity().get(Sprite).getRect();
            // Matrix.decompose(this.getEntity().get(TRS).getMatrix(), transform, quat, scale);
            // if (this.getTouch().getX() < transform.x + scale.x * rect.z && this.getTouch().getX() > transform.x &&
            //     this.getTouch().getY() < transform.y + scale.y * rect.w && this.getTouch().getY() > transform.y) {
            //     console.debug("Sprite is clicked!")
            //     this.notify();
            // }
        }
    }
}
