const translate = function (text: string, ...args: string[]) {
	let xlate = translateLookup(text);
	if (arguments.length > 1) {

		xlate = formatter(xlate, args);
	}

	return xlate;
};

// I want it available explicity as well as via the object
translate.translate = translate;

//from https://gist.github.com/776196 via http://davedash.com/2010/11/19/pythonic-string-formatting-in-javascript/ 
const defaultFormatter = (function () {
	const re = /\{([^}]+)\}/g;
	return function (s: string, args: string[]) {
		return s.replace(re, function (_, match) { return args[match]; });
	};
}());
let formatter = defaultFormatter;
translate.setFormatter = function (newFormatter: typeof formatter) {
	formatter = newFormatter;
};

translate.format = function () {
	const aps = Array.prototype.slice;
	const s = arguments[0];
	const args = aps.call(arguments, 1);

	return formatter(s, args);
};

let dynoTrans: ((target: string) => string) | null = null;
translate.setDynamicTranslator = function (newDynoTrans: typeof dynoTrans) {
	dynoTrans = newDynoTrans;
};

let translation: Record<string, string> = {};
translate.setTranslation = function (newTranslation: Record<string, string>) {
	translation = newTranslation;
};

function translateLookup(target: string) {
	if (translation === null || target === null) {
		return target;
	}

	if (target in translation === false) {
		if (dynoTrans !== null) {
			return dynoTrans(target);
		}
		return target;
	}

	const result = translation[target];
	if (result === null) {
		return target;
	}

	return result;
}

const _ = translate;
export default _;

