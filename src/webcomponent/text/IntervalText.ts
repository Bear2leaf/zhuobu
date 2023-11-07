import Modifier from "../../modifier/Modifier.js";
import Text from "./Text.js";

export default class IntervalText extends Text {
    constructor(private readonly modifier: Modifier) {
        super();
    }
    setValueCallback(valueCallback: () => string) {
        this.modifier.addListener(() => {
            this.setText(valueCallback());
            this.onTextUpdate();
        });
    }

}