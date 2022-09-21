import Shader from "./shader";
import Texture2D from "./texture";
const BASE_URL = 'cloud://cloud1-4gkzszrnfdcc9814.636c-cloud1-4gkzszrnfdcc9814-1307362775/IDEPack/';

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
    static loadStringFromFile(file: string) {
        return new Promise<string>((resolve) => {
            wx.cloud.downloadFile({
                fileID: BASE_URL + file,
                success(res: any) {
                    const string = wx.getFileSystemManager().readFileSync(res.tempFilePath, 'utf-8')
                    resolve(string);
                }
            })
        })
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
                fileID: BASE_URL + file,
                success(res: any) {
                    image.src = res.tempFilePath;
                    image.onload = () => {
                        resolve(undefined)
                    }
                }
            }
            );
        });
        if (alpha) {
            texture.imageFormat = this.gl.RGBA;
            texture.internalFormat = this.gl.RGBA;
        }
        texture.generate(image)
        return texture
    }

}