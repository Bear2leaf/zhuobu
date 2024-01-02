import Query  from "./query";
import _ from "./translate";
import Button from "./Button";

import AudioEngine from "./audio";
import { AudioLibrary } from "./audioLibrary";
import Engine from "./engine";
import Events from "./events";
import Fabricator from "./fabricator";
import { Header } from "./header";
import Notifications from "./notifications";
import Room from "./room";
import StateManager from "./state_manager";
import World from "./world";
import { Outfit, PathOptions, Store, StateUpdateEvent } from "./types";

export default class Path {
	static outfit: Outfit;
	static tab: Query;
	static readonly DEFAULT_BAG_SPACE = 10;
	static readonly _STORES_OFFSET = 0;
	// Everything not in this list weighs 1
	static readonly Weight: Record<string, number> = {
		'bone spear': 2,
		'iron sword': 3,
		'steel sword': 5,
		'rifle': 5,
		'bullets': 0.1,
		'energy cell': 0.2,
		'laser rifle': 5,
		'plasma rifle': 5,
		'bolas': 0.5,
	};

	static options: PathOptions = {}; // Nuthin'
	static panel: Query;
	static scroller: Query;

	static init(options?: PathOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		// Init the World
		World.init();

		// Create the path tab
		this.tab = Header.addLocation(_("A Dusty Path"), "path", Path);

		// Create the Path panel
		this.panel = Query.$('<div>').attr('id', "pathPanel")
			.addClass('location')
			.appendTo(Query.$('#locationSlider'));

		this.scroller = Query.$('<div>').attr('id', 'pathScroller').appendTo(this.panel);

		// Add the outfitting area
		const outfitting = Query.$('<div>').attr({ 'id': 'outfitting', 'data-legend': _('supplies:') }).appendTo(this.scroller);
		Query.$('<div>').attr('id', 'bagspace').appendTo(outfitting);

		// Add the embark button
		Button.create({
			id: 'embarkButton',
			text: _("embark"),
			click: Path.embark,
			width: '80px',
			cooldown: World.DEATH_COOLDOWN
		}).appendTo(this.scroller);

		Path.outfit = StateManager.get('outfit');

		Engine.updateSlider();

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Path.handleStateUpdates);
	};

	static openPath() {
		Path.init();
		Engine.event('progress', 'path');
		Notifications.notify(Room, _('the compass points ' + World.dir));
	};

	static getWeight(thing: string) {
		let w = Path.Weight[thing];
		if (typeof w !== 'number') w = 1;

		return w;
	};

	static getCapacity() {
		if (StateManager.get('stores.cargo drone', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 100;
		} else if (StateManager.get('stores.convoy', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 60;
		} else if (StateManager.get('stores.wagon', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 30;
		} else if (StateManager.get('stores.rucksack', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 10;
		}
		return Path.DEFAULT_BAG_SPACE;
	};

	static getFreeSpace() {
		let num = 0;
		if (Path.outfit) {
			for (const k in Path.outfit) {
				let n = Path.outfit[k];
				if (isNaN(n)) {
					// No idea how this happens, but I will fix it here!
					Path.outfit[k] = n = 0;
				}
				num += n * Path.getWeight(k);
			}
		}
		return Path.getCapacity() - num;
	};

	static updatePerks(ignoreStores: boolean = false) {
		if (StateManager.get('character.perks')) {
			let perks = Query.$('#perks');
			let needsAppend = false;
			if (perks.found === 0) {
				needsAppend = true;
				perks = Query.$('<div>').attr({ 'id': 'perks', 'data-legend': _('perks') });
			}
			for (const k in StateManager.get('character.perks')) {
				const id = 'perk_' + k.replace(' ', '-');
				let r = Query.$('#' + id);
				if (StateManager.get('character.perks.' + k + '') && r.found === 0) {
					r = Query.$('<div>').attr('id', id).addClass('perkRow').appendTo(perks);
					Query.$('<div>').addClass('row_key').text(_(k)).appendTo(r);
					Query.$('<div>').addClass('tooltip bottom right').text(Engine.Perks[k].desc).appendTo(r);
				}
			}

			if (needsAppend && perks.children().length > 0) {
				perks.prependTo(Path.panel);
			}

			if (!ignoreStores && Engine.activeModule === Path) {
				Query.$('#storesContainer').css({ top: perks.height() + 26 + Path._STORES_OFFSET + 'px' });
			}
		}
	};

	static updateOutfitting() {
		const outfit = Query.$('#outfitting');

		if (!Path.outfit) {
			Path.outfit = {};
		}

		// Add the armour row
		let armour = _("none");
		if (StateManager.get('stores.kinetic armour', true) > 0)
			armour = _("kinetic");
		else if (StateManager.get('stores.s armour', true) > 0)
			armour = _("steel");
		else if (StateManager.get('stores.i armour', true) > 0)
			armour = _("iron");
		else if (StateManager.get('stores.l armour', true) > 0)
			armour = _("leather");
		let aRow = Query.$('#armourRow');
		if (aRow.found === 0) {
			aRow = Query.$('<div>').attr('id', 'armourRow').addClass('outfitRow').prependTo(outfit);
			Query.$('<div>').addClass('row_key').text(_('armour')).appendTo(aRow);
			Query.$('<div>').addClass('row_val').text(armour).appendTo(aRow);
			Query.$('<div>').addClass('clear').appendTo(aRow);
		} else {
			Query.$('.row_val', aRow).text(armour);
		}

		// Add the water row
		let wRow = Query.$('#waterRow');
		if (wRow.found === 0) {
			wRow = Query.$('<div>').attr('id', 'waterRow').addClass('outfitRow').insertAfter(aRow);
			Query.$('<div>').addClass('row_key').text(_('water')).appendTo(wRow);
			Query.$('<div>').addClass('row_val').text(World.getMaxWater()).appendTo(wRow);
			Query.$('<div>').addClass('clear').appendTo(wRow);
		} else {
			Query.$('.row_val', wRow).text(World.getMaxWater());
		}

		const space = Path.getFreeSpace();
		// Add the non-craftables to the craftables
		const carryable = Object.assign({
			'cured meat': { type: 'tool', desc: _('restores') + ' ' + World.MEAT_HEAL + ' ' + _('hp') },
			'bullets': { type: 'tool', desc: _('use with rifle') },
			'grenade': { type: 'weapon' },
			'bolas': { type: 'weapon' },
			'laser rifle': { type: 'weapon' },
			'energy cell': { type: 'tool', desc: _('emits a soft red glow') },
			'bayonet': { type: 'weapon' },
			'charm': { type: 'tool' },
			'alien alloy': { type: 'tool' },
			'medicine': { type: 'tool', desc: _('restores') + ' ' + World.MEDS_HEAL + ' ' + _('hp') }
		}, Room.Craftables, Fabricator.Craftables);

		let currentBagCapacity = 0;
		for (const k in carryable) {
			const lk = _(k);
			const store = carryable[k];
			const have = StateManager.get('stores.' + k + '');
			let num = Path.outfit[k];
			num = typeof num === 'number' ? num : 0;
			if (have !== undefined) {
				if (have < num) { num = have; }
				StateManager.set(k, num, true);
			}

			let row = Query.$('#outfit_row_' + k.replace(' ', '-'), outfit);
			if ((store.type === 'tool' || store.type === 'weapon') && have > 0) {
				currentBagCapacity += num * Path.getWeight(k);
				if (row.found === 0) {
					row = Path.createOutfittingRow(k, num, store/* , store.name */);

					let curPrev = null;
					outfit.children().forEach(function (child) {
						if (child.attr('id').indexOf('outfit_row_') === 0) {
							const cName = child.find('.row_key').text();
							if (cName < lk) {
								curPrev = child.attr('id');
							}
						}
					});
					if (!curPrev) {
						row.insertAfter(wRow);
					} else {
						row.insertAfter(outfit.find('#' + curPrev));
					}
				} else {
					const found = outfit.find('#' + row.attr('id')).children().find(v => v.hasClass('row_val'))?.children().find(v => v.tagName === 'SPAN');
					if (!found) {
						throw new Error("Could not find span");
					}
					found.text(num);
					outfit.find('#' + row.attr('id')).find('.tooltip').find('.numAvailable').text(num);
				}
				if (num === 0) {
					Query.$('.dnBtn', row).addClass('disabled');
					Query.$('.dnManyBtn', row).addClass('disabled');
				} else {
					Query.$('.dnBtn', row).removeClass('disabled');
					Query.$('.dnManyBtn', row).removeClass('disabled');
				}
				if (num === have || space < Path.getWeight(k)) {
					Query.$('.upBtn', row).addClass('disabled');
					Query.$('.upManyBtn', row).addClass('disabled');
				} else {
					Query.$('.upBtn', row).removeClass('disabled');
					Query.$('.upManyBtn', row).removeClass('disabled');
				}
			} else if (have === 0 && row.found > 0) {
				row.remove();
			}
		}

		Path.updateBagSpace(currentBagCapacity);

	};

	static updateBagSpace(currentBagCapacity: number) {
		// Update bagspace
		Query.$('#bagspace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - currentBagCapacity).toString(), Path.getCapacity().toString()));
		const curedMeat = Path.outfit['cured meat'];

		if (curedMeat > 0) {
			Button.setDisabled(Query.$('#embarkButton'), false);
		} else {
			Button.setDisabled(Query.$('#embarkButton'), true);
		}

	};

	static createOutfittingRow(key: string, num: number, store: Store) {
		if (!store.name) store.name = _(key);
		const row = Query.$('<div>').attr('id', 'outfit_row_' + key.replace(' ', '-')).addClass('outfitRow').attr('key', key);
		Query.$('<div>').addClass('row_key').text(store.name).appendTo(row);
		const val = Query.$('<div>').addClass('row_val').appendTo(row);

		Query.$('<span>').text(num).appendTo(val);
		Query.$('<div>').addClass('upBtn').appendTo(val).click(function () { Path.increaseSupply(row, 1); });
		Query.$('<div>').addClass('dnBtn').appendTo(val).click(function () { Path.decreaseSupply(row, 1); });
		Query.$('<div>').addClass('upManyBtn').appendTo(val).click(function () { Path.increaseSupply(row, 10); });
		Query.$('<div>').addClass('dnManyBtn').appendTo(val).click(function () { Path.decreaseSupply(row, 10); });
		Query.$('<div>').addClass('clear').appendTo(row);

		const numAvailable = StateManager.get('stores.' + key + '', true);
		const tt = Query.$('<div>').addClass('tooltip bottom right').appendTo(row);

		if (store.type === 'weapon') {
			Query.$('<div>').addClass('row_key').text(_('damage')).appendTo(tt);
			Query.$('<div>').addClass('row_val').text(World.getDamage(key).toString()).appendTo(tt);
		} else if (store.type === 'tool' && store.desc !== "undefined") {
			Query.$('<div>').addClass('row_key').text(store.desc).appendTo(tt);
		}

		Query.$('<div>').addClass('row_key').text(_('weight')).appendTo(tt);
		Query.$('<div>').addClass('row_val').text(Path.getWeight(key)).appendTo(tt);
		Query.$('<div>').addClass('row_key').text(_('available')).appendTo(tt);
		Query.$('<div>').addClass('row_val').addClass('numAvailable').text(numAvailable).appendTo(tt);

		return row;
	};

	static increaseSupply(row: Query, num: number) {
		const supply: string = row.attr('key');
		Engine.log('increasing ' + supply + ' by up to ' + num);
		let cur = Path.outfit[supply];
		cur = typeof cur === 'number' ? cur : 0;
		if (Path.getFreeSpace() >= Path.getWeight(supply) && cur < StateManager.get('stores.' + supply + '', true)) {
			const maxExtraByWeight = Math.floor(Path.getFreeSpace() / Path.getWeight(supply));
			const maxExtraByStore = StateManager.get('stores.' + supply + '', true) - cur;
			Path.outfit[supply] = cur + Math.min(num, maxExtraByWeight, maxExtraByStore);
			StateManager.set('outfit.' + supply, Path.outfit[supply]);
			Path.updateOutfitting();
		}
	};

	static decreaseSupply(row: Query, num: number) {
		const supply = row.attr('key');
		Engine.log('decreasing ' + supply + ' by up to ' + num);
		let cur = Path.outfit[supply];
		cur = typeof cur === 'number' ? cur : 0;
		if (cur > 0) {
			Path.outfit[supply] = Math.max(0, cur - num);
			StateManager.set('outfit.' + supply, Path.outfit[supply]);
			Path.updateOutfitting();
		}
	};

	static onArrival(transition_diff?: number) {
		Path.setTitle();
		Path.updateOutfitting();
		Path.updatePerks(true);

		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_DUSTY_PATH);

		Engine.moveStoresView(Query.$('#perks'), transition_diff);
	};

	static setTitle() {
		Query.title(_('A Dusty Path'));
	};

	static embark() {
		for (const k in Path.outfit) {
			StateManager.add('stores.' + k + '', -Path.outfit[k]);
		}
		World.onArrival();
		Query.$('#outerSlider').animate({ left: '-700px' }, 300);
		Engine.activeModule = World;
		AudioEngine.playSound(AudioLibrary.EMBARK);
	};

	static handleStateUpdates(e: StateUpdateEvent) {
		if (e.category === 'character' && e.stateName.indexOf('character.perks') === 0 && Engine.activeModule === Path) {
			Path.updatePerks();
		} else if (e.category === 'income' && Engine.activeModule === Path) {
			Path.updateOutfitting();
		}
	}
};
