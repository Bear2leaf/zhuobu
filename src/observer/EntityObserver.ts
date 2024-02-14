import Entity from "../entity/Entity.js";
import Observer from "./Observer.js";

export default class EntityObserver extends Observer {
    entity? : Entity;

}