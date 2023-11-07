import BrowserCameraControllGame from "../../game/BrowserCameraControllGame.js";

// base web component
export default class GameCameraControlWebComponent extends HTMLElement {
    constructor() {
        super()
        new BrowserCameraControllGame(this);
        
    }
}