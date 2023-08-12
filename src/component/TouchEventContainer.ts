
import Component from "../component/Component.js";

export default class TouchEventContainer extends Component {
    private x: number = 0;
    private y: number = 0;
    private isTouching: boolean = false;
    private isTouchingStart: boolean = false;
    private isTouchingEnd: boolean = false;
    private pixelRatio: number = 1;
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x: number) {
        this.x = x;
    }
    setY(y: number) {
        this.y = y;
    }
    setPixelRatio(pixelRatio: number): void {
        this.pixelRatio = pixelRatio;
    }
    getScreenX() {
        return this.x * this.pixelRatio;
    }
    getScreenY() {
        return this.y * this.pixelRatio;
    }

    setIsTouchingEnd(isTouchingEnd: boolean) {
        this.isTouchingEnd = isTouchingEnd;
    }
    setIsTouchingStart(isTouchingStart: boolean) {
        this.isTouchingStart = isTouchingStart;
    }
    setIsTouching(isTouching: boolean) {
        this.isTouching = isTouching;
    }
    getIsTouchingEnd() {
        return this.isTouchingEnd;
    }
    getIsTouchingStart() {
        return this.isTouchingStart;
    }
    getIsTouching() {
        return this.isTouching;
    }
 

    

}