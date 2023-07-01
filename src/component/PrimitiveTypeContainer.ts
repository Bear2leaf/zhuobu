
import Component from "../component/Component.js";
import { PrimitiveType } from "../contextobject/Primitive.js";

export default class PrimitiveTypeContainer implements Component {
    private primitiveType?: PrimitiveType;
    setPrimitiveType(primitiveType: PrimitiveType) {
        this.primitiveType = primitiveType;
    }
    getPrimitiveType() {
        if (this.primitiveType === undefined) {
            throw new Error("Primitive type is not set");
        }
        return this.primitiveType;
    }
}