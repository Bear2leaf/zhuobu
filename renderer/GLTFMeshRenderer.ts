import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { GLTFMeshShader } from "../shader/GLTFMeshShader.js";
import Node from "../structure/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    private readonly primitiveType: number
    constructor(gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new GLTFMeshShader(gl, textCache));
        this.primitiveType = gl.TRIANGLES;

    }
    render(camera: Camera, node: Node) {
        node.updateWorldMatrix();
        super.render(camera, node);
        this.setVector4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        const primitiveType = this.primitiveType;
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(primitiveType);
        });
        node.traverse(function (child: Node) {
            child.getDrawObjects().forEach(drawObject => {
                drawObject.draw(primitiveType);
            });
        });
    }
}