import Engine from "./Engine";
import Room from "./Room";

/**
 * Module that registers the notification box and handles messages
 */
export default class Notifications {

	init(options?: NotificationOptions) {
		this.options = Object.assign(
			this.options,
			options
		);
	};

	options: NotificationOptions = {}; // Nothing for now


	notifyQueue: string[] = [];
	constructor(private readonly engine: Engine) {

	}

	printMessage(t: string) {
		console.log(t);
	};

};
