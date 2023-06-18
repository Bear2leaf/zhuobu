import {HelloRepository} from "../../core/index.js";

export default class MockHelloRepository implements HelloRepository {
    get(): Promise<string> {
        return new Promise<string>((resolve) => setTimeout(function() {
            resolve("Hello World!");
        }, 1000));
    }
}