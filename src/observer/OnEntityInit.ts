import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import GLTFManager from "../manager/GLTFManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Node from "../transform/Node.js";
import Observer from "./Observer.js";

export default class OnEntityInit extends Observer {
    private gltfManager?: GLTFManager;
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
