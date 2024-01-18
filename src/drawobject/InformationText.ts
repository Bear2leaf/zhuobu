import SDFCharacter from "./SDFCharacter.js";

export default class InformationText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Information")
    }
}