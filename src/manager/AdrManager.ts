import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";
import AdrAdapter from "../adr/adapter/AdrAdapter.js";
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

export default class AdrManager extends Manager<AdrAdapter> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            AddEventListener,
            HeadElement,
            Href,
            BodyElement,
            LocalStorageAdapter,
            ClearInterval,
            Open,
            ClearTimeout,
            RemoveEventListener,
            CreateAudioContext,
            SetInterval,
            CreateElement,
            SetLocation,
            GetElementById,
            SetTimeout,
            GetElementsByClassName,
            StyleSheetsAdapter,
            GetElementsByTagName,
            Title,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.all().forEach(adapter => adapter.init());
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
    update(): void {
    }

}