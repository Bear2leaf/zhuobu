import ClickBottomLeft from "../subject/ClickBottomLeft.js";
import ClickPickSubject from "../subject/ClickPick.js";
import ClickSprite from "../subject/ClickSprite.js";
import Click from "../subject/Click.js";
import EntityInit from "../subject/EntityInit.js";
import OnEntityInit from "../observer/OnEntityInit.js";


export default class EventManager {
    readonly entityInit = new EntityInit;
    readonly click = new Click;
    readonly clickPick = new ClickPickSubject;
    readonly clickBottomLeft = new ClickBottomLeft;
    readonly clickSprite = new ClickSprite;
    registerDefaultObservers() {
        const onEntityInit = new OnEntityInit();
        onEntityInit.setSubject(this.entityInit);
    }
}