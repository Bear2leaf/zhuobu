import ClickPick from "../subject/ClickPick.js";
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
import OnEntityRender from "../observer/OnEntityRender.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import OnClickPick from "../observer/OnClickPick.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";
import OnViewPortChange from "../observer/OnViewPortChange.js";
import OnClick from "../observer/OnClick.js";
import WorkerMessageSubject from "../subject/WorkerMessageSubject.js";
import OnWorkerMessage from "../observer/OnWorkerMessage.js";
import UILayout from "../subject/UILayout.js";
import OnUILayout from "../observer/OnUILayout.js";
import CameraFovChange from "../subject/CameraFovChange.js";
import OnCameraFovChange from "../observer/OnCameraFovChange.js";


export default class EventManager {
    readonly entityInit = new EntityInit;
    readonly entityAdd = new EntityAdd;
    readonly entityRemove = new EntityRemove;
    readonly entityRender = new EntityRender;
    readonly entityUpdate = new EntityUpdate;
    readonly entityRegisterComponents = new EntityRegisterComponents;
    readonly viewPortChange = new ViewPortChange;
    readonly click = new Click;
    readonly clickPick = new ClickPick;
    readonly workerMessage = new WorkerMessageSubject;
    readonly uiLayout = new UILayout;
    readonly cameraFovChange = new CameraFovChange;
    
    readonly onEntityRegisterComponents = new OnEntityRegisterComponents;
    readonly onEntityUpdate = new OnEntityUpdate;
    readonly onEntityRender = new OnEntityRender;
    readonly onEntityAdd = new OnEntityAdd;
    readonly onEntityInit = new OnEntityInit;
    readonly onClick = new OnClick;
    readonly onClickPick = new OnClickPick;
    readonly onViewPortChange = new OnViewPortChange;
    readonly onWorkerMessage = new OnWorkerMessage;
    readonly onUILayout = new OnUILayout;
    readonly onCameraFovChange = new OnCameraFovChange;





    initObservers() {
        this.entityAdd.register(this.onEntityAdd)
        this.entityInit.register(this.onEntityInit);
        this.entityRegisterComponents.register(this.onEntityRegisterComponents);
        this.entityUpdate.register(this.onEntityUpdate);
        this.entityRender.register(this.onEntityRender);
        this.click.register(this.onClick);
        this.clickPick.register(this.onClickPick);
        this.viewPortChange.register(this.onViewPortChange);
        this.workerMessage.register(this.onWorkerMessage);
        this.uiLayout.register(this.onUILayout);
        this.cameraFovChange.register(this.onCameraFovChange);
    }
}