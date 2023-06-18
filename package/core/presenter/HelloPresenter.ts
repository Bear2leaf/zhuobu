import Presenter from "./Presenter.js";

export default interface HelloPresenter extends Presenter {
    onHelloData(data: string): void;
}