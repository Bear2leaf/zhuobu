import Manager from "./Manager.js";

export default class RendererManager extends Manager<unknown> {
    init(): void {
        console.log("RendererManager init");
    }
}