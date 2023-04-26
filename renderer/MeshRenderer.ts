import { GLTFMeshShader } from "../shader/GLTFMeshShader.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    constructor() {
        super(new GLTFMeshShader());
    }
  }