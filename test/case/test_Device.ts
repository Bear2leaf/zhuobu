import { device } from "../../device/Device.js";
import { assert, t } from "../utils.js";

t("device size", async () => {

    assert(device.getWindowInfo().windowWidth > 400, "windowWidth should be greater than 400");
    assert(device.getWindowInfo().windowHeight > 400, "windowHeight should be greater than 400");
})