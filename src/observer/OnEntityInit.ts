import SDFCanvas from "../canvas/SDFCanvas.js";
import { WindowInfo } from "../device/Device.js";
import Border from "../drawobject/Border.js";
import DrawObject from "../drawobject/DrawObject.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Hamburger from "../layout/Hamburger.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Node from "../transform/Node.js";
import OnClick from "./OnClick.js";
import TRS from "../transform/TRS.js";
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import Entity from "../entity/Entity.js";
import EntityObserver from "./EntityObserver.js";

export default class OnEntityInit extends EntityObserver {
    private sdfCanvas?: SDFCanvas;
    private renderingContext?: RenderingContext;
    private onClick?: OnClick;
    private windowInfo?: WindowInfo;
    entity?: Entity;
    setSDFCanvas(sdfCanvas: SDFCanvas) {
        this.sdfCanvas = sdfCanvas;
    }
    setRenderingContext(renderingContext: RenderingContext) {
        this.renderingContext = renderingContext;
    };
    setOnClick(onClick: OnClick) {
        this.onClick = onClick;
    }
    setWindowInfo(windowInfo: WindowInfo) {
        this.windowInfo = windowInfo;
    }
    initMesh?: (entity: Entity) => void;
    initTexture?: (entity: Entity) => void;

    public notify(): void {
        const entity = this.entity!;
        // console.debug("OnEntityInit", entity);
        if (entity.has(DrawObject) && this.renderingContext) {
            for (const drawobject of entity.all(DrawObject)) {
                drawobject.setRenderingContext(this.renderingContext)
            }
        }
        if (entity.has(DrawObject)) {
            this.initTexture!(entity);
        }
        if (entity.has(SDFCharacter) && this.sdfCanvas) {
            this.sdfCanvas.updateTextTexture(entity.get(SDFCharacter));
        }
        if (entity.has(Pointer) && this.onClick) {
            this.onClick.setPointer(entity.get(Pointer));
        }
        entity.get(Node).setSource(entity.get(TRS));
        if (entity.has(DrawObject)) {
            entity.all(DrawObject).forEach(drawobject => drawobject.initContextObjects());
        }
        if (entity.has(TerrainCDLOD)) {
            entity.get(TerrainCDLOD).create();
            entity.get(TerrainCDLOD).createBuffers();
        }
        if (entity.has(Mesh)) {
            this.initMesh!(entity)
        }
        if (entity.has(SDFCharacter)) {
            entity.get(SDFCharacter).create();
            entity.get(Border).createFromSDFCharacter();
        }

        if (entity.has(Hamburger)) {
            if (this.windowInfo === undefined) throw new Error("windowInfo is undefined");
            entity.get(Hamburger).setWindowInfo(this.windowInfo);
            entity.get(Border).createFromHamburger(entity.get(Hamburger).getPadding());
        }


    }

}
