import Camera from "../camera/Camera.js";
import Primitive, { PrimitiveType } from "../contextobject/Primitive.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import RenderingCtx from "../renderingcontext/RenderingCtx.js";
import Node from "../structure/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    private readonly primitive: Primitive
    constructor(gl: RenderingCtx, textCache: Map<string, string>) {
        super(gl.makeShader("SkinMesh"));
        this.primitive = gl.makePrimitive(PrimitiveType.TRIANGLES);
    }
    render(camera: Camera, node: Node) {
        super.render(camera, node);
        this.setVector4fv("u_diffuse", new Vec4(.5, .8, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        this.setInteger("u_jointTexture", 1);
        node.getDrawObjects().forEach(drawObject => {
            drawObject.draw(this.primitive.getMode());
        });
        node.traverse((child: Node) => {
            child.getDrawObjects().forEach(drawObject => {
                drawObject.draw(this.primitive.getMode());
            });
        });
    }
}
