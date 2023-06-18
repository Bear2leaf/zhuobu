export default interface Repository<T> {
    get(): Promise<T>;
}