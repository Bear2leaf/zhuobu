import Component from "../component/Component.js";

export default class PickColorRed extends Component {
    private isActivated: boolean = false;
    activate(): void {
        this.isActivated = true;
    }
    deactivate(): void {
        this.isActivated = false;
    }
    getIsActive(): boolean {
        return this.isActivated;
    }
}