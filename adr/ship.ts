import Query from "./query";
import _ from "./translate";
import Button from "./Button";

import AudioEngine from "./audio";
import { AudioLibrary } from "./audioLibrary";
import Engine from "./engine";
import Events from "./events";
import { Header } from "./header";
import Notifications from "./notifications";
import Space from "./space";
import StateManager from "./state_manager";
import { ShipOptions, $Event } from "./types";

/**
 * Module that registers the starship!
 */
export default class Ship {
	static tab: Query;
	static readonly LIFTOFF_COOLDOWN = 120;
	static readonly ALLOY_PER_HULL = 1;
	static readonly ALLOY_PER_THRUSTER = 1;
	static readonly BASE_HULL = 0;
	static readonly BASE_THRUSTERS = 1;
	static options: ShipOptions = {}; // Nothing for now
	static panel: Query;
	static init(options?: ShipOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		if (!StateManager.get('features.location.spaceShip')) {
			StateManager.set('features.location.spaceShip', true);
			StateManager.setM('game.spaceShip', {
				hull: Ship.BASE_HULL,
				thrusters: Ship.BASE_THRUSTERS
			});
		}

		// Create the Ship tab
		this.tab = Header.addLocation(_("An Old Starship"), "ship", Ship);

		// Create the Ship panel
		this.panel = Query.$('<div>').attr('id', "shipPanel")
			.addClass('location')
			.appendTo(Query.$('#locationSlider'));

		Engine.updateSlider();

		// Draw the hull label
		const hullRow = Query.$('<div>').attr('id', 'hullRow').appendTo(Query.$('#shipPanel'));
		Query.$('<div>').addClass('row_key').text(_('hull:')).appendTo(hullRow);
		Query.$('<div>').addClass('row_val').text(StateManager.get('game.spaceShip.hull')).appendTo(hullRow);
		Query.$('<div>').addClass('clear').appendTo(hullRow);

		// Draw the thrusters label
		const engineRow = Query.$('<div>').attr('id', 'engineRow').appendTo(Query.$('#shipPanel'));
		Query.$('<div>').addClass('row_key').text(_('engine:')).appendTo(engineRow);
		Query.$('<div>').addClass('row_val').text(StateManager.get('game.spaceShip.thrusters')).appendTo(engineRow);
		Query.$('<div>').addClass('clear').appendTo(engineRow);

		// Draw the reinforce button
		Button.create({
			id: 'reinforceButton',
			text: _('reinforce hull'),
			click: Ship.reinforceHull,
			width: '100px',
			cost: { 'alien alloy': Ship.ALLOY_PER_HULL }
		}).appendTo(Query.$('#shipPanel'));

		// Draw the engine button
		Button.create({
			id: 'engineButton',
			text: _('upgrade engine'),
			click: Ship.upgradeEngine,
			width: '100px',
			cost: { 'alien alloy': Ship.ALLOY_PER_THRUSTER }
		}).appendTo(Query.$('#shipPanel'));

		// Draw the lift off button
		const b = Button.create({
			id: 'liftoffButton',
			text: _('lift off'),
			click: Ship.checkLiftOff,
			width: '100px',
			cooldown: Ship.LIFTOFF_COOLDOWN
		}).appendTo(Query.$('#shipPanel'));

		if (StateManager.get('game.spaceShip.hull') <= 0) {
			Button.setDisabled(b, true);
		}

		// Init Space
		Space.init();

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Ship.handleStateUpdates);
	};


	static onArrival(transition_diff?: number) {
		Ship.setTitle();
		if (!StateManager.get('game.spaceShip.seenShip')) {
			Notifications.notify(Ship, _('somewhere above the debris cloud, the wanderer fleet hovers. been on this rock too long.'));
			StateManager.set('game.spaceShip.seenShip', true);
		}
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SHIP);

		Engine.moveStoresView(null, transition_diff);
	};

	static setTitle() {
		if (Engine.activeModule === this) {
			Query.title(_("An Old Starship"));
		}
	};

	static reinforceHull() {
		if (StateManager.get('stores.alien alloy', true) < Ship.ALLOY_PER_HULL) {
			Notifications.notify(Ship, _("not enough alien alloy"));
			return false;
		}
		StateManager.add('stores.alien alloy', -Ship.ALLOY_PER_HULL);
		StateManager.add('game.spaceShip.hull', 1);
		if (StateManager.get('game.spaceShip.hull') > 0) {
			Button.setDisabled(Query.$('#liftoffButton', Ship.panel), false);
		}
		Query.$('#hullRow .row_val', Ship.panel).text(StateManager.get('game.spaceShip.hull'));
		AudioEngine.playSound(AudioLibrary.REINFORCE_HULL);
	};

	static upgradeEngine() {
		if (StateManager.get('stores.alien alloy', true) < Ship.ALLOY_PER_THRUSTER) {
			Notifications.notify(Ship, _("not enough alien alloy"));
			return false;
		}
		StateManager.add('stores.alien alloy', -Ship.ALLOY_PER_THRUSTER);
		StateManager.add('game.spaceShip.thrusters', 1);
		Query.$('#engineRow .row_val', Ship.panel).text(StateManager.get('game.spaceShip.thrusters'));
		AudioEngine.playSound(AudioLibrary.UPGRADE_ENGINE);
	};

	static getMaxHull() {
		return StateManager.get('game.spaceShip.hull');
	};

	static checkLiftOff() {
		if (!StateManager.get('game.spaceShip.seenWarning')) {
			Events.startEvent({
				title: _('Ready to Leave?'),
				scenes: {
					'start': {
						text: [
							_("time to get out of this place. won't be coming back.")
						],
						buttons: {
							'fly': {
								text: _('lift off'),
								onChoose() {
									StateManager.set('game.spaceShip.seenWarning', true);
									Ship.liftOff();
								},
								nextScene: 'end'
							},
							'wait': {
								text: _('linger'),
								onChoose() {
									Button.clearCooldown(Query.$('#liftoffButton'));
								},
								nextScene: 'end'
							}
						}
					}
				}
			});
		} else {
			Ship.liftOff();
		}
	};

	static liftOff() {
		Query.$('#outerSlider').animate({ top: '700px' }, 300);
		Space.onArrival();
		Engine.activeModule = Space;
		AudioEngine.playSound(AudioLibrary.LIFT_OFF);
	};

	static handleStateUpdates(e: $Event) {

	}
};
