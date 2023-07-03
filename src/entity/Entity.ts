import Component from "../component/Component.js";
import SingletonCollection from "../manager/SingletonCollection.js";

export default abstract class Entity extends SingletonCollection<Component>  {
    abstract registerComponents(): void;
    abstract init(): void;
    abstract update(): void;
    
}