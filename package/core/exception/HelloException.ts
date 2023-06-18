import Exception from "./Exception.js";

export default class HelloException extends Exception {
    constructor() {
        super("HelloException");
        console.log("HelloException.constructor");
    }
}