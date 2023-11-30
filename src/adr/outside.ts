import Query from "./query.js";
import _ from "./translate.js";
import Button from "./Button.js";
import { adr } from "./adr.js";
import AudioEngine from "./audio.js";
import { AudioLibrary } from "./audioLibrary.js";
import Engine from "./engine.js";
import Events from "./events.js";
import { Header } from "./header.js";
import Notifications from "./notifications.js";
import Room from "./room.js";
import StateManager from "./state_manager.js";

/**
 * Module that registers the outdoors functionality
 */
export default class Outside {
	static tab: Query;
	static panel: Query;
	static _popTimeout?: number;
	static readonly _STORES_OFFSET = 0;
	static _GATHER_DELAY = 60;
	static _TRAPS_DELAY = 90;
	static readonly _POP_DELAY = [0.5, 3];
	static readonly _HUT_ROOM = 4;
	static readonly _INCOME: Record<string, Incom> = {
		'gatherer': {
			name: _('gatherer'),
			delay: 10,
			stores: {
				'wood': 1
			}
		},
		'hunter': {
			name: _('hunter'),
			delay: 10,
			stores: {
				'fur': 0.5,
				'meat': 0.5
			}
		},
		'trapper': {
			name: _('trapper'),
			delay: 10,
			stores: {
				'meat': -1,
				'bait': 1
			}
		},
		'tanner': {
			name: _('tanner'),
			delay: 10,
			stores: {
				'fur': -5,
				'leather': 1
			}
		},
		'charcutier': {
			name: _('charcutier'),
			delay: 10,
			stores: {
				'meat': -5,
				'wood': -5,
				'cured meat': 1
			}
		},
		'iron miner': {
			name: _('iron miner'),
			delay: 10,
			stores: {
				'cured meat': -1,
				'iron': 1
			}
		},
		'coal miner': {
			name: _('coal miner'),
			delay: 10,
			stores: {
				'cured meat': -1,
				'coal': 1
			}
		},
		'sulphur miner': {
			name: _('sulphur miner'),
			delay: 10,
			stores: {
				'cured meat': -1,
				'sulphur': 1
			}
		},
		'steelworker': {
			name: _('steelworker'),
			delay: 10,
			stores: {
				'iron': -1,
				'coal': -1,
				'steel': 1
			}
		},
		'armourer': {
			name: _('armourer'),
			delay: 10,
			stores: {
				'steel': -1,
				'sulphur': -1,
				'bullets': 1
			}
		}
	};
	static readonly TrapDrops: TrapDrop[] = [
		{
			rollUnder: 0.5,
			name: 'fur',
			message: _('scraps of fur')
		},
		{
			rollUnder: 0.75,
			name: 'meat',
			message: _('bits of meat')
		},
		{
			rollUnder: 0.85,
			name: 'scales',
			message: _('strange scales')
		},
		{
			rollUnder: 0.93,
			name: 'teeth',
			message: _('scattered teeth')
		},
		{
			rollUnder: 0.995,
			name: 'cloth',
			message: _('tattered cloth')
		},
		{
			rollUnder: 1.0,
			name: 'charm',
			message: _('a crudely made charm')
		}
	];
	static options: OutsideOptions = {};
	static init(options?: OutsideOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		if (Engine._debug) {
			this._GATHER_DELAY = 0;
			this._TRAPS_DELAY = 0;
		}

		// Create the outside tab
		this.tab = Header.addLocation(_("A Silent Forest"), "outside", Outside);

		// Create the Outside panel
		this.panel = adr.$('<div>').attr('id', "outsidePanel")
			.addClass('location')
			.appendTo(adr.$('#locationSlider'));

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Outside.handleStateUpdates);

		if (typeof StateManager.get('features.location.outside') === 'undefined') {
			StateManager.set('features.location.outside', true);
			if (!StateManager.get('game.buildings')) StateManager.set('game.buildings', {});
			if (!StateManager.get('game.population')) StateManager.set('game.population', 0);
			if (!StateManager.get('game.workers')) StateManager.set('game.workers', {});
		}

		this.updateVillage();
		Outside.updateWorkersView();
		Outside.updateVillageIncome();

		Engine.updateSlider();

		// Create the gather button
		Button.create({
			id: 'gatherButton',
			text: _("gather wood"),
			click: Outside.gatherWood,
			cooldown: Outside._GATHER_DELAY,
			width: '80px'
		}).appendTo(adr.$('#outsidePanel'));

		Outside.updateTrapButton();
	};

	static getMaxPopulation() {
		return StateManager.get('game.buildings.hut', true) * Outside._HUT_ROOM;
	};

	static increasePopulation() {
		const space = Outside.getMaxPopulation() - StateManager.get('game.population');
		if (space > 0) {
			let num = Math.floor(Math.random() * (space / 2) + space / 2);
			if (num === 0) num = 1;
			if (num === 1) {
				Notifications.notify(null, _('a stranger arrives in the night'));
			} else if (num < 5) {
				Notifications.notify(null, _('a weathered family takes up in one of the huts.'));
			} else if (num < 10) {
				Notifications.notify(null, _('a small group arrives, all dust and bones.'));
			} else if (num < 30) {
				Notifications.notify(null, _('a convoy lurches in, equal parts worry and hope.'));
			} else {
				Notifications.notify(null, _("the town's booming. word does get around."));
			}
			Engine.log('population increased by ' + num);
			StateManager.add('game.population', num);
		}
		Outside.schedulePopIncrease();
	};

	static killVillagers(num: number) {
		StateManager.add('game.population', num * -1);
		if (StateManager.get('game.population') < 0) {
			StateManager.set('game.population', 0);
		}
		const remaining = Outside.getNumGatherers();
		if (remaining < 0) {
			let gap = -remaining;
			for (const k in StateManager.get('game.workers')) {
				const numWorkers = StateManager.get('game.workers.' + k + '');
				if (numWorkers < gap) {
					gap -= numWorkers;
					StateManager.set('game.workers.' + k + '', 0);
				} else {
					StateManager.add('game.workers.' + k + '', gap * -1);
					break;
				}
			}
		}
	};

	static destroyHuts(num: number, allowEmpty?: boolean) {
		let dead = 0;
		for (let i = 0; i < num; i++) {
			const population = StateManager.get('game.population', true);
			const rate = population / Outside._HUT_ROOM;
			const full = Math.floor(rate);
			// by default this is used to destroy full or half-full huts
			// pass allowEmpty to include empty huts in the armageddon
			const huts = (allowEmpty) ? StateManager.get('game.buildings.hut', true) : Math.ceil(rate);
			if (!huts) {
				break;
			}
			// random can be 0 but not 1; however, 0 as a target is useless
			const target = Math.floor(Math.random() * huts) + 1;
			let inhabitants = 0;
			if (target <= full) {
				inhabitants = Outside._HUT_ROOM;
			} else if (target === full + 1) {
				inhabitants = population % Outside._HUT_ROOM;
			}
			StateManager.set('game.buildings.hut', (StateManager.get('game.buildings.hut') - 1));
			if (inhabitants) {
				Outside.killVillagers(inhabitants);
				dead += inhabitants;
			}
		}
		// this method returns the total number of victims, for further actions
		return dead;
	};

	static schedulePopIncrease() {
		const nextIncrease = Math.floor(Math.random() * (Outside._POP_DELAY[1] - Outside._POP_DELAY[0])) + Outside._POP_DELAY[0];
		Engine.log('next population increase scheduled in ' + nextIncrease + ' minutes');
		Outside._popTimeout = Engine.setTimeout(Outside.increasePopulation, nextIncrease * 60 * 1000);
	};

	static updateWorkersView() {

		let needsAppend = false;
		let workers = adr.$('#workers');
		// If our population is 0 and we don't already have a workers view,
		// there's nothing to do here.
		if (!workers.found && StateManager.get('game.population') === 0) return;

		if (workers.found === 0) {
			needsAppend = true;
			workers = adr.$('<div>').attr('id', 'workers').css('opacity', 0);
		}

		let numGatherers = StateManager.get('game.population');
		let gatherer = adr.$('#workers_row_gatherer', workers);

		for (const k in StateManager.get('game.workers')) {
			const lk = _(k);
			const workerCount = StateManager.get('game.workers.' + k + '');
			let row = adr.$('#workers_row_' + k.replace(' ', '-'), workers);
			if (row.found === 0) {
				row = Outside.makeWorkerRow(k, workerCount);

				let curPrev = null;
				workers.children().forEach(function (child: Query) {
					const cName = child.find('.row_key').text();
					if (cName !== 'gatherer') {
						if (cName < lk) {
							curPrev = child.attr('id');
						}
					}
				});
				if (curPrev === null && gatherer.found === 0) {
					row.prependTo(workers);
				} else if (curPrev === null) {
					row.insertAfter(gatherer);
				} else {
					row.insertAfter(workers.find('#' + curPrev));
				}

			} else {
				const found = workers.find('#' + row.attr('id')).children().find(v => v.hasClass('row_val'));

				if (!found) {
					throw new Error("found is undefined");
				}
				found.find('span').text(workerCount);
			}
			numGatherers -= workerCount;
			if (workerCount === 0) {
				adr.$('.dnBtn', row).addClass('disabled');
				adr.$('.dnManyBtn', row).addClass('disabled');
			} else {
				adr.$('.dnBtn', row).removeClass('disabled');
				adr.$('.dnManyBtn', row).removeClass('disabled');
			}
		}

		if (gatherer.found === 0) {
			gatherer = Outside.makeWorkerRow('gatherer', numGatherers);
			gatherer.prependTo(workers);
		} else {
			const found = workers.find('#workers_row_gatherer').children().find(v => v.hasClass('row_val'));

			if (!found) {
				throw new Error("found is undefined");
			}
			found.find('span').text(numGatherers);
		}

		if (numGatherers === 0) {
			adr.$('.upBtn', workers).addClass('disabled');
			adr.$('.upManyBtn', workers).addClass('disabled');
		} else {
			adr.$('.upBtn', workers).removeClass('disabled');
			adr.$('.upManyBtn', workers).removeClass('disabled');
		}


		if (needsAppend && workers.children().length > 0) {
			workers.appendTo(adr.$('#outsidePanel')).animate({ opacity: 1 }, 300);
		}
	};

	static getNumGatherers() {
		let num = StateManager.get('game.population');
		for (const k in StateManager.get('game.workers')) {
			num -= StateManager.get('game.workers.' + k + '');
		}
		return num;
	};

	static makeWorkerRow(key: string, num: number) {
		let name = Outside._INCOME[key].name;
		if (!name) name = key;
		const row = adr.$('<div>')
			.attr('key', key)
			.attr('id', 'workers_row_' + key.replace(' ', '-'))
			.addClass('workerRow');
		adr.$('<div>').addClass('row_key').text(name).appendTo(row);
		const val = adr.$('<div>').addClass('row_val').appendTo(row);

		adr.$('<span>').text(num).appendTo(val);

		if (key !== 'gatherer') {
			adr.$('<div>').addClass('upBtn').appendTo(val).click(function () { Outside.increaseWorker(row, 1) });
			adr.$('<div>').addClass('dnBtn').appendTo(val).click(function () { Outside.decreaseWorker(row, 1) });
			adr.$('<div>').addClass('upManyBtn').appendTo(val).click(function () { Outside.increaseWorker(row, 1) });
			adr.$('<div>').addClass('dnManyBtn').appendTo(val).click(function () { Outside.decreaseWorker(row, 1) });
		}

		adr.$('<div>').addClass('clear').appendTo(row);

		const tooltip = adr.$('<div>').addClass('tooltip bottom right').appendTo(row);
		const income = Outside._INCOME[key];
		for (const s in income.stores) {
			const r = adr.$('<div>').addClass('storeRow');
			adr.$('<div>').addClass('row_key').text(_(s)).appendTo(r);
			if (income.delay === undefined) {
				throw new Error('income.delay is undefined');
			}
			adr.$('<div>').addClass('row_val').text(Engine.getIncomeMsg(income.stores[s], income.delay.toString())).appendTo(r);
			r.appendTo(tooltip);
		}

		return row;
	};

	static increaseWorker(row: Query, num: number) {
		const worker = row.attr('key');
		if (Outside.getNumGatherers() > 0) {
			const increaseAmt = Math.min(Outside.getNumGatherers(), num);
			Engine.log('increasing ' + worker + ' by ' + increaseAmt);
			StateManager.add('game.workers.' + worker + '', increaseAmt);
		}
	};

	static decreaseWorker(row: Query, num: number) {
		const worker = row.attr('key');
		if (StateManager.get('game.workers.' + worker + '') > 0) {
			const decreaseAmt = Math.min(StateManager.get('game.workers.' + worker + '') || 0, num);
			Engine.log('decreasing ' + worker + ' by ' + decreaseAmt);
			StateManager.add('game.workers.' + worker + '', decreaseAmt * -1);
		}
	};

	static updateVillageRow(name: string, num: number, village: Query) {
		const id = 'building_row_' + name.replace(' ', '-');
		const lname = _(name);
		let row = adr.$('#' + id, village);
		if (row.found === 0 && num > 0) {
			row = adr.$('<div>').attr('id', id).addClass('storeRow');
			adr.$('<div>').addClass('row_key').text(lname).appendTo(row);
			adr.$('<div>').addClass('row_val').text(num).appendTo(row);
			adr.$('<div>').addClass('clear').appendTo(row);
			let curPrev = null;
			village.children().forEach(function (child) {
				if (child.attr('id') !== 'population') {
					const cName = child.find('.row_key').text();
					if (cName < lname) {
						curPrev = child;
					}
				}
			});
			if (curPrev === null) {
				row.prependTo(village);
			} else {
				row.insertAfter(curPrev);
			}
		} else if (num > 0) {
			const found = village.find('#' + row.attr('id')).children().find(v => v.hasClass('row_val'));
			if (!found) {
				throw new Error("found is undefined");
			}
			found.text(num);
		} else if (num === 0) {
			row.remove();
		}
	};

	static updateVillage(ignoreStores?: boolean) {
		let village = adr.$('#village');
		let population = adr.$('#population');
		let needsAppend = false;
		if (village.found === 0) {
			needsAppend = true;
			village = adr.$('<div>').attr('id', 'village').css('opacity', 0);
			population = adr.$('<div>').attr('id', 'population').appendTo(village);
		}

		for (const k in StateManager.get('game.buildings')) {
			if (k === 'trap') {
				const numTraps = StateManager.get('game.buildings.' + k + '');
				const numBait = StateManager.get('stores.bait', true);
				let traps = numTraps - numBait;
				traps = traps < 0 ? 0 : traps;
				Outside.updateVillageRow(k, traps, village);
				Outside.updateVillageRow('baited trap', numBait > numTraps ? numTraps : numBait, village);
			} else {
				if (Outside.checkWorker(k)) {
					Outside.updateWorkersView();
				}
				Outside.updateVillageRow(k, StateManager.get('game.buildings.' + k + ''), village);
			}
		}
		/// TRANSLATORS : pop is short for population.
		population.text(_('pop ') + StateManager.get('game.population') + '/' + this.getMaxPopulation());

		let hasPeeps;
		if (StateManager.get('game.buildings.hut', true) === 0) {
			hasPeeps = false;
			village.attr('data-legend', _('forest'));
		} else {
			hasPeeps = true;
			village.attr('data-legend', _('village'));
		}

		if (needsAppend && village.children().length > 1) {
			village.prependTo(adr.$('#outsidePanel'));
			village.animate({ opacity: 1 }, 300);
		}

		if (hasPeeps && typeof Outside._popTimeout === 'undefined') {
			Outside.schedulePopIncrease();
		}

		this.setTitle();

		if (!ignoreStores && Engine.activeModule === Outside && village.children().length > 1) {
			adr.$('#storesContainer').css({ top: village.height() + 26 + Outside._STORES_OFFSET + 'px' });
		}
	};

	static checkWorker(name: string) {
		const jobMap: Record<string, string[]> = {
			'lodge': ['hunter', 'trapper'],
			'tannery': ['tanner'],
			'smokehouse': ['charcutier'],
			'iron mine': ['iron miner'],
			'coal mine': ['coal miner'],
			'sulphur mine': ['sulphur miner'],
			'steelworks': ['steelworker'],
			'armoury': ['armourer']
		};

		const jobs = jobMap[name];
		let added = false;
		if (typeof jobs === 'object') {
			for (let i = 0; i < jobs.length; i++) {
				const job = jobs[i];
				if (typeof StateManager.get('game.buildings.' + name + '') === 'number' &&
					typeof StateManager.get('game.workers.' + job + '') !== 'number') {
					Engine.log('adding ' + job + ' to the workers list');
					StateManager.set('game.workers.' + job + '', 0);
					added = true;
				}
			}
		}
		return added;
	};

	static updateVillageIncome() {
		for (const worker in Outside._INCOME) {
			const income = Outside._INCOME[worker];
			let num = worker === 'gatherer' ? Outside.getNumGatherers() : StateManager.get('game.workers.' + worker + '');
			if (typeof num === 'number' && num !== 0) {
				const stores: Stores = {};
				if (num < 0) num = 0;
				const tooltip = adr.$('#workers_row_' + worker.replace(' ', '-')).find('.tooltip');
				tooltip.empty();
				let needsUpdate = false;
				const curIncome = StateManager.getIncome(worker);
				for (const store in income.stores) {
					stores[store] = income.stores[store] * num;
					if (curIncome[store] !== stores[store]) needsUpdate = true;
					const row = adr.$('<div>').addClass('storeRow');
					adr.$('<div>').addClass('row_key').text(_(store)).appendTo(row);
					if (income.delay === undefined) {
						throw new Error('income.delay is undefined');
					}
					adr.$('<div>').addClass('row_val').text(Engine.getIncomeMsg(stores[store], income.delay.toString())).appendTo(row);
					row.appendTo(tooltip);
				}
				if (needsUpdate) {
					StateManager.setIncome(worker, {
						delay: income.delay,
						stores: stores
					});
				}
			}
		}
		Room.updateIncomeView();
	};

	static updateTrapButton() {
		const btn = adr.$('#trapsButton');
		if (StateManager.get('game.buildings.trap', true) > 0) {
			if (btn.found === 0) {
				Button.create({
					id: 'trapsButton',
					text: _("check traps"),
					click: Outside.checkTraps,
					cooldown: Outside._TRAPS_DELAY,
					width: '80px'
				}).appendTo(adr.$('#outsidePanel'));
			} else {
				Button.setDisabled(btn, false);
			}
		} else {
			if (btn.found > 0) {
				Button.setDisabled(btn, true);
			}
		}
	};

	static setTitle() {
		const numHuts = StateManager.get('game.buildings.hut', true);
		let title;
		if (numHuts === 0) {
			title = _("A Silent Forest");
		} else if (numHuts === 1) {
			title = _("A Lonely Hut");
		} else if (numHuts <= 4) {
			title = _("A Tiny Village");
		} else if (numHuts <= 8) {
			title = _("A Modest Village");
		} else if (numHuts <= 14) {
			title = _("A Large Village");
		} else {
			title = _("A Raucous Village");
		}

		if (Engine.activeModule === this) {
			adr.title(title);
		}
		adr.$('#location_outside').text(title);
	};

	static onArrival(transition_diff?: number) {
		Outside.setTitle();
		if (!StateManager.get('game.outside.seenForest')) {
			Notifications.notify(Outside, _("the sky is grey and the wind blows relentlessly"));
			StateManager.set('game.outside.seenForest', true);
		}
		Outside.updateTrapButton();
		Outside.updateVillage(true);

		Engine.moveStoresView(adr.$('#village'), transition_diff);

		// set music
		const numberOfHuts = StateManager.get('game.buildings.hut', true);
		if (numberOfHuts === 0) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SILENT_FOREST);
		} else if (numberOfHuts === 1) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_LONELY_HUT);
		} else if (numberOfHuts <= 4) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_TINY_VILLAGE);
		} else if (numberOfHuts <= 8) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_MODEST_VILLAGE);
		} else if (numberOfHuts <= 14) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_LARGE_VILLAGE);
		} else {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_RAUCOUS_VILLAGE);
		}
	};

	static gatherWood() {
		Notifications.notify(Outside, _("dry brush and dead branches litter the forest floor"));
		const gatherAmt = StateManager.get('game.buildings.cart', true) > 0 ? 50 : 10;
		StateManager.add('stores.wood', gatherAmt);
		AudioEngine.playSound(AudioLibrary.GATHER_WOOD);
	};

	static checkTraps() {
		const drops: Record<string, number> = {};
		const msg = [];
		const numTraps = StateManager.get('game.buildings.trap', true);
		const numBait = StateManager.get('stores.bait', true);
		const numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
		for (let i = 0; i < numDrops; i++) {
			const roll = Math.random();
			for (const j in Outside.TrapDrops) {
				const drop = Outside.TrapDrops[j];
				if (roll < drop.rollUnder) {
					let num = drops[drop.name];
					if (typeof num === 'undefined') {
						num = 0;
						msg.push(drop.message);
					}
					drops[drop.name] = num + 1;
					break;
				}
			}
		}
		/// TRANSLATORS : Mind the whitespace at the end.
		let s = _('the traps contain ');
		for (let l = 0, len = msg.length; l < len; l++) {
			if (len > 1 && l > 0 && l < len - 1) {
				s += ", ";
			} else if (len > 1 && l === len - 1) {
				/// TRANSLATORS : Mind the whitespaces at the beginning and end.
				s += _(" and ");
			}
			s += msg[l];
		}

		const baitUsed = numBait < numTraps ? numBait : numTraps;
		drops['bait'] = -baitUsed;

		Notifications.notify(Outside, s);
		StateManager.addM('stores', drops);
		AudioEngine.playSound(AudioLibrary.CHECK_TRAPS);
	};

	static handleStateUpdates(e: StateUpdateEvent) {
		if (e.category === 'stores') {
			Outside.updateVillage();
		} else if (e.stateName.indexOf('game.workers') === 0 || e.stateName.indexOf('game.population') === 0) {
			Outside.updateVillage();
			Outside.updateWorkersView();
			Outside.updateVillageIncome();
		}
	}
};
