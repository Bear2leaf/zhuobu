import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import DeviceManager from "../manager/DeviceManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import InputManager from "../manager/InputManager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";

export default interface Game {
    getCacheManager(): CacheManager;
    getFactoryManager(): FactoryManager;
    getRendererManager(): RendererManager;
    getCameraManager(): CameraManager;
    getTimestepManager(): TimestepManager;
    getDeviceManager(): DeviceManager;
    getSceneManager(): SceneManager;
    getInputManager(): InputManager;
    getAudioManager(): AudioManager;
}