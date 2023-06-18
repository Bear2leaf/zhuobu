import Repository from "./Repository.js";

export default interface HelloRepository extends Repository<string> {
    get(): Promise<string>;
}