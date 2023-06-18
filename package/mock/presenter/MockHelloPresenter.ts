import { HelloPresenter, Hello, HelloException } from "../../core/index.js";

export default class MockHelloPresenter implements HelloPresenter {
    private message: string = "Nothing";
    onHello(data: Hello): void {
        console.log("HelloPresenter.onHello");
        this.message = data.message;
        this.onData();
        this.onComplete();
    }
    onData(): void {
        console.log("HelloPresenter.onData:", this.message);
    }
    onComplete(): void {
        console.log("HelloPresenter.onComplete");
    }
    onError(exception: HelloException): void {
        console.log("HelloPresenter.onError", exception);
    }
}