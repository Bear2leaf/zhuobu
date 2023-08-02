import Component from "../component/Component.js";
import SingletonCollection from "../manager/SingletonCollection.js";

export default abstract class Entity extends SingletonCollection<Component>  {
    abstract registerComponents(): void;
    init(): void {
        this.all().forEach(component => {
            component.init();
        });
    }
    update(): void {
        this.all().forEach(component => {
            component.update();
        });
    }
    
}