import Shader from "./shader";
import Texture2D from "./texture";
const BASE_URL = 'https://636c-cloud1-4gkzszrnfdcc9814-1307362775.tcb.qcloud.la/IDEPack/';

export default class ResourceManager {
    static readonly shaders: { [key: string]: Shader } = {}
    static readonly textures: { [key: string]: Texture2D } = {}
    static readonly gl: WebGLRenderingContext = wx.createCanvas().getContext('webgl');
    static async loadShader(vShaderFile: string, fShaderFile: string, name: string) {
        this.shaders[name] = await this.loadShaderFromFile(vShaderFile, fShaderFile);
        return this.shaders[name];
    }
    static getShader(name: string) {
        return this.shaders[name];
    }
    static async loadTexture(file: string, alpha: boolean, name: string) {
        this.textures[name] = await this.loadTextureFromFile(file, alpha);
        return this.textures[name]
    }
    static getTexture(name: string) {
        return this.textures[name];
    }
    private static async loadShaderFromFile(vShaderFile: string, fShaderFile: string) {
        let vShaderCode: string;
        let fShaderCode: string;
        vShaderCode = await new Promise<string>((resolve) => {
            wx.request({
                url: BASE_URL + vShaderFile,
                success(response: WxRequestResponse) {
                    resolve(response.data);
                },
                fail(error: WxRequestError) {
                    throw new Error(`${error.errno} - ${error.errMsg}`);
                }
            })
        })
        fShaderCode = await new Promise<string>((resolve) => {
            wx.request({
                url: BASE_URL + fShaderFile,
                success(response: WxRequestResponse) {
                    resolve(response.data);
                },
                fail(error: WxRequestError) {
                    throw new Error(`${error.errno} - ${error.errMsg}`);
                }
            })
        })
        const shader = new Shader();
        shader.compile(vShaderCode, fShaderCode);
        return shader
    }
    private static loadTextureFromShaderFile(vShaderFile: string, fShaderFile: string, gShaderFile: string | null) {
        return new Texture2D()
    }
    private static async loadTextureFromFile(file: string, alpha: boolean) {
        const texture: Texture2D = new Texture2D();
        const image = wx.createImage() as Image;

        await new Promise((resolve) => {
            image.src = BASE_URL + file;
            image.onload = () => {
                resolve(undefined)
            }
        });
        if (!alpha) {
            console.warn('opacity not resolved...')
        }
        texture.generate(image)
        return texture
    }

}