import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import UIScene from "../scene/UIScene.js";
import Observer from "./Observer.js";

export default class OnClickPick extends Observer {
    x = 0;
    y = 0;
    framebufferObject?: PickFrameBufferObject;
    uiScene?: UIScene;
    public notify(): void {
        const fbo = this.framebufferObject!;
        const uiScene = this.uiScene!;
        fbo.bindRead();
        fbo.updatePixels(this.x, this.y);
        fbo.unbindRead();
        const pixel = fbo.readPixel();
        const messagePicked = uiScene.messagePicked(...pixel);
        const explorePicked = uiScene.explorePicked(...pixel);
        const restPicked = uiScene.restPicked(...pixel);
        // console.log({
        //     x, y,
        //     messagePicked,
        //     explorePicked,
        //     restPicked
        // });
        if (explorePicked) {
            this.onExplorePicked!();
        } else if (restPicked) {
            this.onRestPicked!();
        }
    }

    public onExplorePicked?: () => void;
    public onRestPicked?: () => void;

}