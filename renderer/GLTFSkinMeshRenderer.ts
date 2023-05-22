import Camera from "../camera/Camera.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Matrix from "../math/Matrix.js";
import { Vec3, Vec4, flatten } from "../math/Vector.js";
import { GLTFSkinShader } from "../shader/GLTFSkinShader.js";
import Node from "../structure/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new GLTFSkinShader(gl, textCache));
        this.primitiveType = gl.TRIANGLES;
    }
    render(camera: Camera, node: Node) {
        super.render(camera, node);
        this.setVector4fv("u_diffuse", new Vec4(.5, .8, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        this.setInteger("u_jointTexture", 1);
        const primitiveType = this.primitiveType;
        node.traverse((child: Node) => {
            child.getDrawObjects().forEach(drawObject => {
                drawObject.draw(primitiveType);
            });
        });
    }
}
