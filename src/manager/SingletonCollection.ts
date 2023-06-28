
export default abstract class SingletonCollection<BaseType> {
    private readonly objects: BaseType[] = [];
    add<T extends BaseType>(ctor: new () => T): void {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length !== 0) {
            throw new Error(`add object error, object ${ctor.name} already exist`);
        }
        this.objects.push(new ctor());

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
    
}