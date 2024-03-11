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

    goap_set_pre(ap, "scout", "armedwithinsecticide", true);
    goap_set_pst(ap, "scout", "bugvisible", true);

    goap_set_pre(ap, "approach", "bugvisible", true);
    goap_set_pst(ap, "approach", "nearbug", true);

    goap_set_pre(ap, "aim", "bugvisible", true);
    goap_set_pre(ap, "aim", "insecticideloaded", true);
    goap_set_pst(ap, "aim", "buglinedup", true);

    goap_set_pre(ap, "shoot", "buglinedup", true);
    goap_set_pst(ap, "shoot", "bugalive", false);

    goap_set_pre(ap, "load", "armedwithinsecticide", true);
    goap_set_pst(ap, "load", "insecticideloaded", true);

    goap_set_pre(ap, "snap", "armedwithglove", true);
    goap_set_pre(ap, "snap", "nearbug", true);
    goap_set_pst(ap, "snap", "gloveclean", false);
    goap_set_pst(ap, "snap", "bugalive", false);

    goap_set_pre(ap, "flee", "bugvisible", true);
    goap_set_pst(ap, "flee", "nearbug", false);


    const desc: [string] = ["actions:\n"];
    goap_description(ap, desc);
    LOGI(desc[0]);
    let fr: worldstate_t = { values: 0, dontcare: 0 };
    goap_worldstate_clear(fr);
    goap_worldstate_set(ap, fr, "bugvisible", false);
    goap_worldstate_set(ap, fr, "armedwithinsecticide", true);
    goap_worldstate_set(ap, fr, "insecticideloaded", false);
    goap_worldstate_set(ap, fr, "buglinedup", false);
    goap_worldstate_set(ap, fr, "bugalive", true);
    goap_worldstate_set(ap, fr, "armedwithglove", true);
    goap_worldstate_set(ap, fr, "nearbug", false);
    goap_worldstate_set(ap, fr, "gloveclean", true);

    goap_set_cost(ap, "snap", 0);	// make glove dirty more expensive than using insecticide.

    const goal: worldstate_t = {
        values: 0,
        dontcare: 0
    };
    goap_worldstate_clear(goal);
    goap_worldstate_set(ap, goal, "bugalive", false);
    // goap_worldstate_set(ap, goal, "gloveclean", true); // add this to avoid glove dirty actions in plan.
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