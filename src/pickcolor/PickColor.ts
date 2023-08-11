import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import { Vec3 } from "../math/Vector.js";

export default class PickColor extends Component {
    private isActivated: boolean = false;
    private readonly color: Vec3 = new Vec3(255, 0, 0);
    activate(): void {
        this.isActivated = true;
    }
    deactivate(): void {
        this.isActivated = false;
    }
    getIsActive(): boolean {
        return this.isActivated;
    }
    getColor(): Vec3 {
        return this.color;
    }
    checkIsPicked(x: number, y: number): boolean {
        if (!this.isActivated || (this.color.x === 0 && this.color.y === 0 && this.color.z === 0)) return false;
        const color = this.getEntity().get(GLContainer).getRenderingContext().readSinglePixel(x, y);
        return color.x === this.color.x && color.y === this.color.y && color.z === this.color.z;
    }
}