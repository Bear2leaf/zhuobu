import Query from "./query.js";
import _ from "./translate.js";
import Button from "./Button.js";
import { adr } from "./adr.js";
import AudioEngine from "./audio.js";
import { AudioLibrary } from "./audioLibrary.js";
import Engine from "./engine.js";
import Events from "./events.js";
import Fabricator from "./fabricator.js";
import { Header } from "./header.js";
import Notifications from "./notifications.js";
import Outside from "./outside.js";
import Path from "./path.js";
import StateManager from "./state_manager.js";


function fromInt(this: Enum, value: number): EnumItem {
	for (const k in this) {
		const item = this[k];
		if (typeof item === 'function') {
			continue
		}
		if (item && typeof item.value !== 'undefined' && item.value === value) {
			return this[k] as EnumItem;
		}
	}
	throw new Error("Invalid value for enum");
}
/**
 * Module that registers the simple room functionality
 */
export default class Room {
	static tab: Query;
	// times in (minutes * seconds * milliseconds)
	static _FIRE_COOL_DELAY = 5 * 60 * 1000; // time after a stoke before the fire cools
	static _ROOM_WARM_DELAY = 30 * 1000; // time between room temperature updates
	static _BUILDER_STATE_DELAY = 0.5 * 60 * 1000; // time between builder state updates
	static _STOKE_COOLDOWN = 10; // cooldown to stoke the fire
	static _NEED_WOOD_DELAY = 15 * 1000; // from when the stranger shows up, to when you need wood
	static readonly buttons: Record<string, boolean> = {};
	static options: RoomOptions = {};
	static pathDiscovery: boolean;
	static readonly Craftables: Record<string, Craftables> = {
		'trap': {
			name: _('trap'),
			button: null,
			maximum: 10,
			availableMsg: _('builder says she can make traps to catch any creatures might still be alive out there'),
			buildMsg: _('more traps to catch more creatures'),
			maxMsg: _("more traps won't help now"),
			type: 'building',
			cost: function () {
				const n = StateManager.get('game.buildings.trap', true) as number;
				return {
					'wood': 10 + (n * 10)
				};
			},
			audio: AudioLibrary.BUILD_TRAP
		},
		'cart': {
			name: _('cart'),
			button: null,
			maximum: 1,
			availableMsg: _('builder says she can make a cart for carrying wood'),
			buildMsg: _('the rickety cart will carry more wood from the forest'),
			type: 'building',
			cost: function () {
				return {
					'wood': 30
				};
			},
			audio: AudioLibrary.BUILD_CART
		},
		'hut': {
			name: _('hut'),
			button: null,
			maximum: 20,
			availableMsg: _("builder says there are more wanderers. says they'll work, too."),
			buildMsg: _('builder puts up a hut, out in the forest. says word will get around.'),
			maxMsg: _('no more room for huts.'),
			type: 'building',
			cost: function () {
				const n = StateManager.get('game.buildings.hut', true);
				return {
					'wood': 100 + (n * 50)
				};
			},
			audio: AudioLibrary.BUILD_HUT
		},
		'lodge': {
			name: _('lodge'),
			button: null,
			maximum: 1,
			availableMsg: _('villagers could help hunt, given the means'),
			buildMsg: _('the hunting lodge stands in the forest, a ways out of town'),
			type: 'building',
			cost: function () {
				return {
					wood: 200,
					fur: 10,
					meat: 5
				};
			},
			audio: AudioLibrary.BUILD_LODGE
		},
		'trading post': {
			name: _('trading post'),
			button: null,
			maximum: 1,
			availableMsg: _("a trading post would make commerce easier"),
			buildMsg: _("now the nomads have a place to set up shop, they might stick around a while"),
			type: 'building',
			cost: function () {
				return {
					'wood': 400,
					'fur': 100
				};
			},
			audio: AudioLibrary.BUILD_TRADING_POST
		},
		'tannery': {
			name: _('tannery'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says leather could be useful. says the villagers could make it."),
			buildMsg: _('tannery goes up quick, on the edge of the village'),
			type: 'building',
			cost: function () {
				return {
					'wood': 500,
					'fur': 50
				};
			},
			audio: AudioLibrary.BUILD_TANNERY
		},
		'smokehouse': {
			name: _('smokehouse'),
			button: null,
			maximum: 1,
			availableMsg: _("should cure the meat, or it'll spoil. builder says she can fix something up."),
			buildMsg: _('builder finishes the smokehouse. she looks hungry.'),
			type: 'building',
			cost: function () {
				return {
					'wood': 600,
					'meat': 50
				};
			},
			audio: AudioLibrary.BUILD_SMOKEHOUSE
		},
		'workshop': {
			name: _('workshop'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says she could make finer things, if she had the tools"),
			buildMsg: _("workshop's finally ready. builder's excited to get to it"),
			type: 'building',
			cost: function () {
				return {
					'wood': 800,
					'leather': 100,
					'scales': 10
				};
			},
			audio: AudioLibrary.BUILD_WORKSHOP
		},
		'steelworks': {
			name: _('steelworks'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says the villagers could make steel, given the tools"),
			buildMsg: _("a haze falls over the village as the steelworks fires up"),
			type: 'building',
			cost: function () {
				return {
					'wood': 1500,
					'iron': 100,
					'coal': 100
				};
			},
			audio: AudioLibrary.BUILD_STEELWORKS
		},
		'armoury': {
			name: _('armoury'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says it'd be useful to have a steady source of bullets"),
			buildMsg: _("armoury's done, welcoming back the weapons of the past."),
			type: 'building',
			cost: function () {
				return {
					'wood': 3000,
					'steel': 100,
					'sulphur': 50
				};
			},
			audio: AudioLibrary.BUILD_ARMOURY
		},
		'torch': {
			name: _('torch'),
			button: null,
			type: 'tool',
			buildMsg: _('a torch to keep the dark away'),
			cost: function () {
				return {
					'wood': 1,
					'cloth': 1
				};
			},
			audio: AudioLibrary.CRAFT_TORCH
		},
		'waterskin': {
			name: _('waterskin'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('this waterskin\'ll hold a bit of water, at least'),
			cost: function () {
				return {
					'leather': 50
				};
			},
			audio: AudioLibrary.CRAFT_WATERSKIN
		},
		'cask': {
			name: _('cask'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the cask holds enough water for longer expeditions'),
			cost: function () {
				return {
					'leather': 100,
					'iron': 20
				};
			},
			audio: AudioLibrary.CRAFT_CASK
		},
		'water tank': {
			name: _('water tank'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('never go thirsty again'),
			cost: function () {
				return {
					'iron': 100,
					'steel': 50
				};
			},
			audio: AudioLibrary.CRAFT_WATER_TANK
		},
		'bone spear': {
			name: _('bone spear'),
			button: null,
			type: 'weapon',
			buildMsg: _("this spear's not elegant, but it's pretty good at stabbing"),
			cost: function () {
				return {
					'wood': 100,
					'teeth': 5
				};
			},
			audio: AudioLibrary.CRAFT_BONE_SPEAR
		},
		'rucksack': {
			name: _('rucksack'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('carrying more means longer expeditions to the wilds'),
			cost: function () {
				return {
					'leather': 200
				};
			},
			audio: AudioLibrary.CRAFT_RUCKSACK
		},
		'wagon': {
			name: _('wagon'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the wagon can carry a lot of supplies'),
			cost: function () {
				return {
					'wood': 500,
					'iron': 100
				};
			},
			audio: AudioLibrary.CRAFT_WAGON
		},
		'convoy': {
			name: _('convoy'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the convoy can haul mostly everything'),
			cost: function () {
				return {
					'wood': 1000,
					'iron': 200,
					'steel': 100
				};
			},
			audio: AudioLibrary.CRAFT_CONVOY
		},
		'l armour': {
			name: _('l armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("leather's not strong. better than rags, though."),
			cost: function () {
				return {
					'leather': 200,
					'scales': 20
				};
			},
			audio: AudioLibrary.CRAFT_LEATHER_ARMOUR
		},
		'i armour': {
			name: _('i armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("iron's stronger than leather"),
			cost: function () {
				return {
					'leather': 200,
					'iron': 100
				};
			},
			audio: AudioLibrary.CRAFT_IRON_ARMOUR
		},
		's armour': {
			name: _('s armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("steel's stronger than iron"),
			cost: function () {
				return {
					'leather': 200,
					'steel': 100
				};
			},
			audio: AudioLibrary.CRAFT_STEEL_ARMOUR
		},
		'iron sword': {
			name: _('iron sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("sword is sharp. good protection out in the wilds."),
			cost: function () {
				return {
					'wood': 200,
					'leather': 50,
					'iron': 20
				};
			},
			audio: AudioLibrary.CRAFT_IRON_SWORD
		},
		'steel sword': {
			name: _('steel sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("the steel is strong, and the blade true."),
			cost: function () {
				return {
					'wood': 500,
					'leather': 100,
					'steel': 20
				};
			},
			audio: AudioLibrary.CRAFT_STEEL_SWORD
		},
		'rifle': {
			name: _('rifle'),
			type: 'weapon',
			buildMsg: _("black powder and bullets, like the old days."),
			cost: function () {
				return {
					'wood': 200,
					'steel': 50,
					'sulphur': 50
				};
			},
			audio: AudioLibrary.CRAFT_RIFLE
		}
	};

	static readonly TradeGoods: Record<string, Good> = {
		'scales': {
			type: 'good',
			cost: function () {
				return { fur: 150 };
			},
			audio: AudioLibrary.BUY_SCALES
		},
		'teeth': {
			type: 'good',
			cost: function () {
				return { fur: 300 };
			},
			audio: AudioLibrary.BUY_TEETH
		},
		'iron': {
			type: 'good',
			cost: function () {
				return {
					'fur': 150,
					'scales': 50
				};
			},
			audio: AudioLibrary.BUY_IRON
		},
		'coal': {
			type: 'good',
			cost: function () {
				return {
					'fur': 200,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_COAL
		},
		'steel': {
			type: 'good',
			cost: function () {
				return {
					'fur': 300,
					'scales': 50,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_STEEL
		},
		'medicine': {
			type: 'good',
			cost: function () {
				return {
					'scales': 50, 'teeth': 30
				};
			},
			audio: AudioLibrary.BUY_MEDICINE
		},
		'bullets': {
			type: 'good',
			cost: function () {
				return {
					'scales': 10
				};
			},
			audio: AudioLibrary.BUY_BULLETS
		},
		'energy cell': {
			type: 'good',
			cost: function () {
				return {
					'scales': 10,
					'teeth': 10
				};
			},
			audio: AudioLibrary.BUY_ENERGY_CELL
		},
		'bolas': {
			type: 'weapon',
			cost: function () {
				return {
					'teeth': 10
				};
			},
			audio: AudioLibrary.BUY_BOLAS
		},
		'grenade': {
			type: 'weapon',
			cost: function () {
				return {
					'scales': 100,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_GRENADES
		},
		'bayonet': {
			type: 'weapon',
			cost: function () {
				return {
					'scales': 500,
					'teeth': 250
				};
			},
			audio: AudioLibrary.BUY_BAYONET
		},
		'alien alloy': {
			type: 'good',
			cost: function () {
				return {
					'fur': 1500,
					'scales': 750,
					'teeth': 300
				};
			},
			audio: AudioLibrary.BUY_ALIEN_ALLOY
		},
		'compass': {
			type: 'special',
			maximum: 1,
			cost: function () {
				return {
					fur: 400,
					scales: 20,
					teeth: 10
				};
			},
			audio: AudioLibrary.BUY_COMPASS
		}
	};

	static readonly MiscItems: Record<string, Item> = {
		'laser rifle': {
			type: 'weapon'
		}
	};
	static panel: Query;
	static _builderTimer: number;
	static changed: boolean;

	static init(options?: RoomOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		Room.pathDiscovery = Boolean(StateManager.get('stores.compass'));

		if (Engine._debug) {
			this._ROOM_WARM_DELAY = 5000;
			this._BUILDER_STATE_DELAY = 5000;
			this._STOKE_COOLDOWN = 0;
			this._NEED_WOOD_DELAY = 5000;
		}

		if (StateManager.get('features.location.room') === undefined) {
			StateManager.set('features.location.room', true);
			StateManager.set('game.builder.level', -1);
		}

		// If this is the first time playing, the fire is dead and it's freezing. 
		// Otherwise grab past save state temp and fire level.
		StateManager.set('game.temperature', StateManager.get('game.temperature.value') === undefined ? this.TempEnum.Freezing : StateManager.get('game.temperature'));
		StateManager.set('game.fire', StateManager.get('game.fire.value') === undefined ? this.FireEnum.Dead : StateManager.get('game.fire'));

		// Create the room tab
		this.tab = Header.addLocation(_("A Dark Room"), "room", Room);

		// Create the Room panel
		this.panel = adr.$('<div>')
			.attr('id', "roomPanel")
			.addClass('location')
			.appendTo(adr.$('#locationSlider'));

		Engine.updateSlider();

		// Create the light button
		Button.create({
			id: 'lightButton',
			text: _('light fire'),
			click: Room.lightFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: { 'wood': 5 }
		}).appendTo(adr.$('#roomPanel'));

		// Create the stoke button
		Button.create({
			id: 'stokeButton',
			text: _("stoke fire"),
			click: Room.stokeFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: { 'wood': 1 }
		}).appendTo(adr.$('#roomPanel'));

		// Create the stores container
		adr.$('<div>').attr('id', 'storesContainer').prependTo(adr.$('#roomPanel'));

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Room.handleStateUpdates);

		Room.updateButton();
		Room.updateStoresView();
		Room.updateIncomeView();
		Room.updateBuildButtons();

		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);

		/*
		 * Builder states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if (StateManager.get('game.builder.level') >= 0 && StateManager.get('game.builder.level') < 3) {
			Room._builderTimer = Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		if (StateManager.get('game.builder.level') === 1 && StateManager.get('stores.wood', true) < 0) {
			Engine.setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		Engine.setTimeout(StateManager.collectIncome, 1000);

		Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt(StateManager.get('game.temperature.value')).text));
		Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt(StateManager.get('game.fire.value')).text));
	};


	static onArrival(transition_diff?: number) {
		Room.setTitle();
		if (Room.changed) {
			Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt(StateManager.get('game.fire.value')).text));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt(StateManager.get('game.temperature.value')).text));
			Room.changed = false;
		}
		if (StateManager.get('game.builder.level') === 3) {
			StateManager.add('game.builder.level', 1);
			StateManager.setIncome('builder', {
				delay: 10,
				stores: { 'wood': 2 }
			});
			Room.updateIncomeView();
			Notifications.notify(Room, _("the stranger is standing by the fire. she says she can help. says she builds things."));
		}

		Engine.moveStoresView(null, transition_diff);

		Room.setMusic();
	};

	static TempEnum: TempEnum = {
		fromInt,
		Freezing: { value: 0, text: _('freezing') },
		Cold: { value: 1, text: _('cold') },
		Mild: { value: 2, text: _('mild') },
		Warm: { value: 3, text: _('warm') },
		Hot: { value: 4, text: _('hot') }
	};

	static FireEnum: FireEnum = {
		fromInt,
		Dead: { value: 0, text: _('dead') },
		Smoldering: { value: 1, text: _('smoldering') },
		Flickering: { value: 2, text: _('flickering') },
		Burning: { value: 3, text: _('burning') },
		Roaring: { value: 4, text: _('roaring') }
	};

	static setTitle() {
		const title = StateManager.get('game.fire.value') < 2 ? _("A Dark Room") : _("A Firelit Room");
		if (Engine.activeModule === this) {
			adr.title(title);
		}
		adr.$('#location_room').text(title);
	};

	static updateButton() {
		const light = adr.$('#lightButton');
		const stoke = adr.$('#stokeButton');
		if (StateManager.get('game.fire.value') === Room.FireEnum.Dead.value && stoke.css('display') !== 'none') {
			stoke.hide();
			light.show();
			if (stoke.hasClass('disabled')) {
				Button.cooldown(light);
			}
		} else if (light.css('display') !== 'none') {
			stoke.show();
			light.hide();
			if (light.hasClass('disabled')) {
				Button.cooldown(stoke);
			}
		}

		if (!StateManager.get('stores.wood')) {
			light.addClass('free');
			stoke.addClass('free');
		} else {
			light.removeClass('free');
			stoke.removeClass('free');
		}
	};

	static _fireTimer: number;
	static _tempTimer: number;
	static lightFire() {
		const wood = StateManager.get('stores.wood');
		if (wood < 5) {
			Notifications.notify(Room, _("not enough wood to get the fire going"));
			Button.clearCooldown(adr.$('#lightButton'));
			return;
		} else if (wood > 4) {
			StateManager.set('stores.wood', wood - 5);
		}
		StateManager.set('game.fire', Room.FireEnum.Burning);
		AudioEngine.playSound(AudioLibrary.LIGHT_FIRE);
		Room.onFireChange();
	};

	static stokeFire() {
		const wood = StateManager.get('stores.wood');
		if (wood === 0) {
			Notifications.notify(Room, _("the wood has run out"));
			Button.clearCooldown(adr.$('#stokeButton'));
			return;
		}
		if (wood > 0) {
			StateManager.set('stores.wood', wood - 1);
		}
		if (StateManager.get('game.fire.value') < 4) {
			StateManager.set('game.fire', Room.FireEnum.fromInt(StateManager.get('game.fire.value') + 1));
		}
		AudioEngine.playSound(AudioLibrary.STOKE_FIRE);
		Room.onFireChange();
	};

	static onFireChange() {
		if (Engine.activeModule !== Room) {
			Room.changed = true;
		}
		Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt(StateManager.get('game.fire.value')).text), true);
		if (StateManager.get('game.fire.value') > 1 && StateManager.get('game.builder.level') < 0) {
			StateManager.set('game.builder.level', 0);
			Notifications.notify(Room, _("the light from the fire spills from the windows, out into the dark"));
			Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		adr.clearTimeout(Room._fireTimer);
		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room.updateButton();
		Room.setTitle();

		// only update music if in the room
		if (Engine.activeModule === Room) {
			Room.setMusic();
		}
	};

	static coolFire() {
		const wood = StateManager.get('stores.wood');
		if (StateManager.get('game.fire.value') <= Room.FireEnum.Flickering.value &&
			StateManager.get('game.builder.level') > 3 && wood > 0) {
			Notifications.notify(Room, _("builder stokes the fire"), true);
			StateManager.set('stores.wood', wood - 1);
			StateManager.set('game.fire', Room.FireEnum.fromInt(StateManager.get('game.fire.value') + 1));
		}
		if (StateManager.get('game.fire.value') > 0) {
			StateManager.set('game.fire', Room.FireEnum.fromInt(StateManager.get('game.fire.value') - 1));
			Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
			Room.onFireChange();
		}
	};

	static adjustTemp() {
		const old = StateManager.get('game.temperature.value');
		if (StateManager.get('game.temperature.value') > 0 && StateManager.get('game.temperature.value') > StateManager.get('game.fire.value')) {
			StateManager.set('game.temperature', Room.TempEnum.fromInt(StateManager.get('game.temperature.value') - 1));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt(StateManager.get('game.temperature.value')).text), true);
		}
		if (StateManager.get('game.temperature.value') < 4 && StateManager.get('game.temperature.value') < StateManager.get('game.fire.value')) {
			StateManager.set('game.temperature', Room.TempEnum.fromInt(StateManager.get('game.temperature.value') + 1));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt(StateManager.get('game.temperature.value')).text), true);
		}
		if (StateManager.get('game.temperature.value') !== old) {
			Room.changed = true;
		}
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
	};

	static unlockForest() {
		StateManager.set('stores.wood', 4);
		Outside.init();
		Notifications.notify(Room, _("the wind howls outside"));
		Notifications.notify(Room, _("the wood is running out"));
		Engine.event('progress', 'outside');
	};

	static updateBuilderState() {
		let lBuilder = StateManager.get('game.builder.level');
		if (lBuilder === 0) {
			Notifications.notify(Room, _("a ragged stranger stumbles through the door and collapses in the corner"));
			lBuilder = StateManager.setget('game.builder.level', 1);
			Engine.setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		else if (lBuilder < 3 && StateManager.get('game.temperature.value') >= Room.TempEnum.Warm.value) {
			let msg = "";
			switch (lBuilder) {
				case 1:
					msg = _("the stranger shivers, and mumbles quietly. her words are unintelligible.");
					break;
				case 2:
					msg = _("the stranger in the corner stops shivering. her breathing calms.");
					break;
			}
			Notifications.notify(Room, msg);
			if (lBuilder < 3) {
				lBuilder = StateManager.setget('game.builder.level', lBuilder + 1);
			}
		}
		if (lBuilder < 3) {
			Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		Engine.saveGame();
	};

	static updateStoresView() {
		let stores = adr.$('#stores');
		let resources = adr.$('#resources');
		let special = adr.$('#special');
		let weapons = adr.$('#weapons');
		let needsAppend = false, rNeedsAppend = false, sNeedsAppend = false, wNeedsAppend = false, newRow = false;
		if (stores.found === 0) {
			stores = adr.$('<div>').attr({
				'id': 'stores',
				'data-legend': _('stores')
			}).css('opacity', 0);
			needsAppend = true;
		}
		if (resources.found === 0) {
			resources = adr.$('<div>').attr({
				id: 'resources'
			}).css('opacity', 0);
			rNeedsAppend = true;
		}
		if (special.found === 0) {
			special = adr.$('<div>').attr({
				id: 'special'
			}).css('opacity', 0);
			sNeedsAppend = true;
		}
		if (weapons.found === 0) {
			weapons = adr.$('<div>').attr({
				'id': 'weapons',
				'data-legend': _('weapons')
			}).css('opacity', 0);
			wNeedsAppend = true;
		}
		for (const k in StateManager.get('stores')) {

			if (k.indexOf('blueprint') > 0) {
				// don't show blueprints
				continue;
			}

			const good =
				Room.Craftables[k] ||
				Room.TradeGoods[k] ||
				Room.TradeGoods[k] ||
				Room.MiscItems[k] ||
				Fabricator.Craftables[k];
			const type = good ? good.type : null;

			let location;
			switch (type) {
				case 'upgrade':
					// Don't display upgrades on the Room screen
					continue;
				case 'building':
					// Don't display buildings either
					continue;
				case 'weapon':
					location = weapons;
					break;
				case 'special':
					location = special;
					break;
				default:
					location = resources;
					break;
			}

			const id = "row_" + k.replace(/ /g, '-');
			let num = StateManager.get(`stores.${k}`);

			let row = adr.$('#' + id, location);

			const lk = _(k);

			// thieves?
			if (typeof StateManager.get('game.thieves') === 'undefined' && num > 5000 && StateManager.get('features.location.world')) {
				StateManager.startThieves();
			}

			if (row.found === 0) {
				row = adr.$('<div>').attr('id', id).addClass('storeRow');
				adr.$('<div>').addClass('row_key').text(lk).appendTo(row);
				adr.$('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
				adr.$('<div>').addClass('clear').appendTo(row);
				let curPrev = null;
				location.children().forEach(function (child) {
					const cName = child.find('.row_key').text();
					if (cName < lk) {
						curPrev = child.attr('id');
					}
				});
				if (curPrev === null) {
					row.prependTo(location);
				} else {
					row.insertAfter(location.find('#' + curPrev));
				}
				newRow = true;
			} else {
				const found = location.find('#' + row.attr('id')).children().find(v => v.hasClass('row_val'));
				if (!found) {
					throw new Error("found is undefined");
				}
				found.text(num);

			}
		}

		if (rNeedsAppend && resources.children().length > 0) {
			resources.prependTo(stores);
			resources.animate({ opacity: 1 }, 300);
		}

		if (sNeedsAppend && special.children().length > 0) {
			special.appendTo(stores);
			special.animate({ opacity: 1 }, 300);
		}

		if (needsAppend && stores.find('.storeRow').found > 0) {
			stores.appendTo(adr.$('#storesContainer'));
			stores.animate({ opacity: 1 }, 300);
		}

		if (wNeedsAppend && weapons.children().length > 0) {
			weapons.appendTo(adr.$('#storesContainer'));
			weapons.animate({ opacity: 1 }, 300);
		}

		if (newRow) {
			Room.updateIncomeView();
		}

		if (adr.$("#outsidePanel").found) {
			Outside.updateVillage();
		}

		if (StateManager.get('stores.compass') && !Room.pathDiscovery) {
			Room.pathDiscovery = true;
			Path.openPath();
		}
	};

	static updateIncomeView() {
		const stores = adr.$('#resources');
		const totalIncome: TotalIncome = {};
		if (stores.found === 0 || typeof StateManager.get('income') === 'undefined') return;
		stores.children().forEach(function (el, index) {
			adr.$('.tooltip', el).remove();
			const ttPos = index > 10 ? 'top right' : 'bottom right';
			const tt = adr.$('<div>').addClass('tooltip ' + ttPos);
			const storeName = el.attr('id').substring(4).replace('-', ' ');
			for (const incomeSource in StateManager.get('income')) {
				const income = StateManager.get('income.' + incomeSource + '');
				for (const store in income.stores) {
					if (store === storeName && income.stores[store] !== 0) {
						adr.$('<div>').addClass('row_key').text(_(incomeSource)).appendTo(tt);
						adr.$('<div>')
							.addClass('row_val')
							.text(Engine.getIncomeMsg(income.stores[store], income.delay))
							.appendTo(tt);
						if (!totalIncome[store] || totalIncome[store].income === undefined) {
							totalIncome[store] = { income: 0 };
						}
						totalIncome[store].income! += Number(income.stores[store]);
						totalIncome[store].delay = income.delay;
					}
				}
			}
			if (tt.children().length > 0) {
				const total = totalIncome[storeName].income;
				if (total === undefined) {
					throw new Error("total is undefined");
				}
				adr.$('<div>').addClass('total row_key').text(_('total')).appendTo(tt);
				const delay = totalIncome[storeName].delay;
				if (delay === undefined) {
					throw new Error("delay is undefined");
				}
				adr.$('<div>').addClass('total row_val').text(Engine.getIncomeMsg(total, delay.toString())).appendTo(tt);
				tt.appendTo(el);
			}
		});
	};

	static buy(buyBtn: Query) {
		const thing = buyBtn.attr('buildThing');
		const good = Room.TradeGoods[thing];
		let numThings = StateManager.get('stores.' + thing + '', true);
		if (numThings < 0) numThings = 0;
		if (good.maximum && good.maximum <= numThings) {
			return;
		}

		const storeMod: Mod = {};
		const cost = good.cost();
		for (const k in cost) {
			const have = StateManager.get('stores.' + k + '', true);
			if (have < cost[k]) {
				Notifications.notify(Room, _("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		StateManager.setM('stores', storeMod);

		Notifications.notify(Room, good.buildMsg);

		StateManager.add('stores.' + thing + '', 1);

		// audio
		AudioEngine.playSound(AudioLibrary.BUY);
	};

	static build(buildBtn: Query) {
		const thing = buildBtn.attr('buildThing');
		if (StateManager.get('game.temperature.value') <= Room.TempEnum.Cold.value) {
			Notifications.notify(Room, _("builder just shivers"));
			return false;
		}
		const craftable = Room.Craftables[thing];

		let numThings = 0;
		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'tool':
			case 'upgrade':
				numThings = StateManager.get('stores.' + thing + '', true);
				break;
			case 'building':
				numThings = StateManager.get('game.buildings.' + thing + '', true);
				break;
		}

		if (numThings < 0) numThings = 0;
		if (craftable.maximum <= numThings) {
			return;
		}

		const storeMod: Mod = {};
		const cost = craftable.cost();
		for (const k in cost) {
			const have = StateManager.get('stores.' + k + '', true);
			if (have < cost[k]) {
				Notifications.notify(Room, _("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		StateManager.setM('stores', storeMod);

		Notifications.notify(Room, craftable.buildMsg);

		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'upgrade':
			case 'tool':
				StateManager.add('stores.' + thing + '', 1);
				break;
			case 'building':
				StateManager.add('game.buildings.' + thing + '', 1);
				break;
		}

		// audio
		switch (craftable.type) {
			case 'weapon':
			case 'upgrade':
			case 'tool':
				AudioEngine.playSound(AudioLibrary.CRAFT);
				break;
			case 'building':
				AudioEngine.playSound(AudioLibrary.BUILD);
				break;
		}
	};

	static needsWorkshop(type: string) {
		return type === 'weapon' || type === 'upgrade' || type === 'tool';
	};

	static craftUnlocked(thing: string) {
		if (Room.buttons[thing]) {
			return true;
		}
		if (StateManager.get('game.builder.level') < 4) return false;
		const craftable = Room.Craftables[thing];
		if (Room.needsWorkshop(craftable.type) && StateManager.get('game.buildings.workshop', true) === 0) return false;
		const cost = craftable.cost();

		//show button if one has already been built
		if (StateManager.get('game.buildings.' + thing + '') > 0) {
			Room.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the wood, and all other components have been seen.
		if (StateManager.get('stores.wood', true) < cost['wood'] * 0.5) {
			return false;
		}
		for (const c in cost) {
			if (!StateManager.get('stores.' + c + '')) {
				return false;
			}
		}

		Room.buttons[thing] = true;
		//don't notify if it has already been built before
		if (!StateManager.get('game.buildings.' + thing + '')) {
			Notifications.notify(Room, craftable.availableMsg);
		}
		return true;
	};

	static buyUnlocked(thing: string) {
		if (Room.buttons[thing]) {
			return true;
		} else if (StateManager.get('game.buildings.trading post', true) > 0) {
			if (thing === 'compass' || typeof StateManager.get('stores.' + thing + '') !== 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	};

	static updateBuildButtons() {
		let buildSection = adr.$('#buildBtns');
		let needsAppend = false;
		if (buildSection.found === 0) {
			buildSection = adr.$('<div>').attr({ 'id': 'buildBtns', 'data-legend': _('build:') }).css('opacity', 0);
			needsAppend = true;
		}

		let craftSection = adr.$('#craftBtns');
		let cNeedsAppend = false;
		if (craftSection.found === 0 && StateManager.get('game.buildings.workshop', true) > 0) {
			craftSection = adr.$('<div>').attr({ 'id': 'craftBtns', 'data-legend': _('craft:') }).css('opacity', 0);
			cNeedsAppend = true;
		}

		let buySection = adr.$('#buyBtns');
		let bNeedsAppend = false;
		if (buySection.found === 0 && StateManager.get('game.buildings.trading post', true) > 0) {
			buySection = adr.$('<div>').attr({ 'id': 'buyBtns', 'data-legend': _('buy:') }).css('opacity', 0);
			bNeedsAppend = true;
		}

		for (const k in Room.Craftables) {
			const craftable = adr.craftable = Room.Craftables[k];
			const max = StateManager.num(k, craftable) + 1 > craftable.maximum;
			if (!craftable.button) {
				if (Room.craftUnlocked(k)) {
					const loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
					craftable.button = Button.create({
						id: 'build_' + k.replace(/ /g, '-'),
						cost: craftable.cost(),
						text: _(k),
						click: Room.build,
						width: '80px',
						ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({ opacity: 1 }, 300);
				}
			} else {
				// refresh the tooltip
				const costTooltip = adr.$('.tooltip', craftable.button);
				costTooltip.empty();
				const cost = craftable.cost();
				for (const c in cost) {
					adr.$("<div>").addClass('row_key').text(_(c)).appendTo(costTooltip);
					adr.$("<div>").addClass('row_val').text(cost[c]).appendTo(costTooltip);
				}
				if (max && !craftable.button.hasClass('disabled')) {
					Notifications.notify(Room, craftable.maxMsg);
				}
			}
			if (max) {
				Button.setDisabled(craftable.button, true);
			} else {
				Button.setDisabled(craftable.button, false);
			}
		}

		for (const g in Room.TradeGoods) {
			const good = adr.good = Room.TradeGoods[g];
			const goodsMax = StateManager.num(g, good) + 1 > (good.maximum === undefined ? Infinity : good.maximum);
			if (!good.button) {
				if (Room.buyUnlocked(g)) {
					good.button = Button.create({
						id: 'build_' + g,
						cost: good.cost(),
						text: _(g),
						click: Room.buy,
						width: '80px',
						ttPos: buySection.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', g).appendTo(buySection).animate({ opacity: 1 }, 300);
				}
			} else {
				// refresh the tooltip
				const goodsCostTooltip = adr.$('.tooltip', good.button);
				goodsCostTooltip.empty();
				const goodCost = good.cost();
				for (const gc in goodCost) {
					adr.$("<div>").addClass('row_key').text(_(gc)).appendTo(goodsCostTooltip);
					adr.$("<div>").addClass('row_val').text(goodCost[gc]).appendTo(goodsCostTooltip);
				}
				if (goodsMax && !good.button.hasClass('disabled')) {
					Notifications.notify(Room, good.maxMsg);
				}
			}
			if (goodsMax) {
				Button.setDisabled(good.button, true);
			} else {
				Button.setDisabled(good.button, false);
			}
		}

		if (needsAppend && buildSection.children().length > 0) {
			buildSection.appendTo(adr.$('#roomPanel')).animate({ opacity: 1 }, 300);
		}
		if (cNeedsAppend && craftSection.children().length > 0) {
			craftSection.appendTo(adr.$('#roomPanel')).animate({ opacity: 1 }, 300);
		}
		if (bNeedsAppend && buildSection.children().length > 0) {
			buySection.appendTo(adr.$('#roomPanel')).animate({ opacity: 1 }, 300);
		}
	};

	static compassTooltip(direction: string) {
		const ttPos = adr.$('#resources').children().length > 10 ? 'top right' : 'bottom right';
		const tt = adr.$('<div>').addClass('tooltip ' + ttPos);
		adr.$('<div>').addClass('row_key').text(_('the compass points ' + direction)).appendTo(tt);
		tt.appendTo(adr.$('#row_compass'));
	};

	static handleStateUpdates(e: StateUpdateEvent) {
		if (e.category === 'stores') {
			Room.updateStoresView();
			Room.updateBuildButtons();
		} else if (e.category === 'income') {
			Room.updateStoresView();
			Room.updateIncomeView();
		} else if (e.stateName.indexOf('game.buildings') === 0) {
			Room.updateBuildButtons();
		}
	};

	static setMusic() {
		// set music based on fire level
		const fireValue = StateManager.get('game.fire.value');
		switch (fireValue) {
			case 0:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_DEAD);
				break;
			case 1:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_SMOLDERING);
				break;
			case 2:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_FLICKERING);
				break;
			case 3:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_BURNING);
				break;
			case 4:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_ROARING);
				break;
		}
	}
};
