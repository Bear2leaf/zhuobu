import { DeviceController } from "../../core/index.js";
import MockSplashPresenter from "../presenter/MockSplashPresenter.js";
import MockSplashRepository from "../repository/MockSplashRepository.js";

export default class MockDeviceController extends DeviceController {
    constructor() {
        super(new MockSplashRepository(), new MockSplashPresenter());
    }
}