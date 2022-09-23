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
wx.cloud.init();
const BASE_FILEID_URL = 'cloud://cloud1-4gkzszrnfdcc9814.636c-cloud1-4gkzszrnfdcc9814-1307362775/IDEPack/';
const BASE_REQUEST_URL = 'https://636c-cloud1-4gkzszrnfdcc9814-1307362775.tcb.qcloud.la/IDEPack/';
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
                this.stringCache[file] = yield new Promise((resolve) => {
                    wx.cloud.downloadFile({
                        fileID: BASE_FILEID_URL + file,
                        success(response) {
                            const string = wx.getFileSystemManager().readFileSync(response.tempFilePath, 'utf-8');
                            resolve(string);
                        }
                    });
                });
                //     this.stringCache[file] = await new Promise<string>((resolve) => {
                //     wx.request({
                //         url: BASE_REQUEST_URL + file,
                //         success(response: WxRequestResponse) {
                //             resolve(response.data);
                //         },
                //     })
                // })
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
            yield new Promise((resolve) => {
                wx.cloud.downloadFile({
                    fileID: BASE_FILEID_URL + file,
                    success(response) {
                        image.src = response.tempFilePath;
                        image.onload = () => {
                            resolve(undefined);
                        };
                    }
                });
            });
            // await new Promise((resolve) => {
            //     image.src = BASE_REQUEST_URL + file;
            //     image.onload = () => {
            //         resolve(undefined)
            //     }
            // })
            if (alpha) {
                texture.imageFormat = this.gl.RGBA;
                texture.internalFormat = this.gl.RGBA;
            }
            texture.generate(image);
            return texture;
        });
    }
}
ResourceManager.shaders = {};
ResourceManager.textures = {};
ResourceManager.stringCache = {};
ResourceManager.gl = wx.createCanvas().getContext('webgl');
//# sourceMappingURL=resource_manager.js.map