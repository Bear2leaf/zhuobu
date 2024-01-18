import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClickPick extends Observer {
    getSubject(): ClickPickSubject {
        if (!(super.getSubject() instanceof ClickPickSubject)) {
            throw new Error("subject is not ClickPickSubject!");
        }
        return super.getSubject() as ClickPickSubject;
    }
    public notify(): void {
        const fbo = this.getSubject().getFrameBufferObject();
        const uiScene = this.getSubject().getUIScene();
        fbo.bindRead();
        const x = this.getSubject().getScreenX();
        const y = this.getSubject().getScreenY();
        fbo.updatePixels(x, y);
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
            this.getSubject().getWorkerManager().onExplorePicked();
        } else if (restPicked) {
            this.getSubject().getWorkerManager().onRestPicked();
        }
    }

}