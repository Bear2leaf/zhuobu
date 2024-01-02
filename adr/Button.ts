import Query  from "./query";
import _ from "./translate";

import Engine from "./engine";
import StateManager from "./state_manager";
import { ButtonOptions } from "./type/index.js";

export default class Button {
	static data_cooldown: number;
	static data_remaining: number;
	static data_handler: VoidFunction;
	static create(options: ButtonOptions) {
		if (typeof options.cooldown === 'number') {
			this.data_cooldown = options.cooldown;
		}
		this.data_remaining = 0;
		if (typeof options.click === 'function') {
			this.data_handler = options.click;
		}

		const el = Query.$('<div>')
			.attr('id', typeof (options.id) !== 'undefined' ? options.id : "BTN_" + Engine.getGuid())
			.addClass('button')
			.text(typeof (options.text) !== 'undefined' ? options.text : "button")
			.click(function () {
				if (!el.hasClass('disabled')) {
					Button.cooldown(el);
					if (options.click) {
						options.click(el);
					}
				}
			})
			.data("handler", typeof options.click === 'function' ? options.click : function () { Engine.log("click"); })
			.data("remaining", 0)
			.data("cooldown", 0)
			// .data("cooldown", typeof options.cooldown == 'number' ? options.cooldown : 0)
			.data('boosted', options.boosted ?? (() => false));

		el.append(Query.$("<div>").addClass('cooldown'));

		// waiting for expiry of residual cooldown detected in state
		Button.cooldown(el, 'state');

		if (options.cost) {
			const ttPos = options.ttPos ? options.ttPos : "bottom right";
			const costTooltip = Query.$('<div>').addClass('tooltip ' + ttPos);
			for (const k in options.cost) {
				Query.$("<div>").addClass('row_key').text(_(k)).appendTo(costTooltip);
				Query.$("<div>").addClass('row_val').text(options.cost[k]).appendTo(costTooltip);
			}
			if (costTooltip.children().length > 0) {
				costTooltip.appendTo(el);
			} else {
				costTooltip.remove();
			}
		}

		if (options.width) {
			el.css('width', options.width);
		}

		return el;
	}

	static saveCooldown: boolean;

	static setDisabled(btn: Query, disabled?: boolean) {
		if (btn) {
			if (!disabled && !btn.data('onCooldown')) {
				btn.removeClass('disabled');
			} else if (disabled) {
				btn.addClass('disabled');
			}
			btn.data('disabled', disabled);
		}
	}

	static isDisabled(btn: Query) {
		if (btn) {
			return btn.data('disabled') === true;
		}
		return false;
	}

	static cooldown(btn: Query, option?: number | string) {
		let cd = btn.data("cooldown");
		if (btn.data('boosted') && btn.data('boosted')()) {
			cd /= 2;
		}
		const id: string = 'cooldown.' + btn.attr('id');
		if (cd > 0) {
			if (typeof option === 'number') {
				cd = option;
			}
			// param "start" takes value from cooldown time if not specified
			let start: number, left: string | number;
			switch (option) {
				// a switch will allow for several uses of cooldown function
				case 'state':
					if (!StateManager.get(id)) {
						return;
					}
					start = Math.min(StateManager.get(id) as number, cd);
					left = (start / cd).toFixed(4);
					break;
				default:
					start = cd;
					left = 1;
			}
			Button.clearCooldown(btn);
			if (Button.saveCooldown) {
				StateManager.set(id, start);
				// residual value is measured in seconds
				// saves program performance
				btn.data('countdown', Engine.setInterval(function () {
					StateManager.set(id, StateManager.get(id, true) as number - 0.5, true);
				}, 500));
			}
			let time = start;
			if (Engine.options.doubleTime) {
				time /= 20;
			}
			Query.$('.cooldown', btn).width(parseFloat(left.toString()) * 100 + "%").animate({ width: '0%' }, time * 1000, function () {
				Button.clearCooldown(btn, true);
			});
			btn.addClass('disabled');
			btn.data('onCooldown', true);
		}
	}

	static clearCooldown(btn: Query, cooldownEnded?: boolean) {
		btn.data('onCooldown', false);
		if (btn.data('countdown')) {
			Query.clearInterval(btn.data('countdown'));
			StateManager.remove('cooldown.' + btn.attr('id'));
			btn.removeData('countdown');
		}
		if (!btn.data('disabled')) {
			btn.removeClass('disabled');
		}
	}
};
