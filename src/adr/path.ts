import Query from "./query.js";
import _ from "./translate.js";
import Button from "./Button.js";
import adr from "./adr.js";
import AudioEngine from "./audio.js";
import { AudioLibrary } from "./audioLibrary.js";
import Engine from "./engine.js";
import Events from "./events.js";
import Fabricator from "./fabricator.js";
import { Header } from "./header.js";
import Notifications from "./notifications.js";
import Room from "./room.js";
import StateManager from "./state_manager.js";
import World from "./world.js";

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
		this.panel = adr.$('<div>').attr('id', "pathPanel")
			.addClass('location')
			.appendTo(adr.$('#locationSlider'));

		this.scroller = adr.$('<div>').attr('id', 'pathScroller').appendTo(this.panel);

		// Add the outfitting area
		const outfitting = adr.$('<div>').attr({ 'id': 'outfitting', 'data-legend': _('supplies:') }).appendTo(this.scroller);
		adr.$('<div>').attr('id', 'bagspace').appendTo(outfitting);

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
			let perks = adr.$('#perks');
			let needsAppend = false;
			if (perks.found === 0) {
				needsAppend = true;
				perks = adr.$('<div>').attr({ 'id': 'perks', 'data-legend': _('perks') });
			}
			for (const k in StateManager.get('character.perks')) {
				const id = 'perk_' + k.replace(' ', '-');
				let r = adr.$('#' + id);
				if (StateManager.get('character.perks.' + k + '') && r.found === 0) {
					r = adr.$('<div>').attr('id', id).addClass('perkRow').appendTo(perks);
					adr.$('<div>').addClass('row_key').text(_(k)).appendTo(r);
					adr.$('<div>').addClass('tooltip bottom right').text(Engine.Perks[k].desc).appendTo(r);
				}
			}

			if (needsAppend && perks.children().length > 0) {
				perks.prependTo(Path.panel);
			}

			if (!ignoreStores && Engine.activeModule === Path) {
				adr.$('#storesContainer').css({ top: perks.height() + 26 + Path._STORES_OFFSET + 'px' });
			}
		}
	};

	static updateOutfitting() {
		const outfit = adr.$('#outfitting');

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
		let aRow = adr.$('#armourRow');
		if (aRow.found === 0) {
			aRow = adr.$('<div>').attr('id', 'armourRow').addClass('outfitRow').prependTo(outfit);
			adr.$('<div>').addClass('row_key').text(_('armour')).appendTo(aRow);
			adr.$('<div>').addClass('row_val').text(armour).appendTo(aRow);
			adr.$('<div>').addClass('clear').appendTo(aRow);
		} else {
			adr.$('.row_val', aRow).text(armour);
		}

		// Add the water row
		let wRow = adr.$('#waterRow');
		if (wRow.found === 0) {
			wRow = adr.$('<div>').attr('id', 'waterRow').addClass('outfitRow').insertAfter(aRow);
			adr.$('<div>').addClass('row_key').text(_('water')).appendTo(wRow);
			adr.$('<div>').addClass('row_val').text(World.getMaxWater()).appendTo(wRow);
			adr.$('<div>').addClass('clear').appendTo(wRow);
		} else {
			adr.$('.row_val', wRow).text(World.getMaxWater());
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

			let row = adr.$('#outfit_row_' + k.replace(' ', '-'), outfit);
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
					adr.$('.dnBtn', row).addClass('disabled');
					adr.$('.dnManyBtn', row).addClass('disabled');
				} else {
					adr.$('.dnBtn', row).removeClass('disabled');
					adr.$('.dnManyBtn', row).removeClass('disabled');
				}
				if (num === have || space < Path.getWeight(k)) {
					adr.$('.upBtn', row).addClass('disabled');
					adr.$('.upManyBtn', row).addClass('disabled');
				} else {
					adr.$('.upBtn', row).removeClass('disabled');
					adr.$('.upManyBtn', row).removeClass('disabled');
				}
			} else if (have === 0 && row.found > 0) {
				row.remove();
			}
		}

		Path.updateBagSpace(currentBagCapacity);

	};

	static updateBagSpace(currentBagCapacity: number) {
		// Update bagspace
		adr.$('#bagspace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - currentBagCapacity).toString(), Path.getCapacity().toString()));
		const curedMeat = Path.outfit['cured meat'];

		if (curedMeat > 0) {
			Button.setDisabled(adr.$('#embarkButton'), false);
		} else {
			Button.setDisabled(adr.$('#embarkButton'), true);
		}

	};

	static createOutfittingRow(key: string, num: number, store: Store) {
		if (!store.name) store.name = _(key);
		const row = adr.$('<div>').attr('id', 'outfit_row_' + key.replace(' ', '-')).addClass('outfitRow').attr('key', key);
		adr.$('<div>').addClass('row_key').text(store.name).appendTo(row);
		const val = adr.$('<div>').addClass('row_val').appendTo(row);

		adr.$('<span>').text(num).appendTo(val);
		adr.$('<div>').addClass('upBtn').appendTo(val).click(function () { Path.increaseSupply(row, 1); });
		adr.$('<div>').addClass('dnBtn').appendTo(val).click(function () { Path.decreaseSupply(row, 1); });
		adr.$('<div>').addClass('upManyBtn').appendTo(val).click(function () { Path.increaseSupply(row, 10); });
		adr.$('<div>').addClass('dnManyBtn').appendTo(val).click(function () { Path.decreaseSupply(row, 10); });
		adr.$('<div>').addClass('clear').appendTo(row);

		const numAvailable = StateManager.get('stores.' + key + '', true);
		const tt = adr.$('<div>').addClass('tooltip bottom right').appendTo(row);

		if (store.type === 'weapon') {
			adr.$('<div>').addClass('row_key').text(_('damage')).appendTo(tt);
			adr.$('<div>').addClass('row_val').text(World.getDamage(key).toString()).appendTo(tt);
		} else if (store.type === 'tool' && store.desc !== "undefined") {
			adr.$('<div>').addClass('row_key').text(store.desc).appendTo(tt);
		}

		adr.$('<div>').addClass('row_key').text(_('weight')).appendTo(tt);
		adr.$('<div>').addClass('row_val').text(Path.getWeight(key)).appendTo(tt);
		adr.$('<div>').addClass('row_key').text(_('available')).appendTo(tt);
		adr.$('<div>').addClass('row_val').addClass('numAvailable').text(numAvailable).appendTo(tt);

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

		Engine.moveStoresView(adr.$('#perks'), transition_diff);
	};

	static setTitle() {
		adr.title(_('A Dusty Path'));
	};

	static embark() {
		for (const k in Path.outfit) {
			StateManager.add('stores.' + k + '', -Path.outfit[k]);
		}
		World.onArrival();
		adr.$('#outerSlider').animate({ left: '-700px' }, 300);
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
