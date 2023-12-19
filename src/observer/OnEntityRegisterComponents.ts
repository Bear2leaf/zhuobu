import SDFCanvas from "../canvas/SDFCanvas.js";
import DrawObject from "../drawobject/DrawObject.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import TextureManager from "../manager/TextureManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Flowers from "../sprite/Flowers.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";
import OnClick from "./OnClick.js";

export default class OnEntityRegisterComponents extends Observer {
    private sdfCanvas?: SDFCanvas;
    private textureManager?: TextureManager;
    private renderingContext?: RenderingContext;
    private onClick?: OnClick;

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
    setRenderingContext(renderingContext: RenderingContext) {
        this.renderingContext = renderingContext;
    };
    setTextureManager(textureManager: TextureManager) {
        this.textureManager = textureManager;
    };
    setOnClick(onClick: OnClick) {
        this.onClick = onClick;
    }

    public notify(): void {
        const entity = this.getSubject().getEntity();
        console.debug("OnEntityRegisterComponents", entity);
        if (entity.has(DrawObject) && this.renderingContext) {
            entity.get(DrawObject).setRenderingContext(this.renderingContext);
        }
        if (entity.has(DrawObject) && this.textureManager) {
            entity.get(DrawObject).setTexture(this.textureManager.defaultTexture)
            if (entity.has(SDFCharacter)) {
                entity.get(SDFCharacter).setTexture(this.textureManager.sdfTexture);
            } else if (entity.has(Flowers)) {
                entity.get(Flowers).setTexture(this.textureManager.flowerTexture);
            } else if (entity.has(SkinMesh)) {
                entity.get(SkinMesh).setJointTexture(this.textureManager.jointTexture);
            }
        }
        if (entity.has(SDFCharacter) && this.sdfCanvas) {
            this.sdfCanvas.updateTextTexture(entity.get(SDFCharacter));
        }
        if (entity.has(Pointer) && this.onClick) {
            this.onClick.setPointer(entity.get(Pointer));
        }

    }

}
