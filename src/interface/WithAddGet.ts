export default interface WithAddGet<BaseClass, FromClass> {
    add<T extends BaseClass>(ctor: new (from: FromClass) => T): void;
    get<T extends BaseClass>(ctor: new (from: FromClass) => T): T;
}