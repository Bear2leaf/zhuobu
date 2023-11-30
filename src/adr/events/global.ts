import _ from ".././translate.js";
import { AudioLibrary } from "../audioLibrary.js";
import Engine from "../engine.js";
import Outside from "../outside.js";
import Room from "../room.js";
import StateManager from "../state_manager.js";

/**
 * Events that can occur when any module is active (Except World. It's special.)
 **/
export const EventsGlobal = [
	{ /* The Thief */
		title: _('The Thief'),
		isAvailable: function() {
			return (Engine.activeModule === Room || Engine.activeModule === Outside) && StateManager.get('game.thieves') === 1;
		},
		scenes: {
			'start': {
				text: [
					_('the villagers haul a filthy man out of the store room.'),
					_("say his folk have been skimming the supplies."),
					_('say he should be strung up as an example.')
				],
				notification: _('a thief is caught'),
				blink: true,
				buttons: {
					'kill': {
						text: _('hang him'),
						nextScene: {1: 'hang'}
					},
					'spare': {
						text: _('spare him'),
						nextScene: {1: 'spare'}
					}
				}
			},
			'hang': {
				text: [
					_('the villagers hang the thief high in front of the store room.'),
					_('the point is made. in the next few days, the missing supplies are returned.')
				],
				onLoad: function() {
					StateManager.set('game.thieves', 2);
					StateManager.remove('income.thieves');
					StateManager.addM('stores', StateManager.get('game.stolen'));
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'spare': {
				text: [
					_("the man says he's grateful. says he won't come around any more."),
					_("shares what he knows about sneaking before he goes.")
				],
				onLoad: function() {
					StateManager.set('game.thieves', 2);
					StateManager.remove('income.thieves');
					StateManager.addPerk('stealthy');
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_THIEF
	}
];
