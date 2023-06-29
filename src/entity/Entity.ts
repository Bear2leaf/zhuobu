import Component from "../component/Component.js";
import SingletonCollection from "../manager/SingletonCollection.js";

export default abstract class Entity extends SingletonCollection<Component>  {
    abstract create(): void;

    
}