// we use nethack git version 3fcd56e6e3d6336d7584626ee936156e1eb69546 curses: resize vs beep
// Dynamically resizing the terminal window during play by dragging its
// edges was beeping (a lot if you dragged slowly).  Recogize the key
// code sent for that instead of complaining about unrecognized input.
// PatR on 3/24/2023, 3:47:56 AM

//@ts-ignore
import Nethack from "./nethack.js";
declare const worker: any;
declare const WXWebAssembly: any;
declare const globalThis: any;
globalThis.nethackCallback = (...data: any) => { typeof worker === 'undefined' ? postMessage(data) : worker.postMessage(data);} 
if (typeof worker !== 'undefined') {

    const wxinst = WXWebAssembly.instantiate;
    globalThis.WebAssembly = WXWebAssembly
    globalThis.WebAssembly.instantiate = (path: any, info: any) => wxinst(String.fromCharCode(...path), info);
    globalThis.WebAssembly.RuntimeError = Error

}
const filename =  'wasm/nethack';

Nethack({
    arguments: [],
    locateFile: () => `../${filename}.wasm`,
    wasmBinary: typeof worker === 'undefined' ? undefined : [...`static/${filename}.wasm`].map(c => c.charCodeAt(0)),
    onRuntimeInitialized: function () {
        // after the WASM is loaded, add the shim graphics callback function
        this.ccall(
            "shim_graphics_set_callback", // C function name
            null, // return type
            ["string"], // arg types
            ["nethackCallback"], // arg values
            { async: true }
        );
    },
})