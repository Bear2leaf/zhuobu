import InformationObject from "../entity/InformationObject.js";
import EnvironmentScene from "../scene/EnvironmentScene.js";
import Command from "./Command.js";

export default class WorkerMessageCommand extends Command {
    toggleUIScene?: () => void
    addMessage?: (message: string) => void;
    updateStatus?: (message: string) => void;
    getInformationObject?: () => InformationObject;
    getEnvironmentScene?: () => EnvironmentScene;
    loadInitScene?: () => void;
    createMessageUI?: () => void;
}