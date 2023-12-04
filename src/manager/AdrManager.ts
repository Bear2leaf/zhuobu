import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";
import BodyElement from "../adr/adapter/BodyElement.js";
import HeadElement from "../adr/adapter/HeadElement.js";
import LocalStorageAdapter from "../adr/adapter/LocalStorageAdapter.js";
import StyleSheetsAdapter from "../adr/adapter/StyleSheetsAdapter.js";
import AddEventListener from "../adr/adapter/AddEventListener.js";
import ClearInterval from "../adr/adapter/ClearInterval.js";
import ClearTimeout from "../adr/adapter/ClearTimeout.js";
import CreateAudioContext from "../adr/adapter/CreateAudioContext.js";
import CreateElement from "../adr/adapter/CreateElement.js";
import GetElementById from "../adr/adapter/GetElementById.js";
import GetElementsByClassName from "../adr/adapter/GetElementsByClassName.js";
import GetElementsByTagName from "../adr/adapter/GetElementsByTagName.js";
import Href from "../adr/adapter/Href.js";
import Open from "../adr/adapter/Open.js";
import RemoveEventListener from "../adr/adapter/RemoveEventListener.js";
import SetInterval from "../adr/adapter/SetInterval.js";
import SetLocation from "../adr/adapter/SetLocation.js";
import SetTimeout from "../adr/adapter/SetTimeout.js";
import Title from "../adr/adapter/Title.js";

export default class AdrManager {
    private sceneManager?: SceneManager;
    private readonly addEventListener = new AddEventListener;
    private readonly headElement = new HeadElement;
    private readonly href = new Href;
    private readonly bodyElement = new BodyElement;
    private readonly localStorageAdapter = new LocalStorageAdapter;
    private readonly clearInterval = new ClearInterval;
    private readonly open = new Open;
    private readonly clearTimeout = new ClearTimeout;
    private readonly removeEventListener = new RemoveEventListener;
    private readonly createAudioContext = new CreateAudioContext;
    private readonly setInterval = new SetInterval;
    private readonly createElement = new CreateElement;
    private readonly setLocation = new SetLocation;
    private readonly getElementById = new GetElementById;
    private readonly setTimeout = new SetTimeout;
    private readonly getElementsByClassName = new GetElementsByClassName;
    private readonly styleSheetsAdapter = new StyleSheetsAdapter;
    private readonly getElementsByTagName = new GetElementsByTagName;
    private readonly title = new Title;
    initAdr(): void {
        [
            this.addEventListener,
            this.headElement,
            this.href,
            this.bodyElement,
            this.localStorageAdapter,
            this.clearInterval,
            this.open,
            this.clearTimeout,
            this.removeEventListener,
            this.createAudioContext,
            this.setInterval,
            this.createElement,
            this.setLocation,
            this.getElementById,
            this.setTimeout,
            this.getElementsByClassName,
            this.styleSheetsAdapter,
            this.getElementsByTagName,
            this.title,
        ].forEach(adapter => {
            adapter.setSeceneManager(this.getSceneManager());
            adapter.init()
        });
        Engine.createDefaultElements();
        Engine.init();
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }

}