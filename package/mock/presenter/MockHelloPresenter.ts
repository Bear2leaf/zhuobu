import Exception from "../../core/exception/Exception.js";
import { HelloPresenter } from "../../core/index.js";

export default class MockHelloPresenter implements HelloPresenter {
    onHelloData(data: string): void {
        console.log("HelloPresenter.onHelloData", data);
    }
    onComplete(): void {
        console.log("HelloPresenter.onComplete");
    }
    onError(exception: Exception): void {
        console.log("HelloPresenter.onError", exception);
    }
}