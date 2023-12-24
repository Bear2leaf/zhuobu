import SDFCanvas from "../canvas/SDFCanvas.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Skybox from "../drawobject/Skybox.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import GLTFManager from "../manager/GLTFManager.js";
import TextureManager from "../manager/TextureManager.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Flowers from "../sprite/Flowers.js";
import ReflectMap from "../sprite/ReflectMap.js";
import RenderMap from "../sprite/RenderMap.js";
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
            entity.get(DrawObject).setRenderingContext(this.renderingContext);
        }
        if (entity.has(DrawObject) && this.textureManager) {
            entity.get(DrawObject).setTexture(this.textureManager.defaultTexture)
            if (entity.has(SDFCharacter)) {
                entity.get(SDFCharacter).setTexture(this.textureManager.sdfTexture);
            } else if (entity.has(Flowers)) {
                entity.get(Flowers).setTexture(this.textureManager.flowerTexture);
            } else if (entity.has(RenderMap)) {
                entity.get(RenderMap).setTexture(this.textureManager.renderTexture);
            } else if (entity.has(ReflectMap)) {
                entity.get(ReflectMap).setTexture(this.textureManager.reflectTexture);
            } else if (entity.has(Skybox)) {
                entity.get(Skybox).setTexture(this.textureManager.skyboxTexture);
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
        entity.get(Node).init();
        if (entity.has(DrawObject)) {
            entity.get(DrawObject).init();
        }
        if (entity.has(Mesh) && this.gltfManager) {
            if (entity.has(WhaleMesh)) {
                this.gltfManager.initGLTF(this.gltfManager.whaleGLTF);
                entity.get(WhaleMesh).setGLTF(this.gltfManager.whaleGLTF.clone());
            } else if (entity.has(HelloWireframe)) {
                this.gltfManager.initGLTF(this.gltfManager.helloGLTF);
                entity.get(HelloWireframe).setGLTF(this.gltfManager.helloGLTF.clone());
            }
            entity.get(Mesh).initMesh();
        }
        if (entity.has(SDFCharacter)) {
            entity.get(SDFCharacter).create();
        }

    }

}
