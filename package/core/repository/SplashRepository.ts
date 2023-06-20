import Repository from "./Repository.js";

export default interface SplashRepository extends Repository<string> {
    get(): Promise<string>;
}