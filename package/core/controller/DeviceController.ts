import SplashPresenter from "../presenter/SplashPresenter.js";
import SplashRepository from "../repository/SplashRepository.js";
import ShowSplashUsecase from "../usecase/ShowSplashUsecase.js";
import { NoParams } from "../usecase/Usecase.js";
import { Controller } from "./Controller.js";

export default abstract class DeviceController implements Controller {
    constructor(private readonly repository: SplashRepository, private readonly presenter: SplashPresenter) { }
    boot() {
        new ShowSplashUsecase(this.presenter, this.repository).call(new NoParams());
    }
}