import AdrBodyText from "../drawobject/AdrBodyText.js";
import AdrHeadText from "../drawobject/AdrHeadText.js";
import AdrRoot from "../drawobject/AdrRoot.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import AdrManager from "../manager/AdrManager.js";
import GLTFManager from "../manager/GLTFManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityInit extends Observer {
    private adrManager?: AdrManager;
    private gltfManager?: GLTFManager;
    setGLTFManager(gltfManager: GLTFManager) {
        this.gltfManager = gltfManager;
    }
    setAdrManager(adrManager: AdrManager) {
        this.adrManager = adrManager;
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
        console.log("OnEntityInit", entity);
        if (entity.has(AdrRoot) && this.adrManager) {
            this.adrManager.initRoot(entity);
        } else if (entity.has(AdrHeadText) && this.adrManager) {
            this.adrManager.initHead(entity);
        } else if (entity.has(AdrBodyText) && this.adrManager) {
            this.adrManager.initBody(entity);
        } else if (entity.has(Mesh) && this.gltfManager) {
            if (entity.has(WhaleMesh)) {
                this.gltfManager.initGLTF(this.gltfManager.whaleGLTF);
                entity.get(WhaleMesh).setGLTF(this.gltfManager.whaleGLTF.clone());
            } else if (entity.has(HelloWireframe)) {
                this.gltfManager.initGLTF(this.gltfManager.helloGLTF);
                entity.get(HelloWireframe).setGLTF(this.gltfManager.helloGLTF.clone());
            }
            entity.get(Mesh).initMesh();
        }
    }

}
