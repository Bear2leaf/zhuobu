import Modifier from "../../modifier/Modifier.js";
import NumberRange from "./NumberRange.js";

export default class IntervalNumberRange extends NumberRange {
    constructor(private readonly modifier: Modifier) {
        super();
    }
    setValueCallback(valueCallback: () => string) {
        this.modifier.addListener(() => {
            const value = valueCallback();
            this.onNumberUpdate();
            this.setNumber(parseFloat(value));
        });
    }

}