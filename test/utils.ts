export async function t(name: string, cb: Function) {
    try {
        await cb();
    } catch (e) {
        console.error(`Test failed: ${name}`);
        throw e;
    }
}

export function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message)
    }
}