import Manager from "./Manager.js";

interface WorkerCallback {
    decode(...args: unknown[]): void;
    execute(): void;
}

class ConsoleCallback implements WorkerCallback {
    decode(...args: unknown[]): void {
        console.log(...args);
    }
    execute(): void {
    }
}

export default class WorkerManager extends Manager<WorkerCallback> {
    addObjects(): void {
        [
            ConsoleCallback
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }
    init(): void {
        this.getDevice().createWorker("workers/worker.js", (worker: Worker, ...args: unknown[]) => {
            this.get(ConsoleCallback).decode(...args);
            this.get(ConsoleCallback).execute();
        });
    }
    update(): void {
    }
    private callbackNameToCtor(name: string): new () => WorkerCallback {
        switch (name) {
            default:
                throw new Error(`callback ${name} not found`);
        }
    }
}