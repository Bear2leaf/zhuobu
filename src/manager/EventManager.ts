import ClickBottomLeft from "../subject/ClickBottomLeft.js";
import ClickPickSubject from "../subject/ClickPick.js";
import ClickSprite from "../subject/ClickSprite.js";
import Click from "../subject/Click.js";
import EntityInit from "../subject/EntityInit.js";
import EntityAdd from "../subject/EntityAdd.js";
import OnEntityAdd from "../observer/OnEntityAdd.js";
import OnEntityInit from "../observer/OnEntityInit.js";
import EntityRegisterComponents from "../subject/EntityRegisterComponents.js";
import EntityRender from "../subject/EntityRender.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EntityUpdate from "../subject/EntityUpdate.js";


export default class EventManager {
    readonly entityInit = new EntityInit;
    readonly entityAdd = new EntityAdd;
    readonly entityRender = new EntityRender;
    readonly entityUpdate = new EntityUpdate;
    readonly entityRegisterComponents = new EntityRegisterComponents;
    readonly viewPortChange = new ViewPortChange;
    readonly click = new Click;
    readonly clickPick = new ClickPickSubject;
    readonly clickBottomLeft = new ClickBottomLeft;
    readonly clickSprite = new ClickSprite;
    initObservers() {
        const onEntityAdd = new OnEntityAdd();
        onEntityAdd.setSubject(this.entityAdd);
        const onEntityInit = new OnEntityInit();
        onEntityInit.setSubject(this.entityInit);
    }
}