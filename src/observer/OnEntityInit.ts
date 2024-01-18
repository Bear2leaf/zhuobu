import SDFCanvas from "../canvas/SDFCanvas.js";
import { WindowInfo } from "../device/Device.js";
import Border from "../drawobject/Border.js";
import DrawObject from "../drawobject/DrawObject.js";
import EnvironmentMesh from "../drawobject/EnvironmentMesh.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Skybox from "../drawobject/Skybox.js";
import Terrian from "../drawobject/Terrian.js";
import TerrianMesh from "../drawobject/TerrianMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import Hamburger from "../layout/Hamburger.js";
import GLTFManager from "../manager/GLTFManager.js";
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

export default class OnEntityInit extends Observer {
    private gltfManager?: GLTFManager;
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
    setGLTFManager(gltfManager: GLTFManager) {
        this.gltfManager = gltfManager;
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
            } else if (entity.has(Terrian)) {
                entity.get(Terrian).setTexture(this.textureManager.defaultTexture);
                entity.get(Terrian).setDepthTexture(this.textureManager.depthTexture);
            } else if (entity.has(TerrianMesh)) {
                entity.get(TerrianMesh).setTexture(this.textureManager.terrianTexture);
                entity.get(TerrianMesh).setDepthTexture(this.textureManager.depthTexture);
            }  else if (entity.has(EnvironmentMesh)) {
                entity.get(EnvironmentMesh).setTexture(this.textureManager.terrianTexture);
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
            } else if (entity.has(SkinMesh)) {
                entity.get(SkinMesh).setJointTexture(this.textureManager.jointTexture);
                entity.get(SkinMesh).setTexture(this.textureManager.flowerTexture);
            }
        }
        if (entity.has(SDFCharacter) && this.sdfCanvas) {
            this.sdfCanvas.updateTextTexture(entity.get(SDFCharacter));
        }
        if (entity.has(Pointer) && this.onClick) {
            this.onClick.setPointer(entity.get(Pointer));
        }
        entity.get(Node).init();
        if (entity.has(DrawObject)) {
            entity.all(DrawObject).forEach(drawobject => drawobject.init());
        }
        if (entity.has(Mesh) && this.gltfManager) {
            if (entity.has(WhaleMesh)) {
                entity.get(WhaleMesh).setGLTF(this.gltfManager.whaleGLTF.clone());
            } else if (entity.has(HelloWireframe)) {
                entity.get(HelloWireframe).setGLTF(this.gltfManager.helloGLTF.clone());
            } else if (entity.has(HelloMultiMesh)) {
                entity.get(HelloMultiMesh).setGLTF(this.gltfManager.helloMultiGLTF.clone());
            } else if (entity.has(TerrianMesh)) {
                entity.get(TerrianMesh).setGLTF(this.gltfManager.terrianGLTF.clone());
            } else if (entity.has(EnvironmentMesh)) {
                entity.get(EnvironmentMesh).setGLTF(this.gltfManager.rockGLTF.clone());
            }
            entity.get(Mesh).initMesh();
        }
        if (entity.has(SDFCharacter)) {
            entity.get(SDFCharacter).create();
        }

        if (entity.has(SDFCharacter)) {
            entity.get(Border).createFromSDFCharacter();
        }
        if (entity.has(Hamburger)) {
            if (this.windowInfo === undefined) throw new Error("windowInfo is undefined");
            entity.get(Hamburger).setWindowInfo(this.windowInfo);
            entity.get(Border).createFromHamburger(entity.get(Hamburger).getPadding());
        }


    }

}
