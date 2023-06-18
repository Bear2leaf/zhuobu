import { HelloController } from "../../core/index.js";
import MockHelloPresenter from "../presenter/MockHelloPresenter.js";
import MockHelloRepository from "../repository/MockHelloRepository.js";

export default class MockHelloController extends HelloController {
    constructor() {
        super(new MockHelloRepository(), new MockHelloPresenter());
    }
}