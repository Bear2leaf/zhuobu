import astar_plan from "./astar.js";
import { LOGI } from "./log.js";
import { worldstate_t, actionplanner_t, MAXATOMS, MAXACTIONS, goap_actionplanner_clear, goap_description, goap_set_cost, goap_set_pre, goap_set_pst, goap_worldstate_description, goap_worldstate_clear, goap_worldstate_set } from "./goap.js";
import { Tuple } from "./tuple.js";

/**
 * 
 * @returns -1: no path found, 0: no actions needed, >0: cost of plan
 */
export default function main(): number {

    const atm_names = new Array<string>(MAXATOMS) as Tuple<string, typeof MAXATOMS>;
    const act_names = new Array<string>(MAXACTIONS) as Tuple<string, typeof MAXACTIONS>;
    const act_costs = new Array<number>(MAXACTIONS).fill(0) as Tuple<number, typeof MAXACTIONS>;
    const act_pre = new Array<worldstate_t>(MAXACTIONS) as Tuple<worldstate_t, typeof MAXACTIONS>;
    const act_pst = new Array<worldstate_t>(MAXACTIONS) as Tuple<worldstate_t, typeof MAXACTIONS>;
    for (let index = 0; index < MAXACTIONS; index++) {
        act_pre[index] = { values: 0, dontcare: 0 };
        act_pst[index] = { values: 0, dontcare: 0 };
    }
    const ap: actionplanner_t = {
        numatoms: 0,
        numactions: 0,
        atm_names,
        act_names,
        act_costs,
        act_pre,
        act_pst
    };

    goap_actionplanner_clear(ap);



    const desc: [string] = ["actions:\n"];
    goap_description(ap, desc);
    LOGI(desc[0]);
    let fr: worldstate_t = { values: 0, dontcare: 0 };
    goap_worldstate_clear(fr);


    const goal: worldstate_t = {
        values: 0,
        dontcare: 0
    };
    goap_worldstate_clear(goal);
    const STATESIZE = 16;
    const states = Array<worldstate_t>(STATESIZE);
    for (let index = 0; index < STATESIZE; index++) {
        states[index] = { values: 0, dontcare: 0 };
    }
    const plan = Array<string>(STATESIZE).fill("");
    const plansz: [number] = [STATESIZE];
    const plancost = astar_plan(ap, fr, goal, plan, states, plansz);
    LOGI(`plancost = ${plancost}`);
    desc[0] = "init states:\n";
    goap_worldstate_description(ap, fr, desc);
    LOGI(`${desc[0]}`);
    LOGI("plan actions:");
    for (let i = 0; i < plansz[0] && i < STATESIZE; ++i) {
        desc[0] = "";
        goap_worldstate_description(ap, states[i], desc);
        LOGI(`${i}: [${plan[i]}] ${desc[0]}`);
    }

    return plancost;
}