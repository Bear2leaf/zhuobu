import EntityObserver from "./EntityObserver.js";

export default class OnEntityAdd extends EntityObserver {

    public notify(): void {
        // console.debug("OnEntityAdd", this.getSubject().getEntity());
    }

}
