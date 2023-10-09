import Component from "../entity/Component.js";

export default class Observer extends Component {
    public notify(): void {
        throw new Error("Abstract Method!");
    }
}