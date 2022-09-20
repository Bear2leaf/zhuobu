var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Shader from "./shader";
import Texture2D from "./texture";
const BASE_URL = 'https://636c-cloud1-4gkzszrnfdcc9814-1307362775.tcb.qcloud.la/IDEPack/';
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
    static loadShaderFromFile(vShaderFile, fShaderFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let vShaderCode;
            let fShaderCode;
            vShaderCode = yield new Promise((resolve) => {
                wx.request({
                    url: BASE_URL + vShaderFile,
                    success(response) {
                        resolve(response.data);
                    },
                    fail(error) {
                        throw new Error(`${error.errno} - ${error.errMsg}`);
                    }
                });
            });
            fShaderCode = yield new Promise((resolve) => {
                wx.request({
                    url: BASE_URL + fShaderFile,
                    success(response) {
                        resolve(response.data);
                    },
                    fail(error) {
                        throw new Error(`${error.errno} - ${error.errMsg}`);
                    }
                });
            });
            const shader = new Shader();
            shader.compile(vShaderCode, fShaderCode);
            return shader;
        });
    }
    static loadTextureFromShaderFile(vShaderFile, fShaderFile, gShaderFile) {
        return new Texture2D();
    }
    static loadTextureFromFile(file, alpha) {
        return __awaiter(this, void 0, void 0, function* () {
            const texture = new Texture2D();
            const image = wx.createImage();
            yield new Promise((resolve) => {
                image.src = BASE_URL + file;
                image.onload = () => {
                    resolve(undefined);
                };
            });
            if (!alpha) {
                console.warn('opacity not resolved...');
            }
            texture.generate(image);
            return texture;
        });
    }
}
ResourceManager.shaders = {};
ResourceManager.textures = {};
ResourceManager.gl = wx.createCanvas().getContext('webgl');
//# sourceMappingURL=resource_manager.js.map