import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";

export default class AdrScene extends Scene {
    getDefaultEntities(): Entity[] { return []; };
    addChild(child: Scene): void {
        if (this.getChildren().indexOf(child) !== -1) throw new Error("Child already added");
        this.getChildren().push(child);
        child.setParent(this);
    }
    collectDrawObject(): void {
        super.collectDrawObject();
        this.getChildren().forEach(child => child.collectDrawObject());
    }
    update(): void {
        super.update();
        this.getChildren().forEach(child => child.update());
    }

}