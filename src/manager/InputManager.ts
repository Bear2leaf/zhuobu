import TouchEvent from "../event/TouchEvent.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class InputManager extends Manager<Object> {
    private sceneManager?: SceneManager;
    private isTouching: boolean = false;
    private isTouchingStart: boolean = false;
    private isTouchingEnd: boolean = false;
    private x: number = 0;
    private y: number = 0;
    addObjects(): void {
    }
    async load(): Promise<void> {

    }
    init(): void {

        this.getDevice().onTouchStart((touchInfo) => {
            this.isTouching = true;
            this.isTouchingStart = true;
            this.isTouchingEnd = false;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;

        });
        this.getDevice().onTouchMove((touchInfo) => {
            this.isTouching = true;
            this.isTouchingStart = false;
            this.isTouchingEnd = false;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;

        });
        this.getDevice().onTouchEnd((touchInfo) => {
            this.isTouching = false;
            this.isTouchingStart = false;
            this.isTouchingEnd = true;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;
        })
        this.getDevice().onTouchCancel((touchInfo) => {
            this.isTouching = false;
            this.isTouchingStart = false;
            this.isTouchingEnd = true;
            this.x = touchInfo?.x || 0;
            this.y = touchInfo?.y || 0;
        })
        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(TouchEvent).forEach((touchEvent) => {
                touchEvent.setPixelRatio(this.getDevice().getWindowInfo().pixelRatio);
            });
        });

    }
    update(): void {
        this.getSceneManager().all().forEach(scene => scene.getComponents(TouchEvent).forEach((touchEvent) => {
            touchEvent.setIsTouching(this.isTouching);
            touchEvent.setIsTouchingStart(this.isTouchingStart);
            touchEvent.setIsTouchingEnd(this.isTouchingEnd);
            touchEvent.setX(this.x);
            touchEvent.setY(this.getDevice().getWindowInfo().windowHeight - this.y);

        }));
        if (this.isTouchingEnd) {
            this.isTouchingEnd = false;
        }
        if (this.isTouchingStart) {
            this.isTouchingStart = false;
        }
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}