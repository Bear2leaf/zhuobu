import SceneInfoModifier from "../../modifier/SceneInfoModifier.js";
import Checkbox from "./Checkbox.js";

export default class SpriteScaleCheckbox extends Checkbox {

    constructor(private readonly modifier: SceneInfoModifier) {
        super("Toggle sprite scale");
    }
    onEnabled(): void {
        this.modifier.toggleSecondNodeScale(true);
    }

    onDisabled(): void {
        this.modifier.toggleSecondNodeScale(false);
        
    }

}