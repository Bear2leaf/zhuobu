import Component from "../component/Component.js";

export default abstract class Entity  {
    private readonly components: Component[] = [];
    abstract create(): void;
    
    addComponent<T extends Component>(ctor: new (from: this) => T): void {
        const components = this.components.filter(c => c instanceof ctor);
        if (components.length !== 0) {
            throw new Error(`addComponent error, component ${ctor.name} already exist`);
        } else {
            this.components.push(new ctor(this));
        }
    }
    getComponent<T extends Component>(ctor: new (from: this) => T): T {
        const components = this.components.filter(component => component instanceof ctor);
        if (components.length === 0) {
            throw new Error(`component ${ctor.name} not exist`);
        } else if (components.length > 1) {
            throw new Error(`component ${ctor.name} is duplicated`);
        } else {
            return components[0] as T;
        }
    }

    
}