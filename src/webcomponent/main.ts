import TestSkinMeshWebComponent from "./TestSkinMeshWebComponent.js";
import GameZhuobuWebComponent from "./GameZhuobuWebComponent.js";
import Hello from "./Hello.js";
import TestSpriteWebComponent from "./TestSpriteWebComponent.js";
import TestMeshWebComponent from "./TestMeshWebComponent.js";
import TestTextWebComponent from "./TestTextWebComponent.js";
import TextDebugWebComponent from "./TextDebugWebComponent.js";
import TestGLTFWebComponent from "./TestGLTFWebComponent.js";





customElements.define('hello-world', Hello);
customElements.define('test-skin-mesh', TestSkinMeshWebComponent);
customElements.define('test-mesh', TestMeshWebComponent);
customElements.define('test-sprite', TestSpriteWebComponent);
customElements.define('test-text', TestTextWebComponent);
customElements.define('text-debug', TextDebugWebComponent);
customElements.define('game-zhuobu', GameZhuobuWebComponent);
customElements.define('test-gltf', TestGLTFWebComponent);
