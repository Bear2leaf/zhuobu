export default class Modifier {
    private readonly listeners: Array<VoidFunction> = [];
    update(): void {
        this.listeners.forEach(listener => listener());
    }
    addListener(listener: VoidFunction) {
        const existListener = this.listeners.find(l => l === listener);
        if (existListener) {
            throw new Error("listener already exists");
        } else {
            this.listeners.push(listener);
        }
    }

}