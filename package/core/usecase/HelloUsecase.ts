import Hello from "../entity/Hello.js";
import HelloPresenter from "../presenter/HelloPresenter.js";
import HelloRepository from "../repository/HelloRepository.js";
import Usecase, { NoParams } from "./Usecase.js";

export default class HelloUsecase implements Usecase<void, NoParams> {
    constructor(private readonly presenter: HelloPresenter, private readonly repository: HelloRepository) { }
    async call(params: NoParams) {
        console.log("HelloUsecase.call");
        return this.repository.get().then(message => this.presenter.onHello(new Hello(message))).catch(exception => this.presenter.onError(exception));
    }
}