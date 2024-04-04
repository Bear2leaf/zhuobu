import Dexie, { Table } from 'dexie';
import { GOAPPlan } from "../../../worker/third/goap"

//
// Declare Database
//
export default class PlanDataBase extends Dexie {
    public plans!: Table<GOAPPlan, number>; // id is number in this case

    public constructor() {
        super("PlanDatabase");
        this.version(1).stores({
            plans: "++id,name"
        });
    }
}
