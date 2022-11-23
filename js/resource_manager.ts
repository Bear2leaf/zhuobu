import Shader from "./shader.js";
import Texture2D from "./texture.js";
import spriteVS from "./shaders/sprite.vs.js";
import spriteFS from "./shaders/sprite.fs.js";
import particleVS from "./shaders/particle.vs.js";
import particleFS from "./shaders/particle.fs.js";
import post_processingVS from "./shaders/post_processing.vs.js";
import post_processingFS from "./shaders/post_processing.fs.js";
import oneLVL from "./levels/one.lvl.js";
import twoLVL from "./levels/two.lvl.js";
import threeLVL from "./levels/three.lvl.js";
import fourLVL from "./levels/four.lvl.js";

export default class ResourceManager {
    static readonly shaders: { [key: string]: Shader } = {}
    static readonly textures: { [key: string]: Texture2D } = {}
    static readonly stringCache: { [key: string]: string } = {
        "shaders/sprite.vs": spriteVS,
        "shaders/sprite.fs": spriteFS,
        "shaders/particle.vs": particleVS,
        "shaders/particle.fs": particleFS,
        "shaders/post_processing.vs": post_processingVS,
        "shaders/post_processing.fs": post_processingFS,
        "levels/one.lvl": oneLVL,
        "levels/two.lvl": twoLVL,
        "levels/three.lvl": threeLVL,
        "levels/four.lvl": fourLVL,
    }
    static readonly gl: WebGL2RenderingContext = wx.createCanvas().getContext('webgl2');
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
            throw new Error("Unimpl logic.");
            this.stringCache[file] = await new Promise<string>((resolve) => {
                wx.cloud.downloadFile({
                    fileID: file,
                    success(response: any) {
                        const string = wx.getFileSystemManager().readFileSync(response.tempFilePath, 'utf-8')
                        resolve(string);
                    }
                })
            })
        }
        return this.stringCache[file];
    }
    private static async loadShaderFromFile(vShaderFile: string, fShaderFile: string) {
        let vShaderCode: string = '';
        let fShaderCode: string = '';
        vShaderCode = await this.loadStringFromFile(vShaderFile);
        fShaderCode = await this.loadStringFromFile(fShaderFile);

        const shader = new Shader();
        shader.compile(vShaderCode, fShaderCode);
        return shader
    }
    private static async loadTextureFromFile(file: string, alpha: boolean) {
        const texture: Texture2D = new Texture2D();
        const image = wx.createImage() as Image;

        return await new Promise<Texture2D>((resolve) => {
            image.src = file;
            image.onload = () => {
                if (alpha) {
                    texture.imageFormat = this.gl.RGBA;
                    texture.internalFormat = this.gl.RGBA;
                }
                texture.generate(image)
                resolve(texture)
            }
        });
    }

}