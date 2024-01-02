import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClickPickSayHello extends Observer {
    getSubject(): ClickPickSubject {
        if (!(super.getSubject() instanceof ClickPickSubject)) {
            throw new Error("subject is not ClickPickSubject!");
        }
        return super.getSubject() as ClickPickSubject;
    }
    public notify(): void {
        const fbo = this.getSubject().getFrameBufferObject();
        fbo.bindRead();
        fbo.updatePixels(this.getSubject().getScreenX(), this.getSubject().getScreenY());
        fbo.unbindRead();
        // const pixel = fbo.readPixel();
        // const element = this.getAdrManager().getRoot().getElementByPixel(pixel);
        // if (element) {
        //     console.debug("Hello Pick! ", element.getEntity().get(AdrText).getChars().join(""));
        //     element.dispatchEvent("click", true);
        // }
    }

}