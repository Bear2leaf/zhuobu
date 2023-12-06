import AdrText from "../drawobject/AdrText.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import AdrManager from "../manager/AdrManager.js";
import GLTFManager from "../manager/GLTFManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
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
        if (entity.has(Mesh) && this.gltfManager) {
            if (entity.has(WhaleMesh)) {
                this.gltfManager.initGLTF(this.gltfManager.whaleGLTF);
                entity.get(WhaleMesh).setGLTF(this.gltfManager.whaleGLTF.clone());
            } else if (entity.has(HelloWireframe)) {
                this.gltfManager.initGLTF(this.gltfManager.helloGLTF);
                entity.get(HelloWireframe).setGLTF(this.gltfManager.helloGLTF.clone());
            }
            entity.get(Mesh).initMesh();
        } else if (entity.has(AdrText) && this.adrManager) {
            if (entity.get(Node).getRoot() === entity.get(Node)) {
                entity.get(AdrText).updateChars("Adr Root!");
                entity.get(TRS).getScale().set(0.025, 0.025, 1);
            }
        }
    }

}
