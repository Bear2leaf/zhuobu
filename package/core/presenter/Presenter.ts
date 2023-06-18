import Exception from "../exception/Exception.js";

export default interface Presenter {
    onData(): void;
    onComplete(): void;
    onError(exception: Exception): void;
}