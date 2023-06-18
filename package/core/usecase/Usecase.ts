export default interface Usecase<T, Params> {
    call(params: Params): Promise<T>;
}

export class NoParams { }
