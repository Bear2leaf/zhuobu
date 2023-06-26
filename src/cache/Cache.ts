export default interface Cache<T> {
    load(name: string): Promise<void>;
    get(name: string): T;
}