import SDFCharacter from "./SDFCharacter.js";

export default class ExploreText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Explore");
    }
}