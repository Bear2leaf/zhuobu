import Splash from "../entity/Splash.js";
import Presenter from "./Presenter.js";

export default interface SplashPresenter extends Presenter {
    onShow(data: Splash): void;
}