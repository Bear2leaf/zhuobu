import SDFCanvas from "../canvas/SDFCanvas.js";
import DrawObject from "../drawobject/DrawObject.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import TextureManager from "../manager/TextureManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityRegisterComponents extends Observer {
    private sdfCanvas?: SDFCanvas;
    private textureManager?: TextureManager;

    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }
    setSDFCanvas(sdfCanvas: SDFCanvas) {
        this.sdfCanvas = sdfCanvas;
    }
    setRenderingContext?: (drawObject: DrawObject) => void;
    setTextureManager(textureManager: TextureManager) {
        this.textureManager = textureManager;
    };

    public notify(): void {
        const entity = this.getSubject().getEntity();
        console.log("OnEntityRegisterComponents", entity);
        if (entity.has(DrawObject) && this.setRenderingContext) {
            this.setRenderingContext(entity.get(DrawObject)); 
        } else if (entity.has(DrawObject) && this.textureManager) {
            entity.get(DrawObject).setTexture(this.textureManager.defaultTexture)
            if (entity.has(SDFCharacter)) {
                entity.get(SDFCharacter).setTexture(this.textureManager.sdfTexture);
            }
        } else if (entity.has(SDFCharacter) && this.sdfCanvas) {
            this.sdfCanvas.initSDFCharacter(entity.get(SDFCharacter));
        }

    }

}
