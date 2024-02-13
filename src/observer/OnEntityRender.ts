import Border from "../drawobject/Border.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Skybox from "../drawobject/Skybox.js";
import Terrain from "../drawobject/Terrain.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import Hamburger from "../layout/Hamburger.js";
import RendererManager from "../manager/RendererManager.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Flowers from "../sprite/Flowers.js";
import ReflectMap from "../sprite/ReflectMap.js";
import RenderMap from "../sprite/RenderMap.js";
import Water from "../sprite/Water.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import Mesh from "../drawobject/Mesh.js";
import TerrainDepth from "../drawobject/TerrainDepth.js";
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import Sky from "../drawobject/Sky.js";

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
            } else if (entity.has(Terrain)) {
                this.rendererManager.getTerrainRenderer().addObject(entity.get(Terrain));
            } else if (entity.has(TerrainDepth)) {
                this.rendererManager.getTerrainDepthRenderer().addObject(entity.get(TerrainDepth));
            } else if (entity.has(TerrainCDLOD)) {
                this.rendererManager.getTerrainCDLODRenderer().addObject(entity.get(TerrainCDLOD));
            } else if (entity.has(TerrainMesh)) {
                this.rendererManager.getTerrainRenderer().addObject(entity.get(TerrainMesh));
            } else if (entity.has(RenderMap)) {
                this.rendererManager.getSpriteRenderer().addObject(entity.get(RenderMap));
            } else if (entity.has(ReflectMap)) {
                this.rendererManager.getSpriteRenderer().addObject(entity.get(ReflectMap));
            } else if (entity.has(Pointer)) {
                this.rendererManager.getPointRenderer().addObject(entity.get(Pointer));
            } else if (entity.has(HelloWireframe)) {
                this.rendererManager.getWireframeRenderer().addObject(entity.get(HelloWireframe));
            } else if (entity.has(Skybox)) {
                this.rendererManager.getSkyboxRenderer().addObject(entity.get(Skybox));
            } else if (entity.has(Sky)) {
                this.rendererManager.getSkyRenderer().addObject(entity.get(Sky));
            } else if (entity.has(Water)) {
                this.rendererManager.getWaterRenderer().addObject(entity.get(Water));
            } else if (entity.has(GLTFAnimationController)) {
                const allMeshs = entity.all(Mesh);
                for (const mesh of allMeshs) {
                    this.rendererManager.getSkinMeshRenderer().addObject(mesh);
                }
            } else if (entity.has(Mesh)) {
                const allMeshs = entity.all(Mesh);
                for (const mesh of allMeshs) {
                    this.rendererManager.getMeshRenderer().addObject(mesh);
                }
            }
        }
    }

}
