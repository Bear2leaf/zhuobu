import Game from "../game/Game.js";

export default abstract class Manager<BaseType> {
    private readonly objects: BaseType[] = [];
    constructor(protected readonly game: Game) {
    }
    add<T extends BaseType>(ctor: new (from: this) => T): void {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length !== 0) {
            throw new Error(`add manager object error, object ${ctor.name} already exist`);
        }
        this.objects.push(new ctor(this));

    }
    get<T extends BaseType>(ctor: new (from: this) => T): T {
        const object = this.objects.filter(m => m instanceof ctor);
        if (object.length === 0) {
            throw new Error(`manager object ${ctor.name} not exist`);
        } else if (object.length > 1) {
            throw new Error(`manager object ${ctor.name} is duplicated`);
        } else {
            return object[0] as T;
        }
    }
    
}