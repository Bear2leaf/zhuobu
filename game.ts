import { promise } from "./global.js";
import Main from "./Main.js";

promise.then(() => new Main())
