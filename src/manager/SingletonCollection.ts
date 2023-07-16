
export default abstract class SingletonCollection<BaseType> {
    private readonly objects: BaseType[] = [];
    add<T extends BaseType>(ctor: new () => T): void {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length !== 0) {
            throw new Error(`add object error, object ${ctor.name} already exist`);
        }
        this.objects.push(new ctor());

    }
    first<T extends BaseType>(): T {
        if (this.objects.length === 0) {
            throw new Error(`object not exist`);
        }
        return this.objects[0] as T;
    }

    get<T extends BaseType>(ctor: new () => T): T {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length === 0) {
            throw new Error(`object ${ctor.name} not exist`);
        } else if (object.length > 1) {
            throw new Error(`object ${ctor.name} is duplicated`);
        } else {
            return object[0] as T;
        }
    }
    set<T extends BaseType>(ctor: new () => T, object: T): void {
        const index = this.objects.findIndex(m => m instanceof ctor);
        if (index === -1) {
            throw new Error(`object ${ctor.name} not exist`);
        }
        this.objects[index] = object;
    }
    has<T extends BaseType>(ctor: new () => T): boolean {
        return this.objects.filter(m => m instanceof ctor).length !== 0;
    }
    all<T extends BaseType>() {
        return this.objects as T[];
    }
    
}