import Shader from "./shader";
import Texture2D from "./texture";
wx.cloud.init()
const BASE_FILEID_URL = 'cloud://cloud1-4gkzszrnfdcc9814.636c-cloud1-4gkzszrnfdcc9814-1307362775/IDEPack/';
const BASE_REQUEST_URL = 'https://636c-cloud1-4gkzszrnfdcc9814-1307362775.tcb.qcloud.la/IDEPack/';

export default class ResourceManager {
    static readonly shaders: { [key: string]: Shader } = {}
    static readonly textures: { [key: string]: Texture2D } = {}
    static readonly stringCache: { [key: string]: string } = {}
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
    static async loadStringFromFile(file: string) {
        if (!this.stringCache[file]) {
            this.stringCache[file] = await new Promise<string>((resolve) => {
                wx.cloud.downloadFile({
                    fileID: BASE_FILEID_URL + file,
                    success(response: any) {
                        const string = wx.getFileSystemManager().readFileSync(response.tempFilePath, 'utf-8')
                        resolve(string);
                    }
                })
            })

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
    }
    private static async loadShaderFromFile(vShaderFile: string, fShaderFile: string) {
        let vShaderCode: string = await this.loadStringFromFile(vShaderFile);
        let fShaderCode: string = await this.loadStringFromFile(fShaderFile);


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
            wx.cloud.downloadFile({
                fileID: BASE_FILEID_URL + file,
                success(response: any) {
                    image.src = response.tempFilePath;
                    image.onload = () => {
                        resolve(undefined)
                    }
                }
            }
            );
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
        texture.generate(image)
        return texture
    }

}