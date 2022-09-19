
/**
 * =========
 */



import "libs/pixi.js";
import "libs/pako.min.js";
import "libs/localforage.min.js";
// import "libs/effekseer.min.js";
import "rmmz_core.js";
import "rmmz_managers.js";
import "rmmz_objects.js";
import "rmmz_scenes.js";
import "rmmz_sprites.js";
import "rmmz_windows.js";
import "plugins.js";

/**
 * =========
 */



//=============================================================================
// main.js v1.5.0
//=============================================================================




const scriptUrls = [
];
const effekseerWasmUrl = "js/libs/effekseer.wasm";

class Main {
    constructor() {
        this.xhrSucceeded = false;
        this.loadCount = 0;
        this.error = null;
    }

    run() {
        this.showLoadingSpinner();
        this.testXhr();
        this.hookNwjsClose();
        this.loadMainScripts();
    }

    showLoadingSpinner() {
        wx.showLoading({
            title: '加载中',
        })
    }

    eraseLoadingSpinner() {
        wx.hideLoading()
    }

    testXhr() {
        wx.downloadFile({
            url: 'https://636c-cloud1-4gkzszrnfdcc9814-1307362775.tcb.qcloud.la/IDEPack/register_571296f6.json?sign=ae3e93e21add493980d9c12406412389&t=1663557711', success: () => {
                this.xhrSucceeded = true
                this.onWindowLoad()
            }, fail: console.error
        })

    }

    hookNwjsClose() {
        // [Note] When closing the window, the NW.js process sometimes does
        //   not terminate properly. This code is a workaround for that.
        if (typeof nw === "object") {
            nw.Window.get().on("close", () => nw.App.quit());
        }
    }

    loadMainScripts() {
        for (const url of scriptUrls) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script.defer = true;
            script.onload = this.onScriptLoad.bind(this);
            script.onerror = this.onScriptError.bind(this);
            script._url = url;
            document.body.appendChild(script);
        }
        this.numScripts = scriptUrls.length;
        // window.addEventListener("load", this.onWindowLoad.bind(this));
        // window.addEventListener("error", this.onWindowError.bind(this));
    }

    onScriptLoad() {
        if (++this.loadCount === this.numScripts) {
            PluginManager.setup($plugins);
        }
    }

    onScriptError(e) {
        this.printError("Failed to load", e.errMsg);
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        console.error(this.makeErrorHtml(name, message))
    }

    makeErrorHtml(name, message) {
        return `[${name}]: ${message}`;
    }

    onWindowLoad() {
        if (!this.xhrSucceeded) {
            const message = "Your browser does not allow to read local files.";
            this.printError("Error", message);
        } else if (this.isPathRandomized()) {
            const message = "Please move the Game.app to a different folder.";
            this.printError("Error", message);
        } else if (this.error) {
            this.printError(this.error.name, this.error.message);
        } else {
            this.initEffekseerRuntime();
        }
    }

    onWindowError(event) {
        if (!this.error) {
            this.error = event.error;
        }
    }

    isPathRandomized() {
        // [Note] We cannot save the game properly when Gatekeeper Path
        //   Randomization is in effect.
        return (
            typeof process === "object" &&
            process.mainModule.filename.startsWith("/private/var")
        );
    }

    initEffekseerRuntime() {
        // const onLoad = this.onEffekseerLoad.bind(this);
        // const onError = this.onEffekseerError.bind(this);
        // effekseer.initRuntime(effekseerWasmUrl, onLoad, onError);
        this.onEffekseerLoad()
    }

    onEffekseerLoad() {
        this.eraseLoadingSpinner();
        SceneManager.run(Scene_Boot);
    }

    onEffekseerError() {
        this.printError("Failed to load", effekseerWasmUrl);
    }
}
//-----------------------------------------------------------------------------


GameGlobal.Main = Main;