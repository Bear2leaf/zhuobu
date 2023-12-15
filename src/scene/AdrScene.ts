
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";

export default class AdrScene extends Scene {
    getDefaultEntities(): Entity[] { return []; };

    private readonly children: AdrScene[] = [];
    private parent?: AdrScene;

    setParent(parent?: AdrScene): void {
        this.parent = parent;
    }
    addChild(child: AdrScene): void {
        if (this.children.indexOf(child) !== -1) throw new Error("Child already added");
        this.children.push(child);
        child.setParent(this);
    }
    render(): void {
        super.render();
        this.children.forEach(child => child.render());
    }
    update(): void {
        super.update();
        this.children.forEach(child => child.update());
    }

}