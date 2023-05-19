import TestFactoryWebComponent from "./TestFactoryWebComponent.js";
import GameZhuobuWebComponent from "./GameZhuobuWebComponent.js";
import Hello from "./Hello.js";
import TestSpriteSystemWebComponent from "./TestSpriteSystemWebComponent.js";





customElements.define('hello-world', Hello);
customElements.define('test-factory', TestFactoryWebComponent);
customElements.define('test-sprite-system', TestSpriteSystemWebComponent);
customElements.define('game-zhuobu', GameZhuobuWebComponent);
