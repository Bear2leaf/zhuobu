import ModifierManager from "../../manager/ModifierManager.js";
import SceneInfoModifier from "../../modifier/SceneInfoModifier.js";
import TimestepModifier from "../../modifier/TimestepModifier.js";
import IntervalText from "../text/IntervalText.js";
import ClickToStartButton from "../button/ClickToStartButton.js";
import SpriteScaleCheckbox from "../checkbox/SpriteScaleCheckbox.js";
import ToggleUpdateButton from "../button/ToggleUpdateButton.js";
import GameUpdateModifier from "../../modifier/GameUpdateModifier.js";
import IntervalNumberRange from "../range/IntervalNumberRange.js";
import AdrGame from "../../game/AdrGame.js";

export default class MainGame extends HTMLElement {
    private readonly game: AdrGame;
    private readonly elChildren: HTMLElement[] = []
    addChildren(el: HTMLElement) {
        this.elChildren.push(el);
    }
    connectedCallback() {
        this.game.appendToEl();
        this.elChildren.forEach(this.appendChild.bind(this))
    }

    constructor() {
        super();
        this.game = new AdrGame(this);
        const sceneInfoModifier = this.game.get(ModifierManager).get(SceneInfoModifier);
        const timestepModifier = this.game.get(ModifierManager).get(TimestepModifier);
        this.addChildren(new ClickToStartButton(this.game));
        this.addChildren(new ToggleUpdateButton(this.game.get(ModifierManager).get(GameUpdateModifier)));
        this.addChildren(new SpriteScaleCheckbox(sceneInfoModifier));
        const numberRange  = new IntervalNumberRange(sceneInfoModifier);
        this.addChildren(numberRange);
        numberRange.setValueCallback(() => {
            const matrix = sceneInfoModifier.getSpriteNodeWorldMatrix();
            return matrix.slice(-4, -3).toString();
        });
        let text: IntervalText;
        text = new IntervalText(sceneInfoModifier);
        this.addChildren(text);
        text.setValueCallback(() => {
            const matrix = sceneInfoModifier.getSpriteNodeWorldMatrix();
            const formatedMatrix = matrix.reduce((acc, cur, index: number) => {
                // format as print each 4 rows
                if (index % 4 === 0) {
                    return `${acc}${index === 0 ? '' : '<br/>'}${cur}`;
                } else {
                    return `${acc},${cur}`;
                }

            }, "")
            return `${formatedMatrix}<br/> is the second entity's world matrix`;
        });
        text = new IntervalText(timestepModifier);
        this.addChildren(text);
        text.setValueCallback(() => timestepModifier.getTimestepInfo().split(",").join("<br/>"));
        text = new IntervalText(timestepModifier);
        this.addChildren(text);
        text.setValueCallback(() => `${this.game.all().length} managers`);
        text = new IntervalText(sceneInfoModifier);
        this.addChildren(text);
        text.setValueCallback(() => `${sceneInfoModifier.getSceneNumber()} scenes`);
        text = new IntervalText(sceneInfoModifier);
        this.addChildren(text);
        text.setValueCallback(() => `${sceneInfoModifier.getFirstSceneEntityNumber()} entities in DemoScene`);
    }

}
