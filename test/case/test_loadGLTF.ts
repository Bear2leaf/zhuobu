import { loadShaderTxtCache, device } from "../../device/Device.js";
import { loadGLTF } from "../../loader/gltf.js";
import { assert, t } from "../utils.js";


t("gltf loader", async () => {

    // setup

    loadShaderTxtCache(device, "Mesh", "../");

    // case 1: load gltf

    const gltf = await loadGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF/Box.gltf")
    assert(!!gltf, "gltf should be loaded")
})