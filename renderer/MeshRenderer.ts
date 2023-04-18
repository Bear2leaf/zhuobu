import { GLTFMeshShader } from "../Shader.js";
import { GLTFMesh } from "../loader/gltf.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    mesh: GLTFMesh;
    constructor(mesh: GLTFMesh) {
        super(new GLTFMeshShader());
      this.mesh = mesh;
    }
  }