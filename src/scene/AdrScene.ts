
import AdrElement from "../adr/adapter/AdrElement.js";
import AdrTextObject from "../entity/AdrTextObject.js";
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
    collectDrawObject(): void {
        super.collectDrawObject();
        this.children.forEach(child => child.collectDrawObject());
    }
    update(): void {
        super.update();
        this.children.forEach(child => child.update());
    }
    createAdrElement(selector: string) {

        const entity = new AdrTextObject();
        entity.addDefaultComponents();
        this.addEntity(entity);
        this.registerComponents(entity);
        this.initEntity(entity);
        const adrElement = new AdrElement();
        adrElement.tagName = selector;
        adrElement.setEntity(entity);
        return adrElement;
    }

}