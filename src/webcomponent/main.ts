import Hello from "./Hello.js";
import TestSkinMeshWebComponent from "./TestSkinMeshWebComponent.js";
import GameZhuobuWebComponent from "./GameZhuobuWebComponent.js";
import TestSpriteWebComponent from "./TestSpriteWebComponent.js";
import TestMeshWebComponent from "./TestMeshWebComponent.js";
import TestTextWebComponent from "./TestTextWebComponent.js";
import GameDebugWebComponent from "./GameDebugWebComponent.js";
import TestGLTFWebComponent from "./TestGLTFWebComponent.js";
import WhaleGLTFWebComponent from "./WhaleGLTFWebComponent.js";
import GamePickWebComponent from "./GamePickWebComponent.js";
import GameDepthWebComponent from "./GameDepthWebComponent.js";





customElements.define('hello-world', Hello);
customElements.define('test-skin-mesh', TestSkinMeshWebComponent);
customElements.define('test-mesh', TestMeshWebComponent);
customElements.define('test-sprite', TestSpriteWebComponent);
customElements.define('test-text', TestTextWebComponent);
customElements.define('game-debug', GameDebugWebComponent);
customElements.define('game-zhuobu', GameZhuobuWebComponent);
customElements.define('test-gltf', TestGLTFWebComponent);
customElements.define('whale-gltf', WhaleGLTFWebComponent);
customElements.define('game-pick', GamePickWebComponent);
customElements.define('game-depth', GameDepthWebComponent);