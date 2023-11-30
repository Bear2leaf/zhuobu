import Query from "./query.js";
import _ from "./translate.js";
import Button from "./Button.js";
import adr from "./adr.js";
import AudioEngine from "./audio.js";
import { AudioLibrary } from "./audioLibrary.js";
import Engine from "./engine.js";
import Events from "./events.js";
import Outside from "./outside.js";
import { Prestige } from "./prestige.js";
import Room from "./room.js";
import Score from "./scoring.js";
import Ship from "./ship.js";
import StateManager from "./state_manager.js";

/**
 * Module that registers spaaaaaaaaace!
 */
export default class Space {
	static readonly SHIP_SPEED = 3;
	static readonly BASE_ASTEROID_DELAY = 500;
	static readonly BASE_ASTEROID_SPEED = 1500;
	static readonly FTB_SPEED = 60000;
	static readonly STAR_WIDTH = 3000;
	static readonly STAR_HEIGHT = 3000;
	static readonly NUM_STARS = 200;
	static readonly STAR_SPEED = 60000;
	static readonly FRAME_DELAY = 100;
	static stars: Query | null = null;
	static backStars: Query;
	static ship: Query;
	static lastMove: number;
	static done = false;
	static shipX: number;
	static shipY: number;

	static hull = 0;
	static options: SpaceOptions = {}; // Nothing for now
	static panel: Query;
	static altitude: number;
	static up: boolean;
	static down: boolean;
	static left: boolean;
	static right: boolean;
	static _shipTimer: number;
	static _volumeTimer: number;
	static _timer: number;
	static _panelTimeout: number;
	static starsBack: Query | null = null;

	static init(options?: SpaceOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		// Create the Space panel
		this.panel = adr.$('<div>').attr('id', "spacePanel")
			.addClass('location')
			.appendTo(adr.$('#outerSlider'));

		// Create the ship
		Space.ship = adr.$('<div>').text("@").attr('id', 'ship').appendTo(this.panel);

		// Create the hull display
		const h = adr.$('<div>').attr('id', 'hullRemaining').appendTo(this.panel);
		adr.$('<div>').addClass('row_key').text(_('hull: ')).appendTo(h);
		adr.$('<div>').addClass('row_val').appendTo(h);

		//subscribe to stateUpdates
		Events.stateUpdate.subscribe(Space.handleStateUpdates);
	};


	static onArrival() {
		Space.done = false;
		Engine.keyLock = false;
		Space.hull = Ship.getMaxHull();
		Space.altitude = 0;
		Space.setTitle();
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SPACE);
		Space.updateHull();

		Space.up =
			Space.down =
			Space.left =
			Space.right = false;

		Space.ship.css({
			top: '350px',
			left: '350px'
		});
		Space.startAscent();
		Space._shipTimer = adr.setInterval(Space.moveShip, 33);
		Space._volumeTimer = adr.setInterval(Space.lowerVolume, 1000);
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SPACE);
	};

	static setTitle() {
		if (Engine.activeModule === this) {
			let t;
			if (Space.altitude < 10) {
				t = _("Troposphere");
			} else if (Space.altitude < 20) {
				t = _("Stratosphere");
			} else if (Space.altitude < 30) {
				t = _("Mesosphere");
			} else if (Space.altitude < 45) {
				t = _("Thermosphere");
			} else if (Space.altitude < 60) {
				t = _("Exosphere");
			} else {
				t = _("Space");
			}
			adr.title(t);
		}
	};

	static getSpeed() {
		return Space.SHIP_SPEED + StateManager.get('game.spaceShip.thrusters');
	};

	static updateHull() {
		adr.$('#hullRemaining .row_val', Space.panel).text(Space.hull + '/' + Ship.getMaxHull());
	};

	static createAsteroid(noNext?: boolean) {
		let c;

		const r = Math.random();
		if (r < 0.2)
			c = '#';
		else if (r < 0.4)
			c = '$';
		else if (r < 0.6)
			c = '%';
		else if (r < 0.8)
			c = '&';
		else
			c = 'H';

		const x = Math.floor(Math.random() * 700);
		const a = adr.$('<div>').addClass('asteroid').text(c).appendTo(adr.$('#spacePanel').css('left', x + 'px'));
		a.data("xMin", x);
		a.data("xMax", x + a.width());
		a.data("height", a.height());
		a.animate({
			top: '740px'
		}, Space.BASE_ASTEROID_SPEED - Math.floor(Math.random() * (Space.BASE_ASTEROID_SPEED * 0.65)), function () {
			a.remove();
		});
		if (!noNext) {

			// Harder
			if (Space.altitude > 10) {
				Space.createAsteroid(true);
			}

			// HARDER
			if (Space.altitude > 20) {
				Space.createAsteroid(true);
				Space.createAsteroid(true);
			}

			// HAAAAAARDERRRRR!!!!1
			if (Space.altitude > 40) {
				Space.createAsteroid(true);
				Space.createAsteroid(true);
			}

			if (!Space.done) {
				Engine.setTimeout(Space.createAsteroid, 1000 - (Space.altitude * 10), true);
			}
		}
	};

	static moveShip() {
		const left = Space.ship.css('left');
		const top = Space.ship.css('top');
		let x = parseFloat(left.substring(0, left.length - 2));
		let y = parseFloat(top.substring(0, top.length - 2));

		let dx = 0, dy = 0;

		if (Space.up) {
			dy -= Space.getSpeed();
		} else if (Space.down) {
			dy += Space.getSpeed();
		}
		if (Space.left) {
			dx -= Space.getSpeed();
		} else if (Space.right) {
			dx += Space.getSpeed();
		}

		if (dx !== 0 && dy !== 0) {
			dx = dx / Math.sqrt(2);
			dy = dy / Math.sqrt(2);
		}

		if (Space.lastMove !== null) {
			const dt = Date.now() - Space.lastMove;
			dx *= dt / 33;
			dy *= dt / 33;
		}

		x = x + dx;
		y = y + dy;
		if (x < 10) {
			x = 10;
		} else if (x > 690) {
			x = 690;
		}
		if (y < 10) {
			y = 10;
		} else if (y > 690) {
			y = 690;
		}

		Space.shipX = x;
		Space.shipY = y;

		Space.ship.css({
			left: x + 'px',
			top: y + 'px'
		});

		Space.lastMove = Date.now();
	};

	static startAscent() {
		let body_color;
		let to_color;
		if (Engine.isLightsOff()) {
			body_color = '#272823';
			to_color = '#EEEEEE';
		}
		else {
			body_color = '#FFFFFF';
			to_color = '#000000';
		}

		adr.$('body').addClass('noMask').css({ backgroundColor: body_color }).animate({
			backgroundColor: to_color
		},Space.FTB_SPEED, Space.endGame);
		Space.drawStars();
		Space._timer = adr.setInterval(function () {
			Space.altitude += 1;
			if (Space.altitude % 10 === 0) {
				Space.setTitle();
			}
			if (Space.altitude > 60) {
				adr.clearInterval(Space._timer);
			}
		}, 1000);

		Space._panelTimeout = Engine.setTimeout(function () {
			if (Engine.isLightsOff())
				adr.$('#spacePanel, .menu, select.menuBtn').animate({ color: '#272823' }, 500);
			else
				adr.$('#spacePanel, .menu, select.menuBtn').animate({ color: 'white' }, 500);
		}, Space.FTB_SPEED / 2, true);

		Space.createAsteroid();
	};

	static drawStars(duration?: number) {
		const starsContainer = adr.$('<div>').attr('id', 'starsContainer').appendTo(adr.$('body'));
		Space.stars = adr.$('<div>').css('bottom', '0px').attr('id', 'stars').appendTo(starsContainer);
		let s1 = adr.$('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});
		let s2 = adr.$('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});;
		Space.stars.append(s1).append(s2);
		Space.drawStarAsync(s1, s2, 0);
		Space.stars.data('speed', Space.STAR_SPEED);
		Space.startAnimation(Space.stars);

		Space.starsBack = adr.$('<div>').css('bottom', '0px').attr('id', 'starsBack').appendTo(starsContainer);
		s1 = adr.$('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});
		s2 = adr.$('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});;
		Space.starsBack.append(s1).append(s2);
		Space.drawStarAsync(s1, s2, 0);
		Space.starsBack.data('speed', Space.STAR_SPEED * 2);
		Space.startAnimation(Space.starsBack);
	};

	static startAnimation(el: Query) {
		el.animate({ bottom: '-3000px' }, el.data('speed'), function (this: Query) {
			this.css('bottom', '0px');
			Space.startAnimation(this);
		});
	};

	static drawStarAsync(el: Query, el2: Query, num: number) {
		const top = Math.floor(Math.random() * Space.STAR_HEIGHT) + 'px';
		const left = Math.floor(Math.random() * Space.STAR_WIDTH) + 'px';
		adr.$('<div>').text('.').addClass('star').css({
			top: top,
			left: left
		}).appendTo(el);
		adr.$('<div>').text('.').addClass('star').css({
			top: top,
			left: left
		}).appendTo(el2);
		if (num < Space.NUM_STARS) {
			Engine.setTimeout(function () { Space.drawStarAsync(el, el2, num + 1); }, 100);
		}
	};

	static crash() {
		if (Space.done) return;
		Engine.keyLock = true;
		Space.done = true;
		adr.clearInterval(Space._timer);
		adr.clearInterval(Space._shipTimer);
		adr.clearInterval(Space._volumeTimer);
		clearTimeout(Space._panelTimeout);
		let body_color;
		if (Engine.isLightsOff())
			body_color = '#272823';
		else
			body_color = '#FFFFFF';
		// Craaaaash!
		adr.$('body').removeClass('noMask').animate({
			backgroundColor: body_color
		}, 300, function () {
			Space.stars?.remove();
			Space.starsBack?.remove();
			Space.stars = Space.starsBack = null;
			adr.$('#starsContainer').remove();
			adr.$('body').attr('style', '');
			adr.$('#notifyGradient').attr('style', '');
			adr.$('#spacePanel').attr('style', '');
		});
		adr.$('.menu, select.menuBtn').animate({ color: '#666' }, 300);
		adr.$('#outerSlider').animate({ top: '0px' }, 300);
		Engine.activeModule = Ship;
		Ship.onArrival();
		Button.cooldown(adr.$('#liftoffButton'));
		Engine.event('progress', 'crash');
		AudioEngine.playSound(AudioLibrary.CRASH);
	};

	static endGame() {
		if (Space.done) return;
		Engine.event('progress', 'win');
		Space.done = true;
		adr.clearInterval(Space._timer);
		adr.clearInterval(Space._shipTimer);
		adr.clearInterval(Space._volumeTimer);
		clearTimeout(Engine._saveTimer);
		clearTimeout(Outside._popTimeout);
		clearTimeout(Engine._incomeTimeout);
		clearTimeout(Events._eventTimeout);
		clearTimeout(Room._fireTimer);
		clearTimeout(Room._tempTimer);
		for (const j in Room.Craftables) {
			Room.Craftables[j].button = null;
		}
		for (const k in Room.TradeGoods) {
			Room.TradeGoods[k].button = null;
		}
		delete Outside._popTimeout;

		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_ENDING);

		adr.$('#hullRemaining', Space.panel).animate({ opacity: 0 }, 500);
		Space.ship.animate({
			top: '350px',
			left: '240px'
		}, 3000, function () {
			Engine.setTimeout(function () {
				Space.ship.animate({
					top: '-100px'
				}, 200, function () {
					// Restart everything! Play FOREVER!
					adr.$('#outerSlider').css({ 'left': '0px', 'top': '0px' });
					adr.$('#locationSlider, #worldPanel, #spacePanel, #notifications').remove();
					adr.$('#header').empty();
					Engine.setTimeout(function () {
						let container_color;
						if (Engine.isLightsOff())
							container_color = '#EEE';
						else
							container_color = '#000';
						adr.$('#starsContainer').animate({
							opacity: 0,
							'background-color': container_color
						},
							2000,
							function () {
								Engine.GAME_OVER = true;
								Score.save();
								Prestige.save();
								adr.$('#starsContainer').remove();
								adr.$('#content, #notifications').remove();
								Space.showExpansionEnding().then(() => {
									Space.showEndingOptions();
									Engine.options = {};
									Engine.deleteSave(true);
								});
							});
					}, 2000);
				});
			}, 2000);
		});
	};

	static showExpansionEnding() {
		return new Promise((resolve) => {
			if (!StateManager.get('stores.fleet beacon')) {
				resolve(undefined);
				return;
			}

			const c = adr.$('<div>')
				.addClass('outroContainer')
				.appendTo(adr.$('body'));

			adr.setTimeout(() => {
				adr.$('<div>')
					.addClass('outro')
					.text('the beacon pulses gently as the ship glides through space.<br>coordinates are locked. nothing to do but wait.')
					.appendTo(c)
					.animate({ opacity: 1 }, 500);
			}, 2000);

			adr.setTimeout(() => {
				adr.$('<div>')
					.addClass('outro')
					.text('the beacon glows a solid blue, and then goes dim. the ship slows.<br>gradually, the vast wanderer homefleet comes into view.<br>massive worldships drift unnaturally through clouds of debris, scarred and dead.')
					.appendTo(c)
					.animate({ opacity: 1 }, 500);
			}, 7000);

			adr.setTimeout(() => {
				adr.$('<div>')
					.addClass('outro')
					.text('the air is running out.')
					.appendTo(c)
					.animate({ opacity: 1 }, 500);
			}, 14000);

			adr.setTimeout(() => {
				adr.$('<div>')
					.addClass('outro')
					.text('the capsule is cold.')
					.appendTo(c)
					.animate({ opacity: 1 }, 500);
			}, 17000);

			adr.setTimeout(() => {
				Button.create({
					id: 'wait-btn',
					text: _('wait'),
					click: (btn: Query) => {
						btn.addClass('disabled');
						c.animate({ opacity: 0 }, 5000, () => {
							c.remove();
							adr.setTimeout(resolve, 3000);
						})
					}
				}).animate({ opacity: 1 }, 500).appendTo(c);
			}, 19500)
		});
	};

	static showEndingOptions() {
		adr.$('<center>')
			.addClass('centerCont')
			.appendTo(adr.$('body'));
		adr.$('<span>')
			.addClass('endGame')
			.text(_('score for this game: {0}', Score.calculateScore().toString()))
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<span>')
			.addClass('endGame')
			.text(_('total score: {0}', Prestige.get().score))
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<span>')
			.addClass('endGame endGameOption')
			.text(_('restart.'))
			.click(Engine.confirmDelete)
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<span>')
			.addClass('endGame')
			.text(_('expanded story. alternate ending. behind the scenes commentary. get the app.'))
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<span>')
			.addClass('endGame endGameOption')
			.text(_('iOS.'))
			.click(function () { adr.open('https://itunes.apple.com/app/apple-store/id736683061?pt=2073437&ct=gameover&mt=8'); })
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
		adr.$('<br />')
			.appendTo(adr.$('.centerCont'));
		adr.$('<span>')
			.addClass('endGame endGameOption')
			.text(_('android.'))
			.click(function () { adr.open('https://play.google.com/store/apps/details?id=com.yourcompany.adarkroom'); })
			.appendTo(adr.$('.centerCont'))
			.animate({ opacity: 1 }, 1500);
	};

	static keyDown(event: $Event) {
		switch (event.which) {
			case 38: // Up
			case 87:
				Space.up = true;
				Engine.log('up on');
				break;
			case 40: // Down
			case 83:
				Space.down = true;
				Engine.log('down on');
				break;
			case 37: // Left
			case 65:
				Space.left = true;
				Engine.log('left on');
				break;
			case 39: // Right
			case 68:
				Space.right = true;
				Engine.log('right on');
				break;
		}
	};

	static keyUp(event: $Event) {
		switch (event.which) {
			case 38: // Up
			case 87:
				Space.up = false;
				Engine.log('up off');
				break;
			case 40: // Down
			case 83:
				Space.down = false;
				Engine.log('down off');
				break;
			case 37: // Left
			case 65:
				Space.left = false;
				Engine.log('left off');
				break;
			case 39: // Right
			case 68:
				Space.right = false;
				Engine.log('right off');
				break;
		}
	};

	static handleStateUpdates(e: $Event) {

	};

	static lowerVolume() {
		if (Space.done) return;

		// lower audio as ship gets further into space
		const progress = Space.altitude / 60;
		const newVolume = 1.0 - progress;
		AudioEngine.setBackgroundMusicVolume(newVolume, 0.3);
	}
};
