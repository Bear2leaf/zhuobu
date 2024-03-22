import astar_plan from "./astar.js";
import { worldstate_t, actionplanner_t, MAXATOMS, MAXACTIONS, goap_actionplanner_clear, goap_description, goap_set_cost, goap_set_pre, goap_set_pst, goap_worldstate_description, goap_worldstate_clear, goap_worldstate_set } from "./goap.js";
import { LOGI } from "./log.js";



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


export function execute({
    actions,
    currentState,
    goalState,
    callbacks: {
        pathNotFoundCallback,
        completeCallback,
        runningCallback
    }
}: GOAPPlan) {
    goap_actionplanner_clear(ap);
    for (const action of actions) {
        for (const key in action.preconditions) {
            if (Object.prototype.hasOwnProperty.call(action.preconditions, key)) {
                const element = action.preconditions[key];
                goap_set_pre(ap, action.name, key, element);

            }
        }
        for (const key in action.effects) {
            if (Object.prototype.hasOwnProperty.call(action.effects, key)) {
                const element = action.effects[key];
                goap_set_pst(ap, action.name, key, element);
            }
        }
        goap_set_cost(ap, action.name, action.cost);
    }
    const desc: [string] = ["actions:\n"];
    goap_description(ap, desc);
    LOGI(desc[0]);
    const fr: worldstate_t = { values: 0, dontcare: 0 };
    goap_worldstate_clear(fr);
    for (const key in currentState) {
        if (Object.prototype.hasOwnProperty.call(currentState, key)) {
            const element = currentState[key];
            goap_worldstate_set(ap, fr, key, element);

        }
    }
    const goal: worldstate_t = {
        values: 0,
        dontcare: 0
    };
    goap_worldstate_clear(goal);
    for (const key in goalState) {
        if (Object.prototype.hasOwnProperty.call(goalState, key)) {
            const element = goalState[key];
            goap_worldstate_set(ap, goal, key, element);
        }
    }
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
    if (plancost === -1) {
        pathNotFoundCallback();
    } else if (plancost === 0) {
        completeCallback();
    } else {
        runningCallback();
    }
}

