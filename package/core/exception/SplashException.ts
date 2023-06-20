import Exception from "./Exception.js";

export default class SplashException extends Exception {
    constructor() {
        super("SplashException");
        console.log("SplashException.constructor");
    }
}