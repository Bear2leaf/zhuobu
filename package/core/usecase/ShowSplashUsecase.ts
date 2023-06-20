import Splash from "../entity/Splash.js";
import SplashPresenter from "../presenter/SplashPresenter.js";
import SplashRepository from "../repository/SplashRepository.js";
import Usecase, { NoParams } from "./Usecase.js";

export default class ShowSplashUsecase implements Usecase<void, NoParams> {
    constructor(private readonly presenter: SplashPresenter, private readonly repository: SplashRepository) { }
    async call(params: NoParams) {
        return this.repository.get().then(message => this.presenter.onShow(new Splash(message))).catch(exception => this.presenter.onError(exception));
    }
}