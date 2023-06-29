import Manager from "./Manager.js";

export default class EventManager extends Manager<unknown> {
    init(): void {
        console.log("EventManager init");
    }
}