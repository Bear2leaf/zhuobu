import Query  from "./query";

import Engine from "./engine";

/**
 * Module that registers the notification box and handles messages
 */
export default class Notifications {

	static init(options?: NotificationOptions) {
		this.options = Object.assign(
			this.options,
			options
		);

		// Create the notifications box
		const elem = Query.$('<div>').attr({
			id: 'notifications'
		});
		// Create the transparency gradient
		Query.$('<div>').attr('id', 'notifyGradient').appendTo(elem);

		elem.appendTo(Query.$('#wrapper'));
	};

	static options: NotificationOptions = {}; // Nothing for now

	static elem: Query;

	static notifyQueue: Record<any, string[]> = {};

	// Allow notification to the player
	static notify(m: any, text?: string, noQueue: boolean = false) {
		if (typeof text === 'undefined') return;
		if (text.slice(-1) !== ".") text += ".";
		if (m !== null && Engine.activeModule !== m) {
			if (!noQueue) {
				if (typeof this.notifyQueue[m] === 'undefined') {
					this.notifyQueue[m] = [];
				}
				this.notifyQueue[m].push(text);
			}
		} else {
			Notifications.printMessage(text);
		}
		Engine.saveGame();
	};


	static printMessage(t: string) {
		const text = Query.$('<div>').addClass('notification').css('opacity', '0').text(t).prependTo(Query.$('#notifications'));
		text.animate({ opacity: 1 }, 500);
	};

	static printQueue(module: string) {
		if (typeof this.notifyQueue[module] !== 'undefined') {
			while (this.notifyQueue[module].length > 0) {
				const message = this.notifyQueue[module].shift();
				if (!message) {
					throw new Error("Message is undefined");
				}
				Notifications.printMessage(message);
			}
		}
	}
};
