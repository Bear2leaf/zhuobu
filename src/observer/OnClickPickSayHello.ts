import AdrText from "../drawobject/AdrText.js";
import ScriptManager from "../manager/ScriptManager.js";
import ClickPickSubject from "../subject/ClickPick.js";
import Observer from "./Observer.js";

export default class OnClickPickSayHello extends Observer {
    private adrManager?: ScriptManager;
    getSubject(): ClickPickSubject {
        if (!(super.getSubject() instanceof ClickPickSubject)) {
            throw new Error("subject is not ClickPickSubject!");
        }
        return super.getSubject() as ClickPickSubject;
    }
    setAdrManager(adrManager: ScriptManager) {
        this.adrManager = adrManager;
    }
    getAdrManager() {
        if (!this.adrManager) throw new Error("AdrManager not set");
        return this.adrManager;
    }
    public notify(): void {
        const fbo = this.getSubject().getFrameBufferObject();
        fbo.bindRead();
        fbo.updatePixels(this.getSubject().getScreenX(), this.getSubject().getScreenY());
        fbo.unbindRead();
        const pixel = fbo.readPixel();
        throw new Error("Not implemented")
        // const element = this.getAdrManager().getRoot().getElementByPixel(pixel);
        // if (element) {
        //     console.debug("Hello Pick! ", element.getEntity().get(AdrText).getChars().join(""));
        //     element.dispatchEvent("click", true);
        // }
    }

}