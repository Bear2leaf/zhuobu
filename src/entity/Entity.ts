import Component from "../component/Component.js";

export default abstract class Entity {
    private readonly components: Component[] = [];
    protected addComponent(component: Component): void {
        for (const c of this.components) {
            if (c === component || c.constructor === component.constructor) {
                throw new Error(`component already added: ${component}`);
            }
        }
        this.components.push(component);
    }
    getComponent<T extends Component>(componentType: new (...args: any[]) => T): T{
        const component: T | undefined = this.components.find((obj: Component): obj is T => obj instanceof componentType) as T | undefined;
        if (!component) {
            throw new Error(`component not found: ${componentType}`);
        }
        return component;
    }

}