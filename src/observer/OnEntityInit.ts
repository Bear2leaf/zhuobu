import SDFCanvas from "../canvas/SDFCanvas.js";
import { WindowInfo } from "../device/Device.js";
import Border from "../drawobject/Border.js";
import DrawObject from "../drawobject/DrawObject.js";
import RockMesh from "../drawobject/RockMesh.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Skybox from "../drawobject/Skybox.js";
import Terrain from "../drawobject/Terrain.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import Hamburger from "../layout/Hamburger.js";
import TextureManager from "../manager/TextureManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Flowers from "../sprite/Flowers.js";
import ReflectMap from "../sprite/ReflectMap.js";
import RenderMap from "../sprite/RenderMap.js";
import Water from "../sprite/Water.js";
import EntitySubject from "../subject/EntitySubject.js";
import Node from "../transform/Node.js";
import Observer from "./Observer.js";
import OnClick from "./OnClick.js";
import EagleMesh from "../drawobject/EagleMesh.js";
import ShipMesh from "../drawobject/ShipMesh.js";
import TRS from "../transform/TRS.js";
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import Entity from "../entity/Entity.js";

export default class OnEntityInit extends Observer {
    private sdfCanvas?: SDFCanvas;
    private textureManager?: TextureManager;
    private renderingContext?: RenderingContext;
    private onClick?: OnClick;
    private windowInfo?: WindowInfo;
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
    setWindowInfo(windowInfo: WindowInfo) {
        this.windowInfo = windowInfo;
    }
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }
    initMesh?: (entity: Entity) => void;

    public notify(): void {
        const entity = this.getSubject().getEntity();
        // console.debug("OnEntityInit", entity);
        if (entity.has(DrawObject) && this.renderingContext) {
            for (const drawobject of entity.all(DrawObject)) {
                drawobject.setRenderingContext(this.renderingContext)
            }
        }
        if (entity.has(DrawObject) && this.textureManager) {
            for (const drawobject of entity.all(DrawObject)) {
                drawobject.setTexture(this.textureManager.defaultTexture)
            }
            if (entity.has(SDFCharacter)) {
                entity.get(SDFCharacter).setTexture(this.textureManager.sdfTexture);
            } else if (entity.has(Flowers)) {
                entity.get(Flowers).setTexture(this.textureManager.flowerTexture);
            } else if (entity.has(Terrain)) {
                entity.get(Terrain).setTexture(this.textureManager.defaultTexture);
                entity.get(Terrain).setDepthTexture(this.textureManager.depthTexture);
            } else if (entity.has(TerrainMesh)) {
                entity.get(TerrainMesh).setTexture(this.textureManager.terrainTexture);
                entity.get(TerrainMesh).setDepthTexture(this.textureManager.depthTexture);
            } else if (entity.has(TerrainCDLOD)) {
                entity.get(TerrainCDLOD).setTexture(this.textureManager.terrainDiffuseTexture);
                entity.get(TerrainCDLOD).setDepthTexture(this.textureManager.terrainHeightTexture);
            } else if (entity.has(RockMesh)) {
                entity.get(RockMesh).setTexture(this.textureManager.defaultTexture);
            } else if (entity.has(RenderMap)) {
                entity.get(RenderMap).setTexture(this.textureManager.renderTexture);
            } else if (entity.has(ReflectMap)) {
                entity.get(ReflectMap).setTexture(this.textureManager.reflectTexture);
            } else if (entity.has(Water)) {
                entity.get(Water).setTexture(this.textureManager.renderTexture);
                entity.get(Water).setDepthTexture(this.textureManager.waterDepthTexture);
                entity.get(Water).setReflectTexture(this.textureManager.reflectTexture);
                entity.get(Water).setDistortionTexture(this.textureManager.waterDistortionTexture);
                entity.get(Water).setNormalTexture(this.textureManager.waterNormalTexture);
            } else if (entity.has(Skybox)) {
                entity.get(Skybox).setTexture(this.textureManager.skyboxTexture);
            } else if (entity.has(ShipMesh)) {
                const allMeshs = entity.all(ShipMesh);
                for (const mesh of allMeshs) {
                    mesh.setTexture(this.textureManager.defaultTexture);
                }
            } else if (entity.has(EagleMesh)) {
                const allMeshs = entity.all(EagleMesh);
                for (const mesh of allMeshs) {
                    mesh.setJointTexture(this.textureManager.eagleJointTexture);
                    mesh.setTexture(this.textureManager.flowerTexture);
                }
            } else if (entity.has(WhaleMesh)) {
                entity.get(WhaleMesh).setJointTexture(this.textureManager.jointTexture);
                entity.get(WhaleMesh).setTexture(this.textureManager.flowerTexture);
            }
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
