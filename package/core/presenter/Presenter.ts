import Exception from "../exception/Exception.js";

export default interface Presenter {
    onComplete(): void;
    onError(exception: Exception): void;
}