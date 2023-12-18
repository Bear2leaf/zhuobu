import ClickPickSubject from "../subject/ClickPick.js";
import Click from "../subject/Click.js";
import EntityInit from "../subject/EntityInit.js";
import EntityAdd from "../subject/EntityAdd.js";
import OnEntityAdd from "../observer/OnEntityAdd.js";
import OnEntityInit from "../observer/OnEntityInit.js";
import EntityRegisterComponents from "../subject/EntityRegisterComponents.js";
import EntityRender from "../subject/EntityRender.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EntityUpdate from "../subject/EntityUpdate.js";
import EntityRemove from "../subject/EntityRemove.js";
import AdrElementRemove from "../subject/AdrElementRemove.js";
import AdrElementIdChange from "../subject/AdrElementIdChange.js";
import AdrElementParentChange from "../subject/AdrElementParentChange.js";
import OnEntityRender from "../observer/OnEntityRender.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import OnAdrElementIdChange from "../observer/OnAdrElementIdChange.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import OnAdrElementRemove from "../observer/OnAdrElementRemove.js";
import OnAdrElementParentChange from "../observer/OnAdrElementParentChange.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";
import OnViewPortChange from "../observer/OnViewPortChange.js";
import OnClick from "../observer/OnClick.js";


export default class EventManager {
    readonly entityInit = new EntityInit;
    readonly entityAdd = new EntityAdd;
    readonly entityRemove = new EntityRemove;
    readonly entityRender = new EntityRender;
    readonly entityUpdate = new EntityUpdate;
    readonly entityRegisterComponents = new EntityRegisterComponents;
    readonly viewPortChange = new ViewPortChange;
    readonly click = new Click;
    readonly clickPick = new ClickPickSubject;
    readonly adrElementRemove = new AdrElementRemove;
    readonly adrElementIdChange = new AdrElementIdChange;
    readonly adrElementParentChange = new AdrElementParentChange;
    
    readonly onEntityRegisterComponents = new OnEntityRegisterComponents;
    readonly onEntityUpdate = new OnEntityUpdate;
    readonly onEntityRender = new OnEntityRender;
    readonly onEntityAdd = new OnEntityAdd;
    readonly onEntityInit = new OnEntityInit;
    readonly onIdChange = new OnAdrElementIdChange;
    readonly onClick = new OnClick;
    readonly onClickPick = new OnClickPickSayHello;
    readonly onRemove = new OnAdrElementRemove;
    readonly onParentChange = new OnAdrElementParentChange;
    readonly onViewPortChange = new OnViewPortChange;





    initObservers() {
        this.onEntityAdd.setSubject(this.entityAdd);
        this.onEntityInit.setSubject(this.entityInit);
        this.onEntityRegisterComponents.setSubject(this.entityRegisterComponents);

        this.onEntityUpdate.setSubject(this.entityUpdate);
        this.onEntityRender.setSubject(this.entityRender);
        this.onIdChange.setSubject(this.adrElementIdChange);
        this.onClick.setSubject(this.click);
        this.onClick.setChainNext(this.clickPick)
        this.onClickPick.setSubject(this.clickPick);
        this.onRemove.setSubject(this.adrElementRemove);
        this.onParentChange.setSubject(this.adrElementParentChange);
        this.onViewPortChange.setSubject(this.viewPortChange);
    }
}