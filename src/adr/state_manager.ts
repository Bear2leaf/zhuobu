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

import adr from "./adr.js";
import Engine from "./engine.js";
import Events from "./events.js";
import Notifications from "./notifications.js";
import Space from "./space.js";
import World from "./world.js";


function stateModifierError(...args: unknown[]) {
	throw new Error(`[state_manager.js][evalError()] ${args.map(arg => arg).join(', ')}`);
}
function stateModifier(...args: any[]) {
	if (arguments.length === 1 && typeof arguments[0] === 'string') {
		const arg = arguments[0];
		if (/^whichState\s=\s\(([\w\s\.]+)+\)$/.test(arg) && arg.indexOf("whichState = (") === 0) {
			const str = arg.slice(14, -1);
			let keys: string[] = str.split('.').slice(1);
			let state = adr.State as Record<string, any>;
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
			let state = adr.State as Record<string, any>;
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
			stateModifierError(...arguments)
		}
	} else if (arguments.length === 2 && typeof arguments[0] === 'string' && /^\(([\w\s\.]+)+\)\s=\svalue$/.test(arguments[0])) {
		/*
		 * (State.income.gather) = value
		 */
		const arg = arguments[0];
		const testResult = /^\(([\w\s\.]+)+\)\s=\svalue$/.exec(arg)!;
		if (!testResult) stateModifierError(...arguments);
		const fullPath = testResult[1];
		let result = adr.State as Record<string, any>;
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
		stateModifierError(...arguments);
	}
}


export default class StateManager {

	static MAX_STORE = 99999999999999;

	static options = {};

	static init(options?: StateManagerOptions) {
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
			if (!StateManager.get(cats[which])) StateManager.set(cats[which], {});
		}

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(StateManager.handleStateUpdates);
	};

	//create all parents and then set state
	static createState(stateName: string, value: StateResult) {
		const words = stateName.split(/[.\[\]'"]+/);
		//for some reason there are sometimes empty strings
		for (let j = 0; j < words.length; j++) {
			if (words[j] === '') {
				words.splice(j, 1);
				j--;
			}
		}
		let obj = adr.State as Record<string, any>;
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
	static setM(parentName: string, list: Record<string, StateResult>, noEvent: boolean = false) {
		StateManager.buildPath(parentName);

		//make sure the state exists to avoid errors,
		if (StateManager.get(parentName) === undefined) StateManager.set(parentName, {}, true);

		for (const k in list) {
			StateManager.set(parentName + '.' + k + '', list[k], true);
		}

		if (!noEvent) {
			Engine.saveGame();
			StateManager.fireUpdate(parentName);
		}
	}

	//shortcut for altering number values, return 1 if state wasn't a number
	static add(stateName: string, value: StateResult, noEvent: boolean = false) {
		//0 if undefined, null (but not {}) should allow adding to new objects
		//could also add in a true = 1 thing, to have something go from existing (true)
		//to be a count, but that might be unwanted behavior (add with loose eval probably will happen anyways)
		const old = StateManager.get(stateName, true);

		//check for NaN (old !== old) and non number values
		if (old !== old) {
			Engine.log('WARNING: ' + stateName + ' was corrupted (NaN). Resetting to 0.');
			throw new Error('WARNING: ' + stateName + ' was corrupted (NaN). Resetting to 0.');
			StateManager.set(stateName, old + value, noEvent);
		} else if (typeof old !== 'number' || typeof value !== 'number') {
			Engine.log('WARNING: Can not do math with state:' + stateName + ' or value:' + value + ' because at least one is not a number.');
			throw new Error('WARNING: Can not do math with state:' + stateName + ' or value:' + value + ' because at least one is not a number.');
		} else {
			StateManager.set(stateName, old + value, noEvent); //setState handles event and save
		}

	}

	//alters multiple number values, return number of fails
	static addM(parentName: string, list: Mod, noEvent: boolean = false) {

		//make sure the parent exists to avoid errors
		if (StateManager.get(parentName) === undefined) StateManager.set(parentName, {}, true);

		for (const k in list) {
			StateManager.add(parentName + '.' + k + '', list[k], true)
		}

		if (!noEvent) {
			Engine.saveGame();
			StateManager.fireUpdate(parentName);
		}
	}

	//return state, undefined or 0
	static get(stateName: string, requestZero?: boolean) {
		let whichState = null;
		const fullPath = StateManager.buildPath(stateName);

		//catch errors if parent of state doesn't exist
		whichState = stateModifier('whichState = (' + fullPath + ')');

		//prevents repeated if undefined, null, false or {}, then x = 0 situations
		if ((!whichState || JSON.stringify(whichState) === '{}') && requestZero) return 0;
		else return whichState;
	}

	//set single state
	//if noEvent is true, the update event won't trigger, useful for setting multiple states first
	static set(stateName: string, value: unknown, noEvent?: boolean) {
		const fullPath = StateManager.buildPath(stateName);

		//make sure the value isn't over the engine maximum
		if (typeof value === 'number' && value > StateManager.MAX_STORE) value = StateManager.MAX_STORE;

		if (!stateModifier('(' + fullPath + ') = value', value)) {

			//parent doesn't exist, so make parent
			StateManager.createState(stateName, value);
		}

		//stores values can not be negative
		if (stateName.indexOf('stores') === 0 && StateManager.get(stateName, true) < 0) {
			stateModifier('(' + fullPath + ') = value', 0);
			Engine.log('WARNING: state:' + stateName + ' can not be a negative value. Set to 0 instead.');
		}

		if (!noEvent) {
			Engine.saveGame();
			StateManager.fireUpdate(stateName);
		}
	}
	//mainly for local copy use, add(M) can fail so we can't shortcut them
	//since set does not fail, we know state exists and can simply return the object
	static setget(stateName: string, value: unknown, noEvent?: boolean) {
		StateManager.set(stateName, value, noEvent);
		return StateManager.get(stateName);
	}

	static remove(stateName: string, noEvent?: boolean) {
		const whichState = StateManager.buildPath(stateName);
		if (!stateModifier('(delete ' + whichState + ')')) {
			//it didn't exist in the first place
			Engine.log('WARNING: Tried to remove non-existant state \'' + stateName + '\'.');
		}
		if (!noEvent) {
			Engine.saveGame();
			StateManager.fireUpdate(stateName);
		}
	}
	static removeBranch(stateName: string, noEvent: boolean = false) {
		for (const i in StateManager.get(stateName)) {
			if (typeof StateManager.get(stateName)[i] === 'object') {
				StateManager.removeBranch(stateName + '.' + i);
			}
		}
		if (StateManager.get(stateName) === undefined) {
			StateManager.remove(stateName);
		}
		if (!noEvent) {
			Engine.saveGame();
			StateManager.fireUpdate(stateName);
		}
	}

	//creates full reference from input
	//hopefully this won't ever need to be more complicated
	static buildPath(input: string) {
		const dot = (input.charAt(0) === '[') ? '' : '.'; //if it starts with [foo] no dot to join
		return 'State' + dot + input;
	}

	static fireUpdate(stateName: string, save: boolean = false) {
		const category = StateManager.getCategory(stateName);
		if (stateName === undefined) throw new Error('stateName is undefined');
		Events.stateUpdate.publish({ 'category': category, 'stateName': stateName });
		if (save) Engine.saveGame();
	}

	static getCategory(stateName: string) {
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
			return stateName.substr(0, cutoff);
		}
	}

	//Use this function to make old save games compatible with new version
	static updateOldState() {
		let version = StateManager.get('version');
		if (typeof version !== 'number') version = 1.0;
		if (version === 1.0) {
			// v1.1 introduced the Lodge, so get rid of lodgeless hunters
			StateManager.remove('outside.workers.hunter', true);
			StateManager.remove('income.hunter', true);
			Engine.log('upgraded save to v1.1');
			version = 1.1;
		}
		if (version === 1.1) {
			//v1.2 added the Swamp to the map, so add it to already generated maps
			if (StateManager.get('world')) {
				World.placeLandmark(15, World.RADIUS * 1.5, World.TILE.SWAMP, StateManager.get('world.map'));
			}
			Engine.log('upgraded save to v1.2');
			version = 1.2;
		}
		if (version === 1.2) {
			//StateManager added, so move data to new locations
			StateManager.remove('room.fire');
			StateManager.remove('room.temperature');
			StateManager.remove('room.buttons');
			if (StateManager.get('room')) {
				StateManager.set('features.location.room', true);
				StateManager.set('game.builder.level', StateManager.get('room.builder'));
				StateManager.remove('room');
			}
			if (StateManager.get('outside')) {
				StateManager.set('features.location.outside', true);
				StateManager.set('game.population', StateManager.get('outside.population'));
				StateManager.set('game.buildings', StateManager.get('outside.buildings'));
				StateManager.set('game.workers', StateManager.get('outside.workers'));
				StateManager.set('game.outside.seenForest', StateManager.get('outside.seenForest'));
				StateManager.remove('outside');
			}
			if (StateManager.get('world')) {
				StateManager.set('features.location.world', true);
				StateManager.set('game.world.map', StateManager.get('world.map'));
				StateManager.set('game.world.mask', StateManager.get('world.mask'));
				StateManager.set('starved', StateManager.get('character.starved', true));
				StateManager.set('dehydrated', StateManager.get('character.dehydrated', true));
				StateManager.remove('world');
				StateManager.remove('starved');
				StateManager.remove('dehydrated');
			}
			if (StateManager.get('ship')) {
				StateManager.set('features.location.spaceShip', true);
				StateManager.set('game.spaceShip.hull', StateManager.get('ship.hull', true));
				StateManager.set('game.spaceShip.thrusters', StateManager.get('ship.thrusters', true));
				StateManager.set('game.spaceShip.seenWarning', StateManager.get('ship.seenWarning'));
				StateManager.set('game.spaceShip.seenShip', StateManager.get('ship.seenShip'));
				StateManager.remove('ship');
			}
			if (StateManager.get('punches')) {
				StateManager.set('character.punches', StateManager.get('punches'));
				StateManager.remove('punches');
			}
			if (StateManager.get('perks')) {
				StateManager.set('character.perks', StateManager.get('perks'));
				StateManager.remove('perks');
			}
			if (StateManager.get('thieves')) {
				StateManager.set('game.thieves', StateManager.get('thieves'));
				StateManager.remove('thieves');
			}
			if (StateManager.get('stolen')) {
				StateManager.set('game.stolen', StateManager.get('stolen'));
				StateManager.remove('stolen');
			}
			if (StateManager.get('cityCleared')) {
				StateManager.set('character.cityCleared', StateManager.get('cityCleared'));
				StateManager.remove('cityCleared');
			}
			StateManager.set('version', 1.3);
		}
	}

	/******************************************************************
	 * Start of specific state functions
	 ******************************************************************/
	//PERKS
	static addPerk(name: string) {
		StateManager.set('character.perks.' + name + '', true);
		Notifications.notify(null, Engine.Perks[name].notify);
	}

	static hasPerk(name: string) {
		return StateManager.get('character.perks.' + name + '');
	}

	//INCOME
	static setIncome(source: string, options: IncomeOptions) {
		const existing = StateManager.get('income.' + source + '');
		if (typeof existing !== 'undefined') {
			options.timeLeft = existing.timeLeft;
		}
		StateManager.set('income.' + source + '', options);
	}

	static getIncome(source: string) {
		const existing = StateManager.get('income.' + source + '');
		if (typeof existing !== 'undefined') {
			return existing;
		}
		return {};
	}

	static collectIncome() {
		let changed = false;
		if (typeof StateManager.get('income') !== 'undefined' && Engine.activeModule !== Space) {
			for (const source in StateManager.get('income')) {
				const income = StateManager.get('income.' + source + '') as IncomeOptions;
				if (typeof income.timeLeft !== 'number') {
					income.timeLeft = 0;
				}
				income.timeLeft--;

				if (income.timeLeft <= 0) {
					Engine.log('collection income from ' + source);
					if (source === 'thieves') StateManager.addStolen(income.stores);

					const cost = income.stores;
					let ok = true;
					if (source !== 'thieves') {
						for (const k in cost) {
							const have = StateManager.get('stores.' + k + '', true);
							if (have + cost[k] < 0) {
								ok = false;
								break;
							}
						}
					}

					if (ok) {
						StateManager.addM('stores', income.stores, true);
					}
					changed = true;
					if (typeof income.delay === 'number') {
						income.timeLeft = income.delay;
					}
				}
			}
		}
		if (changed) {
			StateManager.fireUpdate('income', true);
		}
		Engine._incomeTimeout = Engine.setTimeout(StateManager.collectIncome, 1000);
	}

	//Thieves
	static addStolen(stores: Stores) {
		for (const k in stores) {
			const old = StateManager.get('stores.' + k + '', true);
			const short = old + stores[k];
			//if they would steal more than actually owned
			if (short < 0) {
				StateManager.add('game.stolen.' + k + '', (stores[k] * -1) + short);
			} else {
				StateManager.add('game.stolen.' + k + '', stores[k] * -1);
			}
		}
	}

	static startThieves() {
		StateManager.set('game.thieves', 1);
		StateManager.setIncome('thieves', {
			delay: 10,
			stores: {
				'wood': -10,
				'fur': -5,
				'meat': -5
			}
		});
	}

	//Misc
	static num(name: string, craftable: Craftables) {
		switch (craftable.type) {
			case 'good':
			case 'tool':
			case 'weapon':
			case 'upgrade':
			case 'special':
				return StateManager.get('stores.' + name + '', true);
			case 'building':
				return StateManager.get('game.buildings.' + name + '', true);
		}
	}

	static handleStateUpdates(e: StateUpdateEvent) {

	}
};