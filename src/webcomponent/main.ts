import Hello from "./game/Hello.js";
import TestSkinMeshWebComponent from "./game/TestSkinMeshWebComponent.js";
import GameZhuobuWebComponent from "./game/GameZhuobuWebComponent.js";
import TestSpriteWebComponent from "./game/TestSpriteWebComponent.js";
import TestMeshWebComponent from "./game/TestMeshWebComponent.js";
import TestTextWebComponent from "./game/TestTextWebComponent.js";
import GameDebugWebComponent from "./game/GameDebugWebComponent.js";
import TestGLTFWebComponent from "./game/TestGLTFWebComponent.js";
import WhaleGLTFWebComponent from "./game/WhaleGLTFWebComponent.js";
import GamePickWebComponent from "./game/GamePickWebComponent.js";
import GameDepthWebComponent from "./game/GameDepthWebComponent.js";
import GameCameraControlWebComponent from "./game/GameCameraControlWebComponent.js";
import MainGame from "./game/MainGame.js";
import ClickToStartButton from "./button/ClickToStartButton.js";
import ToggleUpdateButton from "./button/ToggleUpdateButton.js";
import SpriteScaleCheckbox from "./checkbox/SpriteScaleCheckbox.js";
import IntervalNumberRange from "./range/IntervalNumberRange.js";
import IntervalText from "./text/IntervalText.js";





customElements.define("game-beartalk", MainGame);
customElements.define('game-camera-control', GameCameraControlWebComponent);
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



customElements.define("interval-text", IntervalText);
customElements.define("interval-number-range", IntervalNumberRange);
customElements.define("click-to-start-button", ClickToStartButton);
customElements.define("toggle-update-button", ToggleUpdateButton);
customElements.define("toogle-sprite-scale-checkbox", SpriteScaleCheckbox);


window.onload = () => {
    document.body.appendChild(document.createElement("game-beartalk"));
}
