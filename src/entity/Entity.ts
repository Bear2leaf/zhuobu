import Component from "./Component.js";

export default abstract class Entity {
    private readonly objects: Component[] = [];
    abstract addDefaultComponents(): void;
    add<T extends Component>(ctor: new () => T): void {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length !== 0) {
            throw new Error(`add object error, object ${ctor.name} already exist`);
        }
        this.objects.push(new ctor());

    }
    first<T extends Component>(): T {
        if (this.objects.length === 0) {
            throw new Error(`object not exist`);
        }
        return this.objects[0] as T;
    }

    get<T extends Component>(ctor: new () => T): T {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length === 0) {
            throw new Error(`object ${ctor.name} not exist`);
        } else if (object.length > 1) {
            throw new Error(`object ${ctor.name} is duplicated`);
        } else {
            return object[0] as T;
        }
    }
    ctors<T extends Component>() {
        return this.objects.map<new () => T>(m => m.constructor as new () => T);
    }
    set<T extends Component>(ctor: new () => T, object: T): void {
        const index = this.objects.findIndex(m => m instanceof ctor);
        if (index === -1) {
            throw new Error(`object ${ctor.name} not exist`);
        }
        this.objects[index] = object;
    }
    has<T extends Component>(ctor: new () => T): boolean {
        return this.objects.filter(m => m instanceof ctor).length !== 0;
    }
    all<T extends Component>(ctor?: new () => T) {
        return this.objects.filter(m => !ctor || m instanceof ctor) as T[];
    }


}