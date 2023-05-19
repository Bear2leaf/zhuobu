import TestFactoryWebComponent from "./factory/TestFactoryWebComponent.js";
import GameZhuobuWebComponent from "./GameZhuobuWebComponent.js";
import Hello from "./Hello.js";





customElements.define('hello-world', Hello);
customElements.define('test-factory', TestFactoryWebComponent);
customElements.define('game-zhuobu', GameZhuobuWebComponent);
