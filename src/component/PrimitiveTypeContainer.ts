
import Component from "../component/Component.js";
import Primitive from "../contextobject/Primitive.js";

export default class PrimitiveContainer implements Component {
    private primitive?: Primitive;
    setPrimitive(primitiveType: Primitive) {
        this.primitive = primitiveType;
    }
    getPrimitive() {
        if (this.primitive === undefined) {
            throw new Error("Primitive type is not set");
        }
        return this.primitive;
    }
}