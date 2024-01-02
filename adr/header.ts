import Query  from "./query";

import Engine from "./engine";
import { HeaderOptions, EngineModule } from "./type/index";

/**
 * Module that takes care of header buttons
 */
export const Header = {

	init: function (options?: HeaderOptions) {
		this.options = Object.assign(
			this.options,
			options
		);
	},

	options: {}, // Nothing for now

	canTravel: function () {
		return Query.$('#header').children().length > 1;
	},

	addLocation: function (text: string, id: string, module: EngineModule, before?: string) {
		const toAdd = Query.$('<div>').attr('id', "location_" + id)
			.addClass('headerButton')
			.text(text).click(function () {
				if (Header.canTravel()) {
					Engine.travelTo(module);
				}
			});

		if (before && Query.$(`#location_${before}`).found > 0) {
			throw new Error(`invalid arguments`);
			//   return toAdd.insertBefore(`#location_${before}`);
		}

		return toAdd.appendTo(Query.$('#header'));
	}
};
