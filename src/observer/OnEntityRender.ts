import AnimationController from "../controller/AnimationController.js";
import Border from "../drawobject/Border.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Skybox from "../drawobject/Skybox.js";
import Terrian from "../drawobject/Terrian.js";
import TerrianMesh from "../drawobject/TerrianMesh.js";
import Hamburger from "../layout/Hamburger.js";
import RendererManager from "../manager/RendererManager.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Flowers from "../sprite/Flowers.js";
import ReflectMap from "../sprite/ReflectMap.js";
import RenderMap from "../sprite/RenderMap.js";
import Water from "../sprite/Water.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityRender extends Observer {
    private rendererManager?: RendererManager;
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    setRendererManager(rendererManager: RendererManager) {
        this.rendererManager = rendererManager;
    }
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.has(DrawObject) && this.rendererManager) {
            if (entity.has(SDFCharacter)) {
                this.rendererManager.getSDFRenderer().addObject(entity.get(SDFCharacter));
                this.rendererManager.getLineRenderer().addObject(entity.get(Border));
            } else if (entity.has(Hamburger)) {
                this.rendererManager.getLineRenderer().addObject(entity.get(Border));
            } else if (entity.has(DefaultSprite)) {
                this.rendererManager.getSpriteRenderer().addObject(entity.get(DefaultSprite));
            } else if (entity.has(Flowers)) {
                this.rendererManager.getBackSpriteRenderer().addObject(entity.get(Flowers));
            }  else if (entity.has(Terrian)) {
                this.rendererManager.getTerrianRenderer().addObject(entity.get(Terrian));
            }  else if (entity.has(TerrianMesh)) {
                this.rendererManager.getTerrianRenderer().addObject(entity.get(TerrianMesh));
            } else if (entity.has(RenderMap)) {
                this.rendererManager.getBackSpriteRenderer().addObject(entity.get(RenderMap));
            } else if (entity.has(ReflectMap)) {
                this.rendererManager.getBackSpriteRenderer().addObject(entity.get(ReflectMap));
            } else if (entity.has(Pointer)) {
                this.rendererManager.getPointRenderer().addObject(entity.get(Pointer));
            } else if (entity.has(HelloWireframe)) {
                this.rendererManager.getWireframeRenderer().addObject(entity.get(HelloWireframe));
            } else if (entity.has(HelloMultiMesh)) {
                this.rendererManager.getMeshRenderer().addObject(entity.get(HelloMultiMesh));
            } else if (entity.has(Skybox)) {
                this.rendererManager.getSkyboxRenderer().addObject(entity.get(Skybox));
            } else if (entity.has(Water)) {
                this.rendererManager.getWaterRenderer().addObject(entity.get(Water));
            } else if (entity.has(SkinMesh)) {
                if (entity.has(AnimationController)) {
                    this.rendererManager.getSkinMeshRenderer().addObject(entity.get(SkinMesh));
                } else {
                    this.rendererManager.getMeshRenderer().addObject(entity.get(SkinMesh));
                }
            }
        }
    }

}
