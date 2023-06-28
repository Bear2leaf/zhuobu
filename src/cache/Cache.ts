

export default abstract class Cache<T> {
    abstract load(name: string): Promise<void>;
    abstract get(name: string): T;
    
}