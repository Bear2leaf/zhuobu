import Hello from "../entity/Hello.js";
import Presenter from "./Presenter.js";

export default interface HelloPresenter extends Presenter {
    onHello(data: Hello): void;
}