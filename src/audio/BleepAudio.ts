import AudioClip from "./AudioClip.js";
const bleep = `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`;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// Use a lookup table to find the index.
const lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
function decodeBase64ToArrayBuffer(base64: string) {
    var bufferLength = base64.length * 0.75,
        len = base64.length, i, p = 0,
        encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
            bufferLength--;
        }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};

export default class BleepAudio implements AudioClip {
    private context?: AudioContext;
    private frames = 0;
    setContext(context: AudioContext) {
        this.context = context;
    }
    getContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
    }
    init() {
    }
    update(): void {

        this.frames++;
        if (this.frames > 440) {
            this.playOnce();
            this.frames = 0;
        }
    }

    playOnce() {
        const source = this.getContext().createBufferSource();
        this.getContext().decodeAudioData(decodeBase64ToArrayBuffer(bleep), buffer => {
            source.buffer = buffer;
            source.connect(this.getContext().destination);
            source.start()
        }, console.error);
    }
}