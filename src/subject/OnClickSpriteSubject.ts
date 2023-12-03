import Sprite from "../drawobject/Sprite.js";
import TouchEvent from "../event/TouchEvent.js";
import Matrix from "../geometry/Matrix.js";
import { Vec4 } from "../geometry/Vector.js";
import TRS from "../transform/TRS.js";
import BaseTouchSubject from "./BaseTouchSubject.js";

export default class OnClickSpriteSubject extends BaseTouchSubject {

    update(): void {
        const touchEvent = this.getEntity().get(TouchEvent);
        if (touchEvent.getIsTouchingStart()) {
            const transform = new Vec4();
            const quat = new Vec4();
            const scale = new Vec4();
            const rect = this.getEntity().get(Sprite).getRect();
            Matrix.decompose(this.getEntity().get(TRS).getMatrix(), transform, quat, scale);
            if (touchEvent.getX() < transform.x + scale.x * rect.z && touchEvent.getX() > transform.x &&
                touchEvent.getY() < transform.y + scale.y * rect.w && touchEvent.getY() > transform.y) {
                console.debug("Sprite is clicked!")
                this.notify();
            }
        }
    }
}
