import Query from "./query";
import _ from "./translate";
import Button from "./Button";

import AudioEngine from "./audio";
import { AudioLibrary } from "./audioLibrary";
import Engine from "./engine";
import { EventsEncounters } from "./events/encounters";
import { EventsExecutioner, _LEAVE_COOLDOWN } from "./events/executioner";
import { EventsGlobal } from "./events/global";
import { EventsMarketing } from "./events/marketing";
import { EventsOutside } from "./events/outside";
import { EventsRoom } from "./events/room";
import { EventsSetpieces } from "./events/setpieces";
import Notifications from "./notifications";
import Path from "./path";
import StateManager from "./state_manager";
import World from "./world";
import AdrElement from "./adapter/AdrElementCollection";
import { EventOptions, Position, ADREvent, StateUpdate, Special, Mod, LootList, $Event } from "./types";

/**
 * Module that handles the random event system
 */
export default class Events {
	static _lastSpecial: string;
	static _dotTimer: number;
	static _enemyAttackTimer: number;
	static options: EventOptions = {}; // Nothing for now

	static activeScene: string;
	static readonly delayState = 'wait';
	static readonly _EVENT_TIME_RANGE: Position = [3, 6] // range, in minutes
	static readonly _PANEL_FADE: number = 200;
	static readonly _FIGHT_SPEED: number = 100;
	static readonly _EAT_COOLDOWN: number = 5;
	static readonly _MEDS_COOLDOWN: number = 7;
	static readonly _HYPO_COOLDOWN: number = 7;
	static readonly _SHIELD_COOLDOWN: number = 10;
	static readonly _STIM_COOLDOWN: number = 10;
	static readonly STUN_DURATION: number = 4000;
	static readonly ENERGISE_MULTIPLIER: number = 4;
	static readonly EXPLOSION_DURATION: number = 3000;
	static readonly ENRAGE_DURATION: number = 4000;
	static readonly MEDITATE_DURATION: number = 5000;
	static readonly BOOST_DURATION: number = 3000;
	static readonly BOOST_DAMAGE: number = 10;
	static readonly DOT_TICK: number = 1000;
	static BLINK_INTERVAL?: number;
	static EventPool: ADREvent[];
	static eventStack: ADREvent[];
	static fought: boolean;
	static won: boolean;
	static _specialTimers: number[];
	static _meditateDmg: number;
	static _eventTimeout: number;

	static Setpieces: ADREvent = EventsSetpieces;
	static Executioner: ADREvent = EventsExecutioner;
	static Encounters: ADREvent = EventsEncounters;
	static Global: ADREvent = EventsGlobal;
	static Room: ADREvent = EventsRoom;
	static Outside: ADREvent = EventsOutside;
	static Marketing: ADREvent = EventsMarketing;
	static stateUpdate: StateUpdate = {
		callbacks: [],
		subscribe: function (fn: Function) {
			this.callbacks.push(fn);
		},
		publish: function (data) {
			for (const i in this.callbacks) {
				this.callbacks[i](data);
			}
		}
	}
	static init(options?: EventOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		// Build the Event Pool
		Events.EventPool = [].concat(
			Events.Global,
			Events.Room,
			Events.Outside,
			Events.Marketing
		);

		Events.eventStack = [];

		Events.scheduleNextEvent();

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Events.handleStateUpdates);

		//check for stored delayed events
		Events.initDelay();
	}


	static loadScene(name: string) {
		Engine.log('loading scene: ' + name);
		Events.activeScene = name;
		const scene = Events.activeEvent().scenes[name];

		// onLoad
		if (scene.onLoad) {
			scene.onLoad();
		}

		// Notify the scene change
		if (scene.notification) {
			Notifications.notify(null, scene.notification);
		}

		// Scene reward
		if (scene.reward) {
			StateManager.addM('stores', scene.reward);
		}

		Query.$('#description', Events.eventPanel()).empty();
		Query.$('#buttons', Events.eventPanel()).empty();
		if (scene.combat) {
			Events.startCombat(scene);
		} else {
			Events.startStory(scene);
		}
	};

	static startCombat(scene: ADREvent) {
		Engine.event('game event', 'combat');
		Events.fought = false;
		Events.won = false;
		const desc = Query.$('#description', Events.eventPanel());

		Query.$('<div>').text(scene.notification).appendTo(desc);


		const fightBox = Query.$('<div>').attr('id', 'fight').appendTo(desc);
		// Draw the wanderer
		const wanderer = Events.createFighterDiv('@', World.health, World.getMaxHealth()).attr('id', 'wanderer').appendTo(fightBox);
		// Draw the enemy
		const enemy = Events.createFighterDiv(scene.chara, scene.health, scene.health).attr('id', 'enemy').appendTo(fightBox);

		// Draw the action buttons
		const btns = Query.$('#buttons', Events.eventPanel());

		const attackBtns = Query.$('<div>').appendTo(btns).attr('id', 'attackButtons');
		let numWeapons = 0;
		for (const k in World.Weapons) {
			const weapon = World.Weapons[k];
			if (typeof Path.outfit[k] === 'number' && Path.outfit[k] > 0) {
				if (typeof weapon.damage !== 'number' || weapon.damage === 0) {
					// Weapons that deal no damage don't count
					numWeapons--;
				} else if (weapon.cost) {
					for (const c in weapon.cost) {
						const num = weapon.cost[c];
						if (typeof Path.outfit[c] !== 'number' || Path.outfit[c] < num) {
							// Can't use this weapon, so don't count it
							numWeapons--;
						}
					}
				}
				numWeapons++;
				Events.createAttackButton(wanderer, k).appendTo(attackBtns);
			}
		}
		if (numWeapons === 0) {
			// No weapons? You can punch stuff!
			Events.createAttackButton(wanderer, 'fists').prependTo(attackBtns);
		}
		Query.$('<div>').addClass('clear').appendTo(attackBtns);

		const healBtns = Query.$('<div>').appendTo(btns).attr('id', 'healButtons');
		Events.createEatMeatButton().appendTo(healBtns);
		if ((Path.outfit['medicine'] || 0) !== 0) {
			Events.createUseMedsButton().appendTo(healBtns);
		}
		if ((Path.outfit['hypo'] || 0) !== 0) {
			Events.createUseHypoButton().appendTo(healBtns);
		}
		if ((Path.outfit['stim'] ?? 0) > 0) {
			Events.createStimButton().appendTo(healBtns);
		}
		if (StateManager.get('stores.kinetic armour', true) as number > 0) {
			Events.createShieldButton().appendTo(healBtns);
		}
		Query.$('<div>').addClass('clear').appendTo(healBtns);
		Events.setHeal(healBtns);

		// Set up the enemy attack timers
		Events.startEnemyAttacks();
		Events._specialTimers = (scene.specials ?? []).map((s: Special) => Engine.setInterval(
			() => {
				const enemy = Query.$('#enemy');
				const text = s.action(enemy);
				Events.updateFighterDiv(enemy);
				if (text) {
					Events.drawFloatText(text, Query.$('.hp', enemy))
				}
			},
			s.delay * 1000
		));
	};

	static startEnemyAttacks = (delay?: number) => {
		Query.clearInterval(Events._enemyAttackTimer);
		const scene = Events.activeEvent().scenes[Events.activeScene];
		Events._enemyAttackTimer = Engine.setInterval(Events.enemyAttack, (delay ?? scene.attackDelay) * 1000);
	};

	static setStatus = (fighter: Query, status: string) => {
		fighter.data('status', status);
		if (status === 'enraged' && fighter.attr('id') === 'enemy') {
			Events.startEnemyAttacks(0.5);
			Query.setTimeout(() => {
				fighter.data('status', 'none');
				Events.startEnemyAttacks();
			}, Events.ENRAGE_DURATION);
		}
		if (status === 'meditation') {
			Events._meditateDmg = 0;
			Query.setTimeout(() => {
				fighter.data('status', 'none');
			}, Events.MEDITATE_DURATION);
		}
		if (status === 'boost') {
			Query.setTimeout(() => {
				fighter.data('status', 'none');
			}, Events.BOOST_DURATION);
		}
	};



	static createEatMeatButton(cooldown = Events._EAT_COOLDOWN): Query {

		const btn = Button.create({
			id: 'eat',
			text: _('eat meat'),
			cooldown: cooldown,
			click: Events.eatMeat,
			cost: { 'cured meat': 1 }
		});

		if (Path.outfit['cured meat'] === 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	};

	static createUseMedsButton(cooldown = Events._MEDS_COOLDOWN): Query {

		const btn = Button.create({
			id: 'meds',
			text: _('use meds'),
			cooldown: cooldown,
			click: Events.useMeds,
			cost: { 'medicine': 1 }
		});

		if ((Path.outfit['medicine'] || 0) === 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	};

	static createUseHypoButton(cooldown = Events._HYPO_COOLDOWN): Query {

		const btn = Button.create({
			id: 'hypo',
			text: _('use hypo'),
			cooldown: cooldown,
			click: Events.useHypo,
			cost: { 'hypo': 1 }
		});

		if ((Path.outfit['hypo'] ?? 0) > 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	};

	static createShieldButton(): Query {
		const btn = Button.create({
			id: 'shld',
			text: _('shield'),
			cooldown: Events._SHIELD_COOLDOWN,
			click: Events.useShield
		});
		return btn;
	};

	static createStimButton: () => Query = () => Button.create({
		id: 'use-stim',
		text: _('boost'),
		cooldown: Events._STIM_COOLDOWN,
		click: Events.useStim
	});

	static createAttackButton(wanderer: Query, weaponName: string): Query {
		const weapon = World.Weapons[weaponName];
		let cd = weapon.cooldown;
		if (weapon.type === 'unarmed') {
			if (StateManager.hasPerk('unarmed master')) {
				cd /= 2;
			}
		}
		const btn = Button.create({
			id: 'attack_' + weaponName.replace(/ /g, '-'),
			text: weapon.verb,
			cooldown: cd,
			click: Events.useWeapon,
			boosted: () => wanderer.data('status') === 'boost',
			cost: weapon.cost
		});
		if (typeof weapon.damage === 'number' && weapon.damage > 0) {
			btn.addClass('weaponButton');
		}

		for (const k in weapon.cost) {
			if (typeof Path.outfit[k] !== 'number' || Path.outfit[k] < weapon.cost[k]) {
				Button.setDisabled(btn, true);
				break;
			}
		}

		return btn;
	};

	static drawFloatText(text: string, parent: Query, cb?: VoidFunction) {
		Query.$('<div>').text(text).addClass('damageText').appendTo(parent).animate({
			'bottom': '70px',
			'opacity': '0'
		},
			700,
			function (this: Query) {
				this.remove();
				cb && cb();
			});
	};

	static setHeal(healBtns?: Query) {
		if (!healBtns) {
			healBtns = Query.$('#healButtons');
		}
		healBtns = healBtns.find('.button');
		const canHeal = (World.health < World.getMaxHealth());
		Button.setDisabled(healBtns, !canHeal && healBtns.attr('id') !== 'shld');
		return canHeal;
	};

	static doHeal(healing: string, cured: number, btn: Query) {
		if (Path.outfit[healing] > 0) {
			Path.outfit[healing]--;
			World.updateSupplies();
			if (Path.outfit[healing] === 0) {
				Button.setDisabled(btn, true);
			}

			let hp = World.health + cured;
			hp = Math.min(World.getMaxHealth(), hp);
			World.setHp(hp);
			Events.setHeal();

			if (Events.activeEvent()) {
				const w = Query.$('#wanderer');
				w.data('hp', hp);
				const wHp = Query.$('.hp', w);
				Events.updateFighterDiv(w);
				Events.drawFloatText('+' + cured, wHp);
				const takeETbutton = Events.setTakeAll();
				if (takeETbutton.get()) {
					Events.canLeave(takeETbutton);
				}
			}
		}
	};

	static eatMeat(btn: Query) {
		Events.doHeal('cured meat', World.meatHeal(), btn);
		AudioEngine.playSound(AudioLibrary.EAT_MEAT);
	};

	static useMeds(btn: Query) {
		Events.doHeal('medicine', World.medsHeal(), btn);
		AudioEngine.playSound(AudioLibrary.USE_MEDS);
	};

	static useHypo = (btn: Query) => {
		Events.doHeal('hypo', World.hypoHeal(), btn);
		AudioEngine.playSound(AudioLibrary.USE_MEDS);
	};

	static useShield = (btn: Query) => {
		const player = Query.$('#wanderer');
		player.data('status', 'shield');
		Events.updateFighterDiv(player);
	};

	static useStim = (btn: Query) => {
		const player = Query.$('#wanderer');
		player.data('status', 'boost');
		Events.dotDamage(player, Events.BOOST_DAMAGE);
		Events.updateFighterDiv(player);
	};

	static useWeapon(btn: Query) {
		if (Events.activeEvent()) {
			const weaponName = btn.attr('id').substring(7).replace(/-/g, ' ');
			const weapon = World.Weapons[weaponName];
			if (weapon.type === 'unarmed') {
				if (!StateManager.get('character.punches')) StateManager.set('character.punches', 0);
				StateManager.add('character.punches', 1);
				if (StateManager.get('character.punches') === 50 && !StateManager.hasPerk('boxer')) {
					StateManager.addPerk('boxer');
				} else if (StateManager.get('character.punches') === 150 && !StateManager.hasPerk('martial artist')) {
					StateManager.addPerk('martial artist');
				} else if (StateManager.get('character.punches') === 300 && !StateManager.hasPerk('unarmed master')) {
					StateManager.addPerk('unarmed master');
				}

			}
			if (weapon.cost) {
				const mod: Mod = {};
				let out = false;
				for (const k in weapon.cost) {
					if (typeof Path.outfit[k] !== 'number' || Path.outfit[k] < weapon.cost[k]) {
						return;
					}
					mod[k] = -weapon.cost[k];
					if (Path.outfit[k] - weapon.cost[k] < weapon.cost[k]) {
						out = true;
					}
				}
				for (const m in mod) {
					Path.outfit[m] += mod[m];
				}
				if (out) {
					Button.setDisabled(btn, true);
					let validWeapons = false;
					const weaponBtn = Query.$('.weaponButton');
					if (!Button.isDisabled(weaponBtn) && weaponBtn.attr('id') !== 'attack_fists') {
						validWeapons = true;
						return false;
					}
					if (!validWeapons) {
						// enable or create the punch button
						const fists = Query.$('#attack_fists');
						if (fists.found === 0) {
							throw new Error('fists button not found');
							// Events.createAttackButton('fists').prependTo('#buttons', Events.eventPanel());
						} else {
							Button.setDisabled(fists, false);
						}
					}
				}
				World.updateSupplies();
			}
			let dmg: number | string = -1;
			if (Math.random() <= World.getHitChance()) {
				dmg = weapon.damage;
				if (typeof dmg === 'number') {
					if (weapon.type === 'unarmed' && StateManager.hasPerk('boxer')) {
						dmg *= 2;
					}
					if (weapon.type === 'unarmed' && StateManager.hasPerk('martial artist')) {
						dmg *= 3;
					}
					if (weapon.type === 'unarmed' && StateManager.hasPerk('unarmed master')) {
						dmg *= 2;
					}
					if (weapon.type === 'melee' && StateManager.hasPerk('barbarian')) {
						dmg = Math.floor(dmg * 1.5);
					}
				}
			}

			const attackFn = weapon.type === 'ranged' ? Events.animateRanged : Events.animateMelee;

			// play variation audio for weapon type
			const r = Math.floor(Math.random() * 2) + 1;
			switch (weapon.type) {
				case 'unarmed':
					AudioEngine.playSound(AudioLibrary['WEAPON_UNARMED_' + r]);
					break;
				case 'melee':
					AudioEngine.playSound(AudioLibrary['WEAPON_MELEE_' + r]);
					break;
				case 'ranged':
					AudioEngine.playSound(AudioLibrary['WEAPON_RANGED_' + r]);
					break;
			}

			attackFn(Query.$('#wanderer'), dmg, function () {
				const enemy = Query.$('#enemy');
				const enemyHp = enemy.data('hp');
				const scene = Events.activeEvent().scenes[Events.activeScene];
				const atHealth = scene.atHealth ?? {};
				const explosion = scene.explosion;

				for (const k in atHealth) {
					const hpThreshold = Number(k);
					if (enemyHp <= hpThreshold && enemyHp + parseFloat(dmg.toString()) > hpThreshold) {
						atHealth[k](enemy);
					}
				}

				if (enemyHp <= 0 && !Events.won) {
					// Success!
					Events.won = true;
					if (explosion) {
						Events.explode(enemy, Query.$('#wanderer'), explosion);
					}
					else {
						Events.winFight();
					}
				}
			});
		}
	};

	static explode = (enemy: Query, player: Query, dmg: number) => {
		Events.clearTimeouts();
		enemy.addClass('exploding');
		Query.setTimeout(() => {
			enemy.removeClass('exploding');
			Query.$('.label', enemy).text('*');
			Events.damage(enemy, player, dmg, 'ranged', () => {
				if (!Events.checkPlayerDeath()) {
					Events.winFight();
				}
			});
		}, Events.EXPLOSION_DURATION);
	};

	static dotDamage = (target: Query, dmg: number) => {
		const hp = Math.max(0, target.data('hp') - dmg);
		target.data('hp', hp);
		if (target.attr('id') === 'wanderer') {
			World.setHp(hp);
			Events.setHeal();
			Events.checkPlayerDeath();
		}
		else if (hp <= 0 && !Events.won) {
			Events.won = true;
			Events.winFight();
		}
		Events.updateFighterDiv(target);
		Events.drawFloatText(`-${dmg}`, Query.$('.hp', target));
	};

	static damage(fighter: Query, enemy: Query, dmg: string | number, type: string, cb?: VoidFunction) {
		let enemyHp = enemy.data('hp');
		const maxHp = enemy.data('maxHp');
		let msg: string | number = "";
		const shielded = enemy.data('status') === 'shield';
		const energised = fighter.data('status') === 'energised';
		const venomous = fighter.data('status') === 'venomous';
		const meditating = enemy.data('status') === 'meditation';
		if (typeof dmg === 'number') {
			if (dmg < 0) {
				msg = _('miss');
				dmg = 0;
			} else {
				if (energised) {
					dmg *= this.ENERGISE_MULTIPLIER;
				}

				if (meditating) {
					Events._meditateDmg = (Events._meditateDmg ?? 0) + dmg;
					msg = dmg;
				}
				else {
					msg = (shielded ? '+' : '-') + dmg;
					enemyHp = Math.min(maxHp, Math.max(0, enemyHp + (shielded ? dmg : -dmg)));
					enemy.data('hp', enemyHp);
					if (fighter.attr('id') === 'enemy') {
						World.setHp(enemyHp);
						Events.setHeal();
					}
				}

				if (venomous && !shielded) {
					Query.clearInterval(Events._dotTimer);
					Events._dotTimer = Query.setInterval(() => {
						if (typeof dmg !== 'number') {
							throw new Error('dmg is not a number');
						}
						Events.dotDamage(enemy, Math.floor(dmg / 2));
					}, Events.DOT_TICK);
				}

				if (shielded) {
					// shields break in one hit
					enemy.data('status', 'none');
				}

				Events.updateFighterDiv(enemy);

				// play variation audio for weapon type
				const r = Math.floor(Math.random() * 2) + 1;
				switch (type) {
					case 'unarmed':
						AudioEngine.playSound(AudioLibrary['WEAPON_UNARMED_' + r]);
						break;
					case 'melee':
						AudioEngine.playSound(AudioLibrary['WEAPON_MELEE_' + r]);
						break;
					case 'ranged':
						AudioEngine.playSound(AudioLibrary['WEAPON_RANGED_' + r]);
						break;
				}
			}
		} else {
			if (dmg === 'stun') {
				msg = _('stunned');
				enemy.data('stunned', true);
				Query.setTimeout(() => enemy.data('stunned', false), Events.STUN_DURATION);
			}
		}

		if (energised || venomous) {
			// attack buffs only applies to one hit
			fighter.data('status', 'none');
			Events.updateFighterDiv(fighter);
		}

		Events.drawFloatText(msg.toString(), Query.$('.hp', enemy), cb);
	}

	static animateMelee(fighter: Query, dmg: string | number, callback: VoidFunction) {
		let start: {}, end: {}, enemy: Query;
		if (fighter.attr('id') === 'wanderer') {
			start = { 'left': '50%' };
			end = { 'left': '25%' };
			enemy = Query.$('#enemy');
		} else {
			start = { 'right': '50%' };
			end = { 'right': '25%' };
			enemy = Query.$('#wanderer');
		}

		fighter.animate(start, Events._FIGHT_SPEED, function (this: Query) {

			Events.damage(fighter, enemy, dmg, 'melee');

			this.animate(end, Events._FIGHT_SPEED, callback);
		});
	};

	static animateRanged(fighter: Query, dmg: string | number, callback: VoidFunction) {
		let start: {}, end: {}, enemy: Query;
		if (fighter.attr('id') === 'wanderer') {
			start = { 'left': '25%' };
			end = { 'left': '50%' };
			enemy = Query.$('#enemy');
		} else {
			start = { 'right': '25%' };
			end = { 'right': '50%' };
			enemy = Query.$('#wanderer');
		}

		Query.$('<div>').css(start).addClass('bullet').text('o').appendTo(Query.$('#description'))
			.animate(end, Events._FIGHT_SPEED * 2, function (this: Query) {

				Events.damage(fighter, enemy, dmg, 'ranged');

				this.remove();
				if (typeof callback === 'function') {
					callback();
				}
			});
	};

	static enemyAttack() {

		const scene = Events.activeEvent().scenes[Events.activeScene];
		const enemy = Query.$('#enemy');
		const stunned = enemy.data('stunned');
		const meditating = enemy.data('status') === 'meditation';

		if (!stunned && !meditating) {
			let toHit = scene.hit;
			toHit *= StateManager.hasPerk('evasive') ? 0.8 : 1;
			let dmg = -1;
			if ((Events._meditateDmg ?? 0) > 0) {
				dmg = Events._meditateDmg;
				Events._meditateDmg = 0;
			}
			else if (Math.random() <= toHit) {
				dmg = scene.damage;
			}

			const attackFn = scene.ranged ? Events.animateRanged : Events.animateMelee;

			attackFn(Query.$('#enemy'), dmg, Events.checkPlayerDeath);
		}
	};

	static checkPlayerDeath = () => {
		if (Query.$('#wanderer').data('hp') <= 0) {
			Events.clearTimeouts();
			Events.endEvent();
			World.die();
			return true;
		}
		return false;
	};

	static clearTimeouts = () => {
		Query.clearInterval(Events._enemyAttackTimer);
		Events._specialTimers.forEach(Query.clearInterval);
		Query.clearInterval(Events._dotTimer);
	};

	static endFight() {
		Events.fought = true;
		Events.clearTimeouts();
	};

	static winFight() {
		Engine.setTimeout(function () {
			if (Events.fought) {
				return;
			}
			Events.endFight();
			// AudioEngine.playSound(AudioLibrary.WIN_FIGHT);
			Query.$('#enemy').animate({ opacity: 0 }, 300, function () {
				Engine.setTimeout(function () {
					let leaveBtn;
					const scene = Events.activeEvent().scenes[Events.activeScene];
					const desc = Query.$('#description', Events.eventPanel());
					const btns = Query.$('#buttons', Events.eventPanel());
					desc.empty();
					btns.empty();
					Query.$('<div>').text(scene.deathMessage).appendTo(desc);

					const takeETbtn = Events.drawLoot(scene.loot);

					const exitBtns = Query.$('<div>').appendTo(btns).attr('id', 'exitButtons');
					if (scene.buttons) {
						// Draw the buttons
						leaveBtn = Events.drawButtons(scene);
					} else {
						leaveBtn = Button.create({
							id: 'leaveBtn',
							cooldown: _LEAVE_COOLDOWN,
							click: function () {
								if (scene.nextScene && scene.nextScene !== 'end') {
									Events.loadScene(scene.nextScene);
								} else {
									Events.endEvent();
								}
							},
							text: _('leave')
						});
						Button.cooldown(leaveBtn.appendTo(exitBtns));

						const healBtns = Query.$('<div>').appendTo(btns).attr('id', 'healButtons');
						Events.createEatMeatButton(0).appendTo(healBtns);
						if ((Path.outfit['medicine'] || 0) !== 0) {
							Events.createUseMedsButton(0).appendTo(healBtns);
						}
						if (Path.outfit['hypo'] ?? 0 > 0) {
							Events.createUseHypoButton(0).appendTo(healBtns);
						}
						Query.$('<div>').addClass('clear').appendTo(healBtns);
						Events.setHeal(healBtns);
					}
					Query.$('<div>').addClass('clear').appendTo(exitBtns);

					Events.allowLeave(takeETbtn, leaveBtn);
				}, 1000, true);
			});
		}, Events._FIGHT_SPEED);
	};

	static loseFight() {
		Events.endFight();
		Events.endEvent();
		World.die();
	};

	static drawDrop(btn: Query) {
		const name = btn.attr('id').substring(5).replace(/-/g, ' ');
		let needsAppend = false;
		const weight = Path.getWeight(name);
		const freeSpace = Path.getFreeSpace();
		if (weight > freeSpace) {
			// Draw the drop menu
			Engine.log('drop menu');
			let dropMenu: Query;
			if (Query.$('#dropMenu').found) {
				dropMenu = Query.$('#dropMenu');
				Query.$('#dropMenu').empty();
			} else {
				dropMenu = Query.$('<div>').attr({ 'id': 'dropMenu', 'data-legend': _('drop:') });
				needsAppend = true;
			}
			for (const k in Path.outfit) {
				if (name === k) continue;
				const itemWeight = Path.getWeight(k);
				if (itemWeight > 0) {
					let numToDrop = Math.ceil((weight - freeSpace) / itemWeight);
					if (numToDrop > Path.outfit[k]) {
						numToDrop = Path.outfit[k];
					}
					if (numToDrop > 0) {
						const dropRow = Query.$('<div>').attr('id', 'drop_' + k.replace(/ /g, '-'))
							.text(_(k) + ' x' + numToDrop)
							.data('thing', k)
							.data('num', numToDrop)
							.click(function () {
								Events.dropStuff(btn, dropRow)
							})
							.mouseenter(function () {
							});
						dropRow.appendTo(dropMenu);
					}
				}
			}
			Query.$('<div>').attr('id', 'no_drop')
				.text(_('nothing'))
				.click(function () {
					dropMenu.remove();
				})
				.appendTo(dropMenu);
			if (needsAppend) {
				dropMenu.appendTo(btn);
			}
			btn.mouseleave(function () {
				Query.$('#dropMenu').remove();
			}, true);
		}
	};

	static drawLootRow(name: string, num: number) {
		const id = name.replace(/ /g, '-');
		const lootRow = Query.$('<div>').attr('id', 'loot_' + id).data('item', name).addClass('lootRow');
		const take = Button.create({
			id: 'take_' + id,
			text: _(name) + ' [' + num + ']',
			click: Events.getLoot
		}).addClass('lootTake').data('numLeft', num).appendTo(lootRow);

		take.mouseenter(function () {
			Events.drawDrop(take);
		});
		const takeall = Button.create({
			id: 'all_take_' + id,
			text: _('take') + ' ',
			click: Events.takeAll
		}).addClass('lootTakeAll').appendTo(lootRow);
		Query.$('<span>').insertBefore(takeall.find('.cooldown'));
		Query.$('<div>').addClass('clear').appendTo(lootRow);
		return lootRow;
	};

	static drawLoot(lootList: LootList) {
		const desc = Query.$('#description', Events.eventPanel());
		const lootButtons = Query.$('<div>').attr({ 'id': 'lootButtons', 'data-legend': _('take:') });
		for (const k in lootList) {
			const loot = lootList[k];
			if (Math.random() < loot.chance) {
				const num = Math.floor(Math.random() * (loot.max - loot.min)) + loot.min;
				const lootRow = Events.drawLootRow(k, num);
				lootRow.appendTo(lootButtons);
			}
		}
		lootButtons.appendTo(desc);
		let takeET;
		if (lootButtons.children().length > 0) {
			const takeETrow = Query.$('<div>').addClass('takeETrow');
			takeET = Button.create({
				id: 'loot_takeEverything',
				text: '',
				cooldown: _LEAVE_COOLDOWN,
				click: Events.takeEverything
			}).appendTo(takeETrow);
			Query.$('<span>').insertBefore(takeET.find('.cooldown'));
			Query.$('<div>').addClass('clear').appendTo(takeETrow);
			takeETrow.appendTo(lootButtons);
			Events.setTakeAll(lootButtons);
		} else {
			const noLoot = Query.$('<div>').addClass('noLoot').text(_('nothing to take'));
			noLoot.appendTo(lootButtons);
		}
		return takeET;
	};

	static setTakeAll(lootButtons?: Query) {
		if (!lootButtons) {
			lootButtons = Query.$('#lootButtons');
		}
		let canTakeSomething = false;
		let free = Path.getFreeSpace();
		const takeETbutton = lootButtons.find('#loot_takeEverything');
		lootButtons.children().filter(row => row.hasClass('lootRow')).forEach(row => {

			const name = row.data('item');
			const take = row.find('.lootTake');
			const takeAll = row.find('.lootTakeAll');
			const numLeft = take.data('numLeft');
			const num = Math.min(Math.floor(Path.getFreeSpace() / Path.getWeight(name)), numLeft);
			takeAll.data('numLeft', num);
			free -= numLeft * Path.getWeight(name);
			if (num > 0) {
				takeAll.removeClass('disabled');
				canTakeSomething = true;
			} else {
				takeAll.addClass('disabled');
			}
			if (num < numLeft) {
				takeAll.find('span').text(num);
			} else {
				takeAll.find('span').text(_('all'));
			}
		});
		Button.setDisabled(takeETbutton, !canTakeSomething);
		takeETbutton.data('canTakeEverything', (free >= 0) ? true : false);
		return takeETbutton;
	};

	static allowLeave(takeETbtn: Query | undefined, leaveBtn: Query) {
		if (takeETbtn) {
			if (leaveBtn) {
				takeETbtn.data('leaveBtn', leaveBtn);
			}
			Events.canLeave(takeETbtn);
		}
	};

	static canLeave(btn: Query) {
		const basetext = (btn.data('canTakeEverything')) ? _('take everything') : _('take all you can');
		const textbox = btn.find('span');
		const takeAndLeave = (btn.data('leaveBtn')) ? btn.data('canTakeEverything') : false;
		let text = _(basetext);
		if (takeAndLeave) {
			Button.cooldown(btn);
			text += _(' and ') + btn.data('leaveBtn').text();
		}
		textbox.text(text);
		btn.data('canLeave', takeAndLeave);
	};

	static dropStuff(takeItemBtn: Query, dropBtn: Query) {
		const thing = dropBtn.data('thing');
		const id = 'take_' + thing.replace(/ /g, '-');
		const num = dropBtn.data('num');
		const lootButtons = Query.$('#lootButtons');
		Engine.log('dropping ' + num + ' ' + thing);

		const lootBtn = Query.$('#' + id, lootButtons);
		if (lootBtn.found > 0) {
			let curNum = lootBtn.data('numLeft');
			curNum += num;
			lootBtn.text(_(thing) + ' [' + curNum + ']').data('numLeft', curNum);
		} else {
			const lootRow = Events.drawLootRow(thing, num);
			lootRow.insertBefore(Query.$('.takeETrow', lootButtons));
		}
		Path.outfit[thing] -= num;
		Events.getLoot(takeItemBtn);
		World.updateSupplies();
	};

	static getLoot(btn: Query, stateSkipButtonSet?: boolean) {
		const name = btn.attr('id').substring(5).replace(/-/g, ' ');
		if (btn.data('numLeft') > 0) {
			const skipButtonSet = stateSkipButtonSet || false;
			const weight = Path.getWeight(name);
			const freeSpace = Path.getFreeSpace();
			if (weight <= freeSpace) {
				let num = btn.data('numLeft');
				num--;
				btn.data('numLeft', num);
				// #dropMenu gets removed by this.
				btn.text(_(name) + ' [' + num + ']');
				if (num === 0) {
					Button.setDisabled(btn);
					btn.animate({ 'opacity': 0 }, 300, function (this: Query) {
						this.removeParent();
						if (Query.$('#lootButtons').found) {
							Query.$('#lootButtons').remove();
						}
					});
				}
				let curNum = Path.outfit[name];
				curNum = typeof curNum === 'number' ? curNum : 0;
				curNum++;
				Path.outfit[name] = curNum;
				World.updateSupplies();

				if (!skipButtonSet) {
					Events.setTakeAll();
				}
			}
			if (!skipButtonSet) {
				Events.drawDrop(btn);
			}
		}
	};

	static takeAll(btn: Query) {
		const target = Query.$('#' + btn.attr('id').substring(4));
		for (let k = 0; k < btn.data('numLeft'); k++) {
			Events.getLoot(target, true);
		}
		Events.setTakeAll();
	};

	static takeEverything(btn: Query) {
		Query.$('#lootButtons').children().filter(row => row.hasClass('lootRow')).forEach(lootBtn => {
			const target = lootBtn.find('.lootTakeAll');
			if (!target.hasClass('disabled')) {
				Events.takeAll(target);
			}
		});
		if (btn.data('canLeave')) {
			btn.data('leaveBtn').click();
		}
	};

	static createFighterDiv(chara: string, hp: number, maxhp: number) {
		const fighter = Query.$('<div>')
			.addClass('fighter')
			.data('hp', hp)
			.data('maxHp', maxhp)
			.data('refname', chara);
		Query.$('<div>').addClass('label').text(_(chara)).appendTo(fighter);
		Query.$('<div>').addClass('hp').text(hp + '/' + maxhp).appendTo(fighter);
		return fighter;
	};

	static updateFighterDiv(fighter: Query) {
		Query.$('.hp', fighter).text(fighter.data('hp') + '/' + fighter.data('maxHp'));
		const status = fighter.data('status');
		const hasStatus = status && status !== 'none';
		fighter.attr('class', `fighter${hasStatus ? ` ${status}` : ''}`);
	};

	static startStory(scene: ADREvent) {
		// Write the text
		const desc = Query.$('#description', Events.eventPanel());
		let leaveBtn;
		for (const i in scene.text) {
			Query.$('<div>').text(scene.text[i]).appendTo(desc);
		}

		if (scene.textarea !== null && scene.textarea !== undefined) {
			const ta = Query.$('<textarea>').val(scene.textarea).appendTo(desc);
			if (scene.readonly) {
				ta.attr('readonly', true);
			}
			Engine.autoSelect(Query.$('#description').find('textarea'));
		}

		// Draw any loot
		let takeETbtn;
		if (scene.loot) {
			takeETbtn = Events.drawLoot(scene.loot);
		}

		// Draw the buttons
		const exitBtns = Query.$('<div>').attr('id', 'exitButtons').appendTo(Query.$('#buttons', Events.eventPanel()));
		leaveBtn = Events.drawButtons(scene);
		Query.$('<div>').addClass('clear').appendTo(exitBtns);


		Events.allowLeave(takeETbtn, leaveBtn);
	};

	static drawButtons(scene: ADREvent) {
		const btns = Query.$('#exitButtons', Events.eventPanel());
		const btnsList = [];
		for (const id in scene.buttons) {
			const info = scene.buttons[id];
			const cost = {
				...info.cost
			};
			if (Path.outfit && Path.outfit['glowstone']) {
				delete cost.torch;
			}
			const b = Button.create({
				id,
				text: info.text,
				cost,
				click: Events.buttonClick,
				cooldown: info.cooldown
			}).appendTo(btns);
			if (typeof info.available === 'function' && !info.available()) {
				Button.setDisabled(b, true);
			}
			if (typeof info.cooldown === 'number') {
				Button.cooldown(b);
			}
			btnsList.push(b);
		}

		Events.updateButtons();
		return btnsList[0];
	};

	static getQuantity(store: string) {
		if (store === 'water') {
			return World.water;
		}
		if (store === 'hp') {
			return World.health;
		}
		const num = Engine.activeModule === World ? Path.outfit[store] : StateManager.get('stores.' + store + '', true) as number;
		return isNaN(num) || num < 0 ? 0 : num;
	};

	static updateButtons() {
		const btns = Events.activeEvent().scenes[Events.activeScene].buttons;
		for (const bId in btns) {
			const b = btns[bId];
			const btnEl = Query.$('#' + bId, Events.eventPanel());
			if (typeof b.available === 'function' && !b.available()) {
				Button.setDisabled(btnEl, true);
			} else if (b.cost) {
				const cost = {
					...b.cost
				};
				if (Path.outfit && Path.outfit['glowstone']) {
					delete cost.torch;
				}
				let disabled = false;
				for (const store in cost) {
					const num = Events.getQuantity(store);
					if (num < cost[store]) {
						// Too expensive
						disabled = true;
						break;
					}
				}
				Button.setDisabled(btnEl, disabled);
			}
		}
	};

	static buttonClick(btn: Query) {
		const info = Events.activeEvent().scenes[Events.activeScene].buttons[btn.attr('id')];
		// Cost
		const costMod: Mod = {};
		if (info.cost) {
			const cost = {
				...info.cost
			};
			if (Path.outfit && Path.outfit['glowstone']) {
				delete cost.torch;
			}
			for (const store in cost) {
				const num = Events.getQuantity(store);
				if (num < cost[store]) {
					// Too expensive
					return;
				}
				if (store === 'water') {
					World.setWater(World.water - cost[store]);
				}
				else if (store === 'hp') {
					World.setHp(World.hp - cost[store]);
				}
				else {
					costMod[store] = -cost[store];
				}
			}
			if (Engine.activeModule === World) {
				for (const k in costMod) {
					Path.outfit[k] += costMod[k];
				}
				World.updateSupplies();
			} else {
				StateManager.addM('stores', costMod);
			}
		}

		if (typeof info.onChoose === 'function') {
			const textarea = Events.eventPanel().find('textarea');
			info.onChoose(textarea.found > 0 ? textarea.val() : null);
		}

		// Reward
		if (info.reward) {
			StateManager.addM('stores', info.reward);
		}

		Events.updateButtons();

		// Notification
		if (info.notification) {
			Notifications.notify(null, info.notification);
		}

		info.onClick && info.onClick();

		// Link
		if (info.link) {
			Events.endEvent();
			Query.open(info.link);
			return;
		}

		// Next Event
		if (info.nextEvent) {
			const eventData = EventsSetpieces[info.nextEvent] || Events.Executioner[info.nextEvent];
			Events.switchEvent(eventData);
			return;
		}

		// Next Scene
		if (info.nextScene) {
			if (info.nextScene === 'end') {
				Events.endEvent();
			} else {
				const r = Math.random();
				let lowestMatch = null;
				for (const i in info.nextScene) {
					if (r < parseFloat(i) && (lowestMatch === null || i < lowestMatch)) {
						lowestMatch = i;
					}
				}
				if (lowestMatch !== null) {
					Events.loadScene(info.nextScene[lowestMatch]);
					return;
				}
				Engine.log('ERROR: no suitable scene found');
				Events.endEvent();
			}
		}
	};

	// blinks the browser window title
	static blinkTitle = function () {
		const title = Query.title() as string;

		// every 3 seconds change title to '*** EVENT ***', then 1.5 seconds later, change it back to the original title.
		Events.BLINK_INTERVAL = Query.setInterval(function () {
			Query.title(_('*** EVENT ***'));
			Engine.setTimeout(function () { Query.title(title); }, 1500, true);
		}, 3000);
	};

	static stopTitleBlink() {
		Query.clearInterval(Events.BLINK_INTERVAL);
		Events.BLINK_INTERVAL = undefined;
	};

	// Makes an event happen!
	static triggerEvent() {
		if (!Events.activeEvent()) {
			const possibleEvents = [];
			for (const i in Events.EventPool) {
				const event = Events.EventPool[i];
				if (event.isAvailable()) {
					possibleEvents.push(event);
				}
			}

			if (possibleEvents.length === 0) {
				Events.scheduleNextEvent(0.5);
				return;
			} else {
				const r = Math.floor(Math.random() * (possibleEvents.length));
				Events.startEvent(possibleEvents[r]);
			}
		}

		Events.scheduleNextEvent();
	};

	static triggerFight() {
		const possibleFights = [];
		for (const i in Events.Encounters) {
			const fight = Events.Encounters[i];
			if (fight.isAvailable()) {
				possibleFights.push(fight);
			}
		}

		const r = Math.floor(Math.random() * (possibleFights.length));
		Events.startEvent(possibleFights[r]);

		// play audio only when fight is possible
		if (possibleFights.length > 0) {
			if (World.getDistance() > 20) {
				// Tier 3
				AudioEngine.playEventMusic(AudioLibrary.ENCOUNTER_TIER_3);
			} else if (World.getDistance() > 10) {
				// Tier 2
				AudioEngine.playEventMusic(AudioLibrary.ENCOUNTER_TIER_2);
			} else {
				// Tier 1
				AudioEngine.playEventMusic(AudioLibrary.ENCOUNTER_TIER_1);
			}
		}
	};

	static activeEvent() {
		if (Events.eventStack && Events.eventStack.length > 0) {
			return Events.eventStack[0];
		}
	};

	static eventPanel(): Query {
		return Events.activeEvent().eventPanel;
	};

	static switchEvent = (event: ADREvent) => {
		if (!event) {
			return;
		}
		AudioEngine.stopEventMusic();
		Events.eventPanel().remove();
		Events.activeEvent().eventPanel = null;
		Events.eventStack.shift();
		Events.startEvent(event);
	};

	static startEvent(event: ADREvent, options?: EventOptions) {
		if (!event) {
			return;
		}
		event.audio && AudioEngine.playEventMusic(event.audio);
		Engine.event('game event', 'event');
		Engine.keyLock = true;
		Engine.tabNavigation = false;
		Button.saveCooldown = false;
		Events.eventStack.unshift(event);
		event.eventPanel = Query.$('<div>').attr('id', 'event').addClass('eventPanel').css('opacity', '0');
		if (options && options.width) {
			Events.eventPanel().css('width', options.width);
		}
		Query.$('<div>').addClass('eventTitle').text(Events.activeEvent().title).appendTo(Events.eventPanel());
		Query.$('<div>').attr('id', 'description').appendTo(Events.eventPanel());
		Query.$('<div>').attr('id', 'buttons').appendTo(Events.eventPanel());
		Events.loadScene('start');
		Query.$('#wrapper').append(Events.eventPanel());
		Events.eventPanel().animate({ opacity: 1 }, Events._PANEL_FADE);
		const currentSceneInformation = Events.activeEvent().scenes[Events.activeScene];
		if (currentSceneInformation.blink) {
			Events.blinkTitle();
		}
	};

	static scheduleNextEvent(scale?: number) {
		let nextEvent = Math.floor(Math.random() * (Events._EVENT_TIME_RANGE[1] - Events._EVENT_TIME_RANGE[0])) + Events._EVENT_TIME_RANGE[0];
		if (scale && scale > 0) { nextEvent *= scale; }
		Engine.log('next event scheduled in ' + nextEvent + ' minutes');
		Events._eventTimeout = Engine.setTimeout(Events.triggerEvent, nextEvent * 60 * 1000);
	};

	static endEvent() {
		AudioEngine.stopEventMusic();
		Events.eventPanel().animate({ opacity: 0 }, Events._PANEL_FADE, function () {
			Events.eventPanel().remove();
			Events.activeEvent().eventPanel = null;
			Events.eventStack.shift();
			Engine.log(Events.eventStack.length + ' events remaining');
			Engine.keyLock = false;
			Engine.tabNavigation = true;
			Button.saveCooldown = true;
			if (Events.BLINK_INTERVAL) {
				Events.stopTitleBlink();
			}
			// Force refocus on the body. I hate you, IE.
			Query.$('body').focus();
		});
	};

	static handleStateUpdates(e: $Event) {
		if ((e.category === 'stores' || e.category === 'income') && Events.activeEvent()) {
			Events.updateButtons();
		}
	};

	static initDelay() {
		if (StateManager.get(Events.delayState)) {
			Events.recallDelay(Events.delayState, Events);
		}
	};

	static recallDelay(stateName: string, target: Record<string, any>) {
		const state = StateManager.get(stateName);
		for (const i in state) {
			if (typeof (state[i]) === 'object') {
				Events.recallDelay(stateName + '.' + i, target[i]);
			} else {
				if (typeof target[i] === 'function') {
					target[i]();
				} else {
					StateManager.remove(stateName);
				}
			}
		}
		if (state === undefined) {
			StateManager.remove(stateName);
		}
	};

	static saveDelay(action: VoidFunction, stateName: string, delay?: number) {
		const state = Events.delayState + '.' + stateName;
		if (delay) {
			StateManager.set(state, delay);
		} else {
			delay = StateManager.get(state, true) as number;
		}
		const time = Engine.setInterval(function () {
			// update state every half second
			StateManager.set(state, (StateManager.get(state) as number - 0.5), true);
		}, 500);
		Engine.setTimeout(function () {
			// outcome realizes. erase countdown
			Query.clearInterval(time);
			StateManager.remove(state);
			StateManager.removeBranch(Events.delayState);
			action();
		}, delay * 1000);
	}
};
