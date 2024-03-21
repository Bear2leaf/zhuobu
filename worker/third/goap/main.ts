import { worldstate_t, actionplanner_t, MAXATOMS, MAXACTIONS, goap_actionplanner_clear, goap_description, goap_set_cost, goap_set_pre, goap_set_pst, goap_worldstate_description, goap_worldstate_clear, goap_worldstate_set } from "./goap.js";


const atm_names = new Array<string>(MAXATOMS);
const act_names = new Array<string>(MAXACTIONS);
const act_costs = new Array<number>(MAXACTIONS);
const act_pre = new Array<worldstate_t>(MAXACTIONS);
const act_pst = new Array<worldstate_t>(MAXACTIONS);
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
export function createap() {

    goap_actionplanner_clear(ap);
    return ap;
}

