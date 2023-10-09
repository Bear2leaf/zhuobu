import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import OnClickToggleAudio from "../observer/OnClickToggleAudio.js";
import Entity from "./Entity.js";

export default class AudioBGMObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            OnClickToggleAudio
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}