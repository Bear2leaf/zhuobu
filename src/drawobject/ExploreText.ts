import SDFCharacter from "./SDFCharacter.js";

export default class ExploreText extends SDFCharacter {
    initContextObjects(): void {
        super.initContextObjects();
        this.updateChars("Explore");
    }
}