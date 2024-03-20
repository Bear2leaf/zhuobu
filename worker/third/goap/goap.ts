
export const MAXATOMS = 32;
export const MAXACTIONS = 32;

export type bfield_t = number;

//!< Describes the world state by listing values (t/f) for all known atoms.
export type worldstate_t =
    {
        values: bfield_t;	//!< Values for atoms.
        dontcare: bfield_t;	//!< Mask for atoms that do not matter.
    };


//!< Action planner that keeps track of world state atoms and its action repertoire.
export type actionplanner_t =
    {
        readonly atm_names: string[];	//!< Names associated with all world state atoms.
        numatoms: number;				//!< Number of world state atoms.

        readonly act_names: string[];	//!< Names of all actions in repertoire.
        act_pre: worldstate_t[];	//!< Preconditions for all actions.
        act_pst: worldstate_t[];	//!< Postconditions for all actions (action effects).
        act_costs: number[];		//!< Cost for all actions.
        numactions: number;				//!< The number of actions in out repertoire.

    };


function idx_for_atomname(ap: actionplanner_t, atomname: string): number {
    let idx = 0;
    for (; idx < ap.numatoms; ++idx)
        if (ap.atm_names[idx] === atomname) return idx;

    if (idx < MAXATOMS) {
        ap.atm_names[idx] = atomname;
        ap.numatoms++;
        return idx;
    }

    return -1;
}


function idx_for_actionname(ap: actionplanner_t, actionname: string): number {
    let idx = 0;
    for (; idx < ap.numactions; ++idx)
        if (ap.act_names[idx] === actionname) return idx;

    if (idx < MAXACTIONS) {
        ap.act_names[idx] = actionname;
        ap.act_costs[idx] = 1; // default cost is 1
        ap.numactions++;
        return idx;
    }

    return -1;
}


//!< Initialize an action planner. It will clear all information on actions and state.
export function goap_actionplanner_clear(ap: actionplanner_t): void {
    ap.numatoms = 0;
    ap.numactions = 0;
    for (let i = 0; i < MAXATOMS; ++i) {
        ap.atm_names[i] = "";
    }
    for (let i = 0; i < MAXACTIONS; ++i) {
        ap.act_names[i] = "";
        ap.act_costs[i] = 0;
        goap_worldstate_clear(ap.act_pre[i]);
        goap_worldstate_clear(ap.act_pst[i]);
    }
}

//!< Initialize a worldstate to 'dontcare' for all state atoms.
export function goap_worldstate_clear(ws: worldstate_t): void {
    ws.values = 0;
    ws.dontcare = -1;

}

//!< Set an atom of worldstate to specified value.
export function goap_worldstate_set(ap: actionplanner_t, ws: worldstate_t, atomname: string, value: boolean): boolean {

    const idx = idx_for_atomname(ap, atomname);
    if (idx === -1) return false;
    ws.values = value ? (ws.values | (1 << idx)) : (ws.values & ~(1 << idx));
    ws.dontcare &= ~(1 << idx);
    return true;
}

//!< Add a precondition for named action.
export function goap_set_pre(ap: actionplanner_t, actionname: string, atomname: string, value: boolean): boolean {
    const actidx = idx_for_actionname(ap, actionname);
    const atmidx = idx_for_atomname(ap, atomname);
    if (actidx === -1 || atmidx === -1) return false;
    goap_worldstate_set(ap, ap.act_pre[actidx], atomname, value);
    return true;
}

//!< Add a postcondition for named action.
export function goap_set_pst(ap: actionplanner_t, actionname: string, atomname: string, value: boolean): boolean {
    const actidx = idx_for_actionname(ap, actionname);
    const atmidx = idx_for_atomname(ap, atomname);
    if (actidx === -1 || atmidx === -1) return false;
    goap_worldstate_set(ap, ap.act_pst[actidx], atomname, value);
    return true;
}

//!< Set the cost for named action.
export function goap_set_cost(ap: actionplanner_t, actionname: string, cost: number): boolean {
    const actidx = idx_for_actionname(ap, actionname);
    if (actidx === -1) return false;
    ap.act_costs[actidx] = cost;
    return true;
}

//!< Describe the action planner by listing all actions with pre and post conditions. For debugging purpose.
export function goap_description(ap: actionplanner_t, buf: [string]): void {

    for (let a = 0; a < ap.numactions; ++a) {
        buf[0] += `${ap.act_names[a]}\n`;

        const pre: worldstate_t = ap.act_pre[a];
        const pst: worldstate_t = ap.act_pst[a];
        for (let i = 0; i < MAXATOMS; ++i)
            if ((pre.dontcare & (1 << i)) === 0) {
                const v = (pre.values & (1 << i)) !== 0;
                buf[0] += `  ${ap.atm_names[i]}==${v}\n`;
            }
        for (let i = 0; i < MAXATOMS; ++i)
            if ((pst.dontcare & (1 << i)) === 0) {
                const v = (pst.values & (1 << i)) !== 0;
                buf[0] += `  ${ap.atm_names[i]}:=${v}\n`;
            }
    }
}

//!< Describe the worldstate by listing atoms that matter, in lowercase for false-valued, and uppercase for true-valued atoms.
export function goap_worldstate_description(ap: actionplanner_t, ws: worldstate_t, buf: [string]): void {
    for (let i = 0; i < MAXATOMS; ++i) {
        if ((ws.dontcare & (1 << i)) === 0) {
            const val = ap.atm_names[i];
            const set = ((ws.values & (1 << i)) !== 0);
            const added = set ? val.toUpperCase() : val.toLowerCase();
            buf[0] += added + " ";
        }
    }
}
function goap_do_action(ap: actionplanner_t, actionnr: number, fr: worldstate_t): worldstate_t {
    const pst = ap.act_pst[actionnr];
    const unaffected = pst.dontcare;
    const affected = (unaffected ^ -1);

    return {
        values: (fr.values & unaffected) | (pst.values & affected),
        dontcare: fr.dontcare & pst.dontcare
    };
}

//!< Given the specified 'from' state, list all possible 'to' states along with the action required, and the action cost. For internal use.
export function goap_get_possible_state_transitions(ap: actionplanner_t, fr: worldstate_t, to: worldstate_t[], actionnames: string[], actioncosts: number[], cnt: number): number {
    let writer = 0;
    for (let i = 0; i < ap.numactions && writer < cnt; ++i) {
        // see if precondition is met
        const pre = ap.act_pre[i];
        const care = (pre.dontcare ^ -1);
        const met = ((pre.values & care) === (fr.values & care));
        if (met) {
            actionnames[writer] = ap.act_names[i];
            actioncosts[writer] = ap.act_costs[i];
            to[writer] = goap_do_action(ap, i, fr);
            ++writer;
        }
    }
    return writer;
}

