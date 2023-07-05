
import Component from "../component/Component.js";
import { FontInfo } from "../drawobject/Text.js";

export default class FontInfoContainer extends Component {
    private fontInfo?: FontInfo;
    setFontInfo(fontInfo: FontInfo) {
        this.fontInfo = fontInfo;
    }
    getFontInfo(): FontInfo {
        if (this.fontInfo === undefined) {
            throw new Error("FontInfo is not set");
        }
        return this.fontInfo;
    }
}