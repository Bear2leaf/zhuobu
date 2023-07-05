
import Component from "../component/Component.js";

export default class SizeContainer extends Component {
    private width: number = 0;
    private height: number = 0;
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    
}