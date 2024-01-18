import SDFCharacter from "./SDFCharacter.js";

export default class RestText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Rest")
    }
}