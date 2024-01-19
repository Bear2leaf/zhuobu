import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloWireframe extends Mesh {
    initMesh(): void {
        
        const gltf = this.getGLTF();
        const entity = this.getEntity();
        const node = gltf.getDefaultNode();
        const mesh = gltf.getMeshByIndex(node.getMesh());
        const primitive = mesh.getPrimitiveByIndex(0);
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        entity.get(Node).setSource(node.getNode().getSource());
        entity.get(Mesh).setWireframeMeshData(
            gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            , gltf.getDataByAccessorIndex(texcoordIndex) as Float32Array
        );
        if (entity.has(GLTFAnimationController)) {

            const animation = gltf.getDefaultAnimation();
            animation.createBuffers(gltf);
            entity.get(GLTFAnimationController).setAnimationData(
                animation
            );
        }
        node.getNode().setParent(entity.get(Node));
    }
    draw(): void {
        this.updateRootTRSFromFirstChild();
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchDepthWrite(false);
        this.getRenderingContext().switchCulling(false);
        super.draw();
        this.getRenderingContext().switchCulling(true);
        this.getRenderingContext().switchDepthWrite(true);
        this.getRenderingContext().switchBlend(false);
    }
    updateRootTRSFromFirstChild() {
        this.getEntity().get(TRS).getPosition().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getPosition());
        this.getEntity().get(TRS).getRotation().from(this.getEntity().get(Node).getChildByIndex(0).getSource()!.getRotation());

    }
}