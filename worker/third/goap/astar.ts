/*
Copyright 2012 Abraham T. Stolk

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { LOGI } from "./log.js";
import { LOGE } from "./log.js";
import { worldstate_t, MAXATOMS, actionplanner_t, MAXACTIONS, goap_get_possible_state_transitions, bfield_t } from "./goap.js";
import { Tuple } from "./tuple.js";

//!< A node in our network of world states.
type astarnode_t =
    {
        ws: worldstate_t;		//!< The state of the world at this node.
        g: number;				//!< The cost so far.
        h: number;				//!< The heuristic for remaining cost (don't overestimate!)
        f: number;				//!< g+h combined.
        actionname: string;		//!< How did we get to this node?
        parentws: worldstate_t;		//!< Where did we come from?
    };








const MAXOPEN = 512;	//!< The maximum number of nodes we can store in the opened set.
const MAXCLOS = 512;	//!< The maximum number of nodes we can store in the closed set.


let openedSet: Tuple<astarnode_t, typeof MAXOPEN> = new Array(MAXOPEN) as Tuple<astarnode_t, typeof MAXOPEN>;	//!< The set of nodes we should consider.
let closedSet: Tuple<astarnode_t, typeof MAXCLOS> = new Array(MAXCLOS) as Tuple<astarnode_t, typeof MAXCLOS>;	//!< The set of nodes we already visited.

let numOpened = 0;	//!< The nr of nodes in our opened set.
let numClosed = 0;	//!< The nr of nodes in our closed set.


//!< This is our heuristic: estimate for remaining distance is the nr of mismatched atoms that matter.
function calc_h(fr: worldstate_t, to: worldstate_t): number {
    const care: bfield_t = (to.dontcare ^ -1);
    const diff: bfield_t = ((fr.values & care) ^ (to.values & care));
    let dist = 0;
    for (let i = 0; i < MAXATOMS; ++i)
        if ((diff & (1 << i)) !== 0) dist++;
    return dist;
}


//!< Internal function to look up a world state in our opened set.
function idx_in_opened(ws: worldstate_t): number {
    for (let i = 0; i < numOpened; ++i)
        if (openedSet[i].ws.values === ws.values) return i;
    return -1;
}


//!< Internal function to lookup a world state in our closed set.
function idx_in_closed(ws: worldstate_t): number {
    for (let i = 0; i < numClosed; ++i)
        if (closedSet[i].ws.values === ws.values) return i;
    return -1;
}


//!< Internal function to reconstruct the plan by tracing from last node to initial node.
function reconstruct_plan(goalnode: astarnode_t, plan: string[], worldstates: worldstate_t[], plansize: [number]) {
    let curnode: astarnode_t | null = goalnode;
    let idx = plansize[0] - 1;
    let numsteps = 0;
    while (curnode && curnode.actionname) {
        if (idx >= 0) {
            plan[idx] = curnode.actionname;
            worldstates[idx] = curnode.ws;
            const i = idx_in_closed(curnode.parentws);
            curnode = (i === -1) ? null : closedSet[i];
        }
        --idx;
        numsteps++;
    }
    idx++;	// point to last filled

    if (idx > 0)
        for (let i = 0; i < numsteps; ++i) {
            plan[i] = plan[i + idx];
            worldstates[i] = worldstates[i + idx];
        }
    if (idx < 0)
        LOGE(`Plan of size ${numsteps} cannot be returned in buffer of size ${plansize[0]}`);

    plansize[0] = numsteps;
}


/* from: http://theory.stanford.edu/~amitp/GameProgramming/ImplementationNotes.html
OPEN = priority queue containing START
CLOSED = empty set
while lowest rank in OPEN is not the GOAL:
  current = remove lowest rank item from OPEN
  add current to CLOSED
  for neighbors of current:
    cost = g(current) + movementcost(current, neighbor)
    if neighbor in OPEN and cost less than g(neighbor):
      remove neighbor from OPEN, because new path is better
    if neighbor in CLOSED and cost less than g(neighbor): **
      remove neighbor from CLOSED
    if neighbor not in OPEN and neighbor not in CLOSED:
      set g(neighbor) to cost
      add neighbor to OPEN
      set priority queue rank to g(neighbor) + h(neighbor)
      set neighbor's parent to current
 */

//! Make a plan of actions that will reach desired world state. Returns total cost of the plan.
export default function astar_plan(
    ap: actionplanner_t, 		//!< the goap action planner that holds atoms and action repertoire
    start: worldstate_t, 		//!< the current world state
    goal: worldstate_t, 		//!< the desired world state
    plan: string[],              //!< for returning all actions that make up plan
    worldstates: worldstate_t[],      //!< for returning intermediate world states
    plansize: [number]                   //!< in: size of plan buffer, out: size of plan (in nr of steps)
): number {
    // put start in opened list
    numOpened = 0;
    const n0g = 0;
    const n0h = calc_h(start, goal);
    const n0: astarnode_t = {
        ws: start,
        parentws: start,
        g: n0g,
        h: n0h,
        f: n0g + n0h,
        actionname: "",
    }
    openedSet[numOpened++] = n0;
    // empty closed list
    numClosed = 0;

    do {
        if (numOpened === 0) { LOGI("Did not find a path."); return -1; }
        // find the node with lowest rank
        let lowestIdx = -1;
        let lowestVal = Infinity;
        for (let i = 0; i < numOpened; ++i) {
            if (openedSet[i].f < lowestVal) {
                lowestVal = openedSet[i].f;
                lowestIdx = i;
            }
        }
        // remove the node with the lowest rank
        const cur: astarnode_t = openedSet[lowestIdx];
        if (numOpened) openedSet[lowestIdx] = openedSet[numOpened - 1];
        numOpened--;
        //static char dsc[2048];
        //goap_worldstate_description( ap, &cur.ws, dsc, sizeof(dsc) );
        //LOGI( dsc );
        // if it matches the goal, we are done!
        const care: bfield_t = (goal.dontcare ^ -1);
        const match: boolean = ((cur.ws.values & care) === (goal.values & care));
        if (match) {
            reconstruct_plan(cur, plan, worldstates, plansize);
            return cur.f;
        }
        // add it to closed
        closedSet[numClosed++] = cur;
        if (numClosed === MAXCLOS) { LOGI("Closed set overflow"); return -1; } // ran out of storage for closed set
        // iterate over neighbours
        const actionnames = new Array<string>(MAXACTIONS) as Tuple<string, typeof MAXACTIONS>;
        const actioncosts = new Array<number>(MAXACTIONS) as Tuple<number, typeof MAXACTIONS>;
        const to = new Array<worldstate_t>(MAXACTIONS) as Tuple<worldstate_t, typeof MAXACTIONS>;
        const numtransitions: number = goap_get_possible_state_transitions(ap, cur.ws, to, actionnames, actioncosts, MAXACTIONS);
        //LOGI( "%d neighbours", numtransitions );
        for (let i = 0; i < numtransitions; ++i) {
            const cost = cur.g + actioncosts[i];
            let idx_o = idx_in_opened(to[i]);
            let idx_c = idx_in_closed(to[i]);
            // if neighbor in OPEN and cost less than g(neighbor):
            if (idx_o >= 0 && cost < openedSet[idx_o].g) {
                // remove neighbor from OPEN, because new path is better
                if (numOpened) openedSet[idx_o] = openedSet[numOpened - 1];
                numOpened--;
                idx_o = -1; // BUGFIX: neighbor is no longer in OPEN, signal this so that we can re-add it.
            }
            // if neighbor in CLOSED and cost less than g(neighbor):
            if (idx_c >= 0 && cost < closedSet[idx_c].g) {
                // remove neighbor from CLOSED
                if (numClosed) closedSet[idx_c] = closedSet[numClosed - 1];
                numClosed--;
                idx_c = -1; // BUGFIX: neighbour is no longer in CLOSED< signal this so that we can re-add it.
            }
            // if neighbor not in OPEN and neighbor not in CLOSED:
            if (idx_c === -1 && idx_o === -1) {
                const nbg = cost;
                const nbws = to[i];
                const nbh = calc_h(nbws, goal);
                const nb = {
                    ws: nbws,
                    g: nbg,
                    h: nbh,
                    f: nbg + nbh,
                    actionname: actionnames[i],
                    parentws: cur.ws
                }
                openedSet[numOpened++] = nb;
            }
            if (numOpened === MAXOPEN) { LOGI("Opened set overflow"); return -1; } // ran out of storage for opened set
        }
    } while (true);

}



