import { SplashPresenter, Splash, SplashException } from "../../core/index.js";

export default class MockSplashPresenter implements SplashPresenter {
    private message: string = "Nothing";
    onShow(data: Splash): void {
        console.log("SplashPresenter.onSplash");
        this.message = data.message;
        this.onData();
        this.onComplete();
    }
    onData(): void {
        console.log("SplashPresenter.onData:", this.message);
    }
    onComplete(): void {
        console.log("SplashPresenter.onComplete");
    }
    onError(exception: SplashException): void {
        console.log("SplashPresenter.onError", exception);
    }
}