import AdrText from "../drawobject/AdrText.js";
import AdrManager from "../manager/AdrManager.js";
import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClickPickSayHello extends Observer {
    private adrManager?: AdrManager;
    getSubject(): ClickPickSubject {
        if (!(super.getSubject() instanceof ClickPickSubject)) {
            throw new Error("subject is not ClickPickSubject!");
        }
        return super.getSubject() as ClickPickSubject;
    }
    setAdrManager(adrManager: AdrManager) {
        this.adrManager = adrManager;
    }
    getAdrManager() {
        if (!this.adrManager) throw new Error("AdrManager not set");
        return this.adrManager;
    }
    public notify(): void {
        const x = this.getSubject().getScreenX();
        const y = this.getSubject().getScreenY();
        const fbo = this.getSubject().getFrameBufferObject();
        const pixel = fbo.readPixel(x, y);
        console.log(pixel, x, y)
        const element = this.getAdrManager().getRoot().getElementByPixel(pixel);
        if (element) {
            console.debug("Hello Pick! ", element.getEntity().get(AdrText).getChars().join(""));
            element.dispatchEvent("click", true);
        }
    }

}