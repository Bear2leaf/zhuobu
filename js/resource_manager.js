var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Shader from "./shader.js";
import Texture2D from "./texture.js";
import spriteVS from "./shaders/sprite.vs.js";
import spriteFS from "./shaders/sprite.fs.js";
import text_2dVS from "./shaders/text_2d.vs.js";
import text_2dFS from "./shaders/text_2d.fs.js";
import particleVS from "./shaders/particle.vs.js";
import particleFS from "./shaders/particle.fs.js";
import post_processingVS from "./shaders/post_processing.vs.js";
import post_processingFS from "./shaders/post_processing.fs.js";
import oneLVL from "./levels/one.lvl.js";
import twoLVL from "./levels/two.lvl.js";
import threeLVL from "./levels/three.lvl.js";
import fourLVL from "./levels/four.lvl.js";
export default class ResourceManager {
    static loadShader(vShaderFile, fShaderFile, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.shaders[name] = yield this.loadShaderFromFile(vShaderFile, fShaderFile);
            return this.shaders[name];
        });
    }
    static getShader(name) {
        return this.shaders[name];
    }
    static loadTexture(file, alpha, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.textures[name] = yield this.loadTextureFromFile(file, alpha);
            return this.textures[name];
        });
    }
    static getTexture(name) {
        return this.textures[name];
    }
    static loadStringFromFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.stringCache[file]) {
                throw new Error("Unimpl logic.");
                this.stringCache[file] = yield new Promise((resolve) => {
                    wx.cloud.downloadFile({
                        fileID: file,
                        success(response) {
                            const string = wx.getFileSystemManager().readFileSync(response.tempFilePath, 'utf-8');
                            resolve(string);
                        }
                    });
                });
            }
            return this.stringCache[file];
        });
    }
    static loadShaderFromFile(vShaderFile, fShaderFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let vShaderCode = '';
            let fShaderCode = '';
            vShaderCode = yield this.loadStringFromFile(vShaderFile);
            fShaderCode = yield this.loadStringFromFile(fShaderFile);
            const shader = new Shader();
            shader.compile(vShaderCode, fShaderCode);
            return shader;
        });
    }
    static loadTextureFromFile(file, alpha) {
        return __awaiter(this, void 0, void 0, function* () {
            const texture = new Texture2D();
            const image = wx.createImage();
            return yield new Promise((resolve) => {
                image.src = file;
                image.onload = () => {
                    if (alpha) {
                        texture.imageFormat = this.gl.RGBA;
                        texture.internalFormat = this.gl.RGBA;
                    }
                    texture.generate(image);
                    resolve(texture);
                };
            });
        });
    }
}
ResourceManager.shaders = {};
ResourceManager.textures = {};
ResourceManager.stringCache = {
    "shaders/sprite.vs": spriteVS,
    "shaders/sprite.fs": spriteFS,
    "shaders/text_2d.vs": text_2dVS,
    "shaders/text_2d.fs": text_2dFS,
    "shaders/particle.vs": particleVS,
    "shaders/particle.fs": particleFS,
    "shaders/post_processing.vs": post_processingVS,
    "shaders/post_processing.fs": post_processingFS,
    "levels/one.lvl": oneLVL,
    "levels/two.lvl": twoLVL,
    "levels/three.lvl": threeLVL,
    "levels/four.lvl": fourLVL,
};
ResourceManager.gl = wx.createCanvas().getContext('webgl2');
//# sourceMappingURL=resource_manager.js.map