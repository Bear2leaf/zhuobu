import SDFCharacter from "./SDFCharacter.js";

export default class RestText extends SDFCharacter {
    initContextObjects(): void {
        super.initContextObjects();
        this.updateChars("Rest")
    }
}