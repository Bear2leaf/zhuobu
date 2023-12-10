import Observer from "./Observer.js";

export default class OnClickPickSayHello extends Observer {
    public notify(): void {
        console.debug("Hello Pick! ")
    }

}