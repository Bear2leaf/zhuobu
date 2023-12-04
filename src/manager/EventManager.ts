import OnClickBottomLeftSubject from "../subject/OnClickBottomLeftSubject.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import OnClickSpriteSubject from "../subject/OnClickSpriteSubject.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import OnAddToSceneSubject from "../subject/OnAddToSceneSubject.js";


export default class EventManager {
    private readonly onAddToSceneSubject = new OnAddToSceneSubject;
    private readonly onClickSubject = new OnClickSubject;
    private readonly onClickPickSubject = new OnClickPickSubject;
    private readonly onClickBottomLeftSubject = new OnClickBottomLeftSubject;
    private readonly onClickSpriteSubject = new OnClickSpriteSubject;
}