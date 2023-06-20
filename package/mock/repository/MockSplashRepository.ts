import { SplashRepository } from "../../core/index.js";

export default class MockSplashRepository implements SplashRepository {
    get(): Promise<string> {
        return new Promise<string>((resolve, reject) => setTimeout(function () {
            resolve("Splash World!");
        }, 1000));
    }
}