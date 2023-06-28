
import Component from "../component/Component.js";

export default class TouchEventContainer implements Component {
 
    private onTouchStart?: Function;
    private onTouchMove?: Function;
    private onTouchEnd?: Function;
    private onTouchCancel?: Function;
    setOnTouchStart(onTouchStart: Function) {
        this.onTouchStart = onTouchStart;
    }
    getOnTouchStart(): Function {
        if (this.onTouchStart === undefined) {
            throw new Error("onTouchStart is not set");
        }
        return this.onTouchStart;
    }
    setOnTouchMove(onTouchMove: Function) {
        this.onTouchMove = onTouchMove;
    }
    getOnTouchMove(): Function {
        if (this.onTouchMove === undefined) {
            throw new Error("onTouchMove is not set");
        }
        return this.onTouchMove;
    }
    setOnTouchEnd(onTouchEnd: Function) {
        this.onTouchEnd = onTouchEnd;
    }
    getOnTouchEnd(): Function {
        if (this.onTouchEnd === undefined) {
            throw new Error("onTouchEnd is not set");
        }
        return this.onTouchEnd;
    }
    setOnTouchCancel(onTouchCancel: Function) {
        this.onTouchCancel = onTouchCancel;
    }
    getOnTouchCancel(): Function {
        if (this.onTouchCancel === undefined) {
            throw new Error("onTouchCancel is not set");
        }
        return this.onTouchCancel;
    }
    

}