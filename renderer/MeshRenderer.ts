import Camera from "../camera/Camera.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import { GLTFMeshShader } from "../shader/GLTFMeshShader.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    private readonly primitiveType: number
    constructor( gl: WebGL2RenderingContext, textCache: Map<string, string>) {
        super(new GLTFMeshShader( gl, textCache));
        this.primitiveType = gl.TRIANGLES;

    }
    render(camera: Camera, drawObject: DrawObject) {
        super.render(camera, drawObject);
        this.setMatrix4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setMatrix3fv("u_lightDirection", new Vec3(0, 0, 1));
        drawObject.draw(this.primitiveType);
    }
  }