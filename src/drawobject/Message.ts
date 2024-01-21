import SDFCharacter from "./SDFCharacter.js";

export default class Message extends SDFCharacter {
    initContextObjects(): void {
        super.initContextObjects();
        this.updateChars("Status");
    }
}