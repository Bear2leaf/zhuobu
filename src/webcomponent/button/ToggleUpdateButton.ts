import GameUpdateModifier from "../../modifier/GameUpdateModifier.js";
import Button from "./Button.js";

export default class ToggleUpdateButton extends Button {
    private isPaused: boolean = false;
    constructor(private readonly modifier: GameUpdateModifier) {
        super();
        this.setText("Pause");
        this.style.display = "inline-block";
    }
    onClick(): void {
        
        if (this.isPaused) {
            this.setText(`Pause`);
            this.modifier.resume();
            this.isPaused = false;
        } else {
            this.setText(`Resume`);
            this.modifier.pause();
            this.isPaused = true;
        }
    }
}