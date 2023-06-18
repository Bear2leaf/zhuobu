import HelloPresenter from "../presenter/HelloPresenter.js";
import HelloRepository from "../repository/HelloRepository.js";
import HelloUsecase from "../usecase/HelloUsecase.js";
import { NoParams } from "../usecase/Usecase.js";
import { Controller } from "./Controller.js";

export default abstract class HelloController implements Controller {
    constructor(private readonly repository: HelloRepository, private readonly presenter: HelloPresenter) {}
    hello() {
        new HelloUsecase(this.presenter, this.repository).call(new NoParams());
    }
}