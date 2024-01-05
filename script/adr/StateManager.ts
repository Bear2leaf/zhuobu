/*
 * Module for handling States
 *
 * All states should be get and set through the StateManager (StateManager).
 *
 * The manager is intended to handle all needed checks and error catching.
 * This includes creating the parents of layered/deep states so undefined states
 * do not need to be tested for and created beforehand.
 *
 * When a state is changed, an update event is sent out containing the name of the state
 * changed or in the case of multiple changes (.setM, .addM) the parent class changed.
 * Event: type: 'stateUpdate', stateName: <path of state or parent state>
 *
 * Original file created by: Michael Galusha
 */

import Engine from "./Engine";



export default class StateManager {

	MAX_STORE = 99999999999999;

	options = {};
	stateUpdate = {
		subscribe: (cb: (e: any) => void) => {
			console.debug(`[state_manager.js][stateUpdate][subscribe]`, cb);
		},
		publish: (e: any) => {
			console.debug(`[state_manager.js][stateUpdate][publish]`, e);
		}

	};
	constructor(private readonly engine: Engine) {

	}
	init(options?: Record<string, any>) {
		this.options = Object.assign(
			this.options,
			options
		);

		//create categories
		const cats = [
			'features',     // big features like buildings, location availability, unlocks, etc
			'stores',       // little stuff, items, weapons, etc
			'character',    // this is for player's character stats such as perks
			'income',
			'timers',
			'game',         // mostly location related: fire temp, workers, population, world map, etc
			'playStats',    // anything play related: play time, loads, etc
			'previous',     // prestige, score, trophies (in future), achievements (again, not yet), etc
			'outfit',      	// used to temporarily store the items to be taken on the path
			'config',
			'wait',			// mysterious wanderers are coming back
			'cooldown'      // residual values for cooldown buttons
		];

		for (const which in cats) {
			if (!this.get(cats[which])) this.set(cats[which], {});
		}

		//subscribe to stateUpdates
		this.stateUpdate.subscribe(this.handleStateUpdates);
	};

	stateModifier(...args: any[]) {
		if (arguments.length === 1 && typeof arguments[0] === 'string') {
			const arg = arguments[0];
			if (/^whichState\s=\s\(([\w\s\.]+)+\)$/.test(arg) && arg.indexOf("whichState = (") === 0) {
				const str = arg.slice(14, -1);
				let keys: string[] = str.split('.').slice(1);
				let state = this.engine.State as Record<string, any>;
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					if (state === undefined) {
						return undefined;
					} else {
						if (i === keys.length - 1) {
							return state[key];
						} else {
							state = state[key];
						}
					}
				}
				// console.debug(`[state_manager.js][execEval()][result][State.${keys.join('.')}]`, state);
				return state;
			} else if (/^\(delete\s([\w\s\.]+)+\)$/.test(arg) && arg.indexOf("(delete") === 0) {
				const arg = arguments[0];
				const str = arg.slice(7, -1);
				let keys: string[] = str.split('.').slice(1);
				let state = this.engine.State as Record<string, any>;
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					if (state === undefined) {
						return undefined;
					} else {
						if (i === keys.length - 1) {
							delete state[key];
						} else {
							state = state[key];
						}
					}
				}
				return true;
			} else {
				throw new Error(`[state_manager.js][evalError()] ${args.map(arg => arg).join(', ')}`);
			}
		} else if (arguments.length === 2 && typeof arguments[0] === 'string' && /^\(([\w\s\.]+)+\)\s=\svalue$/.test(arguments[0])) {
			/*
			 * (State.income.gather) = value
			 */
			const arg = arguments[0];
			const testResult = /^\(([\w\s\.]+)+\)\s=\svalue$/.exec(arg)!;
			if (!testResult) throw new Error(`[state_manager.js][evalError()] ${args.map(arg => arg).join(', ')}`);
			const fullPath = testResult[1];
			let result = this.engine.State as Record<string, any>;
			const value = arguments[1];
			const paths = fullPath.split(".");
			for (let i = 1; i < paths.length; i++) {
				const key = paths[i];
				if (result === undefined) {
					// console.debug(`[state_manager.js][execEval()][result missing][State.${fullPath}]`, arg, value, result);
					return undefined;
				} else {
					if (i === paths.length - 1) {
						result[key] = value;
					} else {
						result = result[key];
					}
				}
			}
			// console.debug(`[state_manager.js][execEval()][result]`, arg, value, result);
			return true;
		} else {
			throw new Error(`[state_manager.js][evalError()] ${args.map(arg => arg).join(', ')}`);
		}
	}

	//create all parents and then set state
	createState(stateName: string, value: any) {
		const words = stateName.split(/[.\[\]'"]+/);
		//for some reason there are sometimes empty strings
		for (let j = 0; j < words.length; j++) {
			if (words[j] === '') {
				words.splice(j, 1);
				j--;
			}
		}
		let obj = this.engine.State as Record<string, any>;
		let w = null;
		let i = 0
		for (; i < words.length - 1; i++) {
			w = words[i];
			if (obj[w] === undefined) obj[w] = {};
			obj = obj[w];
		}
		obj[words[i]] = value;
		return obj;
	};


	//sets a list of states
	setM(parentName: string, list: Record<string, any>, noEvent: boolean = false) {
		this.buildPath(parentName);

		//make sure the state exists to avoid errors,
		if (this.get(parentName) === undefined) this.set(parentName, {}, true);

		for (const k in list) {
			this.set(parentName + '.' + k + '', list[k], true);
		}

		if (!noEvent) {
			this.fireUpdate(parentName);
		}
	}

	//shortcut for altering number values, return 1 if state wasn't a number
	add(stateName: string, value: any, noEvent: boolean = false) {
		//0 if undefined, null (but not {}) should allow adding to new objects
		//could also add in a true = 1 thing, to have something go from existing (true)
		//to be a count, but that might be unwanted behavior (add with loose eval probably will happen anyways)
		const old = this.get(stateName, true);

		//check for NaN (old !== old) and non number values
		if (old !== old) {
			throw new Error('WARNING: ' + stateName + ' was corrupted (NaN). Resetting to 0.');
		} else if (typeof old !== 'number' || typeof value !== 'number') {
			throw new Error('WARNING: Can not do math with state:' + stateName + ' or value:' + value + ' because at least one is not a number.');
		} else {
			this.set(stateName, old + value, noEvent); //setState handles event and save
		}

	}

	//alters multiple number values, return number of fails
	addM(parentName: string, list: Record<string, any>, noEvent: boolean = false) {

		//make sure the parent exists to avoid errors
		if (this.get(parentName) === undefined) this.set(parentName, {}, true);

		for (const k in list) {
			this.add(parentName + '.' + k + '', list[k], true)
		}

		if (!noEvent) {
			this.fireUpdate(parentName);
		}
	}

	//return state, undefined or 0
	get(stateName: string, requestZero?: boolean) {
		let whichState = null;
		const fullPath = this.buildPath(stateName);

		//catch errors if parent of state doesn't exist
		whichState = this.stateModifier('whichState = (' + fullPath + ')');

		//prevents repeated if undefined, null, false or {}, then x = 0 situations
		if ((!whichState || JSON.stringify(whichState) === '{}') && requestZero) return 0;
		else return whichState;
	}

	//set single state
	//if noEvent is true, the update event won't trigger, useful for setting multiple states first
	set(stateName: string, value: unknown, noEvent?: boolean) {
		const fullPath = this.buildPath(stateName);

		//make sure the value isn't over the engine maximum
		if (typeof value === 'number' && value > this.MAX_STORE) value = this.MAX_STORE;

		if (!this.stateModifier('(' + fullPath + ') = value', value)) {

			//parent doesn't exist, so make parent
			this.createState(stateName, value);
		}

		//stores values can not be negative
		if (stateName.indexOf('stores') === 0 && this.get(stateName, true) < 0) {
			this.stateModifier('(' + fullPath + ') = value', 0);
			console.log('WARNING: state:' + stateName + ' can not be a negative value. Set to 0 instead.');
		}

		if (!noEvent) {
			this.fireUpdate(stateName);
		}
	}
	//mainly for local copy use, add(M) can fail so we can't shortcut them
	//since set does not fail, we know state exists and can simply return the object
	setget(stateName: string, value: unknown, noEvent?: boolean) {
		this.set(stateName, value, noEvent);
		return this.get(stateName);
	}

	remove(stateName: string, noEvent?: boolean) {
		const whichState = this.buildPath(stateName);
		if (!this.stateModifier('(delete ' + whichState + ')')) {
			//it didn't exist in the first place
			console.log('WARNING: Tried to remove non-existant state \'' + stateName + '\'.');
		}
		if (!noEvent) {
			this.fireUpdate(stateName);
		}
	}
	removeBranch(stateName: string, noEvent: boolean = false) {
		for (const i in this.get(stateName)) {
			if (typeof this.get(stateName)[i] === 'object') {
				this.removeBranch(stateName + '.' + i);
			}
		}
		if (this.get(stateName) === undefined) {
			this.remove(stateName);
		}
		if (!noEvent) {
			this.fireUpdate(stateName);
		}
	}

	//creates full reference from input
	//hopefully this won't ever need to be more complicated
	buildPath(input: string) {
		const dot = (input.charAt(0) === '[') ? '' : '.'; //if it starts with [foo] no dot to join
		return 'State' + dot + input;
	}

	fireUpdate(stateName: string) {
		const category = this.getCategory(stateName);
		if (stateName === undefined) throw new Error('stateName is undefined');
		this.stateUpdate.publish({ 'category': category, 'stateName': stateName });
	}

	getCategory(stateName: string) {
		const firstOB = stateName.indexOf('[');
		const firstDot = stateName.indexOf('.');
		let cutoff = null;
		if (firstOB === -1 || firstDot === -1) {
			cutoff = firstOB > firstDot ? firstOB : firstDot;
		} else {
			cutoff = firstOB < firstDot ? firstOB : firstDot;
		}
		if (cutoff === -1) {
			return stateName;
		} else {
			return stateName.substring(0, cutoff);
		}
	}


	//INCOME
	setIncome(source: string, options: Record<string, any>) {
		const existing = this.get('income.' + source + '');
		if (typeof existing !== 'undefined') {
			options.timeLeft = existing.timeLeft;
		}
		this.set('income.' + source + '', options);
	}

	getIncome(source: string) {
		const existing = this.get('income.' + source + '');
		if (typeof existing !== 'undefined') {
			return existing;
		}
		return {};
	}

	collectIncome() {
		let changed = false;
		if (typeof this.get('income') !== 'undefined') {
			for (const source in this.get('income')) {
				const income = this.get('income.' + source + '');
				if (typeof income.timeLeft !== 'number') {
					income.timeLeft = 0;
				}
				income.timeLeft--;

				if (income.timeLeft <= 0) {
					console.log('collection income from ' + source);

					const cost = income.stores;
					let ok = true;
					for (const k in cost) {
						const have = this.get('stores.' + k + '', true);
						if (have + cost[k] < 0) {
							ok = false;
							break;
						}
					}

					if (ok) {
						this.addM('stores', income.stores, true);
					}
					changed = true;
					if (typeof income.delay === 'number') {
						income.timeLeft = income.delay;
					}
				}
			}
		}
		if (changed) {
			this.fireUpdate('income');
		}
		this.engine._incomeTimeout = this.engine.setTimeout(this.collectIncome.bind(this), 1000);
	}



	//Misc
	num(name: string, craftable: Record<string, any>) {
		switch (craftable.type) {
			case 'good':
			case 'tool':
			case 'weapon':
			case 'upgrade':
			case 'special':
				return this.get('stores.' + name + '', true);
			case 'building':
				return this.get('game.buildings.' + name + '', true);
		}
	}

	handleStateUpdates(e: any) {

	}
};