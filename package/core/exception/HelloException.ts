import Exception from "./Exception.js";

export default class HelloException extends Exception {
    constructor(message?: string) {
        super(message);
        this.name = "HelloException";
    }
}