import { Input } from "./Input.js";


export default class Touch extends Input {
    private x: number = 0;
    private y: number = 0;
    private isTouching: boolean = false;
    private isTouchingStart: boolean = false;
    private isTouchingEnd: boolean = false;
    private pixelRatio: number = 1;
    init(): void {
        this.getDevice().onTouchStart((touchInfo) => {
            this.isTouching = true;
            this.isTouchingStart = true;
            this.isTouchingEnd = false;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;

        });
        this.getDevice().onTouchMove((touchInfo) => {
            this.isTouching = true;
            this.isTouchingStart = false;
            this.isTouchingEnd = false;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;

        });
        this.getDevice().onTouchEnd((touchInfo) => {
            this.isTouching = false;
            this.isTouchingStart = false;
            this.isTouchingEnd = true;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;
        })
        this.getDevice().onTouchCancel((touchInfo) => {
            this.isTouching = false;
            this.isTouchingStart = false;
            this.isTouchingEnd = true;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;
        })

        this.setPixelRatio(this.getDevice().getWindowInfo().pixelRatio);
    }
    process(): void {
        this.setIsTouching(this.isTouching);
        this.setIsTouchingStart(this.isTouchingStart);
        this.setIsTouchingEnd(this.isTouchingEnd);
        this.setX(this.x);
        this.setY(this.getDevice().getWindowInfo().windowHeight - this.y);
        if (this.isTouchingEnd) {
            this.isTouchingEnd = false;
        }
        if (this.isTouchingStart) {
            this.isTouchingStart = false;
        }
    }
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