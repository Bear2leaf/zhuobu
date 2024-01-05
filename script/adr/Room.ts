import StateManager from "./StateManager";
import Engine from "./Engine";
import Notifications from "./Notifications";


/**
 * Module that registers the simple room functionality
 */
export default class Room {
	// times in (minutes * seconds * milliseconds)
	readonly _FIRE_COOL_DELAY = 5 * 60 * 1000; // time after a stoke before the fire cools
	readonly _ROOM_WARM_DELAY = 30 * 1000; // time between room temperature updates
	readonly _BUILDER_STATE_DELAY = 0.5 * 60 * 1000; // time between builder state updates
	readonly _STOKE_COOLDOWN = 10; // cooldown to stoke the fire
	readonly _NEED_WOOD_DELAY = 15 * 1000; // from when the stranger shows up, to when you need wood
	readonly buttons: Record<string, boolean> = {};
	readonly Craftables: Record<string, any> = {
	};

	readonly TradeGoods: Record<string, any> = {
	}
	readonly MiscItems: Record<string, any> = {
	};
	readonly TempEnum: Record<string, any> = {
		fromInt: function (value: number) {
			for (const k in this) {
				if (this[k].value === value) {
					return this[k];
				}
			}
			return this.Freezing;
		},
		Freezing: { value: 0, text: this.engine._('freezing') },
		Cold: { value: 1, text: this.engine._('cold') },
		Mild: { value: 2, text: this.engine._('mild') },
		Warm: { value: 3, text: this.engine._('warm') },
		Hot: { value: 4, text: this.engine._('hot') }
	};

	readonly FireEnum: Record<string, any> = {
		fromInt: function (value: number) {
			for (const k in this) {
				if (this[k].value === value) {
					return this[k];
				}
			}
			return this.Freezing;
		},
		Dead: { value: 0, text: this.engine._('dead') },
		Smoldering: { value: 1, text: this.engine._('smoldering') },
		Flickering: { value: 2, text: this.engine._('flickering') },
		Burning: { value: 3, text: this.engine._('burning') },
		Roaring: { value: 4, text: this.engine._('roaring') }
	};
	options: Record<string, any> = {};
	pathDiscovery: boolean = false;
	_builderTimer: number = 0;
	changed: boolean = false;

	_fireTimer: number = 0;
	_tempTimer: number = 0;
	constructor(
		private readonly engine: Engine
		, private readonly stateManager: StateManager
		, private readonly notifications: Notifications
	) {

	}
	init(options: Record<string, any>) {
		this.options = options;

		this.pathDiscovery = Boolean(this.stateManager.get('stores.compass'));


		if (this.stateManager.get('features.location.room') === undefined) {
			this.stateManager.set('features.location.room', true);
			this.stateManager.set('game.builder.level', -1);
		}

		// If this is the first time playing, the fire is dead and it's freezing. 
		// Otherwise grab past save state temp and fire level.
		this.stateManager.set('game.temperature', this.stateManager.get('game.temperature.value') === undefined ? this.TempEnum.Freezing : this.stateManager.get('game.temperature'));
		this.stateManager.set('game.fire', this.stateManager.get('game.fire.value') === undefined ? this.FireEnum.Dead : this.stateManager.get('game.fire'));


		this.updateButton();
		this.updateStoresView();
		this.updateIncomeView();
		this.updateBuildButtons();

		this._fireTimer = this.engine.setTimeout(this.coolFire.bind(this), this._FIRE_COOL_DELAY);
		this._tempTimer = this.engine.setTimeout(this.adjustTemp.bind(this), this._ROOM_WARM_DELAY);

		/*
		 * Builder states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if (this.stateManager.get('game.builder.level') >= 0 && this.stateManager.get('game.builder.level') < 3) {
			this._builderTimer = this.engine.setTimeout(this.updateBuilderState.bind(this), this._BUILDER_STATE_DELAY);
		}
		if (this.stateManager.get('game.builder.level') === 1 && this.stateManager.get('stores.wood', true) < 0) {
			this.engine.setTimeout(this.unlockForest.bind(this), this._NEED_WOOD_DELAY);
		}
		this.engine.setTimeout(this.stateManager.collectIncome.bind(this), 1000);

		this.notifications.printMessage(this.engine._("the room is {0}", this.TempEnum.fromInt(this.stateManager.get('game.temperature.value')).text));
		this.notifications.printMessage(this.engine._("the fire is {0}", this.FireEnum.fromInt(this.stateManager.get('game.fire.value')).text));
	};


	onArrival() {
		if (this.changed) {
			this.notifications.printMessage(this.engine._("the fire is {0}", this.FireEnum.fromInt(this.stateManager.get('game.fire.value')).text));
			this.notifications.printMessage(this.engine._("the room is {0}", this.TempEnum.fromInt(this.stateManager.get('game.temperature.value')).text));
			this.changed = false;
		}
		if (this.stateManager.get('game.builder.level') === 3) {
			this.stateManager.add('game.builder.level', 1);
			this.stateManager.setIncome('builder', {
				delay: 10,
				stores: { 'wood': 2 }
			});
			this.updateIncomeView();
			this.notifications.printMessage(this.engine._("the stranger is standing by the fire. she says she can help. says she builds things."));
		}

		this.engine.moveStoresView();

	};



	updateButton() {
	};
	lightFire() {
		const wood = this.stateManager.get('stores.wood');
		if (wood < 5) {
			this.notifications.printMessage(this.engine._("not enough wood to get the fire going"));
			return;
		} else if (wood > 4) {
			this.stateManager.set('stores.wood', wood - 5);
		}
		this.stateManager.set('game.fire', this.FireEnum.Burning);
		this.onFireChange();
	};

	stokeFire() {
		const wood = this.stateManager.get('stores.wood');
		if (wood === 0) {
			this.notifications.printMessage(this.engine._("the wood has run out"));
			return;
		}
		if (wood > 0) {
			this.stateManager.set('stores.wood', wood - 1);
		}
		if (this.stateManager.get('game.fire.value') < 4) {
			this.stateManager.set('game.fire', this.FireEnum.fromInt(this.stateManager.get('game.fire.value') + 1));
		}
		this.onFireChange();
	};

	onFireChange() {
		if (this.engine.activeModule !== this) {
			this.changed = true;
		}
		this.notifications.printMessage(this.engine._("the fire is {0}", this.FireEnum.fromInt(this.stateManager.get('game.fire.value')).text));
		if (this.stateManager.get('game.fire.value') > 1 && this.stateManager.get('game.builder.level') < 0) {
			this.stateManager.set('game.builder.level', 0);
			this.notifications.printMessage(this.engine._("the light from the fire spills from the windows, out into the dark"));
			this.engine.setTimeout(this.updateBuilderState.bind(this), this._BUILDER_STATE_DELAY);
		}
		clearTimeout(this._fireTimer);
		this._fireTimer = this.engine.setTimeout(this.coolFire.bind(this), this._FIRE_COOL_DELAY);
		this.updateButton();

	};

	coolFire() {
		const wood = this.stateManager.get('stores.wood');
		if (this.stateManager.get('game.fire.value') <= this.FireEnum.Flickering.value &&
			this.stateManager.get('game.builder.level') > 3 && wood > 0) {
			this.notifications.printMessage(this.engine._("builder stokes the fire"));
			this.stateManager.set('stores.wood', wood - 1);
			this.stateManager.set('game.fire', this.FireEnum.fromInt(this.stateManager.get('game.fire.value') + 1));
		}
		if (this.stateManager.get('game.fire.value') > 0) {
			this.stateManager.set('game.fire', this.FireEnum.fromInt(this.stateManager.get('game.fire.value') - 1));
			this._fireTimer = this.engine.setTimeout(this.coolFire.bind(this), this._FIRE_COOL_DELAY);
			this.onFireChange();
		}
	};

	adjustTemp() {
		const old = this.stateManager.get('game.temperature.value');
		if (this.stateManager.get('game.temperature.value') > 0 && this.stateManager.get('game.temperature.value') > this.stateManager.get('game.fire.value')) {
			this.stateManager.set('game.temperature', this.TempEnum.fromInt(this.stateManager.get('game.temperature.value') - 1));
			this.notifications.printMessage(this.engine._("the room is {0}", this.TempEnum.fromInt(this.stateManager.get('game.temperature.value')).text));
		}
		if (this.stateManager.get('game.temperature.value') < 4 && this.stateManager.get('game.temperature.value') < this.stateManager.get('game.fire.value')) {
			this.stateManager.set('game.temperature', this.TempEnum.fromInt(this.stateManager.get('game.temperature.value') + 1));
			this.notifications.printMessage(this.engine._("the room is {0}", this.TempEnum.fromInt(this.stateManager.get('game.temperature.value')).text));
		}
		if (this.stateManager.get('game.temperature.value') !== old) {
			this.changed = true;
		}
		this._tempTimer = this.engine.setTimeout(this.adjustTemp.bind(this), this._ROOM_WARM_DELAY);
	};

	unlockForest() {
		this.stateManager.set('stores.wood', 4);
		// Outside.init();
		this.notifications.printMessage(this.engine._("the wind howls outside"));
		this.notifications.printMessage(this.engine._("the wood is running out"));
	};

	updateBuilderState() {
		let lBuilder = this.stateManager.get('game.builder.level');
		if (lBuilder === 0) {
			this.notifications.printMessage(this.engine._("a ragged stranger stumbles through the door and collapses in the corner"));
			lBuilder = this.stateManager.setget('game.builder.level', 1);
			this.engine.setTimeout(this.unlockForest.bind(this), this._NEED_WOOD_DELAY);
		}
		else if (lBuilder < 3 && this.stateManager.get('game.temperature.value') >= this.TempEnum.Warm.value) {
			let msg = "";
			switch (lBuilder) {
				case 1:
					msg = this.engine._("the stranger shivers, and mumbles quietly. her words are unintelligible.");
					break;
				case 2:
					msg = this.engine._("the stranger in the corner stops shivering. her breathing calms.");
					break;
			}
			this.notifications.printMessage(msg);
			if (lBuilder < 3) {
				lBuilder = this.stateManager.setget('game.builder.level', lBuilder + 1);
			}
		}
		if (lBuilder < 3) {
			this.engine.setTimeout(this.updateBuilderState.bind(this), this._BUILDER_STATE_DELAY);
		}
	};

	updateStoresView() {

		if (this.stateManager.get('stores.compass') && !this.pathDiscovery) {
			this.pathDiscovery = true;
		}
	};

	updateIncomeView() {
	};

	buy(thing: string) {
		const good = this.TradeGoods[thing];
		let numThings = this.stateManager.get('stores.' + thing + '', true);
		if (numThings < 0) numThings = 0;
		if (good.maximum && good.maximum <= numThings) {
			return;
		}

		const storeMod: Record<string, any> = {};
		const cost = good.cost();
		for (const k in cost) {
			const have = this.stateManager.get('stores.' + k + '', true);
			if (have < cost[k]) {
				this.notifications.printMessage(this.engine._("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		this.stateManager.setM('stores', storeMod);

		this.notifications.printMessage(good.buildMsg);

		this.stateManager.add('stores.' + thing + '', 1);

	};

	build(thing: string) {
		if (this.stateManager.get('game.temperature.value') <= this.TempEnum.Cold.value) {
			this.notifications.printMessage(this.engine._("builder just shivers"));
			return false;
		}
		const craftable = this.Craftables[thing];

		let numThings = 0;
		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'tool':
			case 'upgrade':
				numThings = this.stateManager.get('stores.' + thing + '', true);
				break;
			case 'building':
				numThings = this.stateManager.get('game.buildings.' + thing + '', true);
				break;
		}

		if (numThings < 0) numThings = 0;
		if (craftable.maximum <= numThings) {
			return;
		}

		const storeMod: Record<string, any> = {};
		const cost = craftable.cost();
		for (const k in cost) {
			const have = this.stateManager.get('stores.' + k + '', true);
			if (have < cost[k]) {
				this.notifications.printMessage(this.engine._("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		this.stateManager.setM('stores', storeMod);

		this.notifications.printMessage(craftable.buildMsg);

		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'upgrade':
			case 'tool':
				this.stateManager.add('stores.' + thing + '', 1);
				break;
			case 'building':
				this.stateManager.add('game.buildings.' + thing + '', 1);
				break;
		}

		// audio
		switch (craftable.type) {
			case 'weapon':
			case 'upgrade':
			case 'tool':
				break;
			case 'building':
				break;
		}
	};

	needsWorkshop(type: string) {
		return type === 'weapon' || type === 'upgrade' || type === 'tool';
	};

	craftUnlocked(thing: string) {
		if (this.buttons[thing]) {
			return true;
		}
		if (this.stateManager.get('game.builder.level') < 4) return false;
		const craftable = this.Craftables[thing];
		if (this.needsWorkshop(craftable.type) && this.stateManager.get('game.buildings.workshop', true) === 0) return false;
		const cost = craftable.cost();

		//show button if one has already been built
		if (this.stateManager.get('game.buildings.' + thing + '') > 0) {
			this.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the wood, and all other components have been seen.
		if (this.stateManager.get('stores.wood', true) < cost['wood'] * 0.5) {
			return false;
		}
		for (const c in cost) {
			if (!this.stateManager.get('stores.' + c + '')) {
				return false;
			}
		}

		this.buttons[thing] = true;
		//don't notify if it has already been built before
		if (!this.stateManager.get('game.buildings.' + thing + '')) {
			this.notifications.printMessage(craftable.availableMsg);
		}
		return true;
	};

	buyUnlocked(thing: string) {
		if (this.buttons[thing]) {
			return true;
		} else if (this.stateManager.get('game.buildings.trading post', true) > 0) {
			if (thing === 'compass' || typeof this.stateManager.get('stores.' + thing + '') !== 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	};

	updateBuildButtons() {
	};

	compassTooltip(direction: string) {
	};

	handleStateUpdates(e: any) {
	};

};
