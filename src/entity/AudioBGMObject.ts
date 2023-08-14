import Component from "../component/Component.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
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