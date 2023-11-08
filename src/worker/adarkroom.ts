// @ts-nocheck
var window = self;

function onMessageCallback() { postMessageCallBack("[global.js][onMessageCallback()]", arguments[0]) }

var Request = function () {
    onMessageCallback("[global.js][Request()]", arguments)
};
var Blob = function (buffer) {
    onMessageCallback("[global.js][Blob()]", arguments)
    this.arrayBuffer = function () {
        return new Promise(resolve => resolve(buffer));
    }


};

try {
	Object.defineProperty(window, "navigator", {
		set: function () {
			onMessageCallback("[global.js][window.navigator=]", arguments)
		},
		get: function () {
			onMessageCallback("[global.js][window.navigator]", arguments)
			return {
				userAgent: "",
			}
		}
	});
	Object.defineProperty(window, "location", {
		set: function () {
			onMessageCallback("[global.js][window.location=]", arguments)
		},
		get: function () {
			onMessageCallback("[global.js][window.location]", arguments)
			return {
				href: "",
				search: "",
			}
		}
	});
} catch (e) {
	onMessageCallback("not support defineProperty, minigame device", e);
	window = globalThis;
	location = {
		href: "",
		search: "",
	}
	navigator = {
		userAgent: "",
	}
	document = {
	}

}

window.fetch = function () {
    onMessageCallback("[global.js][window.fetch()]", arguments)
    return new Promise(resolve => resolve(new Blob([0])));
}

window.AudioContext = function () {
    var that = {}
    that.createBuffer = function (buffer) {
        return {
            getChannelData: function () {
                return buffer;
            }
        }
    }
    that.createGain = function () {
        return {
            gain: {
                setValueAtTime: function () {
                    onMessageCallback("[global.js][AudioContext.setValueAtTime()]", arguments)
                }, cancelScheduledValues: function () {
                    onMessageCallback("[global.js][AudioContext.cancelScheduledValues()]", arguments)
                }, setValueAtTime: function () {
                    onMessageCallback("[global.js][AudioContext.setValueAtTime()]", arguments)
                }, linearRampToValueAtTime: function () {
                    onMessageCallback("[global.js][AudioContext.linearRampToValueAtTime()]", arguments)
                }
            },
            connect: function () {
                onMessageCallback("[global.js][AudioContext.connect()]", arguments)
            }
        }
    }
    that.decodeAudioData = function () {
        onMessageCallback("[global.js][AudioContext.decodeAudioData()]", arguments)
    }
    return that;
}
window.Enemies = {};
window.State = {};
window.craftable = {}
window.good = {}
window.jQuery = {
    Callbacks: function () {
        onMessageCallback("[global.js][jQuery.Callbacks()]");
        var that = this;
        this.callbacks = this.callbacks || [];
        this.fire = function (event) {
            onMessageCallback("[global.js][jQuery.Callbacks.fire()]", arguments)
            that.callbacks.forEach(callback => callback(event));
        }
        this.add = function () {
            onMessageCallback("[global.js][jQuery.Callbacks.add()]", arguments)
            that.callbacks.push(arguments[0]);
        }
        this.remove = function () {
            onMessageCallback("[global.js][jQuery.Callbacks.remove()]", arguments)
            that.callbacks = that.callbacks.filter(callback => callback !== arguments[0]);

        }
        return that
    }
};
window.document = {

};

var elementSet = {
    "swipeElement": null,
    "elem": null,

}
var queue = [];
function postMessageCallBack() {
    if (typeof window.worker === 'undefined') {
        self.postMessage({ subject: 'Adarkroom', stage: 'running', args: [...arguments] });
    } else {

        if (window.processor === undefined) {
            queue.push({ subject: 'Adarkroom', stage: 'init', args: arguments });
        } else {
            queue.splice(0, queue.length).forEach(msg => window.processor.postMessage(msg));
            window.processor.postMessage({ subject: 'Adarkroom', stage: 'running', args: arguments });
        }
    }
}
onMessageCallback("[query.js][vars]", elementSet, queue)

window.$ = function () {
    if (typeof arguments[0] === 'string' && !arguments[0].startsWith('<') && elementSet[arguments[0]]) {
        return elementSet[arguments[0]];
    }
    var that = {
        dataSet: {
            boosted: (() => false)
        },
        attrSet: {
        },
        selector: null
    }
    if (typeof arguments[0] === 'string' && !arguments[0].startsWith('<')) {
        elementSet[arguments[0]] = that;
        postMessageCallBack(arguments[0])
    } else if (typeof arguments[0] === 'string' && arguments[0].startsWith('<')) {
        console.warn('[query.js][$][create new element]', ...arguments)
    }

    that.attr = function (key, value) {
        onMessageCallback("[query.js][$().attr()]", key, value)
        if (typeof key !== "string") {
            Object.assign(that.attrSet, key);
        } else if (value === undefined) {
            return this.attrSet[key]
        } else {
            this.attrSet[key] = value;
        }
        return that;
    }
    that.css = function (key, value) {
        onMessageCallback("[query.js][$().css()]", key, value)
        return that;
    }
    that.children = function () {
        onMessageCallback("[query.js][$().children()]")
        return [];
    }
    that.width = function (width) {
        onMessageCallback("[query.js][$().width()]", width)
        return that;
    }
    that.data = function (key, value) {
        onMessageCallback("[query.js][$().data()]", key, value)
        if (typeof key !== "string") {
            Object.assign(that.dataSet, key);
        } else if (value === undefined) {
            return this.dataSet[key]
        } else {
            this.dataSet[key] = value;
            return that;
        }
    }
    that.prependTo = function (element) {
        onMessageCallback("[query.js][$().prependTo()]", element);
        return that;
    }
    that.appendTo = function (element) {
        onMessageCallback("[query.js][$().appendTo()]", element);
        return that;
    }
    that.append = function (element) {
        onMessageCallback("[query.js][$().append()]", element);
        return that;
    }
    that.addClass = function (className) {
        onMessageCallback("[query.js][$().addClass()]", className);
        return that;
    }
    that.removeClass = function (className) {
        onMessageCallback("[query.js][$().removeClass()]", className);
        return that;
    }
    that.index = function (element) {
        onMessageCallback("[query.js][$().index()]", element);
        return -1;
    }
    that.animate = function (options) {
        onMessageCallback("[query.js][$().animate()]", options);
        return that;
    }
    that.hasClass = function (className) {
        onMessageCallback("[query.js][$().hasClass()]", className);
        return that;
    }
    that.hide = function () {
        onMessageCallback("[query.js][$().hide()]");
        return that;
    }
    that.show = function () {
        onMessageCallback("[query.js][$().show()]");
        return that;
    }
    that.text = function (text) {
        onMessageCallback("[query.js][$().text()]", text);
        return that;
    }
    that.click = function () {
        onMessageCallback("[query.js][$().clicked()]");
        return that;
    }
    that.off = function (eventName) {
        onMessageCallback(`[query.js][$().off()]${eventName}`);
        return that;
    }
    that.on = function (eventName) {
        onMessageCallback(`[query.js][$().on()]${eventName}`, ...arguments);
        return that;
    }
    that.keydown = function (callback) {
        onMessageCallback(`[query.js][$().keydown()]`, callback);
        return that;
    }
    that.keyup = function (callback) {
        onMessageCallback(`[query.js][$().keyup()]`, callback);
        return that;
    }
    if (arguments.length === 1) {
        if (arguments[0] instanceof Function) {
            arguments[0]();
        } else if (typeof arguments[0] === 'string') {
            that.selector = arguments[0];
            return that;
        } else {
            throw new Error(`[query.js][$()][error][not support one argument]`, ...arguments)
        }
    } else {
        if (arguments.length === 2 && typeof arguments[1] !== "string") {
            return {
                each: function () {
                    onMessageCallback("[query.js][$().iterator().each()]");
                },
                empty: function () {
                    onMessageCallback("[query.js][$().iterator().empty()]");
                }
            };
        } else if (arguments.length === 2 && typeof arguments[1].dataSet !== undefined) {
            onMessageCallback("[query.js][$(a,b)][warn][not implement]", ...arguments);
            return arguments[1].children().find(o => o.selector === arguments[0]);
        } else {
            throw new Error(`[query.js][$()][error][not support arguments]`, ...arguments)
        }
    }
}
window.$.isEmptyObject = function (o) {
    return o === null || o === undefined || o === '';
}

window.$.extend = Object.assign

window.swipeElement = window.$('swipeElement')
window.elem = window.$('elem');
(function() {

	var translate = function(text)
	{
		var xlate = translateLookup(text);
		
		if (typeof xlate == "function")
		{
			xlate = xlate.apply(this, arguments);
		}
		else if (arguments.length > 1)
		{
			var aps = Array.prototype.slice;
			var args = aps.call( arguments, 1 );
  
			xlate = formatter(xlate, args);
		}
		
		return xlate;
	};
	
	// I want it available explicity as well as via the object
	translate.translate = translate;
	
	//from https://gist.github.com/776196 via http://davedash.com/2010/11/19/pythonic-string-formatting-in-javascript/ 
	var defaultFormatter = (function() {
		var re = /\{([^}]+)\}/g;
		return function(s, args) {
			return s.replace(re, function(_, match){ return args[match]; });
		};
	}());
	var formatter = defaultFormatter;
	translate.setFormatter = function(newFormatter)
	{
		formatter = newFormatter;
	};
	
	translate.format = function()
	{
		var aps = Array.prototype.slice;
		var s = arguments[0];
		var args = aps.call( arguments, 1 );
  
		return formatter(s, args);
	};

	var dynoTrans = null;
	translate.setDynamicTranslator = function(newDynoTrans)
	{
		dynoTrans = newDynoTrans;
	};

	var translation = null;
	translate.setTranslation = function(newTranslation)
	{
		translation = newTranslation;
	};
	
	function translateLookup(target)
	{
		if (translation == null || target == null)
		{
			return target;
		}
		
		if (target in translation === false)
		{
			if (dynoTrans != null)
			{
				return dynoTrans(target);
			}
			return target;
		}
		
		var result = translation[target];
		if (result == null)
		{
			return target;
		}
		
		return result;
	}
	
	window._ = translate;

})();
_.setTranslation({"Dropbox connection": "dropbox\u8fde\u63a5", "connect game to dropbox local storage": "\u8fde\u63a5\u5230dropbox\u4e91\u5b58\u50a8", "connect": "\u8fde\u63a5", "cancel": "\u53d6\u6d88", "Dropbox Export / Import": "dropbox\u5bfc\u51fa/\u5bfc\u5165", "export or import save data to dropbox datastorage": "\u5bfc\u51fa\u6216\u5bfc\u5165\u5b58\u6863\u6587\u4ef6\u5230dropbox", "your are connected to dropbox with account / email ": "\u60a8\u5df2\u7528\u6b64\u8d26\u6237/\u7535\u5b50\u90ae\u4ef6\u8fde\u63a5\u5230dropbox: ", "save": "\u4fdd\u5b58", "load": "\u52a0\u8f7d", "signout": "\u767b\u51fa", "choose one slot to save to": "\u9009\u62e9\u4fdd\u5b58\u4f4d\u7f6e", "save to slot": "\u4fdd\u5b58\u5230\u4f4d\u7f6e", "choose one slot to load from": "\u9009\u62e9\u52a0\u8f7d\u4f4d\u7f6e", "load from slot": "\u52a0\u8f7d", "successfully saved to dropbox datastorage": "\u6210\u529f\u4fdd\u5b58\u5230dropbox", "error while saving to dropbox datastorage": "\u4fdd\u5b58\u5230dropbox\u51fa\u9519", "ok": "\u786e\u8ba4", "boxer": "\u62f3\u51fb\u624b", "punches do more damage": "\u5f92\u624b\u4f24\u5bb3\u7ffb\u500d", "learned to throw punches with purpose": "\u5b66\u4f1a\u4e86\u6709\u610f\u8bc6\u5730\u51fa\u62f3", "martial artist": "\u6b66\u6597\u5bb6", "punches do even more damage.": "\u5f92\u624b\u9020\u6210\u66f4\u591a\u7684\u4f24\u5bb3", "learned to fight quite effectively without weapons": "\u5b66\u4f1a\u4e86\u9ad8\u6548\u7387\u7684\u5f92\u624b\u640f\u51fb", "unarmed master": "\u5f92\u624b\u5b97\u5e08", "punch twice as fast, and with even more force": "\u51fa\u62f3\u901f\u5ea6\u7ffb\u500d\uff0c\u529b\u9053\u4e5f\u66f4\u5927", "learned to strike faster without weapons": "\u5b66\u4f1a\u4e86\u5982\u4f55\u66f4\u5feb\u901f\u5730\u51fa\u62f3", "barbarian": "\u91ce\u86ee\u4eba", "melee weapons deal more damage": "\u8fd1\u6218\u6b66\u5668\u9020\u6210\u66f4\u9ad8\u4f24\u5bb3", "learned to swing weapons with force": "\u5b66\u4f1a\u4e86\u5982\u4f55\u53d1\u6325\u52b2\u529b\uff0c\u6325\u821e\u6b66\u5668", "slow metabolism": "\u51cf\u7f13\u4ee3\u8c22", "go twice as far without eating": "\u4e0d\u5403\u4e1c\u897f\u80fd\u575a\u6301\u8d70\u7684\u8ddd\u79bb\u7ffb\u500d", "learned how to ignore the hunger": "\u5b66\u4f1a\u5982\u4f55\u5fcd\u9965\u6328\u997f", "desert rat": "\u8352\u6f20\u8df3\u9f20", "go twice as far without drinking": "\u4e0d\u559d\u6c34\u80fd\u575a\u6301\u8d70\u7684\u8ddd\u79bb\u7ffb\u500d", "learned to love the dry air": "\u65e0\u754f\u5e72\u71e5", "evasive": "\u907f\u5b9e\u5c31\u865a", "dodge attacks more effectively": "\u66f4\u6709\u6548\u7684\u95ea\u907f\u653b\u51fb", "learned to be where they're not": "\u5b66\u4f1a\u4e86\u95ea\u907f\u653b\u51fb", "precise": "\u7cbe\u5bc6", "land blows more often": "\u547d\u4e2d\u7387\u63d0\u9ad8", "learned to predict their movement": "\u5b66\u4f1a\u9884\u5224\u4ed6\u4eba\u7684\u52a8\u4f5c", "scout": "\u4fa6\u67e5\u672f", "see farther": "\u770b\u5f97\u66f4\u8fdc", "learned to look ahead": "\u5f3a\u5316\u89c6\u91ce", "stealthy": "\u6f5c\u884c", "better avoid conflict in the wild": "\u66f4\u597d\u5730\u56de\u907f\u8352\u91ce\u4e2d\u7684\u51b2\u7a81", "learned how not to be seen": "\u5b66\u4f1a\u4e86\u9690\u533f\u8eab\u5f62", "gastronome": "\u7f8e\u98df\u5bb6", "restore more health when eating": "\u8fdb\u98df\u6062\u590d\u66f4\u591a\u751f\u547d", "learned to make the most of food": "\u5b66\u4f1a\u5145\u5206\u6d88\u5316\u98df\u7269", "get the app.": "\u5e94\u7528\u5546\u5e97", "lights off.": "\u591c\u95f4\u6a21\u5f0f", "hyper.": "\u52a0\u901f", "restart.": "\u91cd\u542f", "share.": "\u5206\u4eab", "save.": "\u4fdd\u5b58", "dropbox.": "dropbox", "github.": "github", "Export / Import": "\u5bfc\u51fa/\u5bfc\u5165", "export or import save data, for backing up": "\u5bfc\u51fa\u6216\u5bfc\u5165\u5b58\u6863\u6587\u4ef6\uff0c\u7528\u4e8e\u5907\u4efd", "or migrating computers": "\u6216\u8fc1\u79fb\u81f3\u522b\u7684\u7535\u8111", "export": "\u5bfc\u51fa", "import": "\u5bfc\u5165", "save this.": "\u4fdd\u5b58\u6b64\u4ee3\u7801", "got it": "\u5df2\u5b8c\u6210", "are you sure?": "\u60a8\u786e\u5b9a\u5417\uff1f", "if the code is invalid, all data will be lost.": "\u5982\u679c\u5b58\u6863\u4ee3\u7801\u65e0\u6548\uff0c\u6240\u6709\u6570\u636e\u5747\u4f1a\u4e22\u5931\u3002", "this is irreversible.": "\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u9500\u3002", "yes": "\u662f", "no": "\u5426", "put the save code here.": "\u6b64\u5904\u53ef\u586b\u5165\u5b58\u6863\u4ee3\u7801", "Restart?": "\u91cd\u5f00\uff1f", "restart the game?": "\u91cd\u5f00\u6e38\u620f\uff1f", "Get the App": "\u5e94\u7528\u5546\u5e97", "bring the room with you.": "\u60a8\u786e\u5b9a\u5417\uff1f", "ios": "iOS", "close": "\u5173\u95ed", "Share": "\u5206\u4eab", "bring your friends.": "\u5206\u4eab\u7ed9\u4f60\u7684\u597d\u53cb\u3002", "lights on.": "\u5f00\u706f", "Go Hyper?": "\u8981\u52a0\u901f\u4e48\uff1f", "turning hyper mode speeds up the game to x2 speed. do you want to do that?": "\u5f00\u542f\u52a0\u901f\u6a21\u5f0f\u5c06\u4f1a\u4f7f\u6e38\u620f\u901f\u5ea6\u53d8\u4e3a\u539f\u6709\u76842\u500d\u3002\u4f60\u786e\u5b9a\u8981\u52a0\u901f\u5417\uff1f", "classic.": "\u539f\u901f", "{0} per {1}s": "{0} /{1}\u79d2", "pause.": "\u786e\u8ba4", "eat meat": "\u5403\u8089", "use meds": "\u670d\u836f", "miss": "\u5931\u624b", "stunned": "\u60ca\u5413", "leave": "\u79bb\u5f00", "drop:": "\u4e22\u5f03:", "nothing": "\u4e00\u65e0\u6240\u83b7", "take": "\u5e26\u8d70", "take:": "\u83b7\u5f97:", "nothing to take": "\u4e00\u65e0\u6240\u83b7", "all": "\u6240\u6709", "take everything": "\u62ff\u8d70\u4e00\u5207", "take all you can": "\u62ff\u8d70\u53ef\u5e26\u8d70\u7684\u4e00\u5207", " and ": "\u4ee5\u53ca", "*** EVENT ***": "*** \u6d88\u606f ***", "saved.": "\u5df2\u4fdd\u5b58", "wood": "\u6728\u5934", "builder": "\u5efa\u9020\u8005", "teeth": "\u7259\u9f7f", "meat": "\u8089", "fur": "\u6bdb\u76ae", "alien alloy": "\u5916\u661f\u5408\u91d1", "bullets": "\u5b50\u5f39", "charm": "\u7b26\u5492", "leather": "\u76ae\u9769", "iron": "\u94c1", "steel": "\u94a2", "coal": "\u7164", "sulphur": "\u786b\u78fa", "energy cell": "\u80fd\u91cf\u5143\u4ef6", "torch": "\u706b\u628a", "medicine": "\u836f\u5242", "hunter": "\u730e\u4eba", "trapper": "\u9677\u9631\u5e08", "tanner": "\u76ae\u9769\u5e08", "grenade": "\u624b\u96f7", "bolas": "\u5957\u7d22", "bayonet": "\u523a\u5200", "charcutier": "\u718f\u8089\u5e08", "iron miner": "\u94c1\u77ff\u5de5\u4eba", "iron mine": "\u94c1\u77ff", "coal miner": "\u7164\u77ff\u5de5\u4eba", "coal mine": "\u7164\u77ff", "sulphur miner": "\u786b\u78fa\u77ff\u5de5", "sulphur mine": "\u786b\u78fa\u77ff", "armourer": "\u519b\u68b0\u5de5\u4eba", "steelworker": "\u70bc\u94a2\u5de5\u4eba", "bait": "\u8bf1\u9975", "cured meat": "\u718f\u8089", "scales": "\u9cde\u7247", "compass": "\u7f57\u76d8", "laser rifle": "\u6fc0\u5149\u6b65\u67aa", "gatherer": "\u4f10\u6728\u8005", "cloth": "\u5e03\u6599", "thieves": "\u5c0f\u5077", "not enough fur": "\u76ae\u6bdb\u4e0d\u591f\u4e86", "not enough wood": "\u6728\u5934\u4e0d\u591f\u4e86", "not enough coal": "\u7164\u70ad\u4e0d\u591f\u4e86", "not enough iron": "\u94c1\u4e0d\u591f\u4e86", "not enough steel": "\u94a2\u4e0d\u591f\u4e86", "not enough sulphur": "\u786b\u78fa\u4e0d\u591f\u4e86", "baited trap": "\u4e0a\u9975\u9677\u9631", "not enough scales": "\u9cde\u7247\u4e0d\u591f\u4e86", "not enough cloth": "\u5e03\u6599\u4e0d\u591f\u4e86", "not enough teeth": "\u7259\u9f7f\u4e0d\u591f\u4e86", "not enough leather": "\u76ae\u9769\u4e0d\u591f\u4e86", "not enough meat": "\u8089\u4e0d\u591f\u4e86", "the compass points east": "\u7f57\u76d8\u6307\u5411\u4e1c\u65b9", "the compass points west": "\u7f57\u76d8\u6307\u5411\u897f\u65b9", "the compass points north": "\u7f57\u76d8\u6307\u5411\u5317\u65b9", "the compass points south": "\u7f57\u76d8\u6307\u5411\u5357\u65b9", "the compass points northeast": "\u7f57\u76d8\u6307\u5411\u4e1c\u5317", "the compass points northwest": "\u7f57\u76d8\u6307\u5411\u897f\u5317", "the compass points southeast": "\u7f57\u76d8\u6307\u5411\u4e1c\u5357", "the compass points southwest": "\u7f57\u76d8\u6307\u5411\u897f\u5357", "Outside": "\u91ce\u5916", "scraps of fur": "\u76ae\u6bdb\u788e\u7247", "bits of meat": "\u5c0f\u7247\u8089", "strange scales": "\u53e4\u602a\u9cde\u7247", "scattered teeth": "\u6b8b\u7f3a\u7259\u9f7f", "tattered cloth": "\u7834\u70c2\u5e03\u6599", "a crudely made charm": "\u505a\u5de5\u7c97\u7cd9\u7684\u7b26\u5492", "A Silent Forest": "\u9759\u8c27\u68ee\u6797", "gather wood": "\u4f10\u6728", "a stranger arrives in the night": "\u964c\u751f\u4eba\u5728\u591c\u91cc\u62b5\u8fbe", "a weathered family takes up in one of the huts.": "\u4e00\u6237\u9971\u7ecf\u98ce\u96e8\u7684\u4eba\u5bb6\u4f4f\u8fdb\u4e00\u680b\u5c0f\u5c4b", "a small group arrives, all dust and bones.": "\u4e00\u7fa4\u7626\u9aa8\u5d99\u5ccb\uff0c\u98ce\u5c18\u4ec6\u4ec6\u7684\u4eba\u62b5\u8fbe\u4e86", "a convoy lurches in, equal parts worry and hope.": "\u8f66\u961f\u5386\u7ecf\u78e8\u96be\u6765\u5230\u4e86\u5c0f\u9547\uff0c\u6000\u7740\u548c\u62c5\u5fe7\u540c\u7b49\u7684\u5e0c\u671b", "the town's booming. word does get around.": "\u9547\u5b50\u7e41\u8363\u70ed\u95f9\uff0c\u6d88\u606f\u4e0d\u80eb\u800c\u8d70", "pop ": "\u4eba\u53e3 ", "forest": "\u6811\u6797", "village": "\u6751\u843d", "check traps": "\u67e5\u770b\u9677\u9631", "A Lonely Hut": "\u5b64\u72ec\u5c0f\u5c4b", "A Tiny Village": "\u5c0f\u578b\u6751\u843d", "A Modest Village": "\u4e2d\u578b\u6751\u843d", "A Large Village": "\u5927\u578b\u6751\u843d", "A Raucous Village": "\u55a7\u56a3\u5c0f\u9547", "the sky is grey and the wind blows relentlessly": "\u5929\u8272\u9634\u6c89\uff0c\u98ce\u65e0\u60c5\u5730\u522e\u7740", "dry brush and dead branches litter the forest floor": "\u6797\u5730\u4e0a\u6563\u843d\u7740\u67af\u679d\u8d25\u53f6", "the traps contain ": "\u9677\u9631\u6355\u83b7\u5230", "A Dusty Path": "\u6f2b\u6f2b\u5c18\u9014", "supplies:": "\u4f9b\u5e94:", "embark": "\u51fa\u53d1", "the compass points ": "\u7f57\u76d8\u6307\u5411:", "perks:": "\u80fd\u529b:", "none": "\u7a7a", "armour": "\u62a4\u7532", "water": "\u6c34", "restores": "\u6062\u590d", "hp": "\u751f\u547d", "use with rifle": "\u6b65\u67aa", "use with laser rifle": "\u6fc0\u5149\u6b65\u67aa", "free {0}/{1}": "\u80cc\u5305\u5269\u4f59\u7a7a\u95f4: {0}/{1}", "damage": "\u4f24\u5bb3", "weight": "\u8d1f\u91cd", "available": "\u53ef\u7528", "trap": "\u9677\u9631", "builder says she can make traps to catch any creatures might still be alive out there": "\u5efa\u9020\u8005\u8bf4\u5979\u80fd\u591f\u5236\u4f5c\u9677\u9631\u6765\u6355\u6349\u90a3\u4e9b\u4ecd\u5728\u91ce\u5916\u6d3b\u52a8\u7684\u91ce\u517d", "more traps to catch more creatures": "\u9677\u9631\u8d8a\u591a\uff0c\u6293\u5230\u7684\u730e\u7269\u5c31\u8d8a\u591a", "more traps won't help now": "\u518d\u589e\u52a0\u9677\u9631\u5df2\u6beb\u65e0\u88e8\u76ca", "cart": "\u8d27\u8f66", "builder says she can make a cart for carrying wood": "\u5efa\u9020\u8005\u8bf4\u5979\u80fd\u591f\u5236\u9020\u51fa\u8d27\u8f66\uff0c\u7528\u6765\u8fd0\u8f7d\u6728\u5934", "the rickety cart will carry more wood from the forest": "\u6447\u6447\u6643\u6643\u7684\u8d27\u8f66\u6ee1\u8f7d\u4ece\u68ee\u6797\u8fd0\u51fa\u7684\u6728\u5934", "hut": "\u5c0f\u5c4b", "builder says there are more wanderers. says they'll work, too.": "\u5efa\u9020\u8005\u8bf4\u8fd9\u91cc\u6709\u8bb8\u591a\u6d41\u6d6a\u8005\uff0c\u4ed6\u4eec\u4e5f\u4f1a\u6765\u5de5\u4f5c", "builder puts up a hut, out in the forest. says word will get around.": "\u5efa\u9020\u8005\u5728\u6797\u4e2d\u5efa\u8d77\u4e00\u680b\u5c0f\u5c4b\uff0c\u5979\u8bf4\u6d88\u606f\u5f88\u5feb\u5c31\u4f1a\u6d41\u4f20\u51fa\u53bb", "no more room for huts.": "\u518d\u6ca1\u6709\u53ef\u4ee5\u5efa\u5c0f\u5c4b\u7684\u7a7a\u5730\u4e86", "lodge": "\u72e9\u730e\u5c0f\u5c4b", "villagers could help hunt, given the means": "\u5047\u5982\u5de5\u5177\u9f50\u5907\uff0c\u6751\u6c11\u4e5f\u80fd\u5e2e\u5fd9\u72e9\u730e", "the hunting lodge stands in the forest, a ways out of town": "\u72e9\u730e\u5c0f\u5c4b\u5df2\u7ecf\u77d7\u7acb\u5728\u6797\u4e2d\uff0c\u8ddd\u79bb\u6751\u5b50\u4e0d\u8fdc", "trading post": "\u8d38\u6613\u7ad9", "a trading post would make commerce easier": "\u8d38\u6613\u7ad9\u8ba9\u8d38\u6613\u53d8\u5f97\u66f4\u52a0\u4fbf\u6377", "now the nomads have a place to set up shop, they might stick around a while": "\u73b0\u5728\u6e38\u7267\u90e8\u843d\u6709\u5730\u65b9\u5b89\u8425\u624e\u5be8\u8bbe\u7acb\u5546\u94fa\u4e86\uff0c\u4ed6\u4eec\u4e5f\u8bb8\u4f1a\u591a\u9017\u7559\u4e00\u6bb5\u65f6\u95f4", "tannery": "\u5236\u9769\u5c4b", "builder says leather could be useful. says the villagers could make it.": "\u5efa\u9020\u8005\u8bf4\u76ae\u9769\u4f1a\u5f88\u6709\u7528\uff0c\u800c\u4e14\u6751\u6c11\u4e5f\u4f1a\u505a", "tannery goes up quick, on the edge of the village": "\u5236\u9769\u5c4b\u5f88\u5feb\u5728\u6751\u5b50\u4e00\u89d2\u5efa\u7acb\u4e86\u8d77\u6765", "smokehouse": "\u718f\u8089\u623f", "should cure the meat, or it'll spoil. builder says she can fix something up.": "\u5e94\u8be5\u628a\u8089\u718f\u4e00\u4e0b\uff0c\u5426\u5219\u4f1a\u8150\u574f\u6389\u3002\u5efa\u9020\u8005\u8bf4\u5979\u80fd\u641e\u5b9a\u8fd9\u4e2a\u3002", "builder finishes the smokehouse. she looks hungry.": "\u5efa\u9020\u8005\u9020\u597d\u4e86\u718f\u8089\u623f\u3002\u5979\u770b\u8d77\u6765\u9965\u80a0\u8f98\u8f98\u3002", "workshop": "\u5de5\u574a", "builder says she could make finer things, if she had the tools": "\u5efa\u9020\u8005\u8bf4\u5982\u679c\u5979\u6709\u5de5\u5177\u7684\u8bdd\u80fd\u505a\u51fa\u4e00\u4e9b\u66f4\u7cbe\u826f\u7684\u4e1c\u897f", "workshop's finally ready. builder's excited to get to it": "\u5de5\u574a\u7ec8\u4e8e\u5efa\u597d\u4e86\uff0c\u5efa\u9020\u8005\u6fc0\u52a8\u4e0d\u5df2", "steelworks": "\u70bc\u94a2\u574a", "builder says the villagers could make steel, given the tools": "\u5efa\u9020\u8005\u8bf4\u7ed9\u6751\u6c11\u5de5\u5177\u7684\u8bdd\u4ed6\u4eec\u5c31\u80fd\u5e2e\u5fd9\u70bc\u94a2", "a haze falls over the village as the steelworks fires up": "\u70bc\u94a2\u574a\u5f00\u5de5\u540e\uff0c\u4e00\u7f15\u9ed1\u70df\u98d8\u5411\u6751\u5e84\u4e0a\u7a7a", "armoury": "\u519b\u68b0\u574a", "builder says it'd be useful to have a steady source of bullets": "\u5efa\u9020\u8005\u8bf4\u62e5\u6709\u7a33\u5b9a\u7684\u5f39\u836f\u6765\u6e90\u5f88\u6709\u5fc5\u8981", "armoury's done, welcoming back the weapons of the past.": "\u519b\u68b0\u574a\u5efa\u597d\u4e86\uff0c\u6b22\u8fce\u4f7f\u7528\u8fd9\u4e9b\u8fc7\u65f6\u7684\u6b66\u5668", "a torch to keep the dark away": "\u9a71\u6563\u9ed1\u6697\u7684\u706b\u628a", "waterskin": "\u6c34\u58f6", "this waterskin'll hold a bit of water, at least": "\u8d77\u7801\u80fd\u88c5\u90a3\u4e48\u70b9\u513f\u6c34", "cask": "\u6c34\u6876", "the cask holds enough water for longer expeditions": "\u4e3a\u66f4\u957f\u7684\u63a2\u7d22\u4e4b\u65c5\u63d0\u4f9b\u5145\u8db3\u7684\u6c34\u6e90", "water tank": "\u6c34\u7f50", "never go thirsty again": "\u518d\u4e5f\u4e0d\u62c5\u5fc3\u53e3\u6e34", "bone spear": "\u9aa8\u67aa", "this spear's not elegant, but it's pretty good at stabbing": "\u8fd9\u67c4\u6807\u67aa\u4e0d\u600e\u4e48\u7cbe\u81f4\uff0c\u4f46\u7528\u6765\u6233\u523a\u624b\u611f\u4e0d\u9519", "rucksack": "\u53cc\u80a9\u5305", "carrying more means longer expeditions to the wilds": "\u8352\u91ce\u65c5\u884c\u65f6\u643a\u5e26\u66f4\u591a\u7269\u8d44", "wagon": "\u7bf7\u8f66", "the wagon can carry a lot of supplies": "\u7bf7\u8f66\u80fd\u591f\u643a\u5e26\u8bb8\u591a\u7269\u8d44", "convoy": "\u8f66\u961f", "the convoy can haul mostly everything": "\u8f66\u961f\u51e0\u4e4e\u80fd\u628a\u6240\u6709\u4e1c\u897f\u90fd\u88c5\u4e0b", "l armour": "\u76ae\u7532", "leather's not strong. better than rags, though.": "\u76ae\u9769\u4e0d\u7b97\u7ed3\u5b9e\u3002\u603b\u6bd4\u62ab\u5757\u7834\u5e03\u5f3a", "i armour": "\u94c1\u7532", "iron's stronger than leather": "\u94c1\u6bd4\u76ae\u8981\u7ed3\u5b9e", "s armour": "\u94a2\u7532", "steel's stronger than iron": "\u94a2\u7684\u603b\u6bd4\u94c1\u7684\u5f3a", "iron sword": "\u94c1\u5251", "sword is sharp. good protection out in the wilds.": "\u5251\u5f88\u950b\u5229\u3002\u80fd\u5728\u91ce\u5916\u63d0\u4f9b\u4e0d\u9519\u7684\u9632\u62a4", "steel sword": "\u94a2\u5251", "the steel is strong, and the blade true.": "\u597d\u94a2\u51fa\u5229\u5203", "rifle": "\u6b65\u67aa", "black powder and bullets, like the old days.": "\u9ed1\u706b\u836f\u548c\u5b50\u5f39\uff0c\u5c31\u50cf\u8fc7\u53bb\u90a3\u6837", "Room": "\u623f\u95f4", "A Dark Room": "\u5c0f\u9ed1\u5c4b", "light fire": "\u751f\u706b", "stoke fire": "\u6dfb\u67f4", "the room is {0}": "\u623f\u95f4{0}", "the fire is {0}": "\u706b\u5806{0}", "the stranger is standing by the fire. she says she can help. says she builds things.": "\u90a3\u540d\u964c\u751f\u4eba\u7ad9\u5728\u706b\u5806\u65c1\u3002\u5979\u8bf4\u5979\u53ef\u4ee5\u5e2e\u5fd9\u3002\u5979\u8bf4\u5979\u4f1a\u5efa\u4e1c\u897f", "freezing": "\u5bd2\u51b7\u523a\u9aa8", "cold": "\u5f88\u51b7", "mild": "\u5f88\u5b9c\u4eba", "warm": "\u6696\u548c", "hot": "\u5f88\u70ed", "dead": "\u7184\u706d\u4e86", "smoldering": "\u5f00\u59cb\u5192\u70df", "flickering": "\u5192\u51fa\u706b\u82d7", "burning": "\u71c3\u70e7\u7740", "roaring": "\u718a\u718a\u71c3\u70e7", "A Firelit Room": "\u751f\u706b\u95f4", "not enough wood to get the fire going": "\u6728\u5934\u4e0d\u591f\u751f\u706b\u4e86", "the wood has run out": "\u6728\u5934\u7528\u5149\u4e86", "the light from the fire spills from the windows, out into the dark": "\u706b\u5149\u6620\u51fa\u7a97\u5916\uff0c\u6295\u5165\u9ed1\u6697\u4e4b\u4e2d", "builder stokes the fire": "\u5efa\u9020\u8005\u6dfb\u4e86\u67f4\u706b", "the wind howls outside": "\u5c4b\u5916\u5bd2\u98ce\u547c\u5578", "the wood is running out": "\u6728\u5934\u5c31\u5feb\u70e7\u5b8c\u4e86", "a ragged stranger stumbles through the door and collapses in the corner": "\u4e00\u4e2a\u8863\u886b\u8934\u891b\u7684\u964c\u751f\u4eba\u6b65\u5c65\u8e52\u8dda\u5730\u6b65\u5165\u95e8\u6765\uff0c\u762b\u5012\u5728\u89d2\u843d\u91cc", "the stranger shivers, and mumbles quietly. her words are unintelligible.": "\u964c\u751f\u4eba\u745f\u745f\u53d1\u6296\uff0c\u5462\u5583\u4e0d\u5df2\uff0c\u542c\u4e0d\u6e05\u5728\u8bf4\u4e9b\u4ec0\u4e48", "the stranger in the corner stops shivering. her breathing calms.": "\u89d2\u843d\u91cc\u7684\u964c\u751f\u4eba\u4e0d\u518d\u98a4\u6296\u4e86\uff0c\u5979\u7684\u547c\u5438\u5e73\u9759\u4e86\u4e0b\u6765", "stores": "\u5e93\u5b58", "weapons": "\u6b66\u5668", "total": "\u603b\u8ba1", "not enough ": "\u4e0d\u591f\u4e86", "builder just shivers": "\u5efa\u9020\u8005\u8fd8\u5728\u745f\u745f\u53d1\u6296", "build:": "\u5efa\u7b51\u7269:", "craft:": "\u5236\u9020:", "buy:": "\u8d2d\u4e70:", "Ship": "\u98de\u8239", "An Old Starship": "\u7834\u65e7\u661f\u8230", "hull:": "\u5916\u58f3:", "engine:": "\u5f15\u64ce:", "reinforce hull": "\u52a0\u56fa\u8239\u8eab", "upgrade engine": "\u5347\u7ea7\u5f15\u64ce", "lift off": "\u70b9\u706b\u8d77\u98de", "somewhere above the debris cloud, the wanderer fleet hovers. been on this rock too long.": "\u788e\u7247\u4e91\u4e0a\u65b9\u7684\u67d0\u5904\uff0c\u6d41\u6d6a\u8005\u8230\u961f\u5f98\u5f8a\u7740\u3002\u5728\u8fd9\u5757\u5ca9\u77f3\u4e0a\u592a\u4e45\u4e86\u3002", "not enough alien alloy": "\u5916\u661f\u5408\u91d1\u4e0d\u8db3", "Ready to Leave?": "\u51c6\u5907\u597d\u8981\u79bb\u5f00\u4e86\u5417?", "time to get out of this place. won't be coming back.": "\u662f\u65f6\u5019\u79bb\u5f00\u8fd9\u91cc\u4e86\u3002\u4e0d\u518d\u56de\u5934", "linger": "\u88f9\u8db3\u5f98\u5f8a", "hull: ": "\u8239\u8eab:", "Troposphere": "\u5bf9\u6d41\u5c42", "Stratosphere": "\u5e73\u6d41\u5c42", "Mesosphere": "\u4e2d\u6c14\u5c42", "Thermosphere": "\u589e\u6e29\u5c42", "Exosphere": "\u5916\u9038\u5c42", "Space": "\u592a\u7a7a", "score for this game: {0}": "\u6e38\u620f\u5f97\u5206: {0}", "total score: {0}": "\u603b\u5206: {0}", "expanded story. alternate ending. behind the scenes commentary. get the app.": "\u5c3e\u58f0 \u6e38\u620f\u7ed3\u675f \u8bc4\u8bba \u5e94\u7528\u5546\u5e97", "iOS.": "iOS", "android.": "android", "punch": "\u6325\u62f3", "stab": "\u6233\u523a", "swing": "\u6325\u65a9", "slash": "\u5288\u780d", "thrust": "\u624e\u523a", "shoot": "\u5f00\u706b", "blast": "\u5f15\u7206", "lob": "\u6295\u63b7", "tangle": "\u7275\u7eca", "An&nbsp;Outpost": "\u524d\u54e8", "Iron&nbsp;Mine": "\u94c1\u77ff", "Coal&nbsp;Mine": "\u7164\u77ff", "Sulphur&nbsp;Mine": "\u786b\u78fa\u77ff", "An&nbsp;Old&nbsp;House": "\u7834\u65e7\u5c0f\u5c4b", "A&nbsp;Damp&nbsp;Cave": "\u6f6e\u6e7f\u6d1e\u7a74", "An&nbsp;Abandoned&nbsp;Town": "\u5e9f\u5f03\u5c0f\u9547", "A&nbsp;Ruined&nbsp;City": "\u88ab\u6bc1\u7684\u57ce\u5e02", "A&nbsp;Crashed&nbsp;Starship": "\u5760\u6bc1\u661f\u8230", "A&nbsp;Borehole": "\u5de8\u5751", "A&nbsp;Battlefield": "\u6218\u573a", "A&nbsp;Murky&nbsp;Swamp": "\u8ff7\u96fe\u6cbc\u6cfd", "A&nbsp;Destroyed&nbsp;Village": "\u88ab\u6467\u6bc1\u7684\u6751\u843d", "water:{0}": "\u6c34:{0}", "pockets": "\u80cc\u5305", "hp: {0}/{1}": "\u751f\u547d: {0}/{1}", "dangerous to be this far from the village without proper protection": "\u6ca1\u6709\u59a5\u5584\u9632\u62a4\u79bb\u5f00\u6751\u5b50\uff0c\u8fdc\u884c\u5f88\u5371\u9669", "safer here": "\u8fd9\u91cc\u53ef\u7b97\u5b89\u5168\u4e86", "the meat has run out": "\u8089\u5df2\u7ecf\u5403\u5b8c\u4e86", "starvation sets in": "\u9965\u997f\u88ad\u6765", "there is no more water": "\u6c34\u5df2\u8017\u5c3d", "the thirst becomes unbearable": "\u53e3\u6e34\u96be\u8010", "the trees yield to dry grass. the yellowed brush rustles in the wind.": "\u6811\u6728\u6b6a\u5012\u5728\u5e72\u8349\u4e1b\u4e2d\uff0c\u67af\u9ec4\u7684\u704c\u6728\u5728\u98ce\u4e2d\u6c99\u6c99\u4f5c\u54cd", "the trees are gone. parched earth and blowing dust are poor replacements.": "\u6811\u6728\u90fd\u6d88\u5931\u4e86\uff0c\u552f\u7559\u4e0b\u5e72\u88c2\u7684\u5927\u5730\u548c\u98de\u626c\u7684\u5c18\u571f", "trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.": "\u5730\u5e73\u7ebf\u4e0a\u9690\u7ea6\u77a7\u89c1\u6811\u6797\u3002\u8349\u5730\u6e10\u6e10\u7a00\u758f\uff0c\u66ff\u4ee3\u4ee5\u94fa\u7740\u67af\u679d\u8d25\u53f6\u7684\u68ee\u6797", "the grasses thin. soon, only dust remains.": "\u8349\u5730\u5f88\u5feb\u7a00\u758f\u4e86\u8d77\u6765\uff0c\u552f\u7559\u4e0b\u6f2b\u5929\u626c\u5c18", "the barrens break at a sea of dying grass, swaying in the arid breeze.": "\u8352\u8349\u5982\u6d77\uff0c\u5728\u71e5\u70ed\u7684\u98ce\u4e2d\u6447\u66f3\u7740\uff0c\u4e2d\u95f4\u73b0\u51fa\u4e86\u4e00\u7247\u8352\u5730", "a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.": "\u5c18\u571f\u4e2d\u957f\u51fa\u4e86\u7ed3\u7624\u7684\u6811\u5899\uff0c\u679d\u5e72\u5728\u5934\u9876\u7f20\u7ed5\u6210\u9aa8\u9abc\u822c\u7684\u7a79\u9876", "Wanderer": "\u6f2b\u6e38\u8005", "The&nbsp;Village": "\u6751\u5e84", "the world fades": "\u773c\u524d\u7684\u4e16\u754c\u70df\u6d88\u4e91\u6563", "water replenished": "\u6c34\u8865\u5145\u597d\u4e86", "A Barren World": "\u8352\u829c\u4e16\u754c", "A Snarling Beast": "\u5486\u54ee\u7684\u91ce\u517d", "snarling beast": "\u5486\u54ee\u7684\u91ce\u517d", "the snarling beast is dead": "\u91ce\u517d\u5012\u4e0b\u4e86", "a snarling beast leaps out of the underbrush": "\u4e00\u53ea\u91ce\u517d\u4ece\u704c\u6728\u4e1b\u91cc\u8e7f\u4e86\u51fa\u6765", "A Gaunt Man": "\u6194\u60b4\u7684\u7537\u5b50", "gaunt man": "\u6194\u60b4\u7684\u7537\u5b50", "the gaunt man is dead": "\u6194\u60b4\u7684\u7537\u5b50\u5012\u4e0b\u4e86", "a gaunt man approaches, a crazed look in his eye": "\u4e00\u540d\u6194\u60b4\u7684\u7537\u5b50\u9760\u4e86\u8fc7\u6765\uff0c\u773c\u5e95\u6d41\u9732\u51fa\u75af\u72c2", "A Strange Bird": "\u602a\u9e1f", "strange bird": "\u602a\u9e1f", "the strange bird is dead": "\u602a\u9e1f\u5012\u4e0b\u4e86", "a strange looking bird speeds across the plains": "\u4e00\u53ea\u6a21\u6837\u53e4\u602a\u7684\u9e1f\u5feb\u901f\u63a0\u8fc7\u5e73\u539f", "A Shivering Man": "\u98a4\u6296\u7684\u7537\u5b50", "shivering man": "\u98a4\u6296\u7684\u7537\u5b50", "the shivering man is dead": "\u98a4\u6296\u7684\u7537\u5b50\u5012\u4e0b\u4e86", "a shivering man approaches and attacks with surprising strength": "\u4e00\u540d\u98a4\u6296\u7684\u7537\u5b50\u9760\u4e86\u8fc7\u6765\uff0c\u4ee5\u4ee4\u4eba\u5403\u60ca\u7684\u529b\u91cf\u53d1\u8d77\u88ad\u51fb", "A Man-Eater": "\u98df\u4eba\u602a", "man-eater": "\u98df\u4eba\u602a", "the man-eater is dead": "\u98df\u4eba\u602a\u5012\u4e0b\u4e86", "a large creature attacks, claws freshly bloodied": "\u4e00\u53ea\u5de8\u5927\u7684\u751f\u7269\u88ad\u6765\uff0c\u722a\u5b50\u4e0a\u9c9c\u8840\u6dcb\u6f13", "A Scavenger": "\u62fe\u8352\u8005", "scavenger": "\u62fe\u8352\u8005", "the scavenger is dead": "\u62fe\u8352\u8005\u88ab\u6d88\u706d\u4e86", "a scavenger draws close, hoping for an easy score": "\u4e00\u540d\u62fe\u8352\u8005\u8d34\u4e86\u8fc7\u6765\uff0c\u60f3\u8981\u53d1\u8d77\u5077\u88ad", "A Huge Lizard": "\u5de8\u8725", "lizard": "\u5de8\u8725", "the lizard is dead": "\u5de8\u8725\u5012\u4e0b\u4e86", "the grass thrashes wildly as a huge lizard pushes through": "\u8349\u4e1b\u75af\u6447\uff0c\u4e00\u53ea\u5de8\u8725\u6251\u4e86\u51fa\u6765", "A Feral Terror": "\u51f6\u602a", "feral terror": "\u51f6\u602a", "the feral terror is dead": "\u51f6\u602a\u5012\u4e0b\u4e86", "a beast, wilder than imagining, erupts out of the foliage": "\u4e00\u53ea\u51f6\u602a\u4ee5\u8d85\u4e4e\u60f3\u8c61\u7684\u72c2\u91ce\u4ece\u6797\u4e2d\u6251\u51fa", "A Soldier": "\u58eb\u5175", "soldier": "\u58eb\u5175", "the soldier is dead": "\u58eb\u5175\u5012\u4e0b\u4e86", "a soldier opens fire from across the desert": "\u4e00\u540d\u58eb\u5175\u4ece\u6c99\u6f20\u90a3\u8fb9\u5f00\u706b", "A Sniper": "\u72d9\u51fb\u624b", "sniper": "\u72d9\u51fb\u624b", "the sniper is dead": "\u72d9\u51fb\u624b\u88ab\u706d", "a shot rings out, from somewhere in the long grass": "\u6df1\u8349\u4e1b\u7684\u67d0\u5904\u5c04\u51fa\u4e86\u4e00\u53d1\u5b50\u5f39", "The Thief": "\u5c0f\u5077", "the villagers haul a filthy man out of the store room.": "\u6751\u6c11\u4eec\u4ece\u4ed3\u5e93\u91cc\u62fd\u51fa\u6765\u4e00\u4e2a\u810f\u516e\u516e\u7684\u5bb6\u4f19", "say his folk have been skimming the supplies.": "\u636e\u8bf4\u4ed6\u7684\u540c\u4f19\u4eec\u65e9\u5df2\u7ecf\u987a\u8d70\u8bb8\u591a\u8d27\u7269", "say he should be strung up as an example.": "\u4ed6\u4eec\u8bf4\u5e94\u8be5\u7ede\u6b7b\u4ed6\u4ee5\u5106\u6548\u5c24", "a thief is caught": "\u6293\u5230\u4e00\u540d\u5c0f\u5077", "hang him": "\u7ede\u6b7b\u4ed6", "spare him": "\u91ca\u653e\u4ed6", "the villagers hang the thief high in front of the store room.": "\u6751\u6c11\u4eec\u5c06\u76d7\u8d3c\u7ede\u6b7b\uff0c\u9ad8\u6302\u5728\u4ed3\u5e93\u95e8\u524d", "the point is made. in the next few days, the missing supplies are returned.": "\u6b64\u4e3e\u5353\u6709\u6210\u6548\u3002\u6570\u65e5\u540e\uff0c\u9057\u5931\u7684\u7269\u8d44\u90fd\u88ab\u8fd8\u4e86\u56de\u6765", "the man says he's grateful. says he won't come around any more.": "\u8fd9\u5bb6\u4f19\u611f\u6fc0\u6d95\u96f6\uff0c\u8bf4\u4ed6\u518d\u4e5f\u4e0d\u4f1a\u6765\u884c\u7a83\u4e86", "shares what he knows about sneaking before he goes.": "\u5728\u79bb\u5f00\u524d\u4ed6\u5206\u4eab\u4e86\u6709\u5173\u6f5c\u884c\u7684\u5fc3\u5f97", "A Ruined Trap": "\u635f\u6bc1\u7684\u9677\u9631", "some of the traps have been torn apart.": "\u4e00\u4e9b\u9677\u9631\u635f\u6bc1\u4e86", "large prints lead away, into the forest.": "\u5de8\u5927\u7684\u8db3\u5370\u5ef6\u4f38\u81f3\u68ee\u6797", "some traps have been destroyed": "\u4e00\u4e9b\u9677\u9631\u635f\u6bc1\u4e86", "track them": "\u8ffd\u8e2a", "ignore them": "\u5ffd\u7565", "the tracks disappear after just a few minutes.": "\u6570\u5206\u949f\u540e\u8db3\u5370\u6d88\u5931\u4e86", "the forest is silent.": "\u68ee\u6797\u5f52\u4e8e\u9759\u8c27", "nothing was found": "\u4e00\u65e0\u6240\u83b7", "go home": "\u8fd4\u56de", "not far from the village lies a large beast, its fur matted with blood.": "\u6751\u5916\u4e0d\u8fdc\u5904\u8eba\u7740\u4e00\u53ea\u5de8\u517d\uff0c\u5b83\u7684\u76ae\u6bdb\u4e0a\u67d3\u6ee1\u4e86\u9c9c\u8840", "it puts up little resistance before the knife.": "\u5b83\u65e0\u529b\u6323\u624e\uff0c\u4efb\u4eba\u5bb0\u5272", "there was a beast. it's dead now": "\u5486\u54ee\u7684\u91ce\u517d\u5012\u4e0b\u4e86", "Fire": "\u706b\u707e", "a fire rampages through one of the huts, destroying it.": "\u706b\u7130\u541e\u566c\u4e86\u4e00\u95f4\u5c4b\u5b50\uff0c\u5c06\u5b83\u6467\u6bc1\u6b86\u5c3d", "all residents in the hut perished in the fire.": "\u5c4b\u5185\u7684\u6240\u6709\u4eba\u90fd\u6b7b\u4e8e\u706b\u707e\u4e2d", "a fire has started": "\u706b\u707e\u5df2\u7ecf\u5f00\u59cb", "mourn": "\u54c0\u60bc", "some villagers have died": "\u4e00\u4e9b\u6751\u6c11\u6b7b\u6389\u4e86", "Sickness": "\u75be\u75c5", "a sickness is spreading through the village.": "\u75be\u75c5\u5728\u6751\u5b50\u4e2d\u8513\u5ef6", "medicine is needed immediately.": "\u4e9f\u9700\u836f\u5242", "some villagers are ill": "\u6709\u4e00\u4e9b\u6751\u6c11\u751f\u75c5\u4e86", "1 medicine": "1\u652f\u836f\u5242", "ignore it": "\u653e\u4efb\u4e0d\u7ba1", "the sickness is cured in time.": "\u75be\u75c5\u53ca\u65f6\u5f97\u5230\u4e86\u63a7\u5236", "sufferers are healed": "\u53d7\u82e6\u7684\u4eba\u5f97\u5230\u4e86\u6551\u6cbb", "the sickness spreads through the village.": "\u75be\u75c5\u5728\u6751\u5b50\u4e2d\u8513\u5ef6", "the days are spent with burials.": "\u4e00\u573a\u53c8\u4e00\u573a\u846c\u793c", "the nights are rent with screams.": "\u5c16\u53eb\u54cd\u5f7b\u9ed1\u591c", "sufferers are left to die": "\u53d7\u82e6\u7684\u4eba\u7b49\u5f85\u7740\u6b7b\u4ea1", "Plague": "\u761f\u75ab", "a terrible plague is fast spreading through the village.": "\u53ef\u6015\u7684\u761f\u75ab\u8fc5\u901f\u5730\u6751\u5b50\u91cc\u4f20\u64ad\u5f00\u6765", "a plague afflicts the village": "\u4e00\u573a\u761f\u75ab\u5e2d\u5377\u4e86\u6751\u843d", "buy medicine": "\u8d2d\u4e70\u836f\u5242", "5 medicine": "5\u652f\u836f\u5242", "do nothing": "\u7f6e\u4e4b\u4e0d\u7406", "the plague is kept from spreading.": "\u761f\u75ab\u5f97\u5230\u4e86\u63a7\u5236", "only a few die.": "\u53ea\u6709\u5c11\u6570\u4eba\u6b7b\u53bb", "the rest bury them.": "\u5e78\u5b58\u8005\u57cb\u846c\u4e86\u4ed6\u4eec", "epidemic is eradicated eventually": "\u75ab\u60c5\u7ec8\u4e8e\u88ab\u6839\u9664", "the plague rips through the village.": "\u761f\u75ab\u5e2d\u5377\u6751\u843d\u3002", "the only hope is a quick death.": "\u4eba\u4eec\u53ea\u6c42\u901f\u6b7b", "population is almost exterminated": "\u4eba\u53e3\u51e0\u8fd1\u7edd\u706d", "A Beast Attack": "\u91ce\u517d\u6765\u88ad", "a pack of snarling beasts pours out of the trees.": "\u4e00\u7fa4\u5486\u54ee\u7684\u91ce\u517d\u51b2\u51fa\u4e1b\u6797", "the fight is short and bloody, but the beasts are repelled.": "\u6218\u6597\u77ed\u6682\u800c\u8840\u8165\uff0c\u4f46\u517d\u7fa4\u6e83\u9000\u4e86", "the villagers retreat to mourn the dead.": "\u6751\u6c11\u64a4\u4e86\u56de\u6765\uff0c\u60bc\u5ff5\u90a3\u4e9b\u6b7b\u53bb\u7684\u4eba", "wild beasts attack the villagers": "\u91ce\u517d\u88ad\u51fb\u6751\u6c11", "predators become prey. price is unfair": "\u730e\u624b\u53d8\u6210\u730e\u7269\u3002\u4ef7\u683c\u4e0d\u516c", "A Military Raid": "\u6b66\u88c5\u529b\u91cf\u7a81\u88ad", "a gunshot rings through the trees.": "\u67aa\u58f0\u5578\u8fc7\u6811\u6797", "well armed men charge out of the forest, firing into the crowd.": "\u88c5\u5907\u7cbe\u826f\u7684\u4eba\u51b2\u51fa\u6811\u6797\uff0c\u5411\u4eba\u7fa4\u5c04\u51fb", "after a skirmish they are driven away, but not without losses.": "\u867d\u7136\u4ed6\u4eec\u64a4\u8d70\u4e86\uff0c\u4f46\u6211\u4eec\u597d\u4e9b\u4eba\u727a\u7272\u4e86", "troops storm the village": "\u519b\u961f\u5e2d\u5377\u4e86\u6751\u843d", "warfare is bloodthirsty": "\u6218\u4e89\u51b7\u9177\u65e0\u60c5", "The Nomad": "\u6e38\u7267\u90e8\u843d", "a nomad shuffles into view, laden with makeshift bags bound with rough twine.": "\u6e38\u7267\u90e8\u843d\u6162\u541e\u541e\u5730\u51fa\u73b0\u5728\u89c6\u91ce\u4e2d\uff0c\u5e26\u7740\u8bb8\u591a\u7528\u7c97\u9ebb\u7ebf\u624e\u8d77\u6765\u7684\u4e34\u65f6\u53e3\u888b", "won't say from where he came, but it's clear that he's not staying.": "\u4ed6\u4eec\u6ca1\u6709\u63d0\u53ca\u6765\u5904\uff0c\u4f46\u663e\u7136\u4e0d\u4f1a\u9017\u7559\u5f88\u4e45", "a nomad arrives, looking to trade": "\u6e38\u7267\u90e8\u843d\u62b5\u8fbe\uff0c\u60f3\u8981\u8fdb\u884c\u8d38\u6613", "buy scales": "\u8d2d\u4e70\u9cde\u7247", "buy teeth": "\u8d2d\u4e70\u7259\u9f7f", "buy bait": "\u8d2d\u4e70\u8bf1\u9975", "traps are more effective with bait.": "\u4e0a\u9975\u9677\u9631\u66f4\u6709\u6548\u7387", "buy compass": "\u8d2d\u4e70\u7f57\u76d8", "the old compass is dented and dusty, but it looks to work.": "\u8fd9\u5757\u65e7\u7f57\u76d8\u7834\u635f\u8499\u5c18\uff0c\u4f46\u770b\u8d77\u6765\u8fd8\u80fd\u7528", "say goodbye": "\u9053\u522b", "Noises": "\u566a\u58f0", "through the walls, shuffling noises can be heard.": "\u5608\u6742\u58f0\u900f\u5899\u4f20\u6765", "can't tell what they're up to.": "\u96be\u4ee5\u5206\u8fa8\u6765\u6e90", "strange noises can be heard through the walls": "\u53e4\u602a\u7684\u58f0\u54cd\u900f\u8fc7\u5899\u58c1\u4f20\u6765", "investigate": "\u8c03\u67e5", "vague shapes move, just out of sight.": "\u6a21\u7cca\u7684\u8eab\u5f71\u63a0\u8fc7\uff0c\u6d88\u5931\u5728\u89c6\u91ce\u5916", "the sounds stop.": "\u58f0\u54cd\u505c\u6b62\u4e86", "go back inside": "\u56de\u5c4b", "a bundle of sticks lies just beyond the threshold, wrapped in coarse furs.": "\u4e00\u6346\u7528\u7c97\u7cd9\u7684\u6bdb\u76ae\u624e\u8d77\u6765\u7684\u67f4\u706b\u659c\u501a\u5728\u95e8\u69db\u4e0a", "the night is silent.": "\u9ed1\u591c\u91cd\u5f52\u9759\u8c27", "scratching noises can be heard from the store room.": "\u4ed3\u5e93\u91cc\u4f20\u51fa\u6089\u6089\u7d22\u7d22\u7684\u58f0\u97f3", "something's in there.": "\u90a3\u91cc\u6709\u4ec0\u4e48\u4e1c\u897f", "something's in the store room": "\u4e0d\u901f\u4e4b\u5ba2\u95ef\u5165\u4e86\u4ed3\u5e93", "some wood is missing.": "\u6709\u4e9b\u6728\u5934\u4e0d\u89c1\u4e86", "the ground is littered with small scales": "\u5730\u4e0a\u6563\u843d\u7740\u5c0f\u9cde\u7247", "the ground is littered with small teeth": "\u5730\u4e0a\u6563\u843d\u7740\u5c0f\u7259\u9f7f", "the ground is littered with scraps of cloth": "\u5730\u4e0a\u6563\u843d\u7740\u5e03\u7247", "The Beggar": "\u4e5e\u4e10", "a beggar arrives.": "\u4e5e\u4e10\u5f98\u5f8a\u5728\u95e8\u524d", "asks for any spare furs to keep him warm at night.": "\u7948\u6c42\u80fd\u65bd\u820d\u7ed9\u4ed6\u4e00\u4e9b\u591a\u4f59\u7684\u6bdb\u76ae\uff0c\u597d\u8ba9\u4ed6\u4e0d\u5728\u591c\u91cc\u53d7\u51bb", "a beggar arrives": "\u4e5e\u4e10\u6765\u4e86", "give 50": "\u7ed950", "give 100": "\u7ed9100", "turn him away": "\u64b5\u8d70\u4ed6", "the beggar expresses his thanks.": "\u4e5e\u4e10\u611f\u6fc0\u6d95\u96f6", "leaves a pile of small scales behind.": "\u7559\u7ed9\u6211\u4eec\u4e00\u5806\u5c0f\u9cde\u7247", "leaves a pile of small teeth behind.": "\u7559\u7ed9\u6211\u4eec\u4e00\u5806\u5c0f\u7259\u9f7f", "leaves some scraps of cloth behind.": "\u7559\u7ed9\u6211\u4eec\u4e00\u4e9b\u5e03\u6599", "The Shady Builder": "\u53ef\u7591\u7684\u5efa\u9020\u8005", "a shady builder passes through": "\u53ef\u7591\u7684\u5efa\u9020\u8005\u7ecf\u8fc7", "says he can build you a hut for less wood": "\u4ed6\u8bf4\u4ed6\u80fd\u7528\u8f83\u5c11\u7684\u6728\u5934\u5efa\u9020\u5c0f\u5c4b", "300 wood": "300\u6728\u5934", "the shady builder has made off with your wood": "\u53ef\u7591\u7684\u5efa\u9020\u8005\u5077\u8d70\u4e86\u4f60\u7684\u6728\u5934", "the shady builder builds a hut": "\u53ef\u7591\u7684\u5efa\u9020\u8005\u5efa\u9020\u4e86\u5c0f\u5c4b", "The Mysterious Wanderer": "\u795e\u79d8\u6d41\u6d6a\u8005", "a wanderer arrives with an empty cart. says if he leaves with wood, he'll be back with more.": "\u4e00\u540d\u6d41\u6d6a\u8005\u63a8\u7740\u8d27\u8f66\u6765\u5230\u6751\u5b50\uff0c\u58f0\u79f0\u5982\u679c\u8ba9\u4ed6\u5e26\u7740\u6728\u5934\u79bb\u5f00\uff0c\u4ed6\u4f1a\u5e26\u56de\u66f4\u591a\u6728\u5934", "builder's not sure he's to be trusted.": "\u5efa\u9020\u8005\u4e0d\u786e\u5b9a\u80fd\u5426\u4fe1\u4efb\u4ed6", "a mysterious wanderer arrives": "\u795e\u79d8\u6d41\u6d6a\u8005\u6765\u4e86", "give 500": "\u7ed9500", "the wanderer leaves, cart loaded with wood": "\u6d41\u6d6a\u8005\u5e26\u7740\u6ee1\u8f7d\u6728\u5934\u7684\u8d27\u8f66\u79bb\u5f00\u4e86", "the mysterious wanderer returns, cart piled high with wood.": "\u795e\u79d8\u7684\u6d41\u6d6a\u8005\u56de\u6765\u4e86\uff0c\u8d27\u8f66\u4e0a\u6728\u5934\u5806\u5f97\u66f4\u9ad8\u4e86", "a wanderer arrives with an empty cart. says if she leaves with furs, she'll be back with more.": "\u4e00\u540d\u6d41\u6d6a\u8005\u63a8\u7740\u8d27\u8f66\u6765\u5230\u6751\u5b50\uff0c\u58f0\u79f0\u5982\u679c\u8ba9\u5979\u5e26\u7740\u6bdb\u76ae\u79bb\u5f00\uff0c\u5979\u4f1a\u5e26\u56de\u66f4\u591a\u6bdb\u76ae", "builder's not sure she's to be trusted.": "\u5efa\u9020\u8005\u4e0d\u786e\u5b9a\u80fd\u5426\u4fe1\u4efb\u5979", "turn her away": "\u64b5\u8d70\u5979", "the wanderer leaves, cart loaded with furs": "\u6d41\u6d6a\u8005\u5e26\u7740\u6ee1\u8f7d\u6bdb\u76ae\u7684\u8d27\u8f66\u79bb\u5f00\u4e86", "the mysterious wanderer returns, cart piled high with furs.": "\u795e\u79d8\u7684\u6d41\u6d6a\u8005\u56de\u6765\u4e86\uff0c\u8d27\u8f66\u4e0a\u6bdb\u76ae\u5806\u5f97\u66f4\u9ad8\u4e86", "The Scout": "\u4fa6\u5bdf\u5175", "the scout says she's been all over.": "\u4fa6\u5bdf\u5175\u8bf4\u5979\u66fe\u73af\u6e38\u4e16\u754c", "willing to talk about it, for a price.": "\u5979\u613f\u610f\u4e3a\u6211\u4eec\u5206\u4eab\u5979\u7684\u7ecf\u5386\uff0c\u53ea\u9700\u63d0\u4f9b\u4e00\u4e9b\u62a5\u916c", "a scout stops for the night": "\u4fa6\u5bdf\u5175\u591c\u5bbf\u4e8e\u6b64", "buy map": "\u8d2d\u4e70\u5730\u56fe", "the map uncovers a bit of the world": "\u5730\u56fe\u4e0a\u5df2\u63a2\u77e5\u7684\u5730\u65b9\u6269\u5927\u4e86\u4e00\u70b9", "learn scouting": "\u5b66\u4e60\u4fa6\u5bdf", "The Master": "\u5b97\u5e08", "an old wanderer arrives.": "\u4e00\u540d\u5e74\u8fc8\u7684\u6d41\u6d6a\u8005\u62b5\u8fbe\u4e86", "he smiles warmly and asks for lodgings for the night.": "\u4ed6\u9762\u5e26\u548c\u7166\u7684\u5fae\u7b11\uff0c\u8bf7\u6c42\u7559\u5bbf\u4e00\u665a", "an old wanderer arrives": "\u5e74\u8fc8\u7684\u6d41\u6d6a\u8005\u51fa\u73b0\u4e86", "agree": "\u540c\u610f\u8001\u8005\u7684\u8bf7\u6c42", "in exchange, the wanderer offers his wisdom.": "\u4f5c\u4e3a\u56de\u62a5\uff0c\u6d41\u6d6a\u8005\u4e3a\u6211\u4eec\u5206\u4eab\u4e86\u4ed6\u7684\u667a\u6167", "evasion": "\u907f\u5b9e\u5c31\u865a", "precision": "\u7cbe\u5bc6", "force": "\u91ce\u86ee\u4eba", "The Sick Man": "\u60a3\u75c5\u7537\u5b50", "a man hobbles up, coughing.": "\u7537\u5b50\u54b3\u55fd\u7740\uff0c\u4e00\u7638\u4e00\u62d0\u5730\u8d70\u4e86\u8fc7\u6765", "he begs for medicine.": "\u4ed6\u7948\u6c42\u5206\u7ed9\u4ed6\u4e00\u652f\u836f\u5242", "a sick man hobbles up": "\u60a3\u75c5\u7537\u5b50\u4e00\u7638\u4e00\u62d0\u5730\u8d70\u4e86\u8fc7\u6765", "give 1 medicine": "\u5206\u7ed9\u4ed6\u4e00\u652f\u836f\u5242", "the man swallows the medicine eagerly": "\u7537\u5b50\u8feb\u4e0d\u53ca\u5f85\u54bd\u4e0b\u4e86\u836f\u5242", "tell him to leave": "\u8bf7\u4ed6\u79bb\u5f00", "the man is thankful.": "\u7537\u5b50\u611f\u6fc0\u6d95\u96f6", "he leaves a reward.": "\u4ed6\u7559\u4e0b\u62a5\u916c\u8d70\u4e86", "some weird metal he picked up on his travels.": "\u90a3\u662f\u4ed6\u5728\u65c5\u9014\u4e2d\u6361\u5230\u7684\u4e00\u4e9b\u53e4\u602a\u7684\u91d1\u5c5e", "some weird glowing boxes he picked up on his travels.": "\u90a3\u662f\u4ed6\u5728\u65c5\u9014\u4e2d\u6361\u5230\u7684\u4e00\u4e9b\u53e4\u602a\u7684\u53d1\u5149\u76d2\u5b50", "all he has are some scales.": "\u5168\u662f\u4e9b\u9cde\u7247", "the man expresses his thanks and hobbles off.": "\u7537\u5b50\u8868\u8fbe\u4e86\u4ed6\u7684\u8c22\u610f\uff0c\u4e00\u7638\u4e00\u62d0\u5730\u79bb\u5f00\u4e86", "An Outpost": "\u524d\u54e8", "a safe place in the wilds.": "\u8352\u91ce\u4e2d\u5b89\u5168\u7684\u5730\u65b9", "A Murky Swamp": "\u8ff7\u96fe\u6cbc\u6cfd", "rotting reeds rise out of the swampy earth.": "\u8150\u70c2\u7684\u82a6\u8349\u5192\u51fa\u6cbc\u6cfd", "a lone frog sits in the muck, silently.": "\u4e00\u53ea\u5b64\u72ec\u7684\u86d9\u8e72\u5750\u5728\u6de4\u6ce5\u4e2d\uff0c\u4e00\u8a00\u4e0d\u53d1", "a swamp festers in the stagnant air.": "\u51dd\u6ede\u7684\u7a7a\u6c14\u4e2d\uff0c\u6cbc\u6cfd\u6b63\u5728\u6e83\u70c2", "enter": "\u8fdb\u5165", "deep in the swamp is a moss-covered cabin.": "\u6cbc\u6cfd\u6df1\u5904\u73b0\u51fa\u4e00\u680b\u8986\u6ee1\u82d4\u85d3\u7684\u5c0f\u5c4b", "an old wanderer sits inside, in a seeming trance.": "\u4e00\u540d\u5e74\u8fc8\u7684\u6d41\u6d6a\u8005\u5750\u5728\u91cc\u5934\uff0c\u770b\u8d77\u6765\u6b63\u5728\u53d1\u5446", "talk": "\u5bf9\u8bdd", "the wanderer takes the charm and nods slowly.": "\u6d41\u6d6a\u8005\u63a5\u8fc7\u7b26\u5492\uff0c\u7f13\u7f13\u70b9\u4e86\u70b9\u5934", "he speaks of once leading the great fleets to fresh worlds.": "\u4ed6\u8c08\u8d77\u66fe\u7387\u9886\u4e00\u652f\u4f1f\u5927\u7684\u8230\u961f\u524d\u5f80\u65b0\u4e16\u754c", "unfathomable destruction to fuel wanderer hungers.": "\u4ee5\u83ab\u6d4b\u7684\u6bc1\u706d\u4e4b\u529b\u586b\u8865\u6d41\u6d6a\u8005\u5fc3\u4e2d\u7684\u6b32\u58d1", "his time here, now, is his penance.": "\u800c\u5982\u4eca\uff0c\u4ed6\u5f85\u5728\u8fd9\u91cc\u7684\u65f6\u5149\u90fd\u5728\u4e3a\u6b64\u8d4e\u7f6a", "A Damp Cave": "\u6f6e\u6e7f\u6d1e\u7a74", "the mouth of the cave is wide and dark.": "\u6d1e\u53e3\u5bbd\u655e\u800c\u9ed1\u6697", "can't see what's inside.": "\u770b\u4e0d\u6e05\u91cc\u9762\u6709\u4ec0\u4e48", "the earth here is split, as if bearing an ancient wound": "\u5927\u5730\u88c2\u5f00\uff0c\u5b9b\u5982\u53e4\u8001\u7684\u4f24\u75d5", "go inside": "\u8fdb\u5165", "a startled beast defends its home": "\u53d7\u5230\u60ca\u5413\u7684\u91ce\u517d\u6b63\u8981\u634d\u536b\u5b83\u7684\u5de2\u7a74", "continue": "\u7ee7\u7eed\u6df1\u5165", "leave cave": "\u79bb\u5f00\u6d1e\u7a74", "the cave narrows a few feet in.": "\u6d1e\u7a74\u72ed\u7a84\uff0c\u51e0\u65e0\u7acb\u8db3\u4e4b\u5730", "the walls are moist and moss-covered": "\u5ca9\u58c1\u6f6e\u6e7f\uff0c\u8986\u76d6\u7740\u82d4\u85d3", "squeeze": "\u6324\u5165\u6df1\u5904", "the remains of an old camp sits just inside the cave.": "\u6d1e\u7a74\u5185\u51fa\u73b0\u4e00\u5904\u8001\u65e7\u8425\u5730\u7684\u9057\u8ff9", "bedrolls, torn and blackened, lay beneath a thin layer of dust.": "\u6c61\u635f\u7684\u7761\u888b\u5e73\u8eba\u7740\uff0c\u5e03\u6ee1\u4e86\u8584\u8584\u7684\u7070\u5c18", "the body of a wanderer lies in a small cavern.": "\u6d41\u6d6a\u8005\u7684\u5c38\u4f53\u8eba\u5728\u72ed\u5c0f\u7684\u6d1e\u7a74\u91cc", "rot's been to work on it, and some of the pieces are missing.": "\u5b83\u5df2\u7ecf\u5f00\u59cb\u8150\u70c2\uff0c\u4e14\u9057\u5931\u4e86\u4e00\u4e9b\u80a2\u4f53", "can't tell what left it here.": "\u96be\u8bf4\u8fd9\u91cc\u8fd8\u7559\u4e0b\u4e86\u4ec0\u4e48", "the torch sputters and dies in the damp air": "\u706b\u628a\u5288\u556a\u4f5c\u54cd\uff0c\u7184\u706d\u5728\u4e86\u6f6e\u6e7f\u7684\u7a7a\u6c14\u4e2d", "the darkness is absolute": "\u6f06\u9ed1\u4e00\u7247", "the torch goes out": "\u706b\u628a\u71c3\u5c3d\u4e86", "a cave lizard attacks": "\u4e00\u5934\u6d1e\u7a74\u8725\u8734\u88ad\u6765", "a large beast charges out of the dark": "\u4e00\u5934\u5de8\u517d\u51b2\u51fa\u9ed1\u6697", "a giant lizard shambles forward": "\u4e00\u5934\u6d1e\u7a74\u8725\u8734\u8dcc\u8dcc\u649e\u649e\u5730\u88ad\u6765", "the nest of a large animal lies at the back of the cave.": "\u5de8\u517d\u7684\u5de2\u7a74\u5c31\u4f4d\u4e8e\u6d1e\u7a74\u540e\u65b9", "a small supply cache is hidden at the back of the cave.": "\u4e00\u4e2a\u5c0f\u578b\u4f9b\u7ed9\u70b9\u85cf\u5728\u6d1e\u7a74\u540e\u65b9", "an old case is wedged behind a rock, covered in a thick layer of dust.": "\u5ca9\u77f3\u4e0b\u5d4c\u7740\u4e00\u4e2a\u65e7\u76d2\u5b50\uff0c\u4e0a\u9762\u8986\u6ee1\u4e00\u5c42\u8584\u7070", "A Deserted Town": "\u6c99\u6f20\u5c0f\u9547", "a small suburb lays ahead, empty houses scorched and peeling.": "\u524d\u9762\u662f\u4e00\u5c0f\u7247\u4f4f\u5b85\u533a\uff0c\u7a7a\u65e0\u4e00\u4eba\uff0c\u5f92\u7559\u70e7\u7126\u7684\u6b8b\u57a3\u65ad\u58c1", "broken streetlights stand, rusting. light hasn't graced this place in a long time.": "\u65e9\u5c31\u635f\u574f\u7684\u8857\u706f\u5c79\u7acb\u7740\uff0c\u9508\u8ff9\u6591\u6591\u3002\u5149\u660e\u5df2\u7ecf\u5f88\u4e45\u6ca1\u6709\u7737\u987e\u8fd9\u91cc", "the town lies abandoned, its citizens long dead": "\u8fd9\u5ea7\u5c0f\u9547\u65e9\u5c31\u88ab\u9057\u5f03\uff0c\u9547\u4e0a\u7684\u5c45\u6c11\u5df2\u7ecf\u6b7b\u53bb\u591a\u65f6", "explore": "\u63a2\u7d22", "where the windows of the schoolhouse aren't shattered, they're blackened with soot.": "\u6821\u820d\u7684\u7a97\u73bb\u7483\u5e76\u6ca1\u6709\u788e\u6389\uff0c\u5374\u88ab\u70df\u718f\u9ed1\u4e86", "the double doors creak endlessly in the wind.": "\u53cc\u5f00\u95e8\u5728\u98ce\u4e2d\u4e0d\u505c\u5730\u54af\u5431\u4f5c\u54cd", "leave town": "\u79bb\u5f00\u5c0f\u9547", "ambushed on the street.": "\u8857\u5934\u6709\u57cb\u4f0f", "a squat building up ahead.": "\u524d\u65b9\u6709\u4e00\u680b\u4f4e\u77ee\u7684\u5efa\u7b51\u3002", "a green cross barely visible behind grimy windows.": "\u7eff\u8349\u5728\u80ae\u810f\u7684\u7a97\u6237\u540e\u51e0\u4e4e\u770b\u4e0d\u89c1", "a small cache of supplies is tucked inside a rusting locker.": "\u4e00\u4efd\u8865\u7ed9\u54c1\u88ab\u585e\u8fdb\u4e00\u4e2a\u751f\u9508\u7684\u67dc\u5b50\u91cc", "a scavenger waits just inside the door.": "\u95e8\u7684\u540e\u9762\u6709\u4e00\u4f4d\u62fe\u8352\u8005", "a beast stands alone in an overgrown park.": "\u4e00\u53ea\u91ce\u517d\u7ad9\u5728\u4e00\u4e2a\u6742\u8349\u4e1b\u751f\u7684\u516c\u56ed\u4e2d\u592e", "an overturned caravan is spread across the pockmarked street.": "\u873f\u8712\u66f2\u6298\u7684\u8857\u9053\u4e0a\uff0c\u4e00\u652f\u5fd9\u788c\u7684\u5546\u961f\u6b63\u5728\u6574\u7406\u7ffb\u5012\u7684\u7bf7\u8f66", "it's been picked over by scavengers, but there's still some things worth taking.": "\u8fd9\u91cc\u5df2\u7ecf\u88ab\u62fe\u8352\u8005\u5149\u987e\u8fc7\u4e86\u3002\u4f46\u662f\u7ec6\u5fc3\u70b9\u8fd8\u662f\u80fd\u627e\u5230\u4e9b\u4ec0\u4e48", "a madman attacks, screeching.": "\u4e00\u4e2a\u7537\u4eba\u75af\u72c2\u5730\u5c16\u53eb\u7740\u53d1\u8d77\u4e86\u653b\u51fb", "a thug moves out of the shadows.": "\u4e00\u4e2a\u66b4\u5f92\u8d70\u51fa\u4e86\u9634\u5f71", "a beast charges out of a ransacked classroom.": "\u4e00\u5934\u5de8\u517d\u51b2\u51fa\u6559\u5ba4", "through the large gymnasium doors, footsteps can be heard.": "\u811a\u6b65\u58f0\u4ece\u5de8\u5927\u7684\u4f53\u80b2\u9986\u95e8\u540e\u4f20\u6765", "the torchlight casts a flickering glow down the hallway.": "\u706b\u70ac\u5728\u8d70\u5eca\u4e0a\u95ea\u70c1\u7740\u5149\u8292", "the footsteps stop.": "\u811a\u6b65\u58f0\u505c\u6b62\u4e86", "another beast, draw by the noise, leaps out of a copse of trees.": "\u53e6\u4e00\u53ea\u91ce\u517d\u88ab\u58f0\u97f3\u5438\u5f15\uff0c\u8df3\u51fa\u4e86\u6811\u4e1b", "something's causing a commotion a ways down the road.": "\u524d\u9762\u7684\u8def\u4e0a\u6709\u4ec0\u4e48\u5f15\u8d77\u4e86\u9a9a\u52a8", "a fight, maybe.": "\u4e5f\u8bb8\u662f\u5728\u6253\u67b6", "a small basket of food is hidden under a park bench, with a note attached.": "\u516c\u56ed\u957f\u6905\u4e0b\u63a9\u85cf\u7740\u4e00\u4e2a\u88c5\u7740\u98df\u7269\u7684\u5c0f\u7bee\u5b50\uff0c\u4e0a\u9762\u6709\u5f20\u5b57\u6761", "can't read the words.": "\u65e0\u6cd5\u8fa8\u8bc6\u5b57\u8ff9", "a panicked scavenger bursts through the door, screaming.": "\u60ca\u614c\u7684\u62fe\u8352\u8005\u5c16\u53eb\u7740\u51b2\u8fdb\u4e86\u95e8", "a man stands over a dead wanderer. notices he's not alone.": "\u4e00\u4e2a\u4eba\u7ad9\u5728\u4e00\u4e2a\u6d41\u6d6a\u8005\u7684\u5c38\u4f53\u65c1\u8fb9\u3002\u4ed6\u4e0d\u662f\u4e00\u4e2a\u4eba", "scavenger had a small camp in the school.": "\u5b66\u6821\u91cc\u6709\u4e2a\u62fe\u8352\u8005\u7684\u636e\u70b9", "collected scraps spread across the floor like they fell from heaven.": "\u6536\u96c6\u7740\u5730\u4e0a\u7684\u6b8b\u7fb9\u5269\u996d", "scavenger'd been looking for supplies in here, it seems.": "\u770b\u6765\u62fe\u8352\u8005\u4e00\u76f4\u5728\u8fd9\u6536\u96c6\u7740\u7269\u8d44", "a shame to let what he'd found go to waste.": "\u6d6a\u8d39\u6389\u4ed6\u627e\u5230\u7684\u4e1c\u897f\u592a\u53ef\u803b\u4e86", "beneath the wanderer's rags, clutched in one of its many hands, a glint of steel.": "\u62fe\u8352\u8005\u624b\u91cc\u7d27\u7d27\u5730\u6293\u7740\u4ec0\u4e48\u4e1c\u897f\u3002\u91d1\u5c5e\u7684\u53cd\u5149", "worth killing for, it seems.": "\u770b\u6765\u8fd9\u6b21\u6740\u622e\u662f\u503c\u5f97\u7684", "eye for an eye seems fair.": "\u4ee5\u773c\u8fd8\u773c\u770b\u8d77\u6765\u633a\u516c\u5e73\u7684", "always worked before, at least.": "\u81f3\u5c11\u76ee\u524d\u6765\u770b\u975e\u5e38\u6709\u6548", "picking the bones finds some useful trinkets.": "\u5728\u9aa8\u5934\u5806\u91cc\u627e\u5230\u4e00\u4e9b\u6709\u7528\u7684\u5c0f\u73a9\u827a\u513f", "some medicine abandoned in the drawers.": "\u4e00\u4e9b\u836f\u7269\u88ab\u9057\u5f03\u5728\u62bd\u5c49\u91cc", "the clinic has been ransacked.": "\u8bca\u6240\u5df2\u88ab\u6d17\u52ab\u8fc7\u4e86", "only dust and stains remain.": "\u53ea\u7559\u4e0b\u5c18\u571f\u548c\u6c61\u6e0d", "A Ruined City": "\u88ab\u6bc1\u7684\u57ce\u5e02", "a battered highway sign stands guard at the entrance to this once-great city.": "\u7834\u635f\u7684\u516c\u8def\u6807\u8bc6\u7ad6\u7acb\u5728\u8fd9\u4e2a\u66fe\u7ecf\u4f1f\u5927\u7684\u57ce\u5e02\u5165\u53e3", "the towers that haven't crumbled jut from the landscape like the ribcage of some ancient beast.": "\u8fd8\u672a\u57ae\u584c\u7684\u5854\u697c\u50cf\u67d0\u79cd\u8fdc\u53e4\u5de8\u517d\u7684\u808b\u9aa8\u4e00\u6837\u4f38\u51fa\u5730\u9762", "might be things worth having still inside.": "\u4e5f\u8bb8\u91cc\u9762\u8fd8\u6709\u4e9b\u6709\u4ef7\u503c\u7684\u4e1c\u897f", "the towers of a decaying city dominate the skyline": "\u6b8b\u7834\u57ce\u5e02\u91cc\u7684\u9ad8\u5854\u4e3b\u5bb0\u7740\u5730\u5e73\u7ebf", "the streets are empty.": "\u8857\u9053\u7a7a\u7a7a\u5982\u4e5f", "the air is filled with dust, driven relentlessly by the hard winds.": "\u6f2b\u5929\u7684\u7070\u5c18\u5728\u98ce\u4e2d\u98d8\u8361", "leave city": "\u79bb\u5f00\u57ce\u5e02", "orange traffic cones are set across the street, faded and cracked.": "\u8857\u9053\u5bf9\u9762\u653e\u7f6e\u7740\u6a59\u8272\u7684\u8def\u969c\uff0c\u5df2\u6b8b\u7834\u4e0d\u582a", "lights flash through the alleys between buildings.": "\u5df7\u5b50\u91cc\u95ea\u70c1\u7740\u706f\u5149", "a large shanty town sprawls across the streets.": "\u8857\u9053\u4e0a\u7684\u5e10\u7bf7\u4e00\u671b\u65e0\u9645", "faces, darkened by soot and blood, stare out from crooked huts.": "\u4e00\u5f20\u5f20\u88ab\u7164\u70df\u548c\u8840\u718f\u9ed1\u4e86\u7684\u8138\u671b\u51fa\u5c0f\u5c4b", "the shell of an abandoned hospital looms ahead.": "\u4e00\u5ea7\u88ab\u5e9f\u5f03\u7684\u533b\u9662\u6a2a\u5728\u524d\u65b9", "the old tower seems mostly intact.": "\u53e4\u8001\u7684\u5854\u697c\u770b\u8d77\u6765\u5927\u90e8\u5206\u5b8c\u597d\u65e0\u635f", "the shell of a burned out car blocks the entrance.": "\u88ab\u70e7\u6bc1\u7684\u6c7d\u8f66\u6321\u4f4f\u4e86\u5165\u53e3", "most of the windows at ground level are busted anyway.": "\u5f88\u591a\u843d\u5730\u7a97\u88ab\u6253\u788e\u4e86", "a huge lizard scrambles up out of the darkness of an old metro station.": "\u4e00\u53ea\u5de8\u8725\u4ece\u5e9f\u5f03\u5730\u94c1\u7ad9\u7684\u9ed1\u6697\u4e2d\u722c\u51fa", "descend": "\u8fdb\u5165\u5730\u94c1\u7ad9", "the shot echoes in the empty street.": "\u8857\u9053\u4e0a\u56de\u54cd\u7740\u67aa\u58f0", "the soldier steps out from between the buildings, rifle raised.": "\u58eb\u5175\u4e3e\u7740\u67aa\u4ece\u5efa\u7b51\u7269\u4e4b\u95f4\u8d70\u51fa", "a frail man stands defiantly, blocking the path.": "\u4e00\u4e2a\u865a\u5f31\u7684\u7537\u4eba\u62e6\u5728\u8def\u7684\u4e2d\u592e", "nothing but downcast eyes.": "\u4e00\u7247\u9893\u9761\u7684\u53cc\u773c", "the people here were broken a long time ago.": "\u8fd9\u91cc\u7684\u4eba\u4eec\u5f88\u4e45\u4ee5\u524d\u5c31\u5d29\u6e83\u4e86", "empty corridors.": "\u7a7a\u8d70\u5eca", "the place has been swept clean by scavengers.": "\u8fd9\u91cc\u88ab\u62fe\u8352\u8005\u4eec\u6e05\u626b\u7684\u5f88\u5e72\u51c0", "an old man bursts through a door, wielding a scalpel.": "\u4e00\u4e2a\u8001\u4eba\u6325\u821e\u7740\u624b\u672f\u5200\uff0c\u4ece\u4e00\u6247\u95e8\u91cc\u8df3\u51fa", "a thug is waiting on the other side of the wall.": "\u4e00\u4e2a\u66b4\u5f92\u5728\u5899\u58c1\u53e6\u4e00\u8fb9\u7b49\u7740", "a snarling beast jumps out from behind a car.": "\u4e00\u53ea\u5486\u54ee\u7684\u91ce\u517d\u4ece\u4e00\u8f86\u8f66\u540e\u8df3\u51fa\u3002", "street above the subway platform is blown away.": "\u5730\u94c1\u7ad9\u53f0\u4e0a\u7684\u8857\u9053\u88ab\u70b8\u5f00\u4e86", "lets some light down into the dusty haze.": "\u4e00\u7f15\u5149\u7ebf\u5c04\u5165\u5c18\u571f\u98de\u626c\u7684\u9634\u973e", "a sound comes from the tunnel, just ahead.": "\u96a7\u9053\u7684\u524d\u9762\u4f20\u6765\u4e00\u9635\u58f0\u54cd", "looks like a camp of sorts up ahead.": "\u770b\u8d77\u6765\u524d\u9762\u50cf\u662f\u4e00\u7247\u7b80\u964b\u7684\u8425\u5730", "rusted chainlink is pulled across an alleyway.": "\u9508\u8ff9\u6591\u6591\u7684\u94c1\u4e1d\u7f51\u6a2a\u8fc7\u5c0f\u5df7", "fires burn in the courtyard beyond.": "\u8fdc\u5904\u7684\u9662\u5b50\u91cc\u71c3\u70e7\u7740\u706b\u7130", "more voices can be heard ahead.": "\u524d\u65b9\u53ef\u4ee5\u542c\u89c1\u66f4\u591a\u7684\u58f0\u97f3", "they must be here for a reason.": "\u542c\u8d77\u6765\u4e0d\u662f\u4ec0\u4e48\u597d\u4e8b", "the sound of gunfire carries on the wind.": "\u5f00\u67aa\u7684\u58f0\u97f3\u56de\u8361\u5728\u7a7a\u4e2d", "the street ahead glows with firelight.": "\u524d\u9762\u7684\u8857\u9053\u95ea\u7740\u706b\u5149", "more squatters are crowding around now.": "\u90a3\u4e9b\u64c5\u81ea\u5360\u4f4f\u522b\u4eba\u623f\u5b50\u7684\u4eba\u7c07\u62e5\u5728\u4e00\u8d77", "someone throws a stone.": "\u6709\u4eba\u6254\u51fa\u4e00\u5757\u77f3\u5934", "an improvised shop is set up on the sidewalk.": "\u8857\u9053\u4e0a\u6709\u4e2a\u4e34\u65f6\u5546\u5e97", "the owner stands by, stoic.": "\u4e3b\u4eba\u7ad9\u5728\u65c1\u8fb9\uff0c\u65e0\u52a8\u4e8e\u8877", "strips of meat hang drying by the side of the street.": "\u8857\u9053\u65c1\u6302\u7740\u51e0\u6761\u6b63\u5728\u98ce\u5e72\u7684\u8089", "the people back away, avoiding eye contact.": "\u4eba\u4eec\u4e0d\u65ad\u9000\u540e\u7740\uff0c\u907f\u514d\u773c\u795e\u63a5\u89e6", "someone has locked and barricaded the door to this operating theatre.": "\u6709\u4eba\u628a\u624b\u672f\u5ba4\u7684\u95e8\u9501\u4e0a\u5e76\u5835\u4e0a\u4e86", "a tribe of elderly squatters is camped out in this ward.": "\u4e00\u5e2e\u4e0a\u4e86\u5e74\u7eaa\u7684\u6d41\u6d6a\u8005\u5728\u8fd9\u95f4\u75c5\u623f\u91cc\u5bbf\u8425", "a pack of lizards rounds the corner.": "\u4e00\u7fa4\u8725\u8734\u7ed5\u8fc7\u8f6c\u89d2", "strips of meat are hung up to dry in this ward.": "\u75c5\u623f\u91cc\u6302\u7740\u51e0\u6761\u6b63\u5728\u98ce\u5e72\u7684\u8089", "a large bird nests at the top of the stairs.": "\u4e00\u53ea\u5927\u9e1f\u6816\u606f\u5728\u697c\u68af\u7684\u9876\u90e8", "the debris is denser here.": "\u8fd9\u91cc\u7684\u6b8b\u9ab8\u66f4\u591a\u4e86", "maybe some useful stuff in the rubble.": "\u4e5f\u8bb8\u74e6\u783e\u4e2d\u6709\u4e9b\u6709\u7528\u7684\u4e1c\u897f", "a swarm of rats rushes up the tunnel.": "\u96a7\u9053\u91cc\u51b2\u51fa\u4e00\u7fa4\u8001\u9f20", "a large man attacks, waving a bayonet.": "\u4e00\u4e2a\u5f6a\u5f62\u5927\u6c49\u6325\u821e\u7740\u523a\u5200\u88ad\u6765", "a second soldier opens fire.": "\u53c8\u4e00\u4e2a\u58eb\u5175\u5f00\u706b\u4e86", "a masked soldier rounds the corner, gun drawn": "\u4e00\u4e2a\u8499\u9762\u58eb\u5175\u8dd1\u8fc7\u62d0\u89d2\uff0c\u62d4\u51fa\u4e86\u67aa", "the crowd surges forward.": "\u4eba\u7fa4\u6d8c\u4e0a\u524d\u6765", "a youth lashes out with a tree branch.": "\u4e00\u4e2a\u5c0f\u4f19\u5b50\u6325\u6253\u7740\u4e00\u6839\u6811\u679d", "a squatter stands firmly in the doorway of a small hut.": "\u4e00\u4e2a\u4eba\u575a\u5b9a\u5730\u7ad9\u5728\u4e00\u5ea7\u5c0f\u5c4b\u95e8\u524d", "behind the door, a deformed figure awakes and attacks.": "\u95e8\u540e\u4e00\u4e2a\u7578\u5f62\u7684\u8eab\u8eaf\u60ca\u9192\u4e86\uff0c\u53d1\u8d77\u4e86\u653b\u51fb", "as soon as the door is open a little bit, hundreds of tentacles erupt.": "\u95e8\u521a\u6253\u5f00\u4e00\u6761\u7f1d\uff0c\u5c31\u6709\u51e0\u767e\u6761\u89e6\u624b\u4f38\u4e86\u51fa\u6765", "bird must have liked shiney things.": "\u9e1f\u559c\u6b22\u95ea\u4eae\u7684\u4e1c\u897f", "some good stuff woven into its nest.": "\u5c06\u4e00\u4e9b\u597d\u4e1c\u897f\u7ec7\u8fdb\u4e86\u5b83\u7684\u5de2", "not much here.": "\u8fd9\u91cc\u6ca1\u591a\u5c11\u4e1c\u897f", "scavengers must have gotten to this place already.": "\u62fe\u8352\u8005\u5df2\u7ecf\u6765\u8fc7\u4e86", "the tunnel opens up at another platform.": "\u96a7\u9053\u51fa\u53e3\u5728\u53e6\u4e00\u8fb9\u7684\u7ad9\u53f0", "the walls are scorched from an old battle.": "\u8fd9\u4e9b\u5899\u58c1\u5728\u4e00\u573a\u53e4\u8001\u7684\u6218\u4e89\u4e2d\u88ab\u70e7\u7126\u4e86", "bodies and supplies from both sides litter the ground.": "\u4e24\u65b9\u7684\u5c38\u4f53\u548c\u7269\u8d44\u6563\u843d\u5728\u5730\u4e0a", "the small military outpost is well supplied.": "\u8fd9\u4e2a\u5c0f\u5c0f\u7684\u519b\u4e8b\u54e8\u6240\u4f9b\u5e94\u5145\u8db3", "arms and munitions, relics from the war, are neatly arranged on the store-room floor.": "\u6b66\u5668\u548c\u5f39\u836f\u6574\u9f50\u5730\u653e\u5728\u50a8\u85cf\u5ba4\u7684\u5730\u677f\u4e0a", "just as deadly now as they were then.": "\u5c31\u5982\u4ece\u524d\u4e00\u822c\u81f4\u547d", "searching the bodies yields a few supplies.": "\u641c\u7d22\u5c38\u4f53\u627e\u5230\u4e86\u4e00\u4e9b\u7269\u8d44", "more soldiers will be on their way.": "\u66f4\u591a\u7684\u58eb\u5175\u6b63\u5728\u8def\u4e0a", "time to move on.": "\u8be5\u8d70\u4e86", "the small settlement has clearly been burning a while.": "\u5c0f\u5b9a\u5c45\u70b9\u660e\u663e\u5df2\u7ecf\u71c3\u70e7\u4e86\u4e00\u6bb5\u65f6\u95f4\u4e86", "the bodies of the wanderers that lived here are still visible in the flames.": "\u5c45\u4f4f\u5728\u8fd9\u91cc\u7684\u6d41\u6d6a\u8005\u7684\u5c38\u4f53\u5728\u706b\u7130\u4e2d\u4ecd\u7136\u6e05\u6670\u53ef\u89c1", "still time to rescue a few supplies.": "\u4ecd\u7136\u6709\u65f6\u95f4\u62a2\u6551\u4e00\u4e9b\u7269\u8d44", "the remaining settlers flee from the violence, their belongings forgotten.": "\u5269\u4f59\u7684\u79fb\u6c11\u9003\u8dd1\u7684\u65f6\u5019\u4e22\u4e0b\u4e86\u5f88\u591a\u4e1c\u897f", "there's not much, but some useful things can still be found.": "\u4e0d\u662f\u5f88\u591a\uff0c\u4f46\u4ecd\u7136\u80fd\u627e\u5230\u4e00\u4e9b\u6709\u7528\u7684", "the young settler was carrying a canvas sack.": "\u5e74\u8f7b\u7684\u5b9a\u5c45\u8005\u643a\u5e26\u7740\u4e00\u4e2a\u5e06\u5e03\u888b", "it contains travelling gear, and a few trinkets.": "\u91cc\u9762\u6709\u4e00\u4e9b\u5c0f\u73a9\u827a\u513f", "there's nothing else here.": "\u8fd9\u91cc\u6ca1\u522b\u7684\u4e86", "inside the hut, a child cries.": "\u5c0f\u5c4b\u4e2d\uff0c\u6709\u4e2a\u5c0f\u5b69\u5728\u54ed", "a few belongings rest against the walls.": "\u5899\u8fb9\u6709\u4e9b\u4e1c\u897f", "the stench of rot and death fills the operating theatres.": "\u8150\u70c2\u6b7b\u5c38\u6563\u53d1\u7684\u6076\u81ed\u5f25\u6f2b\u4e86\u6574\u95f4\u624b\u672f\u5ba4", "a few items are scattered on the ground.": "\u5730\u4e0a\u6563\u843d\u7740\u5c11\u8bb8\u7269\u54c1", "there is nothing else here.": "\u8fd9\u91cc\u6ca1\u522b\u7684\u4e86", "a pristine medicine cabinet at the end of a hallway.": "\u5728\u8d70\u5eca\u7684\u5c3d\u5934\u6709\u4e2a\u836f\u67dc", "the rest of the hospital is empty.": "\u533b\u9662\u7684\u5176\u4ed6\u623f\u95f4\u662f\u7a7a\u7684", "someone had been stockpiling loot here.": "\u6709\u4eba\u4e00\u76f4\u5728\u8fd9\u91cc\u56e4\u79ef\u6218\u5229\u54c1", "the tentacular horror is defeated.": "\u89e6\u624b\u602a\u88ab\u6253\u8d25\u4e86", "inside, the remains of its victims are everywhere.": "\u623f\u95f4\u91cc\u9762\u5230\u5904\u90fd\u662f\u5176\u53d7\u5bb3\u8005\u7684\u9057\u9ab8", "the warped man lies dead.": "\u4e25\u91cd\u6bc1\u5bb9\u7684\u7537\u5b50\u5012\u4e0b\u4e86", "the operating theatre has a lot of curious equipment.": "\u624b\u672f\u5ba4\u91cc\u6709\u5f88\u591a\u7a00\u5947\u7684\u8bbe\u5907", "the old man had a small cache of interesting items.": "\u8001\u4eba\u6709\u4e00\u4e2a\u85cf\u7269\u5904\uff0c\u91cc\u9762\u6709\u5f88\u591a\u6709\u610f\u601d\u7684\u7269\u54c1", "An Old House": "\u65e7\u623f\u5b50", "an old house remains here, once white siding yellowed and peeling.": "\u4e00\u5ea7\u8001\u623f\u5b50\u4ecd\u5728\u8fd9\u91cc\uff0c\u66fe\u7ecf\u7684\u767d\u8272\u58c1\u677f\u53d1\u9ec4\u8131\u76ae", "the door hangs open.": "\u95e8\u655e\u5f00\u7740", "the remains of an old house stand as a monument to simpler times": "\u65e7\u623f\u5b50\u7684\u9057\u5740\u77d7\u7acb\u5728\u90a3\u91cc\uff0c\u50cf\u4e00\u5ea7\u7b80\u6734\u5e74\u4ee3\u7684\u7eaa\u5ff5\u7891", "the house is abandoned, but not yet picked over.": "\u623f\u5b50\u88ab\u9057\u5f03\uff0c\u4f46\u8fd8\u6ca1\u88ab\u6d17\u52ab\u8fc7", "still a few drops of water in the old well.": "\u53e4\u4e95\u4e2d\u8fd8\u6709\u4e00\u70b9\u6c34", "the house has been ransacked.": "\u623f\u5b50\u5df2\u88ab\u6d17\u52ab", "but there is a cache of medicine under the floorboards.": "\u6728\u5730\u677f\u4e0b\u9762\u85cf\u7740\u4e00\u4e9b\u8865\u7ed9\u54c1", "a man charges down the hall, a rusty blade in his hand": "\u4e00\u4e2a\u7537\u4eba\u51b2\u8fdb\u5927\u5385\uff0c\u624b\u91cc\u62ff\u7740\u4e00\u5757\u751f\u9508\u7684\u5200\u7247", "A Forgotten Battlefield": "\u88ab\u9057\u5fd8\u7684\u6218\u573a", "a battle was fought here, long ago.": "\u5f88\u4e45\u4e4b\u524d\u8fd9\u91cc\u53d1\u751f\u4e86\u6218\u6597", "battered technology from both sides lays dormant on the blasted landscape.": "\u53cc\u65b9\u7684\u88c5\u5907\u9759\u9759\u5730\u8eba\u5728\u88ab\u70b8\u6bc1\u7684\u5730\u9762\u4e0a", "A Huge Borehole": "\u5de8\u5751", "a huge hole is cut deep into the earth, evidence of the past harvest.": "\u5730\u7403\u4e0a\u88c2\u5f00\u7684\u4e00\u4e2a\u5927\u6d1e\uff0c\u8fdc\u53e4\u65f6\u4ee3\u7684\u9057\u8ff9", "they took what they came for, and left.": "\u4ed6\u4eec\u62ff\u5230\u4e86\u4ed6\u4eec\u6765\u6b64\u8981\u627e\u7684\u4e1c\u897f\uff0c\u7136\u540e\u79bb\u5f00\u4e86", "castoff from the mammoth drills can still be found by the edges of the precipice.": "\u7ee7\u7eed\u63a2\u7d22\u60ac\u5d16", "A Crashed Ship": "\u5760\u6bc1\u661f\u8230", "the familiar curves of a wanderer vessel rise up out of the dust and ash. ": "\u6d41\u6d6a\u8005\u98de\u8239\u7684\u719f\u6089\u66f2\u7ebf\u9732\u51fa\u4e86\u5c18\u571f\u4e0e\u7070\u70ec", "lucky that the natives can't work the mechanisms.": "\u5e78\u8fd0\u7684\u662f\u5f53\u5730\u4eba\u4e0d\u4f1a\u64cd\u4f5c\u91cc\u9762\u7684\u673a\u5668", "with a little effort, it might fly again.": "\u4fee\u6574\u4fee\u6574\u540e\u5b83\u5e94\u8be5\u8fd8\u80fd\u98de", "salvage": "\u62a2\u6551", "The Sulphur Mine": "\u786b\u78fa\u77ff", "the military is already set up at the mine's entrance.": "\u6b66\u88c5\u529b\u91cf\u5df2\u7ecf\u5728\u77ff\u4e95\u5165\u53e3\u9a7b\u624e\u4e86\u4e0b\u6765", "soldiers patrol the perimeter, rifles slung over their shoulders.": "\u58eb\u5175\u80a9\u4e0a\u625b\u7740\u6b65\u67aa\u5728\u5468\u56f4\u5de1\u903b", "a military perimeter is set up around the mine.": "\u77ff\u4e95\u5468\u56f4\u8bbe\u7acb\u4e86\u519b\u4e8b\u8fb9\u754c", "attack": "\u653b\u51fb", "a soldier, alerted, opens fire.": "\u4e00\u4e2a\u58eb\u5175\u62c9\u54cd\u4e86\u8b66\u62a5\uff0c\u7136\u540e\u5f00\u706b\u4e86", "run": "\u8dd1", "a second soldier joins the fight.": "\u5176\u4ed6\u58eb\u5175\u52a0\u5165\u4e86\u6218\u6597", "a grizzled soldier attacks, waving a bayonet.": "\u4e00\u4e2a\u5934\u53d1\u6591\u767d\u7684\u58eb\u5175\u6325\u821e\u7740\u523a\u5200\u53d1\u8d77\u4e86\u653b\u51fb", "the military presence has been cleared.": "\u6b66\u88c5\u529b\u91cf\u5df2\u7ecf\u88ab\u6e05\u7406\u5e72\u51c0\u4e86", "the mine is now safe for workers.": "\u77ff\u4e95\u73b0\u5728\u5b89\u5168\u4e86", "the sulphur mine is clear of dangers": "\u786b\u78fa\u77ff\u73b0\u5728\u6ca1\u6709\u5371\u9669\u4e86", "The Coal Mine": "\u7164\u77ff", "camp fires burn by the entrance to the mine.": "\u77ff\u4e95\u5165\u53e3\u5904\u71c3\u70e7\u7740\u8425\u706b", "men mill about, weapons at the ready.": "\u6b66\u5668\u5df2\u51c6\u5907\u5c31\u7eea", "this old mine is not abandoned": "\u8fd9\u4e2a\u65e7\u77ff\u6ca1\u6709\u88ab\u5e9f\u5f03", "a man joins the fight": "\u4e00\u4e2a\u7537\u4eba\u52a0\u5165\u4e86\u6218\u6597", "only the chief remains.": "\u53ea\u5269\u4e0b\u9996\u9886\u4e86", "the camp is still, save for the crackling of the fires.": "\u8425\u5730\u5e73\u9759\u4e0b\u6765\uff0c\u9664\u4e86\u5288\u556a\u4f5c\u54cd\u7684\u706b\u82d7", "the coal mine is clear of dangers": "\u7164\u77ff\u73b0\u5728\u6ca1\u6709\u5371\u9669\u4e86", "The Iron Mine": "\u94c1\u77ff", "an old iron mine sits here, tools abandoned and left to rust.": "\u4e00\u5ea7\u8001\u65e7\u7684\u94c1\u77ff\uff0c\u56db\u5468\u90fd\u662f\u5e9f\u5f03\u7684\u5de5\u5177\uff0c\u542c\u4efb\u751f\u9508", "bleached bones are strewn about the entrance. many, deeply scored with jagged grooves.": "\u5165\u53e3\u5904\u6563\u843d\u7740\u5f88\u591a\u9aa8\u5934\uff0c\u4e0a\u9762\u6709\u5f88\u591a\u6df1\u6df1\u7684\u952f\u9f7f\u72b6\u51f9\u69fd", "feral howls echo out of the darkness.": "\u91ce\u517d\u7684\u5486\u54ee\u56de\u8361\u5728\u9ed1\u6697\u4e2d", "the path leads to an abandoned mine": "\u901a\u5411\u4e00\u4e2a\u5e9f\u5f03\u7684\u77ff\u4e95", "a large creature lunges, muscles rippling in the torchlight": "\u4e00\u53ea\u5de8\u5927\u7684\u751f\u7269\u543c\u53eb\u4e86\u4e00\u58f0\uff0c\u808c\u8089\u5728\u706b\u5149\u4e2d\u8d77\u4f0f\u7740", "the beast is dead.": "\u91ce\u517d\u5012\u4e0b\u4e86", "the iron mine is clear of dangers": "\u94c1\u77ff\u73b0\u5728\u6ca1\u6709\u5371\u9669\u4e86", "A Destroyed Village": "\u88ab\u6467\u6bc1\u7684\u6751\u843d", "a destroyed village lies in the dust.": "\u6751\u843d\u7684\u5e9f\u589f\u63a9\u76d6\u7740\u4e00\u5c42\u5c18\u571f", "charred bodies litter the ground.": "\u904d\u5730\u7126\u5c38", "the metallic tang of wanderer afterburner hangs in the air.": "\u6d41\u6d6a\u8005\u5f15\u64ce\u6563\u53d1\u51fa\u7684\u91d1\u5c5e\u6c14\u5473\u5145\u65a5\u5728\u7a7a\u6c14\u4e2d", "a shack stands at the center of the village.": "\u4e00\u680b\u5c0f\u68da\u5b50\u77d7\u7acb\u5728\u6751\u5b50\u4e2d\u592e", "there are still supplies inside.": "\u91cc\u5934\u4f3c\u4e4e\u8fd8\u6709\u4e9b\u7269\u8d44", "all the work of a previous generation is here.": "\u8fd9\u91cc\u7559\u5b58\u7740\u524d\u4ee3\u4eba\u7684\u6240\u6709\u52b3\u52a8\u679c\u5b9e", "ripe for the picking.": "\u662f\u65f6\u5019\u91c7\u6458\u5b83\u4eec\u4e86"});
var Button = {
	Button: function(options) {
		if(typeof options.cooldown == 'number') {
			this.data_cooldown = options.cooldown;
		}
		this.data_remaining = 0;
		if(typeof options.click == 'function') {
			this.data_handler = options.click;
		}

		var el = $('<div>')
			.attr('id', typeof(options.id) != 'undefined' ? options.id : "BTN_" + Engine.getGuid())
			.addClass('button')
			.text(typeof(options.text) != 'undefined' ? options.text : "button")
			.click(function() {
				if(!$(this).hasClass('disabled')) {
					Button.cooldown($(this));
					$(this).data("handler")($(this));
				}
			})
			.data("handler",  typeof options.click == 'function' ? options.click : function() { Engine.log("click"); })
			.data("remaining", 0)
			.data("cooldown", typeof options.cooldown == 'number' ? options.cooldown : 0)
			.data('boosted', options.boosted ?? (() => false));

		el.append($("<div>").addClass('cooldown'));

		// waiting for expiry of residual cooldown detected in state
		Button.cooldown(el, 'state');

		if(options.cost) {
			var ttPos = options.ttPos ? options.ttPos : "bottom right";
			var costTooltip = $('<div>').addClass('tooltip ' + ttPos);
			for(var k in options.cost) {
				$("<div>").addClass('row_key').text(_(k)).appendTo(costTooltip);
				$("<div>").addClass('row_val').text(options.cost[k]).appendTo(costTooltip);
			}
			if(costTooltip.children().length > 0) {
				costTooltip.appendTo(el);
			}
		}

		if(options.width) {
			el.css('width', options.width);
		}

		return el;
	},

	saveCooldown: true,

	setDisabled: function(btn, disabled) {
		if(btn) {
			if(!disabled && !btn.data('onCooldown')) {
				btn.removeClass('disabled');
			} else if(disabled) {
				btn.addClass('disabled');
			}
			btn.data('disabled', disabled);
		}
	},

	isDisabled: function(btn) {
		if(btn) {
			return btn.data('disabled') === true;
		}
		return false;
	},

	cooldown: function(btn, option) {
		var cd = btn.data("cooldown");
		if (btn.data('boosted')()) {
			cd /= 2;
		}
		var id = 'cooldown.'+ btn.attr('id');
		if(cd > 0) {
			if(typeof option == 'number') {
				cd = option;
			}
			// param "start" takes value from cooldown time if not specified
			var start, left;
			switch(option){
				// a switch will allow for several uses of cooldown function
				case 'state':
					if(!$SM.get(id)){
						return;
					}
					start = Math.min($SM.get(id), cd);
					left = (start / cd).toFixed(4);
					break;
				default:
					start = cd;
					left = 1;
			}
			Button.clearCooldown(btn);
			if(Button.saveCooldown){
				$SM.set(id,start);
				// residual value is measured in seconds
				// saves program performance
				btn.data('countdown', Engine.setInterval(function(){
					$SM.set(id, $SM.get(id, true) - 0.5, true);
				},500));
			}
			var time = start;
			if (Engine.options.doubleTime){
				time /= 2;
			}
			$('div.cooldown', btn).width(left * 100 +"%").animate({width: '0%'}, time * 1000, 'linear', function() {
				Button.clearCooldown(btn, true);
			});
			btn.addClass('disabled');
			btn.data('onCooldown', true);
		}
	},

	clearCooldown: function(btn, cooldownEnded) {
		var ended = cooldownEnded || false;
		if(!ended){
			$('div.cooldown', btn).stop(true, true);
		}
		btn.data('onCooldown', false);
		if(btn.data('countdown')){
			window.clearInterval(btn.data('countdown'));
			$SM.remove('cooldown.'+ btn.attr('id'));
			btn.removeData('countdown');
		}
		if(!btn.data('disabled')) {
			btn.removeClass('disabled');
		}
	}
};
/**
 * Module that defines all audio files
 */
var AudioLibrary = {
    MUSIC_DUSTY_PATH: 'audio/dusty-path.flac',
    MUSIC_SILENT_FOREST: 'audio/silent-forest.flac',
    MUSIC_LONELY_HUT: 'audio/lonely-hut.flac',
    MUSIC_TINY_VILLAGE: 'audio/tiny-village.flac',
    MUSIC_MODEST_VILLAGE: 'audio/modest-village.flac',
    MUSIC_LARGE_VILLAGE: 'audio/large-village.flac',
    MUSIC_RAUCOUS_VILLAGE: 'audio/raucous-village.flac',
    MUSIC_FIRE_DEAD: 'audio/fire-dead.flac',
    MUSIC_FIRE_SMOLDERING: 'audio/fire-smoldering.flac',
    MUSIC_FIRE_FLICKERING: 'audio/fire-flickering.flac',
    MUSIC_FIRE_BURNING: 'audio/fire-burning.flac',
    MUSIC_FIRE_ROARING: 'audio/fire-roaring.flac',
    MUSIC_WORLD: 'audio/world.flac',
    MUSIC_SPACE: 'audio/space.flac',
    MUSIC_ENDING: 'audio/ending.flac',
    MUSIC_SHIP: 'audio/ship.flac',
    EVENT_NOMAD: 'audio/event-nomad.flac',
    EVENT_NOISES_OUTSIDE: 'audio/event-noises-outside.flac',
    EVENT_NOISES_INSIDE: 'audio/event-noises-inside.flac',
    EVENT_BEGGAR: 'audio/event-beggar.flac',
    EVENT_SHADY_BUILDER: 'audio/event-shady-builder.flac',
    EVENT_MYSTERIOUS_WANDERER: 'audio/event-mysterious-wanderer.flac',
    EVENT_SCOUT: 'audio/event-scout.flac',
    EVENT_WANDERING_MASTER: 'audio/event-wandering-master.flac',
    EVENT_SICK_MAN: 'audio/event-sick-man.flac',
    EVENT_RUINED_TRAP: 'audio/event-ruined-trap.flac',
    EVENT_HUT_FIRE: 'audio/event-hut-fire.flac',
    EVENT_SICKNESS: 'audio/event-sickness.flac',
    EVENT_PLAGUE: 'audio/event-plague.flac',
    EVENT_BEAST_ATTACK: 'audio/event-beast-attack.flac',
    EVENT_SOLDIER_ATTACK: 'audio/event-soldier-attack.flac',
    EVENT_THIEF: 'audio/event-thief.flac',
    LANDMARK_FRIENDLY_OUTPOST: 'audio/landmark-friendly-outpost.flac',
    LANDMARK_SWAMP: 'audio/landmark-swamp.flac',
    LANDMARK_CAVE: 'audio/landmark-cave.flac',
    LANDMARK_TOWN: 'audio/landmark-town.flac',
    LANDMARK_CITY: 'audio/landmark-city.flac',
    LANDMARK_HOUSE: 'audio/landmark-house.flac',
    LANDMARK_BATTLEFIELD: 'audio/landmark-battlefield.flac',
    LANDMARK_BOREHOLE: 'audio/landmark-borehole.flac',
    LANDMARK_CRASHED_SHIP: 'audio/landmark-crashed-ship.flac',
    LANDMARK_SULPHUR_MINE: 'audio/landmark-sulphurmine.flac',
    LANDMARK_COAL_MINE: 'audio/landmark-coalmine.flac',
    LANDMARK_IRON_MINE: 'audio/landmark-ironmine.flac',
    LANDMARK_DESTROYED_VILLAGE: 'audio/landmark-destroyed-village.flac',
    ENCOUNTER_TIER_1: 'audio/encounter-tier-1.flac',
    ENCOUNTER_TIER_2: 'audio/encounter-tier-2.flac',
    ENCOUNTER_TIER_3: 'audio/encounter-tier-3.flac',
    LIGHT_FIRE: 'audio/light-fire.flac',
    STOKE_FIRE: 'audio/stoke-fire.flac',
    BUILD: 'audio/build.flac',
    CRAFT: 'audio/craft.flac',
    BUY: 'audio/buy.flac',
    GATHER_WOOD: 'audio/gather-wood.flac',
    CHECK_TRAPS: 'audio/check-traps.flac',
    EMBARK: 'audio/embark.flac',
    FOOTSTEPS_1: 'audio/footsteps-1.flac',
    FOOTSTEPS_2: 'audio/footsteps-2.flac',
    FOOTSTEPS_3: 'audio/footsteps-3.flac',
    FOOTSTEPS_4: 'audio/footsteps-4.flac',
    FOOTSTEPS_5: 'audio/footsteps-5.flac',
    FOOTSTEPS_6: 'audio/footsteps-6.flac',
    EAT_MEAT: 'audio/eat-meat.flac',
    USE_MEDS: 'audio/use-meds.flac',
    WEAPON_UNARMED_1: 'audio/weapon-unarmed-1.flac',
    WEAPON_UNARMED_2: 'audio/weapon-unarmed-2.flac',
    WEAPON_UNARMED_3: 'audio/weapon-unarmed-3.flac',
    WEAPON_MELEE_1: 'audio/weapon-melee-1.flac',
    WEAPON_MELEE_2: 'audio/weapon-melee-2.flac',
    WEAPON_MELEE_3: 'audio/weapon-melee-3.flac',
    WEAPON_RANGED_1: 'audio/weapon-ranged-1.flac',
    WEAPON_RANGED_2: 'audio/weapon-ranged-2.flac',
    WEAPON_RANGED_3: 'audio/weapon-ranged-3.flac',
    DEATH: 'audio/death.flac',
    REINFORCE_HULL: 'audio/reinforce-hull.flac',
    UPGRADE_ENGINE: 'audio/upgrade-engine.flac',
    LIFT_OFF: 'audio/lift-off.flac',
    ASTEROID_HIT_1: 'audio/asteroid-hit-1.flac',
    ASTEROID_HIT_2: 'audio/asteroid-hit-2.flac',
    ASTEROID_HIT_3: 'audio/asteroid-hit-3.flac',
    ASTEROID_HIT_4: 'audio/asteroid-hit-4.flac',
    ASTEROID_HIT_5: 'audio/asteroid-hit-5.flac',
    ASTEROID_HIT_6: 'audio/asteroid-hit-6.flac',
    ASTEROID_HIT_7: 'audio/asteroid-hit-7.flac',
    ASTEROID_HIT_8: 'audio/asteroid-hit-8.flac',
    CRASH: 'audio/crash.flac',
};/**
 * Module that takes care of audio playback
 */
var AudioEngine = {
    FADE_TIME: 1,
    AUDIO_BUFFER_CACHE: {},
    _audioContext: null,
    _master: null,
    _currentBackgroundMusic: null,
    _currentEventAudio: null,
    _currentSoundEffectAudio: null,
    _initialized: false,
    init: function () {
        AudioEngine._initAudioContext();
        // AudioEngine._preloadAudio(); // removed to save bandwidth
        AudioEngine._initialized = true;
    },
    _preloadAudio: function () {
        // start loading music and events early
        // ** could be used later if we specify a better set of
        // audio files to preload -- i.e. we probably don't need to load
        // the later villages or events audio, and esp. not the ending
        for (var key in AudioLibrary) {
            if (
            key.toString().indexOf('MUSIC_') > -1 ||
            key.toString().indexOf('EVENT_') > -1) {
                AudioEngine.loadAudioFile(AudioLibrary[key]);
            }
        }
    },
    _initAudioContext: function () {
        AudioEngine._audioContext = new (window.AudioContext || window.webkitAudioContext);
        AudioEngine._createMasterChannel();
    },
    _createMasterChannel: function () {
        // create master
        AudioEngine._master = AudioEngine._audioContext.createGain();
        AudioEngine._master.gain.setValueAtTime(1.0, AudioEngine._audioContext.currentTime);
        AudioEngine._master.connect(AudioEngine._audioContext.destination);
    },
    _getMissingAudioBuffer: function () {
        // plays beeping sound to indicate missing audio
        var buffer = AudioEngine._audioContext.createBuffer(
            1,
            AudioEngine._audioContext.sampleRate,
            AudioEngine._audioContext.sampleRate
        );
        // Fill the buffer
        var bufferData = buffer.getChannelData(0);
        for (var i = 0; i < buffer.length / 2; i++) {
            bufferData[i] = Math.sin(i * 0.05) / 4; // max .25 gain value
        }
        return buffer;
    },
    _playSound: function (buffer) {
        if (AudioEngine._currentSoundEffectAudio &&
            AudioEngine._currentSoundEffectAudio.source.buffer == buffer) {
            return;
        }

        var source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.onended = function(event) {
            // dereference current sound effect when finished
            if (AudioEngine._currentSoundEffectAudio &&
                AudioEngine._currentSoundEffectAudio.source.buffer == buffer) {
                AudioEngine._currentSoundEffectAudio = null;
            }
        };

        source.connect(AudioEngine._master);
        source.start();

        AudioEngine._currentSoundEffectAudio = {
            source: source
        };
    },
    _playBackgroundMusic: function (buffer) {
        var source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        var envelope = AudioEngine._audioContext.createGain();
        envelope.gain.setValueAtTime(0.0, AudioEngine._audioContext.currentTime);
        
        var fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME;

        // fade out current background music
        if (AudioEngine._currentBackgroundMusic && 
            AudioEngine._currentBackgroundMusic.source &&
            AudioEngine._currentBackgroundMusic.source.playbackState !== 0) {
            var currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
            AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
            AudioEngine._currentBackgroundMusic.source.stop(fadeTime + 0.3); // make sure fade has completed
        }

        // fade in new backgorund music
        source.connect(envelope);
        envelope.connect(AudioEngine._master);
        source.start();
        envelope.gain.linearRampToValueAtTime(1.0, fadeTime);

        // update current background music
        AudioEngine._currentBackgroundMusic = {
            source: source,
            envelope: envelope
        };
    },
    _playEventMusic: function (buffer) {
        var source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        var envelope = AudioEngine._audioContext.createGain();
        envelope.gain.setValueAtTime(0.0, AudioEngine._audioContext.currentTime);

        var fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME * 2;

        // turn down current background music
        if (AudioEngine._currentBackgroundMusic != null) {
            var currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
            AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.2, fadeTime);
        }

        // fade in event music
        source.connect(envelope);
        envelope.connect(AudioEngine._master);
        source.start();
        envelope.gain.linearRampToValueAtTime(1.0, fadeTime);

        // update reference
        AudioEngine._currentEventAudio = {
            source: source,
            envelope: envelope
        };
    },
    _stopEventMusic: function () {
        var fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME * 2;

        // fade out event music and stop
        if (AudioEngine._currentEventAudio && 
            AudioEngine._currentEventAudio.source && 
            AudioEngine._currentEventAudio.source.buffer) {
            var currentEventGainValue = AudioEngine._currentEventAudio.envelope.gain.value;
            AudioEngine._currentEventAudio.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentEventAudio.envelope.gain.setValueAtTime(currentEventGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentEventAudio.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
            AudioEngine._currentEventAudio.source.stop(fadeTime + 1); // make sure fade has completed
            AudioEngine._currentEventAudio = null;
        }

        // turn up background music
        if (AudioEngine._currentBackgroundMusic) {
          var currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
          AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
          AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
          AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(1.0, fadeTime);
        }
    },
    isAudioContextRunning: function () {
        return AudioEngine._audioContext.state !== 'suspended';
    },
    tryResumingAudioContext: function() {
        if (AudioEngine._audioContext.state === 'suspended') {
            AudioEngine._audioContext.resume();
        }
    },
    playBackgroundMusic: function (src) {
        if (!AudioEngine._initialized) {
          return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playBackgroundMusic(buffer);
            });
    },
    playEventMusic: function (src) {
        if (!AudioEngine._initialized) {
          return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playEventMusic(buffer);
            });
    },
    stopEventMusic: function () {
        if (!AudioEngine._initialized) {
          return;
        }
        AudioEngine._stopEventMusic();
    },
    playSound: function (src) {
        if (!AudioEngine._initialized) {
          return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playSound(buffer);
            });
    },
    loadAudioFile: function (src) {
        if (src.indexOf('http') === -1) {
            src = window.location + src;
        }
        if (AudioEngine.AUDIO_BUFFER_CACHE[src]) {
            return new Promise(function (resolve, reject) {
                resolve(AudioEngine.AUDIO_BUFFER_CACHE[src]);
            });
        } else {
            var request = new Request(src);
            return fetch(request).then(function (response) {
                return response.arrayBuffer();
            }).then(function (buffer) {
                if (buffer.byteLength === 0) {
                    console.error('cannot load audio from ' + src);
                    return AudioEngine._getMissingAudioBuffer();
                }

                var decodeAudioDataPromise = AudioEngine._audioContext.decodeAudioData(buffer, function (decodedData) {
                    AudioEngine.AUDIO_BUFFER_CACHE[src] = decodedData;
                    return AudioEngine.AUDIO_BUFFER_CACHE[src];
                });

                // Safari WebAudio does not return a promise based API for
                // decodeAudioData, so we need to fake it if we want to play
                // audio immediately on first fetch
                if (decodeAudioDataPromise) {
                    return decodeAudioDataPromise;
                } else {
                    return new Promise(function (resolve, reject) {
                        var fakePromiseId = setInterval(function() {
                            if (AudioEngine.AUDIO_BUFFER_CACHE[src]) {
                                resolve(AudioEngine.AUDIO_BUFFER_CACHE[src]);
                                clearInterval(fakePromiseId);
                            }
                        }, 20);
                    });
                }
            });
        }
    },
    setBackgroundMusicVolume: function (volume, s) {
        if (AudioEngine._master == null) return;  // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        // cancel any current schedules and then ramp
        var currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
        AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
        AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
        AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(
            volume,
            AudioEngine._audioContext.currentTime + s
        );
    },
    setMasterVolume: function (volume, s) {
        if (AudioEngine._master == null) return;  // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        // cancel any current schedules and then ramp
        var currentGainValue = AudioEngine._master.gain.value;
        AudioEngine._master.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
        AudioEngine._master.gain.setValueAtTime(currentGainValue, AudioEngine._audioContext.currentTime);
        AudioEngine._master.gain.linearRampToValueAtTime(
            volume,
            AudioEngine._audioContext.currentTime + s
        );
    }
};
/*
 * Module for handling States
 *
 * All states should be get and set through the StateManager ($SM).
 *
 * The manager is intended to handle all needed checks and error catching.
 * This includes creating the parents of layered/deep states so undefined states
 * do not need to be tested for and created beforehand.
 *
 * When a state is changed, an update event is sent out containing the name of the state
 * changed or in the case of multiple changes (.setM, .addM) the parent class changed.
 * Event: type: 'stateUpdate', stateName: <path of state or parent state>
 *
 * Original file created by: Michael Galusha
 */

var StateManager = {

	MAX_STORE: 99999999999999,

	options: {},

	init: function(options) {
		this.options = $.extend(
				this.options,
				options
		);

		//create categories
		var cats = [
			'features',     // big features like buildings, location availability, unlocks, etc
			'stores',       // little stuff, items, weapons, etc
			'character',    // this is for player's character stats such as perks
			'income',
			'timers',
			'game',         // mostly location related: fire temp, workers, population, world map, etc
			'playStats',    // anything play related: play time, loads, etc
			'previous',     // prestige, score, trophies (in future), achievements (again, not yet), etc
			'outfit',      	// used to temporarily store the items to be taken on the path
			'config',
			'wait',			// mysterious wanderers are coming back
			'cooldown'      // residual values for cooldown buttons
		];

		for(var which in cats) {
			if(!$SM.get(cats[which])) $SM.set(cats[which], {});
		}

		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe($SM.handleStateUpdates);
	},

	//create all parents and then set state
	createState: function(stateName, value) {
		var words = stateName.split(/[.\[\]'"]+/);
		//for some reason there are sometimes empty strings
		for (var j = 0; j < words.length; j++) {
			if (words[j] === '') {
				words.splice(j, 1);
				j--;
			}
		}
		var obj = State;
		var w = null;
		for(var i=0, len=words.length-1;i<len;i++){
			w = words[i];
			if(obj[w] === undefined ) obj[w] = {};
			obj = obj[w];
		}
		obj[words[i]] = value;
		return obj;
	},

	//set single state
	//if noEvent is true, the update event won't trigger, useful for setting multiple states first
	set: function(stateName, value, noEvent) {
		var fullPath = $SM.buildPath(stateName);

		//make sure the value isn't over the engine maximum
		if(typeof value == 'number' && value > $SM.MAX_STORE) value = $SM.MAX_STORE;

		try{
			eval('('+fullPath+') = value');
		} catch (e) {
			//parent doesn't exist, so make parent
			$SM.createState(stateName, value);
		}

		//stores values can not be negative
		if(stateName.indexOf('stores') === 0 && $SM.get(stateName, true) < 0) {
			eval('('+fullPath+') = 0');
			Engine.log('WARNING: state:' + stateName + ' can not be a negative value. Set to 0 instead.');
		}

		if(!noEvent) {
			Engine.saveGame();
			$SM.fireUpdate(stateName);
		}
	},

	//sets a list of states
	setM: function(parentName, list, noEvent) {
		$SM.buildPath(parentName);

		//make sure the state exists to avoid errors,
		if($SM.get(parentName) === undefined) $SM.set(parentName, {}, true);

		for(var k in list){
			$SM.set(parentName+'["'+k+'"]', list[k], true);
		}

		if(!noEvent) {
			Engine.saveGame();
			$SM.fireUpdate(parentName);
		}
	},

	//shortcut for altering number values, return 1 if state wasn't a number
	add: function(stateName, value, noEvent) {
		var err = 0;
		//0 if undefined, null (but not {}) should allow adding to new objects
		//could also add in a true = 1 thing, to have something go from existing (true)
		//to be a count, but that might be unwanted behavior (add with loose eval probably will happen anyways)
		var old = $SM.get(stateName, true);

		//check for NaN (old != old) and non number values
		if(old != old){
			Engine.log('WARNING: '+stateName+' was corrupted (NaN). Resetting to 0.');
			old = 0;
			$SM.set(stateName, old + value, noEvent);
		} else if(typeof old != 'number' || typeof value != 'number'){
			Engine.log('WARNING: Can not do math with state:'+stateName+' or value:'+value+' because at least one is not a number.');
			err = 1;
		} else {
			$SM.set(stateName, old + value, noEvent); //setState handles event and save
		}

		return err;
	},

	//alters multiple number values, return number of fails
	addM: function(parentName, list, noEvent) {
		var err = 0;

		//make sure the parent exists to avoid errors
		if($SM.get(parentName) === undefined) $SM.set(parentName, {}, true);

		for(var k in list){
			if($SM.add(parentName+'["'+k+'"]', list[k], true)) err++;
		}

		if(!noEvent) {
			Engine.saveGame();
			$SM.fireUpdate(parentName);
		}
		return err;
	},

	//return state, undefined or 0
	get: function(stateName, requestZero) {
		var whichState = null;
		var fullPath = $SM.buildPath(stateName);

		//catch errors if parent of state doesn't exist
		try{
			eval('whichState = ('+fullPath+')');
		} catch (e) {
			whichState = undefined;
		}

		//prevents repeated if undefined, null, false or {}, then x = 0 situations
		if((!whichState || whichState == {}) && requestZero) return 0;
		else return whichState;
	},

	//mainly for local copy use, add(M) can fail so we can't shortcut them
	//since set does not fail, we know state exists and can simply return the object
	setget: function(stateName, value, noEvent){
		$SM.set(stateName, value, noEvent);
		return eval('('+$SM.buildPath(stateName)+')');
	},

	remove: function(stateName, noEvent) {
		var whichState = $SM.buildPath(stateName);
		try{
			eval('(delete '+whichState+')');
		} catch (e) {
			//it didn't exist in the first place
			Engine.log('WARNING: Tried to remove non-existant state \''+stateName+'\'.');
		}
		if(!noEvent){
			Engine.saveGame();
			$SM.fireUpdate(stateName);
		}
	},

	removeBranch: function(stateName, noEvent) {
		for(var i in $SM.get(stateName)){
			if(typeof $SM.get(stateName)[i] == 'object'){
				$SM.removeBranch(stateName +'["'+ i +'"]');
			}
		}
		if($.isEmptyObject($SM.get(stateName))){
			$SM.remove(stateName);
		}
		if(!noEvent){
			Engine.saveGame();
			$SM.fireUpdate(stateName);
		}
	},

	//creates full reference from input
	//hopefully this won't ever need to be more complicated
	buildPath: function(input){
		var dot = (input.charAt(0) == '[')? '' : '.'; //if it starts with [foo] no dot to join
		return 'State' + dot + input;
	},

	fireUpdate: function(stateName, save){
		var category = $SM.getCategory(stateName);
		if(stateName === undefined) stateName = category = 'all'; //best if this doesn't happen as it will trigger more stuff
		$.Dispatch('stateUpdate').publish({'category': category, 'stateName':stateName});
		if(save) Engine.saveGame();
	},

	getCategory: function(stateName){
		var firstOB = stateName.indexOf('[');
		var firstDot = stateName.indexOf('.');
		var cutoff = null;
		if(firstOB == -1 || firstDot == -1){
			cutoff = firstOB > firstDot ? firstOB : firstDot;
		} else {
			cutoff = firstOB < firstDot ? firstOB : firstDot;
		}
		if (cutoff == -1){
			return stateName;
		} else {
			return stateName.substr(0,cutoff);
		}
	},

	//Use this function to make old save games compatible with new version
	updateOldState: function(){
		var version = $SM.get('version');
		if(typeof version != 'number') version = 1.0;
		if(version == 1.0) {
			// v1.1 introduced the Lodge, so get rid of lodgeless hunters
			$SM.remove('outside.workers.hunter', true);
			$SM.remove('income.hunter', true);
			Engine.log('upgraded save to v1.1');
			version = 1.1;
		}
		if(version == 1.1) {
			//v1.2 added the Swamp to the map, so add it to already generated maps
			if($SM.get('world')) {
				World.placeLandmark(15, World.RADIUS * 1.5, World.TILE.SWAMP, $SM.get('world.map'));
			}
			Engine.log('upgraded save to v1.2');
			version = 1.2;
		}
		if(version == 1.2) {
			//StateManager added, so move data to new locations
			$SM.remove('room.fire');
			$SM.remove('room.temperature');
			$SM.remove('room.buttons');
			if($SM.get('room')){
				$SM.set('features.location.room', true);
				$SM.set('game.builder.level', $SM.get('room.builder'));
				$SM.remove('room');
			}
			if($SM.get('outside')){
				$SM.set('features.location.outside', true);
				$SM.set('game.population', $SM.get('outside.population'));
				$SM.set('game.buildings', $SM.get('outside.buildings'));
				$SM.set('game.workers', $SM.get('outside.workers'));
				$SM.set('game.outside.seenForest', $SM.get('outside.seenForest'));
				$SM.remove('outside');
			}
			if($SM.get('world')){
				$SM.set('features.location.world', true);
				$SM.set('game.world.map', $SM.get('world.map'));
				$SM.set('game.world.mask', $SM.get('world.mask'));
				$SM.set('starved', $SM.get('character.starved', true));
				$SM.set('dehydrated', $SM.get('character.dehydrated', true));
				$SM.remove('world');
				$SM.remove('starved');
				$SM.remove('dehydrated');
			}
			if($SM.get('ship')){
				$SM.set('features.location.spaceShip', true);
				$SM.set('game.spaceShip.hull', $SM.get('ship.hull', true));
				$SM.set('game.spaceShip.thrusters', $SM.get('ship.thrusters', true));
				$SM.set('game.spaceShip.seenWarning', $SM.get('ship.seenWarning'));
				$SM.set('game.spaceShip.seenShip', $SM.get('ship.seenShip'));
				$SM.remove('ship');
			}
			if($SM.get('punches')){
				$SM.set('character.punches', $SM.get('punches'));
				$SM.remove('punches');
			}
			if($SM.get('perks')){
				$SM.set('character.perks', $SM.get('perks'));
				$SM.remove('perks');
			}
			if($SM.get('thieves')){
				$SM.set('game.thieves', $SM.get('thieves'));
				$SM.remove('thieves');
			}
			if($SM.get('stolen')){
				$SM.set('game.stolen', $SM.get('stolen'));
				$SM.remove('stolen');
			}
			if($SM.get('cityCleared')){
				$SM.set('character.cityCleared', $SM.get('cityCleared'));
				$SM.remove('cityCleared');
			}
			$SM.set('version', 1.3);
		}
	},

	/******************************************************************
	 * Start of specific state functions
	 ******************************************************************/
	//PERKS
	addPerk: function(name) {
		$SM.set('character.perks["'+name+'"]', true);
		Notifications.notify(null, Engine.Perks[name].notify);
	},

	hasPerk: function(name) {
		return $SM.get('character.perks["'+name+'"]');
	},

	//INCOME
	setIncome: function(source, options) {
		var existing = $SM.get('income["'+source+'"]');
		if(typeof existing != 'undefined') {
			options.timeLeft = existing.timeLeft;
		}
		$SM.set('income["'+source+'"]', options);
	},

	getIncome: function(source) {
		var existing = $SM.get('income["'+source+'"]');
		if(typeof existing != 'undefined') {
			return existing;
		}
		return {};
	},

	collectIncome: function() {
		var changed = false;
		if(typeof $SM.get('income') != 'undefined' && Engine.activeModule != Space) {
			for(var source in $SM.get('income')) {
				var income = $SM.get('income["'+source+'"]');
				if(typeof income.timeLeft != 'number')
				{
					income.timeLeft = 0;
				}
				income.timeLeft--;

				if(income.timeLeft <= 0) {
					Engine.log('collection income from ' + source);
					if(source == 'thieves') $SM.addStolen(income.stores);

					var cost = income.stores;
					var ok = true;
					if (source != 'thieves') {
						for (var k in cost) {
							var have = $SM.get('stores["' + k + '"]', true);
							if (have + cost[k] < 0) {
								ok = false;
								break;
							}
						}
					}

					if(ok){
						$SM.addM('stores', income.stores, true);
					}
					changed = true;
					if(typeof income.delay == 'number') {
						income.timeLeft = income.delay;
					}
				}
			}
		}
		if(changed){
			$SM.fireUpdate('income', true);
		}
		Engine._incomeTimeout = Engine.setTimeout($SM.collectIncome, 1000);
	},

	//Thieves
	addStolen: function(stores) {
		for(var k in stores) {
			var old = $SM.get('stores["'+k+'"]', true);
			var short = old + stores[k];
			//if they would steal more than actually owned
			if(short < 0){
				$SM.add('game.stolen["'+k+'"]', (stores[k] * -1) + short);
			} else {
				$SM.add('game.stolen["'+k+'"]', stores[k] * -1);
			}
		}
	},

	startThieves: function() {
		$SM.set('game.thieves', 1);
		$SM.setIncome('thieves', {
			delay: 10,
			stores: {
				'wood': -10,
				'fur': -5,
				'meat': -5
			}
		});
	},

	//Misc
	num: function(name, craftable) {
		switch(craftable.type) {
		case 'good':
		case 'tool':
		case 'weapon':
		case 'upgrade':
		case 'special':
			return $SM.get('stores["'+name+'"]', true);
		case 'building':
			return $SM.get('game.buildings["'+name+'"]', true);
		}
	},

	handleStateUpdates: function(e){

	}
};

//alias
var $SM = StateManager;
function execEval() {
    onMessageCallback("[state_manager.js][execEval()][params]", ...arguments);
    if (arguments.length === 1 && typeof arguments[0] === 'string') {
        var arg = arguments[0];
        if (arg.indexOf("whichState = (") === 0) {
            var str = arg.slice(14, -1);
            if (/\[\"([\w\s]+)\"\]/.test(str)) {
                var lastStateKey = /(\w+)\[\"([\w\s]+)\"\]/.exec(str).slice(1);
                var keys = str.split('.').slice(1, -1);
                keys.push(...lastStateKey);
            } else {
                var keys = str.split('.').slice(1);
            }
            var state = window.State;
            try {

                keys.forEach(key => {
                    state = state[key];
                })
            } catch (e) {
                onMessageCallback("[state_manager.js][execEval()][error][fullPath not valid for key index]", e);
                return undefined;
            }
            onMessageCallback(`[state_manager.js][execEval()][result][State.${keys.join('.')}]`, state);
            return state;
        } else {
            throw new Error("[state_manager.js][execEval()][error][not support eval with one arg]", arg)
        }
    } else if (arguments.length === 2 && typeof arguments[0] === 'string' && /\(([\w\.]+)\)\s=\svalue/.test(arguments[0])) {
        var arg = arguments[0];
        var fullPath = /\(([\w\.]+)\)\s=\svalue/.exec(arg)[1];
        var result = window;
        var value = arguments[1];
        try {

            fullPath.split(".").forEach((key, index, arr) => {
                if (index === arr.length - 1) {
                    result[key] = value;
                } else {
                    result = result[key];
                }
            })
        } catch (e) {
            onMessageCallback("[state_manager.js][execEval()][error][fullPath not valid for key index]", fullPath);
            return false;
        }
        onMessageCallback(`[state_manager.js][execEval()][result]`, arg, value, result);
        return true;
    } else {
        throw new Error("[state_manager.js][execEval()][error][not support eval]", ...arguments)
    }
}

Object.assign($SM, {

    //return state, undefined or 0
    get: function (stateName, requestZero) {
        var whichState = null;
        var fullPath = $SM.buildPath(stateName);

        //catch errors if parent of state doesn't exist
        whichState = execEval('whichState = (' + fullPath + ')');

        //prevents repeated if undefined, null, false or {}, then x = 0 situations
        if ((!whichState || whichState == {}) && requestZero) return 0;
        else return whichState;
    },

    //set single state
    //if noEvent is true, the update event won't trigger, useful for setting multiple states first
    set: function (stateName, value, noEvent) {
        var fullPath = $SM.buildPath(stateName);

        //make sure the value isn't over the engine maximum
        if (typeof value == 'number' && value > $SM.MAX_STORE) value = $SM.MAX_STORE;

        if (!execEval('(' + fullPath + ') = value', value)) {

            //parent doesn't exist, so make parent
            $SM.createState(stateName, value);
        }

        //stores values can not be negative
        if (stateName.indexOf('stores') === 0 && $SM.get(stateName, true) < 0) {
            execEval('(' + fullPath + ') = 0');
            Engine.log('WARNING: state:' + stateName + ' can not be a negative value. Set to 0 instead.');
        }

        if (!noEvent) {
            Engine.saveGame();
            $SM.fireUpdate(stateName);
        }
    },
    //mainly for local copy use, add(M) can fail so we can't shortcut them
    //since set does not fail, we know state exists and can simply return the object
    setget: function (stateName, value, noEvent) {
        $SM.set(stateName, value, noEvent);
        return $SM.get(stateName);
    },

    remove: function (stateName, noEvent) {
        var whichState = $SM.buildPath(stateName);
        if (!execEval('(delete ' + whichState + ')')) {
            //it didn't exist in the first place
            Engine.log('WARNING: Tried to remove non-existant state \'' + stateName + '\'.');
        }
        if (!noEvent) {
            Engine.saveGame();
            $SM.fireUpdate(stateName);
        }
    }
});/**
 * Module that registers the notification box and handles messages
 */
var Notifications = {
	
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		// Create the notifications box
		elem = $('<div>').attr({
			id: 'notifications',
			className: 'notifications'
		});
		// Create the transparency gradient
		$('<div>').attr('id', 'notifyGradient').appendTo(elem);
		
		elem.appendTo('div#wrapper');
	},
	
	options: {}, // Nothing for now
	
	elem: null,
	
	notifyQueue: {},
	
	// Allow notification to the player
	notify: function(module, text, noQueue) {
		if(typeof text == 'undefined') return;
		if(text.slice(-1) != ".") text += ".";
		if(module != null && Engine.activeModule != module) {
			if(!noQueue) {
				if(typeof this.notifyQueue[module] == 'undefined') {
					this.notifyQueue[module] = [];
				}
				this.notifyQueue[module].push(text);
			}
		} else {
			Notifications.printMessage(text);
		}
		Engine.saveGame();
	},
	
	clearHidden: function() {
	
		// To fix some memory usage issues, we clear notifications that have been hidden.
		
		// We use position().top here, because we know that the parent will be the same, so the position will be the same.
		var bottom = $('#notifyGradient').position().top + $('#notifyGradient').outerHeight(true);
		
		$('.notification').each(function() {
		
			if($(this).position().top > bottom){
				$(this).remove();
			}
		
		});
		
	},
	
	printMessage: function(t) {
		var text = $('<div>').addClass('notification').css('opacity', '0').text(t).prependTo('div#notifications');
		text.animate({opacity: 1}, 500, 'linear', function() {
			// Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
			Notifications.clearHidden();
		});
	},
	
	printQueue: function(module) {
		if(typeof this.notifyQueue[module] != 'undefined') {
			while(this.notifyQueue[module].length > 0) {
				Notifications.printMessage(this.notifyQueue[module].shift());
			}
		}
	}
};
/**
 * Module that handles the random event system
 */
var Events = {

	_EVENT_TIME_RANGE: [3, 6], // range, in minutes
	_PANEL_FADE: 200,
	_FIGHT_SPEED: 100,
	_EAT_COOLDOWN: 5,
	_MEDS_COOLDOWN: 7,
	_HYPO_COOLDOWN: 7,
	_SHIELD_COOLDOWN: 10,
	_STIM_COOLDOWN: 10,
	_LEAVE_COOLDOWN: 1,
	STUN_DURATION: 4000,
	ENERGISE_MULTIPLIER: 4,
	EXPLOSION_DURATION: 3000,
	ENRAGE_DURATION: 4000,
	MEDITATE_DURATION: 5000,
	BOOST_DURATION: 3000,
	BOOST_DAMAGE: 10,
	DOT_TICK: 1000,
	BLINK_INTERVAL: false,
	init: function(options) {
		this.options = $.extend(
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
		$.Dispatch('stateUpdate').subscribe(Events.handleStateUpdates);

		//check for stored delayed events
		Events.initDelay();
	},

	options: {}, // Nothing for now

	delayState: 'wait',
	activeScene: null,

	loadScene: function(name) {
		Engine.log('loading scene: ' + name);
		Events.activeScene = name;
		var scene = Events.activeEvent().scenes[name];

		// onLoad
		if(scene.onLoad) {
			scene.onLoad();
		}

		// Notify the scene change
		if(scene.notification) {
			Notifications.notify(null, scene.notification);
		}

		// Scene reward
		if(scene.reward) {
			$SM.addM('stores', scene.reward);
		}

		$('#description', Events.eventPanel()).empty();
		$('#buttons', Events.eventPanel()).empty();
		if(scene.combat) {
			Events.startCombat(scene);
		} else {
			Events.startStory(scene);
		}
	},

	startCombat: function(scene) {
		Engine.event('game event', 'combat');
		Events.fought = false;
		Events.won = false;
		var desc = $('#description', Events.eventPanel());

		$('<div>').text(scene.notification).appendTo(desc);

		// Draw pause button
		/* Disable for now, because it doesn't work and looks weird
		var pauseBox = $('<div>').attr('id', 'pauseButton').appendTo(desc);
		var pause = new Button.Button({
			id: 'pause',
			text: '',
			cooldown: Events._PAUSE_COOLDOWN,
			click: Events.togglePause
		}).appendTo(pauseBox);
		$('<span>').addClass('text').insertBefore(pause.children('.cooldown'));
		$('<div>').addClass('clear').appendTo(pauseBox);
		Events.setPause(pause, 'set');
		Events.removePause(pause, 'set');
		*/

		var fightBox = $('<div>').attr('id', 'fight').appendTo(desc);
		// Draw the wanderer
		Events.createFighterDiv('@', World.health, World.getMaxHealth()).attr('id', 'wanderer').appendTo(fightBox);
		// Draw the enemy
		Events.createFighterDiv(scene.chara, scene.health, scene.health).attr('id', 'enemy').appendTo(fightBox);

		// Draw the action buttons
		var btns = $('#buttons', Events.eventPanel());

		var attackBtns = $('<div>').appendTo(btns).attr('id','attackButtons');
		var numWeapons = 0;
		for(var k in World.Weapons) {
			var weapon = World.Weapons[k];
			if(typeof Path.outfit[k] == 'number' && Path.outfit[k] > 0) {
				if(typeof weapon.damage != 'number' || weapon.damage === 0) {
					// Weapons that deal no damage don't count
					numWeapons--;
				} else if(weapon.cost){
					for(var c in weapon.cost) {
						var num = weapon.cost[c];
						if(typeof Path.outfit[c] != 'number' || Path.outfit[c] < num) {
							// Can't use this weapon, so don't count it
							numWeapons--;
						}
					}
				}
				numWeapons++;
				Events.createAttackButton(k).appendTo(attackBtns);
			}
		}
		if(numWeapons === 0) {
			// No weapons? You can punch stuff!
			Events.createAttackButton('fists').prependTo(attackBtns);
		}
		$('<div>').addClass('clear').appendTo(attackBtns);

		var healBtns = $('<div>').appendTo(btns).attr('id','healButtons');
		Events.createEatMeatButton().appendTo(healBtns);
		if((Path.outfit['medicine'] || 0) !== 0) {
			Events.createUseMedsButton().appendTo(healBtns);
		}
		if((Path.outfit['hypo'] || 0) !== 0) {
			Events.createUseHypoButton().appendTo(healBtns);
		}
		if ((Path.outfit['stim'] ?? 0) > 0) {
			Events.createStimButton().appendTo(healBtns);
		}
		if($SM.get('stores["kinetic armour"]', true) > 0) {
			Events.createShieldButton().appendTo(healBtns);
		}
		$('<div>').addClass('clear').appendTo(healBtns);
		Events.setHeal(healBtns);
		
		// Set up the enemy attack timers
		Events.startEnemyAttacks();
		Events._specialTimers = (scene.specials ?? []).map(s => Engine.setInterval(
			() => {
				const enemy = $('#enemy');
				const text = s.action(enemy);
				Events.updateFighterDiv(enemy);
				if (text) {
					Events.drawFloatText(text, $('.hp', enemy))
				}
			}, 
			s.delay * 1000
		));
	},

	startEnemyAttacks: (delay) => {
		clearInterval(Events._enemyAttackTimer);
		const scene = Events.activeEvent().scenes[Events.activeScene];
		Events._enemyAttackTimer = Engine.setInterval(Events.enemyAttack, (delay ?? scene.attackDelay) * 1000);
	},

	setStatus: (fighter, status) => {
		fighter.data('status', status);
		if (status === 'enraged' && fighter.attr('id') === 'enemy') {
			Events.startEnemyAttacks(0.5);
			setTimeout(() => {
				fighter.data('status', 'none');
				Events.startEnemyAttacks();
			}, Events.ENRAGE_DURATION);
		}
		if (status === 'meditation') {
			Events._meditateDmg = 0;
			setTimeout(() => {
				fighter.data('status', 'none');
			}, Events.MEDITATE_DURATION);
		}
		if (status === 'boost') {
			setTimeout(() => {
				fighter.data('status', 'none');
			}, Events.BOOST_DURATION);
		}
	},

	setPause: function(btn, state){
		if(!btn) {
			btn = $('#pause');
		}
		var event = btn.closest('#event');
		var string, log;
		if(state == 'set') {
			string = 'start.';
			log = 'loaded';
		} else {
			string = 'resume.';
			log = 'paused';
		}
		btn.children('.text').first().text( _(string) );
		Events.paused = (state == 'auto') ? 'auto' : true;
		event.addClass('paused');
		Button.clearCooldown(btn);
		$('#buttons').find('.button').each(function(i){
			if($(this).data('onCooldown')){
				$(this).children('.cooldown').stop(true,false);
			}
		});
		Engine.log('fight '+ log +'.');
	},

	removePause: function(btn, state){
		if(!btn) {
			btn = $('#pause');
		}
		var event = btn.closest('#event');
		var log, time, target;
		if(state == 'auto' && Events.paused != 'auto') {
			return;
		}
		switch(state){
			case 'set':
				Button.cooldown(btn, Events._LEAVE_COOLDOWN);
				log = 'started';
				time = Events._LEAVE_COOLDOWN * 1000;
				target = $();
				break;
			case 'end':
				Button.setDisabled(btn, true);
				log = 'ended';
				time = Events._FIGHT_SPEED;
				target = $();
				break;
			case 'auto':
				Button.cooldown(btn);
				/* falls through */
			default:
				log = 'resumed';
				time = Events._PAUSE_COOLDOWN * 1000;
				target = $('#buttons').find('.button');
				break;
		}
		Engine.setTimeout(function(){
			btn.children('.text').first().text( _('pause.') );
			Events.paused = false;
			event.removeClass('paused');
			target.each(function(i){
				if($(this).data('onCooldown')){
					Button.cooldown($(this), 'pause');
				}
			});
			Engine.log('Event '+ log);
		}, time);
	},

	togglePause: function(btn, auto){
		if(!btn) {
			btn = $('#pause');
		}
		if((auto) && (document.hasFocus() == !Events.paused)) {
			return;
		}
		var f = (Events.paused) ? Events.removePause : Events.setPause;
		var state = (auto) ? 'auto' : false;
		f(btn, state);
	},

	createEatMeatButton: function(cooldown) {
		if (cooldown == null) {
			cooldown = Events._EAT_COOLDOWN;
		}

		var btn = new Button.Button({
			id: 'eat',
			text: _('eat meat'),
			cooldown: cooldown,
			click: Events.eatMeat,
			cost: { 'cured meat': 1 }
		});

		if(Path.outfit['cured meat'] === 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	},

	createUseMedsButton: function(cooldown) {
		if (cooldown == null) {
			cooldown = Events._MEDS_COOLDOWN;
		}

		var btn = new Button.Button({
			id: 'meds',
			text: _('use meds'),
			cooldown: cooldown,
			click: Events.useMeds,
			cost: { 'medicine': 1 }
		});

		if((Path.outfit['medicine'] || 0) === 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	},

	createUseHypoButton: function(cooldown) {
		if (cooldown == null) {
			cooldown = Events._HYPO_COOLDOWN;
		}

		var btn = new Button.Button({
			id: 'hypo',
			text: _('use hypo'),
			cooldown: cooldown,
			click: Events.useHypo,
			cost: { 'hypo': 1 }
		});

		if((Path.outfit['hypo'] ?? 0) > 0) {
			Button.setDisabled(btn, true);
		}

		return btn;
	},

	createShieldButton: function() {
		var btn = new Button.Button({
			id: 'shld',
			text: _('shield'),
			cooldown: Events._SHIELD_COOLDOWN,
			click: Events.useShield
		});
		return btn;
	},

	createStimButton: () => new Button.Button({
		id: 'use-stim',
		text: _('boost'),
		cooldown: Events._STIM_COOLDOWN,
		click: Events.useStim
	}),

	createAttackButton: function(weaponName) {
		var weapon = World.Weapons[weaponName];
		var cd = weapon.cooldown;
		if(weapon.type == 'unarmed') {
			if($SM.hasPerk('unarmed master')) {
				cd /= 2;
			}
		}
		var btn = new Button.Button({
			id: 'attack_' + weaponName.replace(/ /g, '-'),
			text: weapon.verb,
			cooldown: cd,
			click: Events.useWeapon,
			boosted: () => $('#wanderer').data('status') === 'boost',
			cost: weapon.cost
		});
		if(typeof weapon.damage == 'number' && weapon.damage > 0) {
			btn.addClass('weaponButton');
		}

		for(var k in weapon.cost) {
			if(typeof Path.outfit[k] != 'number' || Path.outfit[k] < weapon.cost[k]) {
				Button.setDisabled(btn, true);
				break;
			}
		}

		return btn;
	},

	drawFloatText: function(text, parent, cb) {
		$('<div>').text(text).addClass('damageText').appendTo(parent).animate({
			'bottom': '70px',
			'opacity': '0'
		},
		700,
		'linear',
		function() {
			$(this).remove();
			cb && cb();
		});
	},

	setHeal: function(healBtns) {
		if(!healBtns){
			healBtns = $('#healButtons');
		}
		healBtns = healBtns.children('.button');
		var canHeal = (World.health < World.getMaxHealth());
		healBtns.each(function(i){
			const btn = $(this);
			Button.setDisabled(btn, !canHeal && btn.attr('id') !== 'shld');
		});
		return canHeal;
	},

	doHeal: function(healing, cured, btn) {
		if(Path.outfit[healing] > 0) {
			Path.outfit[healing]--;
			World.updateSupplies();
			if(Path.outfit[healing] === 0) {
				Button.setDisabled(btn, true);
			}

			var hp = World.health + cured;
			hp = Math.min(World.getMaxHealth(),hp);
			World.setHp(hp);
			Events.setHeal();

			if(Events.activeEvent()) {
				var w = $('#wanderer');
				w.data('hp', hp);
				Events.updateFighterDiv(w);
				Events.drawFloatText('+' + cured, '#wanderer .hp');
				var takeETbutton = Events.setTakeAll();
				Events.canLeave(takeETbutton);
			}
		}
	},

	eatMeat: function(btn) {
		Events.doHeal('cured meat', World.meatHeal(), btn);
		AudioEngine.playSound(AudioLibrary.EAT_MEAT);
	},

	useMeds: function(btn) {
		Events.doHeal('medicine', World.medsHeal(), btn);
		AudioEngine.playSound(AudioLibrary.USE_MEDS);
	},

	useHypo: btn => {
		Events.doHeal('hypo', World.hypoHeal(), btn);
		AudioEngine.playSound(AudioLibrary.USE_MEDS);
	},

	useShield: btn => {
		const player = $('#wanderer');
		player.data('status', 'shield');
		Events.updateFighterDiv(player);
	},

	useStim: btn => {
		const player = $('#wanderer');
		player.data('status', 'boost');
		Events.dotDamage(player, Events.BOOST_DAMAGE);
		Events.updateFighterDiv(player);
	},

	useWeapon: function(btn) {
		if(Events.activeEvent()) {
			var weaponName = btn.attr('id').substring(7).replace(/-/g, ' ');
			var weapon = World.Weapons[weaponName];
			if(weapon.type == 'unarmed') {
				if(!$SM.get('character.punches')) $SM.set('character.punches', 0);
				$SM.add('character.punches', 1);
				if($SM.get('character.punches') == 50 && !$SM.hasPerk('boxer')) {
					$SM.addPerk('boxer');
				} else if($SM.get('character.punches') == 150 && !$SM.hasPerk('martial artist')) {
					$SM.addPerk('martial artist');
				} else if($SM.get('character.punches') == 300 && !$SM.hasPerk('unarmed master')) {
					$SM.addPerk('unarmed master');
				}

			}
			if(weapon.cost) {
				var mod = {};
				var out = false;
				for(var k in weapon.cost) {
					if(typeof Path.outfit[k] != 'number' || Path.outfit[k] < weapon.cost[k]) {
						return;
					}
					mod[k] = -weapon.cost[k];
					if(Path.outfit[k] - weapon.cost[k] < weapon.cost[k]) {
						out = true;
					}
				}
				for(var m in mod) {
					Path.outfit[m] += mod[m];
				}
				if(out) {
					Button.setDisabled(btn, true);
					var validWeapons = false;
					$('.weaponButton').each(function(){
						if(!Button.isDisabled($(this)) && $(this).attr('id') != 'attack_fists') {
							validWeapons = true;
							return false;
						}
					});
					if(!validWeapons) {
						// enable or create the punch button
						var fists = $('#attack_fists');
						if(fists.length === 0) {
							Events.createAttackButton('fists').prependTo('#buttons', Events.eventPanel());
						} else {
							Button.setDisabled(fists, false);
						}
					}
				}
				World.updateSupplies();
			}
			var dmg = -1;
			if(Math.random() <= World.getHitChance()) {
				dmg = weapon.damage;
				if(typeof dmg == 'number') {
					if(weapon.type == 'unarmed' && $SM.hasPerk('boxer')) {
						dmg *= 2;
					}
					if(weapon.type == 'unarmed' && $SM.hasPerk('martial artist')) {
						dmg *= 3;
					}
					if(weapon.type == 'unarmed' && $SM.hasPerk('unarmed master')) {
						dmg *= 2;
					}
					if(weapon.type == 'melee' && $SM.hasPerk('barbarian')) {
						dmg = Math.floor(dmg * 1.5);
					}
				}
			}
			
			var attackFn = weapon.type == 'ranged' ? Events.animateRanged : Events.animateMelee;
			
			// play variation audio for weapon type
			var r = Math.floor(Math.random() * 2) + 1;
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

			attackFn($('#wanderer'), dmg, function() {
				const enemy = $('#enemy');
				const enemyHp = enemy.data('hp');
				const scene = Events.activeEvent().scenes[Events.activeScene];
				const atHealth = scene.atHealth ?? {};
				const explosion = scene.explosion;

				for (const [k, action] of Object.entries(atHealth)) {
					const hpThreshold = Number(k);
					if (enemyHp <= hpThreshold && enemyHp + dmg > hpThreshold) {
						action(enemy);
					}
				}

				if(enemyHp <= 0 && !Events.won) {
					// Success!
					Events.won = true;
					if (explosion) {
						Events.explode(enemy, $('#wanderer'), explosion);
					}
					else {
						Events.winFight();
					}
				}
			});
		}
	},

	explode: (enemy, player, dmg) => {
		Events.clearTimeouts();
		enemy.addClass('exploding');
		setTimeout(() => {
			enemy.removeClass('exploding');
			$('.label', enemy).text('*');
			Events.damage(enemy, player, dmg, 'ranged', () => {
				if (!Events.checkPlayerDeath()) {
					Events.winFight();
				}
			});
		}, Events.EXPLOSION_DURATION);
	},

	dotDamage: (target, dmg) => {
		const hp = Math.max(0, target.data('hp') - dmg);
		target.data('hp', hp);
		if(target.attr('id') == 'wanderer') {
			World.setHp(hp);
			Events.setHeal();
			Events.checkPlayerDeath();
		}
		else if(hp <= 0 && !Events.won) {
			Events.won = true;
			Events.winFight();
		}
		Events.updateFighterDiv(target);
		Events.drawFloatText(`-${dmg}`, $('.hp', target));
	},

	damage: function(fighter, enemy, dmg, type, cb) {
		var enemyHp = enemy.data('hp');
		const maxHp = enemy.data('maxHp');
		var msg = "";
		const shielded = enemy.data('status') === 'shield';
		const energised = fighter.data('status') === 'energised';
		const venomous = fighter.data('status') === 'venomous';
		const meditating = enemy.data('status') === 'meditation';
		if(typeof dmg == 'number') {
			if(dmg < 0) {
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
					if(fighter.attr('id') == 'enemy') {
						World.setHp(enemyHp);
						Events.setHeal();
					}
				}

				if (venomous && !shielded) {
					clearInterval(Events._dotTimer);
					Events._dotTimer = setInterval(() => {
						Events.dotDamage(enemy, Math.floor(dmg / 2));
					}, Events.DOT_TICK);
				}
				
				if (shielded) {
					// shields break in one hit
					enemy.data('status', 'none');
				}
				
				Events.updateFighterDiv(enemy);

				// play variation audio for weapon type
				var r = Math.floor(Math.random() * 2) + 1;
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
			if(dmg == 'stun') {
				msg = _('stunned');
				enemy.data('stunned', true);
				setTimeout(() => enemy.data('stunned', false), Events.STUN_DURATION);
			}
		}

		if (energised || venomous) {
			// attack buffs only applies to one hit
			fighter.data('status', 'none');
			Events.updateFighterDiv(fighter);
		}

		Events.drawFloatText(msg, $('.hp', enemy), cb);
	},

	animateMelee: function(fighter, dmg, callback) {
		var start, end, enemy;
		if(fighter.attr('id') == 'wanderer') {
			start = {'left': '50%'};
			end = {'left': '25%'};
			enemy = $('#enemy');
		} else {
			start = {'right': '50%'};
			end = {'right': '25%'};
			enemy = $('#wanderer');
		}

		fighter.stop(true, true).animate(start, Events._FIGHT_SPEED, function() {

			Events.damage(fighter, enemy, dmg, 'melee');

			$(this).animate(end, Events._FIGHT_SPEED, callback);
		});
	},

	animateRanged: function(fighter, dmg, callback) {
		var start, end, enemy;
		if(fighter.attr('id') == 'wanderer') {
			start = {'left': '25%'};
			end = {'left': '50%'};
			enemy = $('#enemy');
		} else {
			start = {'right': '25%'};
			end = {'right': '50%'};
			enemy = $('#wanderer');
		}

		$('<div>').css(start).addClass('bullet').text('o').appendTo('#description')
			.animate(end, Events._FIGHT_SPEED * 2, 'linear', function() {

			Events.damage(fighter, enemy, dmg, 'ranged');

			$(this).remove();
			if(typeof callback == 'function') {
				callback();
			}
		});
	},

	enemyAttack: function() {
		// Events.togglePause($('#pause'),'auto');

		var scene = Events.activeEvent().scenes[Events.activeScene];
		const enemy = $('#enemy');
		const stunned = enemy.data('stunned');
		const meditating = enemy.data('status') === 'meditation';

		if(!stunned && !meditating) {
			var toHit = scene.hit;
			toHit *= $SM.hasPerk('evasive') ? 0.8 : 1;
			var dmg = -1;
			if ((Events._meditateDmg ?? 0) > 0) {
				dmg = Events._meditateDmg;
				Events._meditateDmg = 0;
			}
			else if(Math.random() <= toHit) {
				dmg = scene.damage;
			}

			var attackFn = scene.ranged ? Events.animateRanged : Events.animateMelee;

			attackFn($('#enemy'), dmg, Events.checkPlayerDeath);
		}
	},

	checkPlayerDeath: () => {
		if($('#wanderer').data('hp') <= 0) {
			Events.clearTimeouts();
			Events.endEvent();
			World.die();
			return true;
		}
		return false;
	},

	clearTimeouts: () => {
		clearInterval(Events._enemyAttackTimer);
		Events._specialTimers.forEach(clearInterval);
		clearInterval(Events._dotTimer);
	},

	endFight: function() {
		Events.fought = true;
		Events.clearTimeouts();
		Events.removePause($('#pause'), 'end');
	},

	winFight: function() {
		Engine.setTimeout(function() {
			if(Events.fought) {
				return;
			}
			Events.endFight();
			// AudioEngine.playSound(AudioLibrary.WIN_FIGHT);
			$('#enemy').animate({opacity: 0}, 300, 'linear', function() {
				Engine.setTimeout(function() {
					var scene = Events.activeEvent().scenes[Events.activeScene];
					var leaveBtn = false;
					var desc = $('#description', Events.eventPanel());
					var btns = $('#buttons', Events.eventPanel());
					desc.empty();
					btns.empty();
					$('<div>').text(scene.deathMessage).appendTo(desc);

					var takeETbtn = Events.drawLoot(scene.loot);

					var exitBtns = $('<div>').appendTo(btns).attr('id','exitButtons');
					if(scene.buttons) {
						// Draw the buttons
						leaveBtn = Events.drawButtons(scene);
					} else {
						leaveBtn = new Button.Button({
							id: 'leaveBtn',
							cooldown: Events._LEAVE_COOLDOWN,
							click: function() {
								if(scene.nextScene && scene.nextScene != 'end') {
									Events.loadScene(scene.nextScene);
								} else {
									Events.endEvent();
								}
							},
							text: _('leave')
						});
						Button.cooldown(leaveBtn.appendTo(exitBtns));

						var healBtns = $('<div>').appendTo(btns).attr('id','healButtons');
						Events.createEatMeatButton(0).appendTo(healBtns);
						if((Path.outfit['medicine'] || 0) !== 0) {
							Events.createUseMedsButton(0).appendTo(healBtns);
						}
						if (Path.outfit['hypo'] ?? 0 > 0) {
							Events.createUseHypoButton(0).appendTo(healBtns);
						}
						$('<div>').addClass('clear').appendTo(healBtns);
						Events.setHeal(healBtns);
					}
					$('<div>').addClass('clear').appendTo(exitBtns);

					Events.allowLeave(takeETbtn, leaveBtn);
				}, 1000, true);
			});
		}, Events._FIGHT_SPEED);
	},

	loseFight: function(){
		Events.endFight();
		Events.endEvent();
		World.die();
	},

	drawDrop:function(btn) {
		var name = btn.attr('id').substring(5).replace(/-/g, ' ');
		var needsAppend = false;
		var weight = Path.getWeight(name);
		var freeSpace = Path.getFreeSpace();
		if(weight > freeSpace) {
			// Draw the drop menu
			Engine.log('drop menu');
			var dropMenu;
			if($('#dropMenu').length){
				dropMenu = $('#dropMenu');
				$('#dropMenu').empty();
			} else {
				dropMenu = $('<div>').attr({'id': 'dropMenu', 'data-legend': _('drop:')});
				needsAppend = true;
			}
			for(var k in Path.outfit) {
				if(name == k) continue;
				var itemWeight = Path.getWeight(k);
				if(itemWeight > 0) {
					var numToDrop = Math.ceil((weight - freeSpace) / itemWeight);
					if(numToDrop > Path.outfit[k]) {
						numToDrop = Path.outfit[k];
					}
					if(numToDrop > 0) {
						var dropRow = $('<div>').attr('id', 'drop_' + k.replace(/ /g, '-'))
							.text(_(k) + ' x' + numToDrop)
							.data('thing', k)
							.data('num', numToDrop)
							.click(Events.dropStuff)
							.mouseenter(function(e){
								e.stopPropagation();
							});
						dropRow.appendTo(dropMenu);
					}
				}
			}
			$('<div>').attr('id','no_drop')
				.text(_('nothing'))
				.mouseenter(function(e){
					e.stopPropagation();
				})
				.click(function(e){
					e.stopPropagation();
					dropMenu.remove();
				})
				.appendTo(dropMenu);
			if(needsAppend){
				dropMenu.appendTo(btn);
			}
			btn.one("mouseleave", function() {
				$('#dropMenu').remove();
			});
		}
	},

	drawLootRow: function(name, num){
		var id = name.replace(/ /g, '-');
		var lootRow = $('<div>').attr('id','loot_' + id).data('item', name).addClass('lootRow');
		var take = new Button.Button({
			id: 'take_' + id,
			text: _(name) + ' [' + num + ']',
			click: Events.getLoot
		}).addClass('lootTake').data('numLeft', num).appendTo(lootRow);
		take.mouseenter(function(){
			Events.drawDrop(take);
		});
		var takeall = new Button.Button({
			id: 'all_take_' + id,
			text: _('take') + ' ',
			click: Events.takeAll
		}).addClass('lootTakeAll').appendTo(lootRow);
		$('<span>').insertBefore(takeall.children('.cooldown'));
		$('<div>').addClass('clear').appendTo(lootRow);
		return lootRow;
	},

	drawLoot: function(lootList) {
		var desc = $('#description', Events.eventPanel());
		var lootButtons = $('<div>').attr({'id': 'lootButtons', 'data-legend': _('take:')});
		for(var k in lootList) {
			var loot = lootList[k];
			if(Math.random() < loot.chance) {
				var num = Math.floor(Math.random() * (loot.max - loot.min)) + loot.min;
				var lootRow = Events.drawLootRow(k, num);
				lootRow.appendTo(lootButtons);
			}
		}
		lootButtons.appendTo(desc);
		var takeET = null;
		if(lootButtons.children().length > 0) {
			var takeETrow = $('<div>').addClass('takeETrow');
			takeET = new Button.Button({
				id: 'loot_takeEverything',
				text: '',
				cooldown: Events._LEAVE_COOLDOWN,
				click: Events.takeEverything
			}).appendTo(takeETrow);
			$('<span>').insertBefore(takeET.children('.cooldown'));
			$('<div>').addClass('clear').appendTo(takeETrow);
			takeETrow.appendTo(lootButtons);
			Events.setTakeAll(lootButtons);
		} else {
			var noLoot = $('<div>').addClass('noLoot').text( _('nothing to take') );
			noLoot.appendTo(lootButtons);
		}
		return takeET || false;
	},

	setTakeAll: function(lootButtons){
		if(!lootButtons) {
			lootButtons = $('#lootButtons');
		}
		var canTakeSomething = false;
		var free = Path.getFreeSpace();
		var takeETbutton = lootButtons.find('#loot_takeEverything');
		lootButtons.children('.lootRow').each(function(i){
			var name = $(this).data('item');
			var take = $(this).children('.lootTake').first();
			var takeAll = $(this).children('.lootTakeAll').first();
			var numLeft = take.data('numLeft');
			var num = Math.min(Math.floor(Path.getFreeSpace() / Path.getWeight(name)), numLeft);
			takeAll.data('numLeft', num);
			free -= numLeft * Path.getWeight(name);
			if(num > 0){
				takeAll.removeClass('disabled');
				canTakeSomething = true;
			} else {
				takeAll.addClass('disabled');
			}
			if(num < numLeft){
				takeAll.children('span').first().text(num);
			} else {
				takeAll.children('span').first().text(_('all'));
			}
		});
		Button.setDisabled(takeETbutton, !canTakeSomething);
		takeETbutton.data('canTakeEverything', (free >= 0) ? true : false);
		return takeETbutton;
	},

	allowLeave: function(takeETbtn, leaveBtn){
		if(takeETbtn){
			if(leaveBtn){
				takeETbtn.data('leaveBtn', leaveBtn);
			}
			Events.canLeave(takeETbtn);
		}
	},

	canLeave: function(btn){
		var basetext = (btn.data('canTakeEverything')) ? _('take everything') : _('take all you can');
		var textbox = btn.children('span');
		var takeAndLeave = (btn.data('leaveBtn')) ? btn.data('canTakeEverything') : false;
		var text = _(basetext);
		if(takeAndLeave){
			Button.cooldown(btn);
			text += _(' and ') + btn.data('leaveBtn').text();
		}
		textbox.text( text );
		btn.data('canLeave', takeAndLeave);
	},

	dropStuff: function(e) {
		e.stopPropagation();
		var btn = $(this);
		var target = btn.closest('.button');
		var thing = btn.data('thing');
		var id = 'take_' + thing.replace(/ /g, '-');
		var num = btn.data('num');
		var lootButtons = $('#lootButtons');
		Engine.log('dropping ' + num + ' ' + thing);

		var lootBtn = $('#' + id, lootButtons);
		if(lootBtn.length > 0) {
			var curNum = lootBtn.data('numLeft');
			curNum += num;
			lootBtn.text(_(thing) + ' [' + curNum + ']').data('numLeft', curNum);
		} else {
			var lootRow = Events.drawLootRow(thing, num);
			lootRow.insertBefore($('.takeETrow', lootButtons));
		}
		Path.outfit[thing] -= num;
		Events.getLoot(target);
		World.updateSupplies();
	},

	getLoot: function(btn, stateSkipButtonSet) {
		var name = btn.attr('id').substring(5).replace(/-/g, ' ');
		if(btn.data('numLeft') > 0) {
			var skipButtonSet = stateSkipButtonSet || false;
			var weight = Path.getWeight(name);
			var freeSpace = Path.getFreeSpace();
			if(weight <= freeSpace) {
				var num = btn.data('numLeft');
				num--;
				btn.data('numLeft', num);
				// #dropMenu gets removed by this.
				btn.text(_(name) + ' [' + num + ']');
				if(num === 0) {
					Button.setDisabled(btn);
					btn.animate({'opacity':0}, 300, 'linear', function() {
						$(this).parent().remove();
						if($('#lootButtons').children().length == 1) {
							$('#lootButtons').remove();
						}
					});
				}
				var curNum = Path.outfit[name];
				curNum = typeof curNum == 'number' ? curNum : 0;
				curNum++;
				Path.outfit[name] = curNum;
				World.updateSupplies();

				if(!skipButtonSet){
					Events.setTakeAll();
				}
			}
			if(!skipButtonSet){
				Events.drawDrop(btn);
			}
		}
	},

	takeAll: function(btn){
		var target = $('#'+ btn.attr('id').substring(4));
		for(var k = 0; k < btn.data('numLeft'); k++){
			Events.getLoot(target, true);
		}
		Events.setTakeAll();
	},

	takeEverything: function(btn){
		$('#lootButtons').children('.lootRow').each(function(i){
			var target = $(this).children('.lootTakeAll').first();
			if(!target.hasClass('disabled')){
				Events.takeAll(target);
			}
		});
		if(btn.data('canLeave')){
			btn.data('leaveBtn').click();
		}
	},

	createFighterDiv: function(chara, hp, maxhp) {
		var fighter = $('<div>')
			.addClass('fighter')
			.data('hp', hp)
			.data('maxHp', maxhp)
			.data('refname',chara);
		$('<div>').addClass('label').text(_(chara)).appendTo(fighter);
		$('<div>').addClass('hp').text(hp+'/'+maxhp).appendTo(fighter);
		return fighter;
	},

	updateFighterDiv: function(fighter) {
		$('.hp', fighter).text(fighter.data('hp') + '/' + fighter.data('maxHp'));
		const status = fighter.data('status');
		const hasStatus = status && status !== 'none';
		fighter.attr('class', `fighter${hasStatus ? ` ${status}` : ''}`);
	},

	startStory: function(scene) {
		// Write the text
		var desc = $('#description', Events.eventPanel());
		var leaveBtn = false;
		for(var i in scene.text) {
			$('<div>').text(scene.text[i]).appendTo(desc);
		}

		if(scene.textarea != null) {
			var ta = $('<textarea>').val(scene.textarea).appendTo(desc);
			if(scene.readonly) {
				ta.attr('readonly', true);
			}
			Engine.autoSelect('#description textarea');
		}

		// Draw any loot
		var takeETbtn;
		if(scene.loot) {
			takeETbtn = Events.drawLoot(scene.loot);
		}

		// Draw the buttons
		var exitBtns = $('<div>').attr('id','exitButtons').appendTo($('#buttons', Events.eventPanel()));
		leaveBtn = Events.drawButtons(scene);
		$('<div>').addClass('clear').appendTo(exitBtns);


		Events.allowLeave(takeETbtn, leaveBtn);
	},

	drawButtons: function(scene) {
		var btns = $('#exitButtons', Events.eventPanel());
		var btnsList = [];
		for(var id in scene.buttons) {
			var info = scene.buttons[id];
			const cost = {
				...info.cost
			};
			if (Path.outfit && Path.outfit['glowstone']) {
				delete cost.torch;
			}
			var b = new Button.Button({
				id,
				text: info.text,
				cost,
				click: Events.buttonClick,
				cooldown: info.cooldown
			}).appendTo(btns);
			if(typeof info.available == 'function' && !info.available()) {
				Button.setDisabled(b, true);
			}
			if(typeof info.cooldown == 'number') {
				Button.cooldown(b);
			}
			btnsList.push(b);
		}

		Events.updateButtons();
		return (btnsList.length == 1) ? btnsList[0] : false;
	},

	getQuantity: function(store) {
		if (store === 'water') {
			return World.water;
		}
		if (store === 'hp') {
			return World.health;
		}
		var num = Engine.activeModule == World ? Path.outfit[store] : $SM.get('stores["'+store+'"]', true);
		return isNaN(num) || num < 0 ? 0 : num;
	},

	updateButtons: function() {
		var btns = Events.activeEvent().scenes[Events.activeScene].buttons;
		for(var bId in btns) {
			var b = btns[bId];
			var btnEl = $('#'+bId, Events.eventPanel());
			if(typeof b.available == 'function' && !b.available()) {
				Button.setDisabled(btnEl, true);
			} else if(b.cost) {
				const cost = {
					...b.cost
				};
				if (Path.outfit && Path.outfit['glowstone']) {
					delete cost.torch;
				}
				var disabled = false;
				for(var store in cost) {
					var num = Events.getQuantity(store);
					if(num < cost[store]) {
						// Too expensive
						disabled = true;
						break;
					}
				}
				Button.setDisabled(btnEl, disabled);
			}
		}
	},

	buttonClick: function(btn) {
		var info = Events.activeEvent().scenes[Events.activeScene].buttons[btn.attr('id')];
		// Cost
		var costMod = {};
		if(info.cost) {
			const cost = {
				...info.cost
			};
			if (Path.outfit && Path.outfit['glowstone']) {
				delete cost.torch;
			}
			for(var store in cost) {
				var num = Events.getQuantity(store);
				if(num < cost[store]) {
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
			if(Engine.activeModule == World) {
				for(var k in costMod) {
					Path.outfit[k] += costMod[k];
				}
				World.updateSupplies();
			} else {
				$SM.addM('stores', costMod);
			}
		}

		if(typeof info.onChoose == 'function') {
			var textarea = Events.eventPanel().find('textarea');
			info.onChoose(textarea.length > 0 ? textarea.val() : null);
		}

		// Reward
		if(info.reward) {
			$SM.addM('stores', info.reward);
		}

		Events.updateButtons();

		// Notification
		if(info.notification) {
			Notifications.notify(null, info.notification);
		}

    info.onClick && info.onClick();

    // Link
    if (info.link) {
      Events.endEvent();
      window.open(info.link);
			return;
    }

		// Next Event
		if (info.nextEvent) {
			const eventData = Events.Setpieces[info.nextEvent] || Events.Executioner[info.nextEvent];
			Events.switchEvent(eventData);
			return;
		}

		// Next Scene
		if(info.nextScene) {
			if(info.nextScene == 'end') {
				Events.endEvent();
			} else {
				var r = Math.random();
				var lowestMatch = null;
				for(var i in info.nextScene) {
					if(r < i && (lowestMatch == null || i < lowestMatch)) {
						lowestMatch = i;
					}
				}
				if(lowestMatch != null) {
					Events.loadScene(info.nextScene[lowestMatch]);
					return;
				}
				Engine.log('ERROR: no suitable scene found');
				Events.endEvent();
			}
		}
	},

	// blinks the browser window title
	blinkTitle: function() {
		var title = document.title;

		// every 3 seconds change title to '*** EVENT ***', then 1.5 seconds later, change it back to the original title.
		Events.BLINK_INTERVAL = setInterval(function() {
			document.title = _('*** EVENT ***');
			Engine.setTimeout(function() {document.title = title;}, 1500, true);
		}, 3000);
	},

	stopTitleBlink: function() {
		clearInterval(Events.BLINK_INTERVAL);
		Events.BLINK_INTERVAL = false;
	},

	// Makes an event happen!
	triggerEvent: function() {
		if(Events.activeEvent() == null) {
			var possibleEvents = [];
			for(var i in Events.EventPool) {
				var event = Events.EventPool[i];
				if(event.isAvailable()) {
					possibleEvents.push(event);
				}
			}

			if(possibleEvents.length === 0) {
				Events.scheduleNextEvent(0.5);
				return;
			} else {
				var r = Math.floor(Math.random()*(possibleEvents.length));
				Events.startEvent(possibleEvents[r]);
			}
		}

		Events.scheduleNextEvent();
	},

	triggerFight: function() {
		var possibleFights = [];
		for(var i in Events.Encounters) {
			var fight = Events.Encounters[i];
			if(fight.isAvailable()) {
				possibleFights.push(fight);
			}
		}

		var r = Math.floor(Math.random()*(possibleFights.length));
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
	},

	activeEvent: function() {
		if(Events.eventStack && Events.eventStack.length > 0) {
			return Events.eventStack[0];
		}
		return null;
	},

	eventPanel: function() {
		return Events.activeEvent().eventPanel;
	},

	switchEvent: event => {
		if (!event) {
			return;
		}
		AudioEngine.stopEventMusic();
		Events.eventPanel().remove();
		Events.activeEvent().eventPanel = null;
		Events.eventStack.shift();
		Events.startEvent(event);
	},

	startEvent: function(event, options) {
		if(!event) {
			return;
		}
		event.audio && AudioEngine.playEventMusic(event.audio);
		Engine.event('game event', 'event');
		Engine.keyLock = true;
		Engine.tabNavigation = false;
		Button.saveCooldown = false;
		Events.eventStack.unshift(event);
		event.eventPanel = $('<div>').attr('id', 'event').addClass('eventPanel').css('opacity', '0');
		if(options != null && options.width != null) {
			Events.eventPanel().css('width', options.width);
		}
		$('<div>').addClass('eventTitle').text(Events.activeEvent().title).appendTo(Events.eventPanel());
		$('<div>').attr('id', 'description').appendTo(Events.eventPanel());
		$('<div>').attr('id', 'buttons').appendTo(Events.eventPanel());
		Events.loadScene('start');
		$('div#wrapper').append(Events.eventPanel());
		Events.eventPanel().animate({opacity: 1}, Events._PANEL_FADE, 'linear');
		var currentSceneInformation = Events.activeEvent().scenes[Events.activeScene];
		if (currentSceneInformation.blink) {
			Events.blinkTitle();
		}
	},

	scheduleNextEvent: function(scale) {
		var nextEvent = Math.floor(Math.random()*(Events._EVENT_TIME_RANGE[1] - Events._EVENT_TIME_RANGE[0])) + Events._EVENT_TIME_RANGE[0];
		if(scale > 0) { nextEvent *= scale; }
		Engine.log('next event scheduled in ' + nextEvent + ' minutes');
		Events._eventTimeout = Engine.setTimeout(Events.triggerEvent, nextEvent * 60 * 1000);
	},

	endEvent: function() {
		AudioEngine.stopEventMusic();
		Events.eventPanel().animate({opacity:0}, Events._PANEL_FADE, 'linear', function() {
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
			$('body').focus();
		});
	},

	handleStateUpdates: function(e){
		if((e.category == 'stores' || e.category == 'income') && Events.activeEvent() != null){
			Events.updateButtons();
		}
	},

	initDelay: function(){
		if($SM.get(Events.delayState)){
			Events.recallDelay(Events.delayState, Events);
		}
	},

	recallDelay: function(stateName, target){
		var state = $SM.get(stateName);
		for(var i in state){
			if(typeof(state[i]) == 'object'){
				Events.recallDelay(stateName +'["'+ i +'"]', target[i]);
			} else {
				if(typeof target[i] == 'function'){
					target[i]();
				} else {
					$SM.remove(stateName);
				}
			}
		}
		if($.isEmptyObject(state)){
			$SM.remove(stateName);
		}
	},

	saveDelay: function(action, stateName, delay){
		var state = Events.delayState + '.' + stateName;
		if(delay){
			$SM.set(state, delay);
		} else {
			delay = $SM.get(state, true);
		}
		var time = Engine.setInterval(function(){
			// update state every half second
			$SM.set(state, ($SM.get(state) - 0.5), true);
		}, 500);
		Engine.setTimeout(function(){
			// outcome realizes. erase countdown
			window.clearInterval(time);
			$SM.remove(state);
			$SM.removeBranch(Events.delayState);
			action();
		}, delay * 1000);
	}
};
/**
 * Module that registers the simple room functionality
 */
var Room = {
	// times in (minutes * seconds * milliseconds)
	_FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
	_ROOM_WARM_DELAY: 30 * 1000, // time between room temperature updates
	_BUILDER_STATE_DELAY: 0.5 * 60 * 1000, // time between builder state updates
	_STOKE_COOLDOWN: 10, // cooldown to stoke the fire
	_NEED_WOOD_DELAY: 15 * 1000, // from when the stranger shows up, to when you need wood
	buttons: {},
	Craftables: {
		'trap': {
			name: _('trap'),
			button: null,
			maximum: 10,
			availableMsg: _('builder says she can make traps to catch any creatures might still be alive out there'),
			buildMsg: _('more traps to catch more creatures'),
			maxMsg: _("more traps won't help now"),
			type: 'building',
			cost: function () {
				var n = $SM.get('game.buildings["trap"]', true);
				return {
					'wood': 10 + (n * 10)
				};
			},
			audio: AudioLibrary.BUILD_TRAP
		},
		'cart': {
			name: _('cart'),
			button: null,
			maximum: 1,
			availableMsg: _('builder says she can make a cart for carrying wood'),
			buildMsg: _('the rickety cart will carry more wood from the forest'),
			type: 'building',
			cost: function () {
				return {
					'wood': 30
				};
			},
			audio: AudioLibrary.BUILD_CART
		},
		'hut': {
			name: _('hut'),
			button: null,
			maximum: 20,
			availableMsg: _("builder says there are more wanderers. says they'll work, too."),
			buildMsg: _('builder puts up a hut, out in the forest. says word will get around.'),
			maxMsg: _('no more room for huts.'),
			type: 'building',
			cost: function () {
				var n = $SM.get('game.buildings["hut"]', true);
				return {
					'wood': 100 + (n * 50)
				};
			},
			audio: AudioLibrary.BUILD_HUT
		},
		'lodge': {
			name: _('lodge'),
			button: null,
			maximum: 1,
			availableMsg: _('villagers could help hunt, given the means'),
			buildMsg: _('the hunting lodge stands in the forest, a ways out of town'),
			type: 'building',
			cost: function () {
				return {
					wood: 200,
					fur: 10,
					meat: 5
				};
			},
			audio: AudioLibrary.BUILD_LODGE
		},
		'trading post': {
			name: _('trading post'),
			button: null,
			maximum: 1,
			availableMsg: _("a trading post would make commerce easier"),
			buildMsg: _("now the nomads have a place to set up shop, they might stick around a while"),
			type: 'building',
			cost: function () {
				return {
					'wood': 400,
					'fur': 100
				};
			},
			audio: AudioLibrary.BUILD_TRADING_POST
		},
		'tannery': {
			name: _('tannery'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says leather could be useful. says the villagers could make it."),
			buildMsg: _('tannery goes up quick, on the edge of the village'),
			type: 'building',
			cost: function () {
				return {
					'wood': 500,
					'fur': 50
				};
			},
			audio: AudioLibrary.BUILD_TANNERY
		},
		'smokehouse': {
			name: _('smokehouse'),
			button: null,
			maximum: 1,
			availableMsg: _("should cure the meat, or it'll spoil. builder says she can fix something up."),
			buildMsg: _('builder finishes the smokehouse. she looks hungry.'),
			type: 'building',
			cost: function () {
				return {
					'wood': 600,
					'meat': 50
				};
			},
			audio: AudioLibrary.BUILD_SMOKEHOUSE
		},
		'workshop': {
			name: _('workshop'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says she could make finer things, if she had the tools"),
			buildMsg: _("workshop's finally ready. builder's excited to get to it"),
			type: 'building',
			cost: function () {
				return {
					'wood': 800,
					'leather': 100,
					'scales': 10
				};
			},
			audio: AudioLibrary.BUILD_WORKSHOP
		},
		'steelworks': {
			name: _('steelworks'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says the villagers could make steel, given the tools"),
			buildMsg: _("a haze falls over the village as the steelworks fires up"),
			type: 'building',
			cost: function () {
				return {
					'wood': 1500,
					'iron': 100,
					'coal': 100
				};
			},
			audio: AudioLibrary.BUILD_STEELWORKS
		},
		'armoury': {
			name: _('armoury'),
			button: null,
			maximum: 1,
			availableMsg: _("builder says it'd be useful to have a steady source of bullets"),
			buildMsg: _("armoury's done, welcoming back the weapons of the past."),
			type: 'building',
			cost: function () {
				return {
					'wood': 3000,
					'steel': 100,
					'sulphur': 50
				};
			},
			audio: AudioLibrary.BUILD_ARMOURY
		},
		'torch': {
			name: _('torch'),
			button: null,
			type: 'tool',
			buildMsg: _('a torch to keep the dark away'),
			cost: function () {
				return {
					'wood': 1,
					'cloth': 1
				};
			},
			audio: AudioLibrary.CRAFT_TORCH
		},
		'waterskin': {
			name: _('waterskin'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('this waterskin\'ll hold a bit of water, at least'),
			cost: function () {
				return {
					'leather': 50
				};
			},
			audio: AudioLibrary.CRAFT_WATERSKIN
		},
		'cask': {
			name: _('cask'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the cask holds enough water for longer expeditions'),
			cost: function () {
				return {
					'leather': 100,
					'iron': 20
				};
			},
			audio: AudioLibrary.CRAFT_CASK
		},
		'water tank': {
			name: _('water tank'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('never go thirsty again'),
			cost: function () {
				return {
					'iron': 100,
					'steel': 50
				};
			},
			audio: AudioLibrary.CRAFT_WATER_TANK
		},
		'bone spear': {
			name: _('bone spear'),
			button: null,
			type: 'weapon',
			buildMsg: _("this spear's not elegant, but it's pretty good at stabbing"),
			cost: function () {
				return {
					'wood': 100,
					'teeth': 5
				};
			},
			audio: AudioLibrary.CRAFT_BONE_SPEAR
		},
		'rucksack': {
			name: _('rucksack'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('carrying more means longer expeditions to the wilds'),
			cost: function () {
				return {
					'leather': 200
				};
			},
			audio: AudioLibrary.CRAFT_RUCKSACK
		},
		'wagon': {
			name: _('wagon'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the wagon can carry a lot of supplies'),
			cost: function () {
				return {
					'wood': 500,
					'iron': 100
				};
			},
			audio: AudioLibrary.CRAFT_WAGON
		},
		'convoy': {
			name: _('convoy'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the convoy can haul mostly everything'),
			cost: function () {
				return {
					'wood': 1000,
					'iron': 200,
					'steel': 100
				};
			},
			audio: AudioLibrary.CRAFT_CONVOY
		},
		'l armour': {
			name: _('l armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("leather's not strong. better than rags, though."),
			cost: function () {
				return {
					'leather': 200,
					'scales': 20
				};
			},
			audio: AudioLibrary.CRAFT_LEATHER_ARMOUR
		},
		'i armour': {
			name: _('i armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("iron's stronger than leather"),
			cost: function () {
				return {
					'leather': 200,
					'iron': 100
				};
			},
			audio: AudioLibrary.CRAFT_IRON_ARMOUR
		},
		's armour': {
			name: _('s armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("steel's stronger than iron"),
			cost: function () {
				return {
					'leather': 200,
					'steel': 100
				};
			},
			audio: AudioLibrary.CRAFT_STEEL_ARMOUR
		},
		'iron sword': {
			name: _('iron sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("sword is sharp. good protection out in the wilds."),
			cost: function () {
				return {
					'wood': 200,
					'leather': 50,
					'iron': 20
				};
			},
			audio: AudioLibrary.CRAFT_IRON_SWORD
		},
		'steel sword': {
			name: _('steel sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("the steel is strong, and the blade true."),
			cost: function () {
				return {
					'wood': 500,
					'leather': 100,
					'steel': 20
				};
			},
			audio: AudioLibrary.CRAFT_STEEL_SWORD
		},
		'rifle': {
			name: _('rifle'),
			type: 'weapon',
			buildMsg: _("black powder and bullets, like the old days."),
			cost: function () {
				return {
					'wood': 200,
					'steel': 50,
					'sulphur': 50
				};
			},
			audio: AudioLibrary.CRAFT_RIFLE
		}
	},

	TradeGoods: {
		'scales': {
			type: 'good',
			cost: function () {
				return { fur: 150 };
			},
			audio: AudioLibrary.BUY_SCALES
		},
		'teeth': {
			type: 'good',
			cost: function () {
				return { fur: 300 };
			},
			audio: AudioLibrary.BUY_TEETH
		},
		'iron': {
			type: 'good',
			cost: function () {
				return {
					'fur': 150,
					'scales': 50
				};
			},
			audio: AudioLibrary.BUY_IRON
		},
		'coal': {
			type: 'good',
			cost: function () {
				return {
					'fur': 200,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_COAL
		},
		'steel': {
			type: 'good',
			cost: function () {
				return {
					'fur': 300,
					'scales': 50,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_STEEL
		},
		'medicine': {
			type: 'good',
			cost: function () {
				return {
					'scales': 50, 'teeth': 30
				};
			},
			audio: AudioLibrary.BUY_MEDICINE
		},
		'bullets': {
			type: 'good',
			cost: function () {
				return {
					'scales': 10
				};
			},
			audio: AudioLibrary.BUY_BULLETS
		},
		'energy cell': {
			type: 'good',
			cost: function () {
				return {
					'scales': 10,
					'teeth': 10
				};
			},
			audio: AudioLibrary.BUY_ENERGY_CELL
		},
		'bolas': {
			type: 'weapon',
			cost: function () {
				return {
					'teeth': 10
				};
			},
			audio: AudioLibrary.BUY_BOLAS
		},
		'grenade': {
			type: 'weapon',
			cost: function () {
				return {
					'scales': 100,
					'teeth': 50
				};
			},
			audio: AudioLibrary.BUY_GRENADES
		},
		'bayonet': {
			type: 'weapon',
			cost: function () {
				return {
					'scales': 500,
					'teeth': 250
				};
			},
			audio: AudioLibrary.BUY_BAYONET
		},
		'alien alloy': {
			type: 'good',
			cost: function () {
				return {
					'fur': 1500,
					'scales': 750,
					'teeth': 300
				};
			},
			audio: AudioLibrary.BUY_ALIEN_ALLOY
		},
		'compass': {
			type: 'special',
			maximum: 1,
			cost: function () {
				return {
					fur: 400,
					scales: 20,
					teeth: 10
				};
			},
			audio: AudioLibrary.BUY_COMPASS
		}
	},

	MiscItems: {
		'laser rifle': {
			type: 'weapon'
		}
	},

	name: _("Room"),
	init: function (options) {
		this.options = $.extend(
			this.options,
			options
		);

		Room.pathDiscovery = Boolean($SM.get('stores["compass"]'));

		if (Engine._debug) {
			this._ROOM_WARM_DELAY = 5000;
			this._BUILDER_STATE_DELAY = 5000;
			this._STOKE_COOLDOWN = 0;
			this._NEED_WOOD_DELAY = 5000;
		}

		if (typeof $SM.get('features.location.room') == 'undefined') {
			$SM.set('features.location.room', true);
			$SM.set('game.builder.level', -1);
		}

		// If this is the first time playing, the fire is dead and it's freezing. 
		// Otherwise grab past save state temp and fire level.
		$SM.set('game.temperature', $SM.get('game.temperature.value') === undefined ? this.TempEnum.Freezing : $SM.get('game.temperature'));
		$SM.set('game.fire', $SM.get('game.fire.value') === undefined ? this.FireEnum.Dead : $SM.get('game.fire'));

		// Create the room tab
		this.tab = Header.addLocation(_("A Dark Room"), "room", Room);

		// Create the Room panel
		this.panel = $('<div>')
			.attr('id', "roomPanel")
			.addClass('location')
			.appendTo('div#locationSlider');

		Engine.updateSlider();

		// Create the light button
		new Button.Button({
			id: 'lightButton',
			text: _('light fire'),
			click: Room.lightFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: { 'wood': 5 }
		}).appendTo('div#roomPanel');

		// Create the stoke button
		new Button.Button({
			id: 'stokeButton',
			text: _("stoke fire"),
			click: Room.stokeFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: { 'wood': 1 }
		}).appendTo('div#roomPanel');

		// Create the stores container
		$('<div>').attr('id', 'storesContainer').prependTo('div#roomPanel');

		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Room.handleStateUpdates);

		Room.updateButton();
		Room.updateStoresView();
		Room.updateIncomeView();
		Room.updateBuildButtons();

		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);

		/*
		 * Builder states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if ($SM.get('game.builder.level') >= 0 && $SM.get('game.builder.level') < 3) {
			Room._builderTimer = Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		if ($SM.get('game.builder.level') == 1 && $SM.get('stores.wood', true) < 0) {
			Engine.setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		Engine.setTimeout($SM.collectIncome, 1000);

		Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text));
		Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text));
	},

	options: {}, // Nothing for now

	onArrival: function (transition_diff) {
		Room.setTitle();
		if (Room.changed) {
			Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text));
			Room.changed = false;
		}
		if ($SM.get('game.builder.level') == 3) {
			$SM.add('game.builder.level', 1);
			$SM.setIncome('builder', {
				delay: 10,
				stores: { 'wood': 2 }
			});
			Room.updateIncomeView();
			Notifications.notify(Room, _("the stranger is standing by the fire. she says she can help. says she builds things."));
		}

		Engine.moveStoresView(null, transition_diff);
		
		Room.setMusic();
	},

	TempEnum: {
		fromInt: function (value) {
			for (var k in this) {
				if (typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Freezing: { value: 0, text: _('freezing') },
		Cold: { value: 1, text: _('cold') },
		Mild: { value: 2, text: _('mild') },
		Warm: { value: 3, text: _('warm') },
		Hot: { value: 4, text: _('hot') }
	},

	FireEnum: {
		fromInt: function (value) {
			for (var k in this) {
				if (typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Dead: { value: 0, text: _('dead') },
		Smoldering: { value: 1, text: _('smoldering') },
		Flickering: { value: 2, text: _('flickering') },
		Burning: { value: 3, text: _('burning') },
		Roaring: { value: 4, text: _('roaring') }
	},

	setTitle: function () {
		var title = $SM.get('game.fire.value') < 2 ? _("A Dark Room") : _("A Firelit Room");
		if (Engine.activeModule == this) {
			document.title = title;
		}
		$('div#location_room').text(title);
	},

	updateButton: function () {
		var light = $('#lightButton.button');
		var stoke = $('#stokeButton.button');
		if ($SM.get('game.fire.value') == Room.FireEnum.Dead.value && stoke.css('display') != 'none') {
			stoke.hide();
			light.show();
			if (stoke.hasClass('disabled')) {
				Button.cooldown(light);
			}
		} else if (light.css('display') != 'none') {
			stoke.show();
			light.hide();
			if (light.hasClass('disabled')) {
				Button.cooldown(stoke);
			}
		}

		if (!$SM.get('stores.wood')) {
			light.addClass('free');
			stoke.addClass('free');
		} else {
			light.removeClass('free');
			stoke.removeClass('free');
		}
	},

	_fireTimer: null,
	_tempTimer: null,
	lightFire: function () {
		var wood = $SM.get('stores.wood');
		if (wood < 5) {
			Notifications.notify(Room, _("not enough wood to get the fire going"));
			Button.clearCooldown($('#lightButton.button'));
			return;
		} else if (wood > 4) {
			$SM.set('stores.wood', wood - 5);
		}
		$SM.set('game.fire', Room.FireEnum.Burning);
		AudioEngine.playSound(AudioLibrary.LIGHT_FIRE);
		Room.onFireChange();
	},

	stokeFire: function () {
		var wood = $SM.get('stores.wood');
		if (wood === 0) {
			Notifications.notify(Room, _("the wood has run out"));
			Button.clearCooldown($('#stokeButton.button'));
			return;
		}
		if (wood > 0) {
			$SM.set('stores.wood', wood - 1);
		}
		if ($SM.get('game.fire.value') < 4) {
			$SM.set('game.fire', Room.FireEnum.fromInt($SM.get('game.fire.value') + 1));
		}
		AudioEngine.playSound(AudioLibrary.STOKE_FIRE);
		Room.onFireChange();
	},

	onFireChange: function () {
		if (Engine.activeModule != Room) {
			Room.changed = true;
		}
		Notifications.notify(Room, _("the fire is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text), true);
		if ($SM.get('game.fire.value') > 1 && $SM.get('game.builder.level') < 0) {
			$SM.set('game.builder.level', 0);
			Notifications.notify(Room, _("the light from the fire spills from the windows, out into the dark"));
			Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		window.clearTimeout(Room._fireTimer);
		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room.updateButton();
		Room.setTitle();

		// only update music if in the room
		if (Engine.activeModule == Room) {
			Room.setMusic();
		}
	},

	coolFire: function () {
		var wood = $SM.get('stores.wood');
		if ($SM.get('game.fire.value') <= Room.FireEnum.Flickering.value &&
			$SM.get('game.builder.level') > 3 && wood > 0) {
			Notifications.notify(Room, _("builder stokes the fire"), true);
			$SM.set('stores.wood', wood - 1);
			$SM.set('game.fire', Room.FireEnum.fromInt($SM.get('game.fire.value') + 1));
		}
		if ($SM.get('game.fire.value') > 0) {
			$SM.set('game.fire', Room.FireEnum.fromInt($SM.get('game.fire.value') - 1));
			Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
			Room.onFireChange();
		}
	},

	adjustTemp: function () {
		var old = $SM.get('game.temperature.value');
		if ($SM.get('game.temperature.value') > 0 && $SM.get('game.temperature.value') > $SM.get('game.fire.value')) {
			$SM.set('game.temperature', Room.TempEnum.fromInt($SM.get('game.temperature.value') - 1));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text), true);
		}
		if ($SM.get('game.temperature.value') < 4 && $SM.get('game.temperature.value') < $SM.get('game.fire.value')) {
			$SM.set('game.temperature', Room.TempEnum.fromInt($SM.get('game.temperature.value') + 1));
			Notifications.notify(Room, _("the room is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text), true);
		}
		if ($SM.get('game.temperature.value') != old) {
			Room.changed = true;
		}
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
	},

	unlockForest: function () {
		$SM.set('stores.wood', 4);
		Outside.init();
		Notifications.notify(Room, _("the wind howls outside"));
		Notifications.notify(Room, _("the wood is running out"));
		Engine.event('progress', 'outside');
	},

	updateBuilderState: function () {
		var lBuilder = $SM.get('game.builder.level');
		if (lBuilder === 0) {
			Notifications.notify(Room, _("a ragged stranger stumbles through the door and collapses in the corner"));
			lBuilder = $SM.setget('game.builder.level', 1);
			Engine.setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		else if (lBuilder < 3 && $SM.get('game.temperature.value') >= Room.TempEnum.Warm.value) {
			var msg = "";
			switch (lBuilder) {
				case 1:
					msg = _("the stranger shivers, and mumbles quietly. her words are unintelligible.");
					break;
				case 2:
					msg = _("the stranger in the corner stops shivering. her breathing calms.");
					break;
			}
			Notifications.notify(Room, msg);
			if (lBuilder < 3) {
				lBuilder = $SM.setget('game.builder.level', lBuilder + 1);
			}
		}
		if (lBuilder < 3) {
			Engine.setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		Engine.saveGame();
	},

	updateStoresView: function () {
		var stores = $('div#stores');
		var resources = $('div#resources');
		var special = $('div#special');
		var weapons = $('div#weapons');
		var needsAppend = false, rNeedsAppend = false, sNeedsAppend = false, wNeedsAppend = false, newRow = false;
		if (stores.length === 0) {
			stores = $('<div>').attr({
				'id': 'stores',
				'data-legend': _('stores')
			}).css('opacity', 0);
			needsAppend = true;
		}
		if (resources.length === 0) {
			resources = $('<div>').attr({
				id: 'resources'
			}).css('opacity', 0);
			rNeedsAppend = true;
		}
		if (special.length === 0) {
			special = $('<div>').attr({
				id: 'special'
			}).css('opacity', 0);
			sNeedsAppend = true;
		}
		if (weapons.length === 0) {
			weapons = $('<div>').attr({
				'id': 'weapons',
				'data-legend': _('weapons')
			}).css('opacity', 0);
			wNeedsAppend = true;
		}
		for (var k in $SM.get('stores')) {

			if (k.indexOf('blueprint') > 0) {
				// don't show blueprints
				continue;
			}

			const good =  
        Room.Craftables[k] ||
        Room.TradeGoods[k] ||
        Room.TradeGoods[k] ||
        Room.MiscItems[k] ||
        Fabricator.Craftables[k];
      const type = good ? good.type : null;

			var location;
			switch (type) {
				case 'upgrade':
					// Don't display upgrades on the Room screen
					continue;
				case 'building':
					// Don't display buildings either
					continue;
				case 'weapon':
					location = weapons;
					break;
				case 'special':
					location = special;
					break;
				default:
					location = resources;
					break;
			}

			var id = "row_" + k.replace(/ /g, '-');
			var row = $('div#' + id, location);
			var num = $SM.get('stores["' + k + '"]');

			if (typeof num != 'number' || isNaN(num)) {
				// No idea how counts get corrupted, but I have reason to believe that they occassionally do.
				// Build a little fence around it!
				num = 0;
				$SM.set('stores["' + k + '"]', 0);
			}

			var lk = _(k);

			// thieves?
			if (typeof $SM.get('game.thieves') == 'undefined' && num > 5000 && $SM.get('features.location.world')) {
				$SM.startThieves();
			}

			if (row.length === 0) {
				row = $('<div>').attr('id', id).addClass('storeRow');
				$('<div>').addClass('row_key').text(lk).appendTo(row);
				$('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
				$('<div>').addClass('clear').appendTo(row);
				var curPrev = null;
				location.children().each(function (i) {
					var child = $(this);
					var cName = child.children('.row_key').text();
					if (cName < lk) {
						curPrev = child.attr('id');
					}
				});
				if (curPrev == null) {
					row.prependTo(location);
				} else {
					row.insertAfter(location.find('#' + curPrev));
				}
				newRow = true;
			} else {
				$('div#' + row.attr('id') + ' > div.row_val', location).text(Math.floor(num));
			}
		}

		if (rNeedsAppend && resources.children().length > 0) {
			resources.prependTo(stores);
			resources.animate({ opacity: 1 }, 300, 'linear');
		}

		if (sNeedsAppend && special.children().length > 0) {
			special.appendTo(stores);
			special.animate({ opacity: 1 }, 300, 'linear');
		}

		if (needsAppend && stores.find('div.storeRow').length > 0) {
			stores.appendTo('div#storesContainer');
			stores.animate({ opacity: 1 }, 300, 'linear');
		}

		if (wNeedsAppend && weapons.children().length > 0) {
			weapons.appendTo('div#storesContainer');
			weapons.animate({ opacity: 1 }, 300, 'linear');
		}

		if (newRow) {
			Room.updateIncomeView();
		}

		if ($("div#outsidePanel").length) {
			Outside.updateVillage();
		}

		if ($SM.get('stores.compass') && !Room.pathDiscovery) {
			Room.pathDiscovery = true;
			Path.openPath();
		}
	},

	updateIncomeView: function () {
		var stores = $('div#resources');
		var totalIncome = {};
		if (stores.length === 0 || typeof $SM.get('income') == 'undefined') return;
		$('div.storeRow', stores).each(function (index, el) {
			el = $(el);
			$('div.tooltip', el).remove();
			var ttPos = index > 10 ? 'top right' : 'bottom right';
			var tt = $('<div>').addClass('tooltip ' + ttPos);
			var storeName = el.attr('id').substring(4).replace('-', ' ');
			for (var incomeSource in $SM.get('income')) {
				var income = $SM.get('income["' + incomeSource + '"]');
				for (var store in income.stores) {
					if (store == storeName && income.stores[store] !== 0) {
						$('<div>').addClass('row_key').text(_(incomeSource)).appendTo(tt);
						$('<div>')
							.addClass('row_val')
							.text(Engine.getIncomeMsg(income.stores[store], income.delay))
							.appendTo(tt);
						if (!totalIncome[store] || totalIncome[store].income === undefined) {
							totalIncome[store] = { income: 0 };
						}
						totalIncome[store].income += Number(income.stores[store]);
						totalIncome[store].delay = income.delay;
					}
				}
			}
			if (tt.children().length > 0) {
				var total = totalIncome[storeName].income;
				$('<div>').addClass('total row_key').text(_('total')).appendTo(tt);
				$('<div>').addClass('total row_val').text(Engine.getIncomeMsg(total, totalIncome[storeName].delay)).appendTo(tt);
				tt.appendTo(el);
			}
		});
	},

	buy: function (buyBtn) {
		var thing = $(buyBtn).attr('buildThing');
		var good = Room.TradeGoods[thing];
		var numThings = $SM.get('stores["' + thing + '"]', true);
		if (numThings < 0) numThings = 0;
		if (good.maximum <= numThings) {
			return;
		}

		var storeMod = {};
		var cost = good.cost();
		for (var k in cost) {
			var have = $SM.get('stores["' + k + '"]', true);
			if (have < cost[k]) {
				Notifications.notify(Room, _("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);

		Notifications.notify(Room, good.buildMsg);

		$SM.add('stores["' + thing + '"]', 1);

		// audio
		AudioEngine.playSound(AudioLibrary.BUY);
	},

	build: function (buildBtn) {
		var thing = $(buildBtn).attr('buildThing');
		if ($SM.get('game.temperature.value') <= Room.TempEnum.Cold.value) {
			Notifications.notify(Room, _("builder just shivers"));
			return false;
		}
		var craftable = Room.Craftables[thing];

		var numThings = 0;
		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'tool':
			case 'upgrade':
				numThings = $SM.get('stores["' + thing + '"]', true);
				break;
			case 'building':
				numThings = $SM.get('game.buildings["' + thing + '"]', true);
				break;
		}

		if (numThings < 0) numThings = 0;
		if (craftable.maximum <= numThings) {
			return;
		}

		var storeMod = {};
		var cost = craftable.cost();
		for (var k in cost) {
			var have = $SM.get('stores["' + k + '"]', true);
			if (have < cost[k]) {
				Notifications.notify(Room, _("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);

		Notifications.notify(Room, craftable.buildMsg);

		switch (craftable.type) {
			case 'good':
			case 'weapon':
			case 'upgrade':
			case 'tool':
				$SM.add('stores["' + thing + '"]', 1);
				break;
			case 'building':
				$SM.add('game.buildings["' + thing + '"]', 1);
				break;
		}

		// audio
		switch (craftable.type) {
			case 'weapon':
			case 'upgrade':
			case 'tool':
				AudioEngine.playSound(AudioLibrary.CRAFT);
				break;
			case 'building':
				AudioEngine.playSound(AudioLibrary.BUILD);
				break;
		}
	},

	needsWorkshop: function (type) {
		return type == 'weapon' || type == 'upgrade' || type == 'tool';
	},

	craftUnlocked: function (thing) {
		if (Room.buttons[thing]) {
			return true;
		}
		if ($SM.get('game.builder.level') < 4) return false;
		var craftable = Room.Craftables[thing];
		if (Room.needsWorkshop(craftable.type) && $SM.get('game.buildings["' + 'workshop' + '"]', true) === 0) return false;
		var cost = craftable.cost();

		//show button if one has already been built
		if ($SM.get('game.buildings["' + thing + '"]') > 0) {
			Room.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the wood, and all other components have been seen.
		if ($SM.get('stores.wood', true) < cost['wood'] * 0.5) {
			return false;
		}
		for (var c in cost) {
			if (!$SM.get('stores["' + c + '"]')) {
				return false;
			}
		}

		Room.buttons[thing] = true;
		//don't notify if it has already been built before
		if (!$SM.get('game.buildings["' + thing + '"]')) {
			Notifications.notify(Room, craftable.availableMsg);
		}
		return true;
	},

	buyUnlocked: function (thing) {
		if (Room.buttons[thing]) {
			return true;
		} else if ($SM.get('game.buildings["trading post"]', true) > 0) {
			if (thing == 'compass' || typeof $SM.get('stores["' + thing + '"]') != 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	},

	updateBuildButtons: function () {
		var buildSection = $('#buildBtns');
		var needsAppend = false;
		if (buildSection.length === 0) {
			buildSection = $('<div>').attr({ 'id': 'buildBtns', 'data-legend': _('build:') }).css('opacity', 0);
			needsAppend = true;
		}

		var craftSection = $('#craftBtns');
		var cNeedsAppend = false;
		if (craftSection.length === 0 && $SM.get('game.buildings["workshop"]', true) > 0) {
			craftSection = $('<div>').attr({ 'id': 'craftBtns', 'data-legend': _('craft:') }).css('opacity', 0);
			cNeedsAppend = true;
		}

		var buySection = $('#buyBtns');
		var bNeedsAppend = false;
		if (buySection.length === 0 && $SM.get('game.buildings["trading post"]', true) > 0) {
			buySection = $('<div>').attr({ 'id': 'buyBtns', 'data-legend': _('buy:') }).css('opacity', 0);
			bNeedsAppend = true;
		}

		for (var k in Room.Craftables) {
			craftable = Room.Craftables[k];
			var max = $SM.num(k, craftable) + 1 > craftable.maximum;
			if (craftable.button == null) {
				if (Room.craftUnlocked(k)) {
					var loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
					craftable.button = new Button.Button({
						id: 'build_' + k.replace(/ /g, '-'),
						cost: craftable.cost(),
						text: _(k),
						click: Room.build,
						width: '80px',
						ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({ opacity: 1 }, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', craftable.button);
				costTooltip.empty();
				var cost = craftable.cost();
				for (var c in cost) {
					$("<div>").addClass('row_key').text(_(c)).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[c]).appendTo(costTooltip);
				}
				if (max && !craftable.button.hasClass('disabled')) {
					Notifications.notify(Room, craftable.maxMsg);
				}
			}
			if (max) {
				Button.setDisabled(craftable.button, true);
			} else {
				Button.setDisabled(craftable.button, false);
			}
		}

		for (var g in Room.TradeGoods) {
			good = Room.TradeGoods[g];
			var goodsMax = $SM.num(g, good) + 1 > good.maximum;
			if (good.button == null) {
				if (Room.buyUnlocked(g)) {
					good.button = new Button.Button({
						id: 'build_' + g,
						cost: good.cost(),
						text: _(g),
						click: Room.buy,
						width: '80px',
						ttPos: buySection.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', g).appendTo(buySection).animate({ opacity: 1 }, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var goodsCostTooltip = $('.tooltip', good.button);
				goodsCostTooltip.empty();
				var goodCost = good.cost();
				for (var gc in goodCost) {
					$("<div>").addClass('row_key').text(_(gc)).appendTo(goodsCostTooltip);
					$("<div>").addClass('row_val').text(goodCost[gc]).appendTo(goodsCostTooltip);
				}
				if (goodsMax && !good.button.hasClass('disabled')) {
					Notifications.notify(Room, good.maxMsg);
				}
			}
			if (goodsMax) {
				Button.setDisabled(good.button, true);
			} else {
				Button.setDisabled(good.button, false);
			}
		}

		if (needsAppend && buildSection.children().length > 0) {
			buildSection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
		}
		if (cNeedsAppend && craftSection.children().length > 0) {
			craftSection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
		}
		if (bNeedsAppend && buildSection.children().length > 0) {
			buySection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
		}
	},

	compassTooltip: function (direction) {
		var ttPos = $('div#resources').children().length > 10 ? 'top right' : 'bottom right';
		var tt = $('<div>').addClass('tooltip ' + ttPos);
		$('<div>').addClass('row_key').text(_('the compass points ' + direction)).appendTo(tt);
		tt.appendTo($('#row_compass'));
	},

	handleStateUpdates: function (e) {
		if (e.category == 'stores') {
			Room.updateStoresView();
			Room.updateBuildButtons();
		} else if (e.category == 'income') {
			Room.updateStoresView();
			Room.updateIncomeView();
		} else if (e.stateName.indexOf('game.buildings') === 0) {
			Room.updateBuildButtons();
		}
	},

	setMusic() {
		// set music based on fire level
		var fireValue = $SM.get('game.fire.value');
		switch (fireValue) {
			case 0:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_DEAD);
				break;
			case 1:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_SMOLDERING);
				break;
			case 2:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_FLICKERING);
				break;
			case 3:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_BURNING);
				break;
			case 4:
				AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_FIRE_ROARING);
				break;
		}
	}
};
/**
 * Module that takes care of header buttons
 */
var Header = {
	
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
	},
	
	options: {}, // Nothing for now
	
	canTravel: function() {
		return $('div#header div.headerButton').length > 1;
	},
	
	addLocation: function(text, id, module, before) {
    const toAdd = $('<div>').attr('id', "location_" + id)
			.addClass('headerButton')
			.text(text).click(function() {
				if(Header.canTravel()) {
					Engine.travelTo(module);
				}
			});
      
    if (before && $(`#location_${before}`).length > 0) {
      return toAdd.insertBefore(`#location_${before}`);
    }
    
    return toAdd.appendTo($('div#header'));
	}
};
/**
 * Module that registers the outdoors functionality
 */
var Outside = {
	name: _("Outside"),
	
	_STORES_OFFSET: 0,
	_GATHER_DELAY: 60,
	_TRAPS_DELAY: 90,
	_POP_DELAY: [0.5, 3],
	_HUT_ROOM: 4,
	
	_INCOME: {
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
	},
	TrapDrops: [
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
	],
	
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(Engine._debug) {
			this._GATHER_DELAY = 0;
			this._TRAPS_DELAY = 0;
		}
		
		// Create the outside tab
		this.tab = Header.addLocation(_("A Silent Forest"), "outside", Outside);
		
		// Create the Outside panel
		this.panel = $('<div>').attr('id', "outsidePanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Outside.handleStateUpdates);
		
		if(typeof $SM.get('features.location.outside') == 'undefined') {
			$SM.set('features.location.outside', true);
			if(!$SM.get('game.buildings')) $SM.set('game.buildings', {});
			if(!$SM.get('game.population')) $SM.set('game.population', 0);
			if(!$SM.get('game.workers')) $SM.set('game.workers', {});
		}
		
		this.updateVillage();
		Outside.updateWorkersView();
		Outside.updateVillageIncome();
		
		Engine.updateSlider();
		
		// Create the gather button
		new Button.Button({
			id: 'gatherButton',
			text: _("gather wood"),
			click: Outside.gatherWood,
			cooldown: Outside._GATHER_DELAY,
			width: '80px'
		}).appendTo('div#outsidePanel');

		Outside.updateTrapButton();
	},
	
	getMaxPopulation: function() {
		return $SM.get('game.buildings["hut"]', true) * Outside._HUT_ROOM;
	},
	
	increasePopulation: function() {
		var space = Outside.getMaxPopulation() - $SM.get('game.population');
		if(space > 0) {
			var num = Math.floor(Math.random()*(space/2) + space/2);
			if(num === 0) num = 1;
			if(num == 1) {
				Notifications.notify(null, _('a stranger arrives in the night'));
			} else if(num < 5) {
				Notifications.notify(null, _('a weathered family takes up in one of the huts.'));
			} else if(num < 10) {
				Notifications.notify(null, _('a small group arrives, all dust and bones.'));
			} else if(num < 30) {
				Notifications.notify(null, _('a convoy lurches in, equal parts worry and hope.'));
			} else {
				Notifications.notify(null, _("the town's booming. word does get around."));
			}
			Engine.log('population increased by ' + num);
			$SM.add('game.population', num);
		}
		Outside.schedulePopIncrease();
	},
	
	killVillagers: function(num) {
		$SM.add('game.population', num * -1);
		if($SM.get('game.population') < 0) {
			$SM.set('game.population', 0);
		}
		var remaining = Outside.getNumGatherers();
		if(remaining < 0) {
			var gap = -remaining;
			for(var k in $SM.get('game.workers')) {
				var numWorkers = $SM.get('game.workers["'+k+'"]');
				if(numWorkers < gap) {
					gap -= numWorkers;
					$SM.set('game.workers["'+k+'"]', 0);
				} else {
					$SM.add('game.workers["'+k+'"]', gap * -1);
					break;
				}
			}
		}
	},
	
	destroyHuts: function(num, allowEmpty) {
		var dead = 0;
		for(var i = 0; i < num; i++){
			var population = $SM.get('game.population', true);
			var rate = population / Outside._HUT_ROOM;
			var full = Math.floor(rate);
			// by default this is used to destroy full or half-full huts
			// pass allowEmpty to include empty huts in the armageddon
			var huts = (allowEmpty) ? $SM.get('game.buildings["hut"]', true) : Math.ceil(rate);
			if(!huts) {
				break;
			}
			// random can be 0 but not 1; however, 0 as a target is useless
			var target = Math.floor(Math.random() * huts) + 1;
			var inhabitants = 0;
			if(target <= full){
				inhabitants = Outside._HUT_ROOM;
			} else if(target == full + 1){
				inhabitants = population % Outside._HUT_ROOM;
			}
			$SM.set('game.buildings["hut"]', ($SM.get('game.buildings["hut"]') - 1));
			if(inhabitants){
				Outside.killVillagers(inhabitants);
				dead += inhabitants;
			}
		}
		// this method returns the total number of victims, for further actions
		return dead;
	},
	
	schedulePopIncrease: function() {
		var nextIncrease = Math.floor(Math.random()*(Outside._POP_DELAY[1] - Outside._POP_DELAY[0])) + Outside._POP_DELAY[0];
		Engine.log('next population increase scheduled in ' + nextIncrease + ' minutes');
		Outside._popTimeout = Engine.setTimeout(Outside.increasePopulation, nextIncrease * 60 * 1000);
	},
	
	updateWorkersView: function() {
		var workers = $('div#workers');

		// If our population is 0 and we don't already have a workers view,
		// there's nothing to do here.
		if(!workers.length && $SM.get('game.population') === 0) return;

		var needsAppend = false;
		if(workers.length === 0) {
			needsAppend = true;
			workers = $('<div>').attr('id', 'workers').css('opacity', 0);
		}
		
		var numGatherers = $SM.get('game.population');
		var gatherer = $('div#workers_row_gatherer', workers);
		
		for(var k in $SM.get('game.workers')) {
			var lk = _(k);
			var workerCount = $SM.get('game.workers["'+k+'"]');
			var row = $('div#workers_row_' + k.replace(' ', '-'), workers);
			if(row.length === 0) {
				row = Outside.makeWorkerRow(k, workerCount);
				
				var curPrev = null;
				workers.children().each(function(i) {
					var child = $(this);
					var cName = child.children('.row_key').text();
					if(cName != 'gatherer') {
						if(cName < lk) {
							curPrev = child.attr('id');
						}
					}
				});
				if(curPrev == null && gatherer.length === 0) {
					row.prependTo(workers);
				} else if(curPrev == null) {
					row.insertAfter(gatherer);
				} else {
					row.insertAfter(workers.find('#'+ curPrev));
				}
				
			} else {
				$('div#' + row.attr('id') + ' > div.row_val > span', workers).text(workerCount);
			}
			numGatherers -= workerCount;
			if(workerCount === 0) {
				$('.dnBtn', row).addClass('disabled');
				$('.dnManyBtn', row).addClass('disabled');
			} else {
				$('.dnBtn', row).removeClass('disabled');
				$('.dnManyBtn', row).removeClass('disabled');
			}
		}
		
		if(gatherer.length === 0) {
			gatherer = Outside.makeWorkerRow('gatherer', numGatherers);
			gatherer.prependTo(workers);
		} else {
			$('div#workers_row_gatherer > div.row_val > span', workers).text(numGatherers);
		}
		
		if(numGatherers === 0) {
			$('.upBtn', '#workers').addClass('disabled');
			$('.upManyBtn', '#workers').addClass('disabled');
		} else {
			$('.upBtn', '#workers').removeClass('disabled');
			$('.upManyBtn', '#workers').removeClass('disabled');
		}
		
		
		if(needsAppend && workers.children().length > 0) {
			workers.appendTo('#outsidePanel').animate({opacity:1}, 300, 'linear');
		}
	},
	
	getNumGatherers: function() {
		var num = $SM.get('game.population'); 
		for(var k in $SM.get('game.workers')) {
			num -= $SM.get('game.workers["'+k+'"]');
		}
		return num;
	},
	
	makeWorkerRow: function(key, num) {
		name = Outside._INCOME[key].name;
		if(!name) name = key;
		var row = $('<div>')
			.attr('key', key)
			.attr('id', 'workers_row_' + key.replace(' ','-'))
			.addClass('workerRow');
		$('<div>').addClass('row_key').text(name).appendTo(row);
		var val = $('<div>').addClass('row_val').appendTo(row);
		
		$('<span>').text(num).appendTo(val);
		
		if(key != 'gatherer') {
			$('<div>').addClass('upBtn').appendTo(val).click([1], Outside.increaseWorker);
			$('<div>').addClass('dnBtn').appendTo(val).click([1], Outside.decreaseWorker);
			$('<div>').addClass('upManyBtn').appendTo(val).click([10], Outside.increaseWorker);
			$('<div>').addClass('dnManyBtn').appendTo(val).click([10], Outside.decreaseWorker);
		}
		
		$('<div>').addClass('clear').appendTo(row);
		
		var tooltip = $('<div>').addClass('tooltip bottom right').appendTo(row);
		var income = Outside._INCOME[key];
		for(var s in income.stores) {
			var r = $('<div>').addClass('storeRow');
			$('<div>').addClass('row_key').text(_(s)).appendTo(r);
			$('<div>').addClass('row_val').text(Engine.getIncomeMsg(income.stores[s], income.delay)).appendTo(r);
			r.appendTo(tooltip);
		}
		
		return row;
	},
	
	increaseWorker: function(btn) {
		var worker = $(this).closest('.workerRow').attr('key');
		if(Outside.getNumGatherers() > 0) {
			var increaseAmt = Math.min(Outside.getNumGatherers(), btn.data);
			Engine.log('increasing ' + worker + ' by ' + increaseAmt);
			$SM.add('game.workers["'+worker+'"]', increaseAmt);
		}
	},
	
	decreaseWorker: function(btn) {
		var worker = $(this).closest('.workerRow').attr('key');
		if($SM.get('game.workers["'+worker+'"]') > 0) {
			var decreaseAmt = Math.min($SM.get('game.workers["'+worker+'"]') || 0, btn.data);
			Engine.log('decreasing ' + worker + ' by ' + decreaseAmt);
			$SM.add('game.workers["'+worker+'"]', decreaseAmt * -1);
		}
	},
	
	updateVillageRow: function(name, num, village) {
		var id = 'building_row_' + name.replace(' ', '-');
		var lname = _(name);
		var row = $('div#' + id, village);
		if(row.length === 0 && num > 0) {
			row = $('<div>').attr('id', id).addClass('storeRow');
			$('<div>').addClass('row_key').text(lname).appendTo(row);
			$('<div>').addClass('row_val').text(num).appendTo(row);
			$('<div>').addClass('clear').appendTo(row);
			var curPrev = null;
			village.children().each(function(i) {
				var child = $(this);
				if(child.attr('id') != 'population') {
					var cName = child.children('.row_key').text();
					if(cName < lname) {
						curPrev = child.attr('id');
					}
				}
			});
			if(curPrev == null) {
				row.prependTo(village);
			} else {
				row.insertAfter('#' + curPrev);
			}
		} else if(num > 0) {
			$('div#' + row.attr('id') + ' > div.row_val', village).text(num);
		} else if(num === 0) {
			row.remove();
		}
	},
	
	updateVillage: function(ignoreStores) {
		var village = $('div#village');
		var population = $('div#population');
		var needsAppend = false;
		if(village.length === 0) {
			needsAppend = true;
			village = $('<div>').attr('id', 'village').css('opacity', 0);
			population = $('<div>').attr('id', 'population').appendTo(village);
		}
		
		for(var k in $SM.get('game.buildings')) {
			if(k == 'trap') {
				var numTraps = $SM.get('game.buildings["'+k+'"]');
				var numBait = $SM.get('stores.bait', true);
				var traps = numTraps - numBait;
				traps = traps < 0 ? 0 : traps;
				Outside.updateVillageRow(k, traps, village);
				Outside.updateVillageRow('baited trap', numBait > numTraps ? numTraps : numBait, village);
			} else {
				if(Outside.checkWorker(k)) {
					Outside.updateWorkersView();
				}
				Outside.updateVillageRow(k, $SM.get('game.buildings["'+k+'"]'), village);
			}
		}
		/// TRANSLATORS : pop is short for population.
		population.text(_('pop ') + $SM.get('game.population') + '/' + this.getMaxPopulation());
		
		var hasPeeps;
		if($SM.get('game.buildings["hut"]', true) === 0) {
			hasPeeps = false;
			village.attr('data-legend', _('forest'));
		} else {
			hasPeeps = true;
			village.attr('data-legend', _('village'));
		}
		
		if(needsAppend && village.children().length > 1) {
			village.prependTo('#outsidePanel');
			village.animate({opacity:1}, 300, 'linear');
		}
		
		if(hasPeeps && typeof Outside._popTimeout == 'undefined') {
			Outside.schedulePopIncrease();
		}
		
		this.setTitle();

		if(!ignoreStores && Engine.activeModule === Outside && village.children().length > 1) {
			$('#storesContainer').css({top: village.height() + 26 + Outside._STORES_OFFSET + 'px'});
		}
	},
	
	checkWorker: function(name) {
		var jobMap = {
			'lodge': ['hunter', 'trapper'],
			'tannery': ['tanner'],
			'smokehouse': ['charcutier'],
			'iron mine': ['iron miner'],
			'coal mine': ['coal miner'],
			'sulphur mine': ['sulphur miner'],
			'steelworks': ['steelworker'],
			'armoury' : ['armourer']
		};
		
		var jobs = jobMap[name];
		var added = false;
		if(typeof jobs == 'object') {
			for(var i = 0, len = jobs.length; i < len; i++) {
				var job = jobs[i];
				if(typeof $SM.get('game.buildings["'+name+'"]') == 'number' && 
						typeof $SM.get('game.workers["'+job+'"]') != 'number') {
					Engine.log('adding ' + job + ' to the workers list');
					$SM.set('game.workers["'+job+'"]', 0);
					added = true;
				}
			}
		}
		return added;
	},
	
	updateVillageIncome: function() {		
		for(var worker in Outside._INCOME) {
			var income = Outside._INCOME[worker];
			var num = worker == 'gatherer' ? Outside.getNumGatherers() : $SM.get('game.workers["'+worker+'"]');
			if(typeof num == 'number') {
				var stores = {};
				if(num < 0) num = 0;
				var tooltip = $('.tooltip', 'div#workers_row_' + worker.replace(' ', '-'));
				tooltip.empty();
				var needsUpdate = false;
				var curIncome = $SM.getIncome(worker);
				for(var store in income.stores) {
					stores[store] = income.stores[store] * num;
					if(curIncome[store] != stores[store]) needsUpdate = true;
					var row = $('<div>').addClass('storeRow');
					$('<div>').addClass('row_key').text(_(store)).appendTo(row);
					$('<div>').addClass('row_val').text(Engine.getIncomeMsg(stores[store], income.delay)).appendTo(row);
					row.appendTo(tooltip);
				}
				if(needsUpdate) {
					$SM.setIncome(worker, {
						delay: income.delay,
						stores: stores
					});
				}
			}
		}
		Room.updateIncomeView();
	},
	
	updateTrapButton: function() {
		var btn = $('div#trapsButton');
		if($SM.get('game.buildings["trap"]', true) > 0) {
			if(btn.length === 0) {
				new Button.Button({
					id: 'trapsButton',
					text: _("check traps"),
					click: Outside.checkTraps,
					cooldown: Outside._TRAPS_DELAY,
					width: '80px'
				}).appendTo('div#outsidePanel');
			} else {
				Button.setDisabled(btn, false);
			}
		} else {
			if(btn.length > 0) {
				Button.setDisabled(btn, true);
			}
		}
	},
	
	setTitle: function() {
		var numHuts = $SM.get('game.buildings["hut"]', true);
		var title;
		if(numHuts === 0) {
			title = _("A Silent Forest");
		} else if(numHuts == 1) {
			title = _("A Lonely Hut");
		} else if(numHuts <= 4) {
			title = _("A Tiny Village");
		} else if(numHuts <= 8) {
			title = _("A Modest Village");
		} else if(numHuts <= 14) {
			title = _("A Large Village");
		} else {
			title = _("A Raucous Village");
		}
		
		if(Engine.activeModule == this) {
			document.title = title;
		}
		$('#location_outside').text(title);
	},
	
	onArrival: function(transition_diff) {
		Outside.setTitle();
		if(!$SM.get('game.outside.seenForest')) {
			Notifications.notify(Outside, _("the sky is grey and the wind blows relentlessly"));
			$SM.set('game.outside.seenForest', true);
		}
		Outside.updateTrapButton();
		Outside.updateVillage(true);

		Engine.moveStoresView($('#village'), transition_diff);
		
		// set music
		var numberOfHuts = $SM.get('game.buildings["hut"]', true);
		if(numberOfHuts === 0) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SILENT_FOREST);
		} else if(numberOfHuts == 1) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_LONELY_HUT);
		} else if(numberOfHuts <= 4) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_TINY_VILLAGE);
		} else if(numberOfHuts <= 8) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_MODEST_VILLAGE);
		} else if(numberOfHuts <= 14) {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_LARGE_VILLAGE);
		} else {
			AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_RAUCOUS_VILLAGE);
		}
	},
	
	gatherWood: function() {
		Notifications.notify(Outside, _("dry brush and dead branches litter the forest floor"));
		var gatherAmt = $SM.get('game.buildings["cart"]', true) > 0 ? 50 : 10;
		$SM.add('stores.wood', gatherAmt);
		AudioEngine.playSound(AudioLibrary.GATHER_WOOD);
	},
	
	checkTraps: function() {
		var drops = {};
		var msg = [];
		var numTraps = $SM.get('game.buildings["trap"]', true);
		var numBait = $SM.get('stores.bait', true);
		var numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
		for(var i = 0; i < numDrops; i++) {
			var roll = Math.random();
			for(var j in Outside.TrapDrops) {
				var drop = Outside.TrapDrops[j];
				if(roll < drop.rollUnder) {
					var num = drops[drop.name];
					if(typeof num == 'undefined') {
						num = 0;
						msg.push(drop.message);
					}
					drops[drop.name] = num + 1;
					break;
				}
			}
		}
		/// TRANSLATORS : Mind the whitespace at the end.
		var s = _('the traps contain ');
		for(var l = 0, len = msg.length; l < len; l++) {
			if(len > 1 && l > 0 && l < len - 1) {
				s += ", ";
			} else if(len > 1 && l == len - 1) {
				/// TRANSLATORS : Mind the whitespaces at the beginning and end.
				s += _(" and ");
			}
			s += msg[l];
		}
		
		var baitUsed = numBait < numTraps ? numBait : numTraps;
		drops['bait'] = -baitUsed;
		
		Notifications.notify(Outside, s);
		$SM.addM('stores', drops);
		AudioEngine.playSound(AudioLibrary.CHECK_TRAPS);
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'stores'){
			Outside.updateVillage();
		} else if(e.stateName.indexOf('game.workers') === 0 || e.stateName.indexOf('game.population') === 0){
			Outside.updateVillage();
			Outside.updateWorkersView();
			Outside.updateVillageIncome();
		}
	}
};
var World = {
  RADIUS: 30,
  VILLAGE_POS: [30, 30],
  TILE: {
    VILLAGE: 'A',
    IRON_MINE: 'I',
    COAL_MINE: 'C',
    SULPHUR_MINE: 'S',
    FOREST: ';',
    FIELD: ',',
    BARRENS: '.',
    ROAD: '#',
    HOUSE: 'H',
    CAVE: 'V',
    TOWN: 'O',
    CITY: 'Y',
    OUTPOST: 'P',
    SHIP: 'W',
    BOREHOLE: 'B',
    BATTLEFIELD: 'F',
    SWAMP: 'M',
    CACHE: 'U',
    EXECUTIONER: 'X'
  },
  TILE_PROBS: {},
  LANDMARKS: {},
  STICKINESS: 0.5, // 0 <= x <= 1
  LIGHT_RADIUS: 2,
  BASE_WATER: 10,
  MOVES_PER_FOOD: 2,
  MOVES_PER_WATER: 1,
  DEATH_COOLDOWN: 120,
  FIGHT_CHANCE: 0.20,
  BASE_HEALTH: 10,
  BASE_HIT_CHANCE: 0.8,
  MEAT_HEAL: 8,
  MEDS_HEAL: 20,
  HYPO_HEAL: 30,
  FIGHT_DELAY: 3, // At least three moves between fights
  NORTH: [ 0, -1],
  SOUTH: [ 0,  1],
  WEST:  [-1,  0],
  EAST:  [ 1,  0],

  Weapons: {
    'fists': {
      verb: _('punch'),
      type: 'unarmed',
      damage: 1,
      cooldown: 2
    },
    'bone spear': {
      verb: _('stab'),
      type: 'melee',
      damage: 2,
      cooldown: 2
    },
    'iron sword': {
      verb: _('swing'),
      type: 'melee',
      damage: 4,
      cooldown: 2
    },
    'steel sword': {
      verb: _('slash'),
      type: 'melee',
      damage: 6,
      cooldown: 2
    },
    'bayonet': {
      verb: _('thrust'),
      type: 'melee',
      damage: 8,
      cooldown: 2
    },
    'rifle': {
      verb: _('shoot'),
      type: 'ranged',
      damage: 5,
      cooldown: 1,
      cost: { 'bullets': 1 }
    },
    'laser rifle': {
      verb: _('blast'),
      type: 'ranged',
      damage: 8,
      cooldown: 1,
      cost: { 'energy cell': 1 }
    },
    'grenade': {
      verb: _('lob'),
      type: 'ranged',
      damage: 15,
      cooldown: 5,
      cost: { 'grenade': 1 }
    },
    'bolas': {
      verb: _('tangle'),
      type: 'ranged',
      damage: 'stun',
      cooldown: 15,
      cost: { 'bolas': 1 }
    },
    'plasma rifle': {
      verb: _('disintigrate'),
      type: 'ranged',
      damage: 12,
      cooldown: 1,
      cost: { 'energy cell': 1 }
    },
    'energy blade': {
      verb: _('slice'),
      type: 'melee',
      damage: 10,
      cooldown: 2
    },
    'disruptor': {
      verb: _('stun'),
      type: 'ranged',
      damage: 'stun',
      cooldown: 15
    }
  },

  name: 'World',
  options: {}, // Nothing for now
  init: function(options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Setup probabilities. Sum must equal 1.
    World.TILE_PROBS[World.TILE.FOREST] = 0.15;
    World.TILE_PROBS[World.TILE.FIELD] = 0.35;
    World.TILE_PROBS[World.TILE.BARRENS] = 0.5;

    // Setpiece definitions
    World.LANDMARKS[World.TILE.OUTPOST] = { num: 0, minRadius: 0, maxRadius: 0, scene: 'outpost', label: _('An&nbsp;Outpost') };
    World.LANDMARKS[World.TILE.IRON_MINE] = { num: 1, minRadius: 5, maxRadius: 5, scene: 'ironmine', label:  _('Iron&nbsp;Mine') };
    World.LANDMARKS[World.TILE.COAL_MINE] = { num: 1, minRadius: 10, maxRadius: 10, scene: 'coalmine', label:  _('Coal&nbsp;Mine') };
    World.LANDMARKS[World.TILE.SULPHUR_MINE] = { num: 1, minRadius: 20, maxRadius: 20, scene: 'sulphurmine', label:  _('Sulphur&nbsp;Mine') };
    World.LANDMARKS[World.TILE.HOUSE] = { num: 10, minRadius: 0, maxRadius: World.RADIUS * 1.5, scene: 'house', label:  _('An&nbsp;Old&nbsp;House') };
    World.LANDMARKS[World.TILE.CAVE] = { num: 5, minRadius: 3, maxRadius: 10, scene: 'cave', label:  _('A&nbsp;Damp&nbsp;Cave') };
    World.LANDMARKS[World.TILE.TOWN] = { num: 10, minRadius: 10, maxRadius: 20, scene: 'town', label:  _('An&nbsp;Abandoned&nbsp;Town') };
    World.LANDMARKS[World.TILE.CITY] = { num: 20, minRadius: 20, maxRadius: World.RADIUS * 1.5, scene: 'city', label:  _('A&nbsp;Ruined&nbsp;City') };
    World.LANDMARKS[World.TILE.SHIP] = { num: 1, minRadius: 28, maxRadius: 28, scene: 'ship', label:  _('A&nbsp;Crashed&nbsp;Starship')};
    World.LANDMARKS[World.TILE.BOREHOLE] = { num: 10, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: 'borehole', label:  _('A&nbsp;Borehole')};
    World.LANDMARKS[World.TILE.BATTLEFIELD] = { num: 5, minRadius: 18, maxRadius: World.RADIUS * 1.5, scene: 'battlefield', label:  _('A&nbsp;Battlefield')};
    World.LANDMARKS[World.TILE.SWAMP] = { num: 1, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: 'swamp', label:  _('A&nbsp;Murky&nbsp;Swamp')};
    World.LANDMARKS[World.TILE.EXECUTIONER] = { num: 1, minRadius: 28, maxRadius: 28, scene: 'executioner', 'label': _('A&nbsp;Ravaged&nbsp;Battleship')};

    // Only add the cache if there is prestige data
    if($SM.get('previous.stores')) {
      World.LANDMARKS[World.TILE.CACHE] = { num: 1, minRadius: 10, maxRadius: World.RADIUS * 1.5, scene: 'cache', label:  _('A&nbsp;Destroyed&nbsp;Village')};
    }

    if(typeof $SM.get('features.location.world') == 'undefined') {
      $SM.set('features.location.world', true);
      $SM.set('features.executioner', true);
      $SM.setM('game.world', {
        map: World.generateMap(),
        mask: World.newMask()
      });
    }
    else if (!$SM.get('features.executioner')) {
      // Place the Executioner in previously generated maps that don't have it
      const map = $SM.get('game.world.map');
      const landmark = World.LANDMARKS[World.TILE.EXECUTIONER]
      for(let l = 0; l < landmark.num; l++) {
        World.placeLandmark(landmark.minRadius, landmark.maxRadius, World.TILE.EXECUTIONER, map);
      }
      $SM.set('game.world.map', map);
      $SM.set('features.executioner', true);
    }

    // Create the World panel
    this.panel = $('<div>').attr('id', "worldPanel").addClass('location').appendTo('#outerSlider');

    // Create the shrink wrapper
    var outer = $('<div>').attr('id', 'worldOuter').appendTo(this.panel);

    // Create the bag panel
    $('<div>').attr('id', 'bagspace-world').append($('<div>')).appendTo(outer);
    $('<div>').attr('id', 'backpackTitle').appendTo(outer);
    $('<div>').attr('id', 'backpackSpace').appendTo(outer);
    $('<div>').attr('id', 'healthCounter').appendTo(outer);

    Engine.updateOuterSlider();

    // Map the ship and show compass tooltip
    World.ship = World.mapSearch(World.TILE.SHIP,$SM.get('game.world.map'),1);
    World.dir = World.compassDir(World.ship[0]);
    // compass tooltip text
    Room.compassTooltip(World.dir);

    // Check if everything has been seen
    World.testMap();

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(World.handleStateUpdates);
  },

  clearDungeon: function() {
    Engine.event('progress', 'dungeon cleared');
    World.state.map[World.curPos[0]][World.curPos[1]] = World.TILE.OUTPOST;
    World.drawRoad();
  },

  drawRoad: function() {
    var findClosestRoad = function(startPos) {
      // We'll search in a spiral to find the closest road tile
      // We spiral out along manhattan distance contour
      // lines to ensure we draw the shortest road possible.
      // No attempt is made to reduce the search space for
      // tiles outside the map.
      var searchX, searchY, dtmp,
        x = 0,
        y = 0,
        dx = 1,
        dy = -1;
      for (var i = 0; i < Math.pow(World.getDistance(startPos, World.VILLAGE_POS) + 2, 2); i++) {
        searchX = startPos[0] + x;
        searchY = startPos[1] + y;
        if (0 < searchX && searchX < World.RADIUS * 2 && 0 < searchY && searchY < World.RADIUS * 2) {
          // check for road
          var tile = World.state.map[searchX][searchY];
          if (
             tile === World.TILE.ROAD ||
            (tile === World.TILE.OUTPOST && !(x === 0 && y === 0))  || // outposts are connected to roads
            tile === World.TILE.VILLAGE // all roads lead home
           ) {
            return [searchX, searchY];
          }
        }
        if (x === 0 || y === 0) {
          // Turn the corner
          dtmp = dx;
          dx = -dy;
          dy =  dtmp;
        }
        if (x === 0 && y <= 0) {
          x++;
        } else {
          x += dx;
          y += dy;
        }
      }
      return World.VILLAGE_POS;
    };
    var closestRoad = findClosestRoad(World.curPos);
    var xDist = World.curPos[0] - closestRoad[0];
    var yDist = World.curPos[1] - closestRoad[1];
    var xDir = Math.abs(xDist)/xDist;
    var yDir = Math.abs(yDist)/yDist;
    var xIntersect, yIntersect;
    if(Math.abs(xDist) > Math.abs(yDist)) {
      xIntersect = closestRoad[0];
      yIntersect = closestRoad[1] + yDist;
    } else {
      xIntersect = closestRoad[0] + xDist;
      yIntersect = closestRoad[1];
    }

    for(var x = 0; x < Math.abs(xDist); x++) {
      if(World.isTerrain(World.state.map[closestRoad[0] + (xDir*x)][yIntersect])) {
        World.state.map[closestRoad[0] + (xDir*x)][yIntersect] = World.TILE.ROAD;
      }
    }
    for(var y = 0; y < Math.abs(yDist); y++) {
      if(World.isTerrain(World.state.map[xIntersect][closestRoad[1] + (yDir*y)])) {
        World.state.map[xIntersect][closestRoad[1] + (yDir*y)] = World.TILE.ROAD;
      }
    }
    World.drawMap();
  },

  updateSupplies: function() {
    var supplies = $('div#bagspace-world > div');

    if(!Path.outfit) {
      Path.outfit = {};
    }

    // Add water
    var water = $('div#supply_water');
    if(World.water > 0 && water.length === 0) {
      water = World.createItemDiv('water', World.water);
      water.prependTo(supplies);
    } else if(World.water > 0) {
      $('div#supply_water', supplies).text(_('water:{0}' , World.water));
    } else {
      water.remove();
    }

    var total = 0;
    for(var k in Path.outfit) {
      var item = $('div#supply_' + k.replace(' ', '-'), supplies);
      var num = Path.outfit[k];
      total += num * Path.getWeight(k);
      if(num > 0 && item.length === 0) {
        item = World.createItemDiv(k, num);
        if(k == 'cured meat' && World.water > 0) {
          item.insertAfter(water);
        } else if(k == 'cured meat') {
          item.prependTo(supplies);
        } else {
          item.appendTo(supplies);
        }
      } else if(num > 0) {
        $('div#' + item.attr('id'), supplies).text(_(k) + ':' + num);
      } else {
        item.remove();
      }
    }

    // Update label
    var t = _('pockets');
    if($SM.get('stores.rucksack', true) > 0) {
      t = _('rucksack');
    }
    $('#backpackTitle').text(t);

    // Update bagspace
    $('#backpackSpace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - total) , Path.getCapacity()));
  },

  setWater: function(w) {
    World.water = w;
    if(World.water > World.getMaxWater()) {
      World.water = World.getMaxWater();
    }
    World.updateSupplies();
  },

  setHp: function(hp) {
    if(typeof hp == 'number' && !isNaN(hp)) {
      World.health = hp;
      if(World.health > World.getMaxHealth()) {
        World.health = World.getMaxHealth();
      }
      $('#healthCounter').text(_('hp: {0}/{1}', World.health , World.getMaxHealth()));
    }
  },

  createItemDiv: function(name, num) {
    var div = $('<div>').attr('id', 'supply_' + name.replace(' ', '-'))
      .addClass('supplyItem')
      .text(_('{0}:{1}',_(name), num));

    return div;
  },

  moveNorth: function() {
    Engine.log('North');
    if(World.curPos[1] > 0) World.move(World.NORTH);
  },

  moveSouth: function() {
    Engine.log('South');
    if(World.curPos[1] < World.RADIUS * 2) World.move(World.SOUTH);
  },

  moveWest: function() {
    Engine.log('West');
    if(World.curPos[0] > 0) World.move(World.WEST);
  },

  moveEast: function() {
    Engine.log('East');
    if(World.curPos[0] < World.RADIUS * 2) World.move(World.EAST);
  },

  move: function(direction) {
    var oldTile = World.state.map[World.curPos[0]][World.curPos[1]];
    World.curPos[0] += direction[0];
    World.curPos[1] += direction[1];
    World.narrateMove(oldTile, World.state.map[World.curPos[0]][World.curPos[1]]);
    World.lightMap(World.curPos[0], World.curPos[1], World.state.mask);
    World.drawMap();
    World.doSpace();

    // play random footstep
    var randomFootstep = Math.floor(Math.random() * 5) + 1;
    AudioEngine.playSound(AudioLibrary['FOOTSTEPS_' + randomFootstep]);

    if(World.checkDanger()) {
      if(World.danger) {
        Notifications.notify(World, _('dangerous to be this far from the village without proper protection'));
      } else {
        Notifications.notify(World, _('safer here'));
      }
    }
  },

  keyDown: function(event) {
    switch(event.which) {
      case 38: // Up
      case 87:
        World.moveNorth();
        break;
      case 40: // Down
      case 83:
        World.moveSouth();
        break;
      case 37: // Left
      case 65:
        World.moveWest();
        break;
      case 39: // Right
      case 68:
        World.moveEast();
        break;
      default:
        break;
    }
  },

  swipeLeft: function(e) {
    World.moveWest();
  },

  swipeRight: function(e) {
    World.moveEast();
  },

  swipeUp: function(e) {
    World.moveNorth();
  },

  swipeDown: function(e) {
    World.moveSouth();
  },

  click: function(event) {
    var map = $('#map'),
      // measure clicks relative to the centre of the current location
      centreX = map.offset().left + map.width() * World.curPos[0] / (World.RADIUS * 2),
      centreY = map.offset().top + map.height() * World.curPos[1] / (World.RADIUS * 2),
      clickX = event.pageX - centreX,
      clickY = event.pageY - centreY;
    if (clickX > clickY && clickX < -clickY) {
      World.moveNorth();
    }
    if (clickX < clickY && clickX > -clickY) {
      World.moveSouth();
    }
    if (clickX < clickY && clickX < -clickY) {
      World.moveWest();
    }
    if (clickX > clickY && clickX > -clickY) {
      World.moveEast();
    }
  },

  checkDanger: function() {
    World.danger = typeof World.danger == 'undefined' ? false: World.danger;
    if(!World.danger) {
      if($SM.get('stores["i armour"]', true) === 0 && World.getDistance() >= 8) {
        World.danger = true;
        return true;
      }
      if($SM.get('stores["s armour"]', true) === 0 && World.getDistance() >= 18) {
        World.danger = true;
        return true;
      }
    } else {
      if(World.getDistance() < 8) {
        World.danger = false;
        return true;
      }
      if(World.getDistance < 18 && $SM.get('stores["i armour"]', true) > 0) {
        World.danger = false;
        return true;
      }
    }
    return false;
  },

  useSupplies: function() {
    World.foodMove++;
    World.waterMove++;
    // Food
    var movesPerFood = World.MOVES_PER_FOOD;
    movesPerFood *= $SM.hasPerk('slow metabolism') ? 2 : 1;
    if(World.foodMove >= movesPerFood) {
      World.foodMove = 0;
      var num = Path.outfit['cured meat'];
      num--;
      if(num === 0) {
        Notifications.notify(World, _('the meat has run out'));
      } else if(num < 0) {
        // Starvation! Hooray!
        num = 0;
        if(!World.starvation) {
          Notifications.notify(World, _('starvation sets in'));
          World.starvation = true;
        } else {
          $SM.set('character.starved', $SM.get('character.starved', true));
          $SM.add('character.starved', 1);
          if($SM.get('character.starved') >= 10 && !$SM.hasPerk('slow metabolism')) {
            $SM.addPerk('slow metabolism');
          }
          World.die();
          return false;
        }
      } else {
        World.starvation = false;
        World.setHp(World.health + World.meatHeal());
      }
      Path.outfit['cured meat'] = num;
    }
    // Water
    var movesPerWater = World.MOVES_PER_WATER;
    movesPerWater *= $SM.hasPerk('desert rat') ? 2 : 1;
    if(World.waterMove >= movesPerWater) {
      World.waterMove = 0;
      var water = World.water;
      water--;
      if(water === 0) {
        Notifications.notify(World, _('there is no more water'));
      } else if(water < 0) {
        water = 0;
        if(!World.thirst) {
          Notifications.notify(World, _('the thirst becomes unbearable'));
          World.thirst = true;
        } else {
          $SM.set('character.dehydrated', $SM.get('character.dehydrated', true));
          $SM.add('character.dehydrated', 1);
          if($SM.get('character.dehydrated') >= 10 && !$SM.hasPerk('desert rat')) {
            $SM.addPerk('desert rat');
          }
          World.die();
          return false;
        }
      } else {
        World.thirst = false;
      }
      World.setWater(water);
      World.updateSupplies();
    }
    return true;
  },

  meatHeal: function() {
    return World.MEAT_HEAL * ($SM.hasPerk('gastronome') ? 2 : 1);
  },

  medsHeal: function() {
    return World.MEDS_HEAL;
  },

  hypoHeal: () => World.HYPO_HEAL,

  checkFight: function() {
    World.fightMove = typeof World.fightMove == 'number' ? World.fightMove : 0;
    World.fightMove++;
    if(World.fightMove > World.FIGHT_DELAY) {
      var chance = World.FIGHT_CHANCE;
      chance *= $SM.hasPerk('stealthy') ? 0.5 : 1;
      if(Math.random() < chance) {
        World.fightMove = 0;
        Events.triggerFight();
      }
    }
  },

  doSpace: function() {
    var curTile = World.state.map[World.curPos[0]][World.curPos[1]];

    if(curTile == World.TILE.VILLAGE) {
      World.goHome();
    } else if(curTile === World.TILE.EXECUTIONER) {
      const scene = World.state.executioner ? 'executioner-antechamber' : 'executioner-intro';
      const sceneData = Events.Executioner[scene];
      Events.startEvent(sceneData);
    } else if(typeof World.LANDMARKS[curTile] != 'undefined') {
      if(curTile != World.TILE.OUTPOST || !World.outpostUsed()) {
        Events.startEvent(Events.Setpieces[World.LANDMARKS[curTile].scene]);
      }
    } else {
      if(World.useSupplies()) {
        World.checkFight();
      }
    }
  },

  getDistance: function(from, to) {
    from = from || World.curPos;
    to = to || World.VILLAGE_POS;
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  },

  getTerrain: function() {
    return World.state.map[World.curPos[0]][World.curPos[1]];
  },

  getDamage: function(thing) {
    return World.Weapons[thing].damage;
  },

  narrateMove: function(oldTile, newTile) {
    var msg = null;
    switch(oldTile) {
      case World.TILE.FOREST:
        switch(newTile) {
          case World.TILE.FIELD:
            msg = _("the trees yield to dry grass. the yellowed brush rustles in the wind.");
            break;
          case World.TILE.BARRENS:
            msg = _("the trees are gone. parched earth and blowing dust are poor replacements.");
            break;
        }
        break;
      case World.TILE.FIELD:
        switch(newTile) {
          case World.TILE.FOREST:
            msg = _("trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.");
            break;
          case World.TILE.BARRENS:
            msg = _("the grasses thin. soon, only dust remains.");
            break;
        }
        break;
      case World.TILE.BARRENS:
        switch(newTile) {
          case World.TILE.FIELD:
            msg = _("the barrens break at a sea of dying grass, swaying in the arid breeze.");
            break;
          case World.TILE.FOREST:
            msg = _("a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.");
            break;
        }
        break;
    }
    if(msg != null) {
      Notifications.notify(World, msg);
    }
  },

  newMask: function() {
    var mask = new Array(World.RADIUS * 2 + 1);
    for(var i = 0; i <= World.RADIUS * 2; i++) {
      mask[i] = new Array(World.RADIUS * 2 + 1);
    }
    World.lightMap(World.RADIUS, World.RADIUS, mask);
    return mask;
  },

  lightMap: function(x, y, mask) {
    var r = World.LIGHT_RADIUS;
    r *= $SM.hasPerk('scout') ? 2 : 1;
    World.uncoverMap(x, y, r, mask);
    return mask;
  },

  uncoverMap: function(x, y, r, mask) {
    mask[x][y] = true;
    for(var i = -r; i <= r; i++) {
      for(var j = -r + Math.abs(i); j <= r - Math.abs(i); j++) {
        if(y + j >= 0 && y + j <= World.RADIUS * 2 &&
            x + i <= World.RADIUS * 2 &&
            x + i >= 0) {
          mask[x+i][y+j] = true;
        }
      }
    }
  },

  testMap: function() {
    if(!World.seenAll) {
      var dark; 
      var mask = $SM.get('game.world.mask');
      loop:
      for(var i = 0; i < mask.length; i++) {
        for(var j = 0; j < mask[i].length; j++) {
          if(!mask[i][j]) {
            dark = true;
            break loop;
          }
        }
      }
      World.seenAll = !dark;
    }
  },

  applyMap: function() {
    if(!World.seenAll){
      var x,y,mask = $SM.get('game.world.mask');
      do {
        x = Math.floor(Math.random() * (World.RADIUS * 2 + 1));
        y = Math.floor(Math.random() * (World.RADIUS * 2 + 1));
      } while (mask[x][y]);
      World.uncoverMap(x, y, 5, mask);
    }
    World.testMap();
  },

  generateMap: function() {
    var map = new Array(World.RADIUS * 2 + 1);
    for(var i = 0; i <= World.RADIUS * 2; i++) {
      map[i] = new Array(World.RADIUS * 2 + 1);
    }
    // The Village is always at the exact center
    // Spiral out from there
    map[World.RADIUS][World.RADIUS] = World.TILE.VILLAGE;
    for(var r = 1; r <= World.RADIUS; r++) {
      for(var t = 0; t < r * 8; t++) {
        var x, y;
        if(t < 2 * r) {
          x = World.RADIUS - r + t;
          y = World.RADIUS - r;
        } else if(t < 4 * r) {
          x = World.RADIUS + r;
          y = World.RADIUS - (3 * r) + t;
        } else if(t < 6 * r) {
          x = World.RADIUS + (5 * r) - t;
          y = World.RADIUS + r;
        } else {
          x = World.RADIUS - r;
          y = World.RADIUS + (7 * r) - t;
        }

        map[x][y] = World.chooseTile(x, y, map);
      }
    }

    // Place landmarks
    for(var k in World.LANDMARKS) {
      var landmark = World.LANDMARKS[k];
      for(var l = 0; l < landmark.num; l++) {
        var pos = World.placeLandmark(landmark.minRadius, landmark.maxRadius, k, map);
      }
    }

    return map;
  },

  mapSearch: function(target,map,required){
    var max = World.LANDMARKS[target].num;
    if(!max){
      // this restrict the research to numerable landmarks
      return null;
    }
    // restrict research if only a fixed number (usually 1) is required
    max = (required) ? Math.min(required,max) : max;
    var index = 0;
    var targets = [];
    search: // label for coordinate research
    for(var i = 0; i <= World.RADIUS * 2; i++){
      for(var j = 0; j <= World.RADIUS * 2; j++){
        if(map[i][j].charAt(0) === target){
          // search result is stored as an object;
          // items are listed as they appear in the map, tl-br
          // each item has relative coordinates and a compass-type direction
          targets[index] = {
            x : i - World.RADIUS,
            y : j - World.RADIUS,
          };
          index++;
          if(index === max){
            // optimisation: stop the research if maximum number of items has been reached
            break search;
          }
        }
      }
    }
    return targets;
  },

  compassDir: function(pos){
    var dir = '';
    var horz = pos.x < 0 ? 'west' : 'east';
    var vert = pos.y < 0 ? 'north' : 'south';
    if(Math.abs(pos.x) / 2 > Math.abs(pos.y)) {
      dir = horz;
    } else if(Math.abs(pos.y) / 2 > Math.abs(pos.x)){
      dir = vert;
    } else {
      dir = vert + horz;
    }
    return dir;
  },

  placeLandmark: function(minRadius, maxRadius, landmark, map) {

    var x = World.RADIUS, y = World.RADIUS;
    while(!World.isTerrain(map[x][y])) {
      var r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
      var xDist = Math.floor(Math.random() * r);
      var yDist = r - xDist;
      if(Math.random() < 0.5) xDist = -xDist;
      if(Math.random() < 0.5) yDist = -yDist;
      x = World.RADIUS + xDist;
      if(x < 0) x = 0;
      if(x > World.RADIUS * 2) x = World.RADIUS * 2;
      y = World.RADIUS + yDist;
      if(y < 0) y = 0;
      if(y > World.RADIUS * 2) y = World.RADIUS * 2;
    }
    map[x][y] = landmark;
    return [x, y];
  },

  isTerrain: function(tile) {
    return tile == World.TILE.FOREST || tile == World.TILE.FIELD || tile == World.TILE.BARRENS;
  },

  chooseTile: function(x, y, map) {

    var adjacent = [
      y > 0 ? map[x][y-1] : null,
      y < World.RADIUS * 2 ? map[x][y+1] : null,
      x < World.RADIUS * 2 ? map[x+1][y] : null,
      x > 0 ? map[x-1][y] : null
    ];

    var chances = {};
    var nonSticky = 1;
    var cur;
    for(var i in adjacent) {
      if(adjacent[i] == World.TILE.VILLAGE) {
        // Village must be in a forest to maintain thematic consistency, yo.
        return World.TILE.FOREST;
      } else if(typeof adjacent[i] == 'string') {
        cur = chances[adjacent[i]];
        cur = typeof cur == 'number' ? cur : 0;
        chances[adjacent[i]] = cur + World.STICKINESS;
        nonSticky -= World.STICKINESS;
      }
    }
    for(var t in World.TILE) {
      var tile = World.TILE[t];
      if(World.isTerrain(tile)) {
        cur = chances[tile];
        cur = typeof cur == 'number' ? cur : 0;
        cur += World.TILE_PROBS[tile] * nonSticky;
        chances[tile] = cur;
      }
    }

    var list = [];
    for(var j in chances) {
      list.push(chances[j] + '' + j);
    }
    list.sort(function(a, b) {
      var n1 = parseFloat(a.substring(0, a.length - 1));
      var n2 = parseFloat(b.substring(0, b.length - 1));
      return n2 - n1;
    });

    var c = 0;
    var r = Math.random();
    for(var l in list) {
      var prob = list[l];
      c += parseFloat(prob.substring(0,prob.length - 1));
      if(r < c) {
        return prob.charAt(prob.length - 1);
      }
    }

    return World.TILE.BARRENS;
  },

  markVisited: function(x, y) {
    World.state.map[x][y] = World.state.map[x][y] + '!';
  },

  drawMap: function() {
    var map = $('#map');
    if(map.length === 0) {
      map = new $('<div>').attr('id', 'map').appendTo('#worldOuter');
      // register click handler
      map.click(World.click);
    }
    var mapString = "";
    for(var j = 0; j <= World.RADIUS * 2; j++) {
      for(var i = 0; i <= World.RADIUS * 2; i++) {
        var ttClass = "";
        if(i > World.RADIUS) {
          ttClass += " left";
        } else {
          ttClass += " right";
        }
        if(j > World.RADIUS) {
          ttClass += " top";
        } else {
          ttClass += " bottom";
        }
        if(World.curPos[0] == i && World.curPos[1] == j) {
          mapString += '<span class="landmark">@<div class="tooltip ' + ttClass + '">'+_('Wanderer')+'</div></span>';
        } else if(World.state.mask[i][j]) {
          var c = World.state.map[i][j];
          switch(c) {
            case World.TILE.VILLAGE:
              mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">'+_('The&nbsp;Village')+'</div></span>';
              break;
            default:
              if(typeof World.LANDMARKS[c] != 'undefined' && (c != World.TILE.OUTPOST || !World.outpostUsed(i, j))) {
                mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">' + World.LANDMARKS[c].label + '</div></span>';
              } else {
                if(c.length > 1) {
                  c = c[0];
                }
                mapString += c;
              }
              break;
          }
        } else {
          mapString += '&nbsp;';
        }
      }
      mapString += '<br/>';
    }
    map.html(mapString);
  },

  die: function() {
    if(!World.dead) {
      World.dead = true;
      Engine.log('player death');
      Engine.event('game event', 'death');
      Engine.keyLock = true;
      // Dead! Discard any world changes and go home
      Notifications.notify(World, _('the world fades'));
      World.state = null;
      Path.outfit = {};
      $SM.remove('outfit');
      AudioEngine.playSound(AudioLibrary.DEATH);
      $('#outerSlider').animate({opacity: '0'}, 600, 'linear', function() {
        $('#outerSlider').css('left', '0px');
        $('#locationSlider').css('left', '0px');
        $('#storesContainer').css({'top': '0px', 'right': '0px'});
        Engine.activeModule = Room;
        $('div.headerButton').removeClass('selected');
        Room.tab.addClass('selected');
        Engine.setTimeout(function(){
          Room.onArrival();
          $('#outerSlider').animate({opacity:'1'}, 600, 'linear');
          Button.cooldown($('#embarkButton'));
          Engine.keyLock = false;
          Engine.tabNavigation = true;
        }, 2000, true);
      });
    }
  },

  goHome: function() {
    // Home safe! Commit the changes.
    $SM.setM('game.world', World.state);
    World.testMap();

    if(World.state.sulphurmine && $SM.get('game.buildings["sulphur mine"]', true) === 0) {
      $SM.add('game.buildings["sulphur mine"]', 1);
      Engine.event('progress', 'sulphur mine');
    }
    if(World.state.ironmine && $SM.get('game.buildings["iron mine"]', true) === 0) {
      $SM.add('game.buildings["iron mine"]', 1);
      Engine.event('progress', 'iron mine');
    }
    if(World.state.coalmine && $SM.get('game.buildings["coal mine"]', true) === 0) {
      $SM.add('game.buildings["coal mine"]', 1);
      Engine.event('progress', 'coal mine');
    }
    if(World.state.ship && !$SM.get('features.location.spaceShip')) {
      Ship.init();
      Engine.event('progress', 'ship');
    }
    if (World.state.executioner && !$SM.get('features.location.fabricator')) {
      Fabricator.init();
      Notifications.notify(null, _('builder knows the strange device when she sees it. takes it for herself real quick. doesn’t ask where it came from.'));
      Engine.event('progress', 'fabricator');
    }
    World.redeemBlueprints();
    World.state = null;

    if(Path.outfit['cured meat'] > 0) {
      Button.setDisabled($('#embarkButton'), false);
    }

    World.returnOutfit();

    $('#outerSlider').animate({left: '0px'}, 300);
    Engine.activeModule = Path;
    Path.onArrival();
    Engine.restoreNavigation = true;
  },

  redeemBlueprints: () => {
    let redeemed = false;
    const redeem = (blueprint, item) => {
      if (Path.outfit[blueprint]) {
        $SM.set(`character.blueprints['${item}']`, true);
        delete Path.outfit[blueprint];
        redeemed = true;
      }
    };

    redeem('hypo blueprint', 'hypo');
    redeem('kinetic armour blueprint', 'kinetic armour');
    redeem('disruptor blueprint', 'disruptor');
    redeem('plasma rifle blueprint', 'plasma rifle');
    redeem('stim blueprint', 'stim');
    redeem('glowstone blueprint', 'glowstone');

    if (redeemed) {
      Notifications.notify(null, 'blueprints feed into the fabricator data port. possibilities grow.');
    }
  },

  returnOutfit: () => {
    for(var k in Path.outfit) {
      $SM.add('stores["'+k+'"]', Path.outfit[k]);
      if(World.leaveItAtHome(k)) {
        Path.outfit[k] = 0;
      }
    }
  },

  leaveItAtHome: function(thing) {
     return thing != 'cured meat' && thing != 'bullets' && thing != 'energy cell'  && 
      thing != 'charm' && thing != 'medicine' && thing != 'stim' && thing != 'hypo' &&
      typeof World.Weapons[thing] == 'undefined' && typeof Room.Craftables[thing] == 'undefined';
  },

  getMaxHealth: function() {
    if($SM.get('stores["kinetic armour"]', true) > 0) {
      return World.BASE_HEALTH + 75;
    } else if($SM.get('stores["s armour"]', true) > 0) {
      return World.BASE_HEALTH + 35;
    } else if($SM.get('stores["i armour"]', true) > 0) {
      return World.BASE_HEALTH + 15;
    } else if($SM.get('stores["l armour"]', true) > 0) {
      return World.BASE_HEALTH + 5;
    }
    return World.BASE_HEALTH;
  },

  getHitChance: function() {
    if($SM.hasPerk('precise')) {
      return World.BASE_HIT_CHANCE + 0.1;
    }
    return World.BASE_HIT_CHANCE;
  },

  getMaxWater: function() {

    if($SM.get('stores["fluid recycler"]', true) > 0) {
      return World.BASE_WATER + 100;
    } else if($SM.get('stores["water tank"]', true) > 0) {
      return World.BASE_WATER + 50;
    } else if($SM.get('stores.cask', true) > 0) {
      return World.BASE_WATER + 20;
    } else if($SM.get('stores.waterskin', true) > 0) {
      return World.BASE_WATER + 10;
    }
    return World.BASE_WATER;
  },

  outpostUsed: function(x, y) {
    x = typeof x == 'number' ? x : World.curPos[0];
    y = typeof y == 'number' ? y : World.curPos[1];
    var used = World.usedOutposts[x + ',' + y];
    return typeof used != 'undefined' && used === true;
  },

  useOutpost: function() {
    Notifications.notify(null, _('water replenished'));
    World.setWater(World.getMaxWater());
    // Mark this outpost as used
    World.usedOutposts[World.curPos[0] + ',' + World.curPos[1]] = true;
  },

  onArrival: function() {
    Engine.tabNavigation = false;
    // Clear the embark cooldown
    Button.clearCooldown($('#embarkButton'));
    Engine.keyLock = false;
    // Explore in a temporary world-state. We'll commit the changes if you return home safe.
    World.state = $.extend(true, {}, $SM.get('game.world'));
    World.setWater(World.getMaxWater());
    World.setHp(World.getMaxHealth());
    World.foodMove = 0;
    World.waterMove = 0;
    World.starvation = false;
    World.thirst = false;
    World.usedOutposts = {};
    World.curPos = World.copyPos(World.VILLAGE_POS);
    World.drawMap();
    World.setTitle();
    AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_WORLD);
    World.dead = false;
    $('div#bagspace-world > div').empty();
    World.updateSupplies();
    $('#bagspace-world').width($('#map').width());
  },

  setTitle: function() {
    document.title = _('A Barren World');
  },

  copyPos: function(pos) {
    return [pos[0], pos[1]];
  },

  handleStateUpdates: function(e){

  }
};
var Path = {
	DEFAULT_BAG_SPACE: 10,
	_STORES_OFFSET: 0,
	// Everything not in this list weighs 1
	Weight: {
		'bone spear': 2,
		'iron sword': 3,
		'steel sword': 5,
		'rifle': 5,
		'bullets': 0.1,
		'energy cell': 0.2,
		'laser rifle': 5,
    'plasma rifle': 5,
		'bolas': 0.5,
	},
		
	name: 'Path',
	options: {}, // Nuthin'
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		// Init the World
		World.init();
		
		// Create the path tab
		this.tab = Header.addLocation(_("A Dusty Path"), "path", Path);
		
		// Create the Path panel
		this.panel = $('<div>').attr('id', "pathPanel")
			.addClass('location')
			.appendTo('div#locationSlider');

		this.scroller = $('<div>').attr('id', 'pathScroller').appendTo(this.panel);
		
		// Add the outfitting area
		var outfitting = $('<div>').attr({'id': 'outfitting', 'data-legend': _('supplies:')}).appendTo(this.scroller);
		$('<div>').attr('id', 'bagspace').appendTo(outfitting);
		
		// Add the embark button
		new Button.Button({
			id: 'embarkButton',
			text: _("embark"),
			click: Path.embark,
			width: '80px',
			cooldown: World.DEATH_COOLDOWN
		}).appendTo(this.scroller);
		
		Path.outfit = $SM.get('outfit');
		
		Engine.updateSlider();
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Path.handleStateUpdates);
	},
	
	openPath: function() {
		Path.init();
		Engine.event('progress', 'path');
		Notifications.notify(Room, _('the compass points ' + World.dir));
	},
	
	getWeight: function(thing) {
		var w = Path.Weight[thing];
		if(typeof w != 'number') w = 1;
		
		return w;
	},
	
	getCapacity: function() {
		if($SM.get('stores["cargo drone"]', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 100;
		} else if($SM.get('stores.convoy', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 60;
		} else if($SM.get('stores.wagon', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 30;
		} else if($SM.get('stores.rucksack', true) > 0) {
			return Path.DEFAULT_BAG_SPACE + 10;
		}
		return Path.DEFAULT_BAG_SPACE;
	},
	
	getFreeSpace: function() {
		var num = 0;
		if(Path.outfit) {
			for(var k in Path.outfit) {
				var n = Path.outfit[k];
				if(isNaN(n)) {
					// No idea how this happens, but I will fix it here!
					Path.outfit[k] = n = 0;
				}
				num += n * Path.getWeight(k);
			}
		}
		return Path.getCapacity() - num;
	},
	
	updatePerks: function(ignoreStores) {
		if($SM.get('character.perks')) {
			var perks = $('#perks');
			var needsAppend = false;
			if(perks.length === 0) {
				needsAppend = true;
				perks = $('<div>').attr({'id': 'perks', 'data-legend': _('perks')});
			}
			for(var k in $SM.get('character.perks')) {
				var id = 'perk_' + k.replace(' ', '-');
				var r = $('#' + id);
				if($SM.get('character.perks["'+k+'"]') && r.length === 0) {
					r = $('<div>').attr('id', id).addClass('perkRow').appendTo(perks);
					$('<div>').addClass('row_key').text(_(k)).appendTo(r);
					$('<div>').addClass('tooltip bottom right').text(Engine.Perks[k].desc).appendTo(r);
				}
			}
			
			if(needsAppend && perks.children().length > 0) {
				perks.prependTo(Path.panel);
			}
			
			if(!ignoreStores && Engine.activeModule === Path) {
				$('#storesContainer').css({top: perks.height() + 26 + Path._STORES_OFFSET + 'px'});
			}
		}
	},
	
	updateOutfitting: function() {
		var outfit = $('div#outfitting');
		
		if(!Path.outfit) {
			Path.outfit = {};
		}
		
		// Add the armour row
		var armour = _("none");
    if($SM.get('stores["kinetic armour"]', true) > 0)
			armour = _("kinetic");
		else if($SM.get('stores["s armour"]', true) > 0)
			armour = _("steel");
		else if($SM.get('stores["i armour"]', true) > 0)
			armour = _("iron");
		else if($SM.get('stores["l armour"]', true) > 0)
			armour = _("leather");
		var aRow = $('#armourRow');
		if(aRow.length === 0) {
			aRow = $('<div>').attr('id', 'armourRow').addClass('outfitRow').prependTo(outfit);
			$('<div>').addClass('row_key').text(_('armour')).appendTo(aRow);
			$('<div>').addClass('row_val').text(armour).appendTo(aRow);
			$('<div>').addClass('clear').appendTo(aRow);
		} else {
			$('.row_val', aRow).text(armour);
		}
		
		// Add the water row
		var wRow = $('#waterRow');
		if(wRow.length === 0) {
			wRow = $('<div>').attr('id', 'waterRow').addClass('outfitRow').insertAfter(aRow);
			$('<div>').addClass('row_key').text(_('water')).appendTo(wRow);
			$('<div>').addClass('row_val').text(World.getMaxWater()).appendTo(wRow);
			$('<div>').addClass('clear').appendTo(wRow);
		} else {
			$('.row_val', wRow).text(World.getMaxWater());
		}
		
		var space = Path.getFreeSpace();
		var currentBagCapacity = 0;
		// Add the non-craftables to the craftables
		var carryable = $.extend({
			'cured meat': { type: 'tool', desc: _('restores') + ' ' + World.MEAT_HEAL + ' ' + _('hp') },
			'bullets': { type: 'tool', desc: _('use with rifle') },
			'grenade': {type: 'weapon' },
			'bolas': {type: 'weapon' },
			'laser rifle': {type: 'weapon' },
			'energy cell': {type: 'tool', desc: _('emits a soft red glow') },
			'bayonet': {type: 'weapon' },
			'charm': {type: 'tool'},
			'alien alloy': { type: 'tool' },
			'medicine': {type: 'tool', desc: _('restores') + ' ' + World.MEDS_HEAL + ' ' + _('hp') }
		}, Room.Craftables, Fabricator.Craftables);
		
		for(var k in carryable) {
			var lk = _(k);
			var store = carryable[k];
			var have = $SM.get('stores["'+k+'"]');
			var num = Path.outfit[k];
			num = typeof num == 'number' ? num : 0;
			if (have !== undefined) {
				if (have < num) { num = have; }
				$SM.set(k, num, true);
			}

			var row = $('div#outfit_row_' + k.replace(' ', '-'), outfit);
			if((store.type == 'tool' || store.type == 'weapon') && have > 0) {
				currentBagCapacity += num * Path.getWeight(k);
				if(row.length === 0) {
					row = Path.createOutfittingRow(k, num, store, store.name);
					
					var curPrev = null;
					outfit.children().each(function(i) {
						var child = $(this);
						if(child.attr('id').indexOf('outfit_row_') === 0) {
							var cName = child.children('.row_key').text();
							if(cName < lk) {
								curPrev = child.attr('id');
							}
						}
					});
					if(curPrev == null) {
						row.insertAfter(wRow);
					} else {
						row.insertAfter(outfit.find('#' + curPrev));
					}
				} else {
					$('div#' + row.attr('id') + ' > div.row_val > span', outfit).text(num);
					$('div#' + row.attr('id') + ' .tooltip .numAvailable', outfit).text(have - num);
				}
				if(num === 0) {
					$('.dnBtn', row).addClass('disabled');
					$('.dnManyBtn', row).addClass('disabled');
				} else {
					$('.dnBtn', row).removeClass('disabled');
					$('.dnManyBtn', row).removeClass('disabled');
				}
				if(num == have || space < Path.getWeight(k)) {
					$('.upBtn', row).addClass('disabled');
					$('.upManyBtn', row).addClass('disabled');
				} else {
					$('.upBtn', row).removeClass('disabled');
					$('.upManyBtn', row).removeClass('disabled');
				}
			} else if(have === 0 && row.length > 0) {
				row.remove();
			}
		}

		Path.updateBagSpace(currentBagCapacity);

	},

	updateBagSpace: function(currentBagCapacity) {
		// Update bagspace
		$('#bagspace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - currentBagCapacity) , Path.getCapacity()));

		if(Path.outfit['cured meat'] > 0) {
			Button.setDisabled($('#embarkButton'), false);
		} else {
			Button.setDisabled($('#embarkButton'), true);
		}

	},
	
	createOutfittingRow: function(key, num, store) {
		if(!store.name) store.name = _(key);
		var row = $('<div>').attr('id', 'outfit_row_' + key.replace(' ', '-')).addClass('outfitRow').attr('key',key);
		$('<div>').addClass('row_key').text(store.name).appendTo(row);
		var val = $('<div>').addClass('row_val').appendTo(row);
		
		$('<span>').text(num).appendTo(val);
		$('<div>').addClass('upBtn').appendTo(val).click([1], Path.increaseSupply);
		$('<div>').addClass('dnBtn').appendTo(val).click([1], Path.decreaseSupply);
		$('<div>').addClass('upManyBtn').appendTo(val).click([10], Path.increaseSupply);
		$('<div>').addClass('dnManyBtn').appendTo(val).click([10], Path.decreaseSupply);
		$('<div>').addClass('clear').appendTo(row);
		
		var numAvailable = $SM.get('stores["'+key+'"]', true);
		var tt = $('<div>').addClass('tooltip bottom right').appendTo(row);

		if(store.type == 'weapon') {
			$('<div>').addClass('row_key').text(_('damage')).appendTo(tt);
			$('<div>').addClass('row_val').text(World.getDamage(key)).appendTo(tt);
		} else if(store.type == 'tool' && store.desc != "undefined") {
			$('<div>').addClass('row_key').text(store.desc).appendTo(tt);
		}

		$('<div>').addClass('row_key').text(_('weight')).appendTo(tt);
		$('<div>').addClass('row_val').text(Path.getWeight(key)).appendTo(tt);
		$('<div>').addClass('row_key').text(_('available')).appendTo(tt);
		$('<div>').addClass('row_val').addClass('numAvailable').text(numAvailable).appendTo(tt);
		
		return row;
	},
	
	increaseSupply: function(btn) {
		var supply = $(this).closest('.outfitRow').attr('key');
		Engine.log('increasing ' + supply + ' by up to ' + btn.data);
		var cur = Path.outfit[supply];
		cur = typeof cur == 'number' ? cur : 0;
		if(Path.getFreeSpace() >= Path.getWeight(supply) && cur < $SM.get('stores["'+supply+'"]', true)) {
			var maxExtraByWeight = Math.floor(Path.getFreeSpace() / Path.getWeight(supply));
			var maxExtraByStore  = $SM.get('stores["'+supply+'"]', true) - cur;
			Path.outfit[supply] = cur + Math.min(btn.data, maxExtraByWeight, maxExtraByStore);
			$SM.set('outfit['+supply+']', Path.outfit[supply]);
			Path.updateOutfitting();
		}
	},
	
	decreaseSupply: function(btn) {
		var supply = $(this).closest('.outfitRow').attr('key');
		Engine.log('decreasing ' + supply + ' by up to ' + btn.data);
		var cur = Path.outfit[supply];
		cur = typeof cur == 'number' ? cur : 0;
		if(cur > 0) {
			Path.outfit[supply] = Math.max(0, cur - btn.data);
			$SM.set('outfit['+supply+']', Path.outfit[supply]);
			Path.updateOutfitting();
		}
	},
	
	onArrival: function(transition_diff) {
		Path.setTitle();
		Path.updateOutfitting();
		Path.updatePerks(true);
		
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_DUSTY_PATH);

		Engine.moveStoresView($('#perks'), transition_diff);
	},
	
	setTitle: function() {
		document.title = _('A Dusty Path');
	},
	
	embark: function() {
		for(var k in Path.outfit) {
			$SM.add('stores["'+k+'"]', -Path.outfit[k]);
		}
		World.onArrival();
		$('#outerSlider').animate({left: '-700px'}, 300);
		Engine.activeModule = World;
		AudioEngine.playSound(AudioLibrary.EMBARK);
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'character' && e.stateName.indexOf('character.perks') === 0 && Engine.activeModule == Path){
			Path.updatePerks();
		} else if(e.category == 'income' && Engine.activeModule == Path){
			Path.updateOutfitting();
		}
	}
};
/**
 * Module that registers the starship!
 */
var Ship = {
	LIFTOFF_COOLDOWN: 120,
	ALLOY_PER_HULL: 1,
	ALLOY_PER_THRUSTER: 1,
	BASE_HULL: 0,
	BASE_THRUSTERS: 1,
	name: _("Ship"),
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(!$SM.get('features.location.spaceShip')) {
			$SM.set('features.location.spaceShip', true);
			$SM.setM('game.spaceShip', {
				hull: Ship.BASE_HULL,
				thrusters: Ship.BASE_THRUSTERS
			});
		}
		
		// Create the Ship tab
		this.tab = Header.addLocation(_("An Old Starship"), "ship", Ship);
		
		// Create the Ship panel
		this.panel = $('<div>').attr('id', "shipPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		Engine.updateSlider();
		
		// Draw the hull label
		var hullRow = $('<div>').attr('id', 'hullRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text(_('hull:')).appendTo(hullRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.hull')).appendTo(hullRow);
		$('<div>').addClass('clear').appendTo(hullRow);
		
		// Draw the thrusters label
		var engineRow = $('<div>').attr('id', 'engineRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text(_('engine:')).appendTo(engineRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.thrusters')).appendTo(engineRow);
		$('<div>').addClass('clear').appendTo(engineRow);
		
		// Draw the reinforce button
		new Button.Button({
			id: 'reinforceButton',
			text: _('reinforce hull'),
			click: Ship.reinforceHull,
			width: '100px',
			cost: {'alien alloy': Ship.ALLOY_PER_HULL}
		}).appendTo('div#shipPanel');
		
		// Draw the engine button
		new Button.Button({
			id: 'engineButton',
			text: _('upgrade engine'),
			click: Ship.upgradeEngine,
			width: '100px',
			cost: {'alien alloy': Ship.ALLOY_PER_THRUSTER}
		}).appendTo('div#shipPanel');
		
		// Draw the lift off button
		var b = new Button.Button({
			id: 'liftoffButton',
			text: _('lift off'),
			click: Ship.checkLiftOff,
			width: '100px',
			cooldown: Ship.LIFTOFF_COOLDOWN
		}).appendTo('div#shipPanel');
		
		if($SM.get('game.spaceShip.hull') <= 0) {
			Button.setDisabled(b, true);
		}
		
		// Init Space
		Space.init();
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Ship.handleStateUpdates);
	},
	
	options: {}, // Nothing for now
	
	onArrival: function(transition_diff) {
		Ship.setTitle();
		if(!$SM.get('game.spaceShip.seenShip')) {
			Notifications.notify(Ship, _('somewhere above the debris cloud, the wanderer fleet hovers. been on this rock too long.'));
			$SM.set('game.spaceShip.seenShip', true);
		}
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SHIP);

		Engine.moveStoresView(null, transition_diff);
	},
	
	setTitle: function() {
		if(Engine.activeModule == this) {
			document.title = _("An Old Starship");
		}
	},
	
	reinforceHull: function() {
		if($SM.get('stores["alien alloy"]', true) < Ship.ALLOY_PER_HULL) {
			Notifications.notify(Ship, _("not enough alien alloy"));
			return false;
		}
		$SM.add('stores["alien alloy"]', -Ship.ALLOY_PER_HULL);
		$SM.add('game.spaceShip.hull', 1);
		if($SM.get('game.spaceShip.hull') > 0) {
			Button.setDisabled($('#liftoffButton', Ship.panel), false);
		}
		$('#hullRow .row_val', Ship.panel).text($SM.get('game.spaceShip.hull'));
		AudioEngine.playSound(AudioLibrary.REINFORCE_HULL);
	},
	
	upgradeEngine: function() {
		if($SM.get('stores["alien alloy"]', true) < Ship.ALLOY_PER_THRUSTER) {
			Notifications.notify(Ship, _("not enough alien alloy"));
			return false;
		}
		$SM.add('stores["alien alloy"]', -Ship.ALLOY_PER_THRUSTER);
		$SM.add('game.spaceShip.thrusters', 1);
		$('#engineRow .row_val', Ship.panel).text($SM.get('game.spaceShip.thrusters'));
		AudioEngine.playSound(AudioLibrary.UPGRADE_ENGINE);
	},
	
	getMaxHull: function() {
		return $SM.get('game.spaceShip.hull');
	},
	
	checkLiftOff: function() {
		if(!$SM.get('game.spaceShip.seenWarning')) {
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
								onChoose: function() {
									$SM.set('game.spaceShip.seenWarning', true);
									Ship.liftOff();
								},
								nextScene: 'end'
							},
							'wait': {
								text: _('linger'),
								onChoose: function() {
									Button.clearCooldown($('#liftoffButton'));
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
	},
	
	liftOff: function () {
		$('#outerSlider').animate({top: '700px'}, 300);
		Space.onArrival();
		Engine.activeModule = Space;
		AudioEngine.playSound(AudioLibrary.LIFT_OFF);
	},
	
	handleStateUpdates: function(e){
		
	}
};
/**
 * Module that registers spaaaaaaaaace!
 */
var Space = {	
	SHIP_SPEED: 3,
	BASE_ASTEROID_DELAY: 500,
	BASE_ASTEROID_SPEED: 1500,
	FTB_SPEED: 60000,
	STAR_WIDTH: 3000,
	STAR_HEIGHT: 3000,
	NUM_STARS: 200,
	STAR_SPEED: 60000,
	FRAME_DELAY: 100,
	stars: null,
	backStars: null,
	ship: null,
	lastMove: null,
	done: false,
	shipX: null,
	shipY: null,
	
	hull: 0,
	
	name: "Space",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		// Create the Space panel
		this.panel = $('<div>').attr('id', "spacePanel")
			.addClass('location')
			.appendTo('#outerSlider');
		
		// Create the ship
		Space.ship = $('<div>').text("@").attr('id', 'ship').appendTo(this.panel);
		
		// Create the hull display
		var h = $('<div>').attr('id', 'hullRemaining').appendTo(this.panel);
		$('<div>').addClass('row_key').text(_('hull: ')).appendTo(h);
		$('<div>').addClass('row_val').appendTo(h);
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Space.handleStateUpdates);
	},
	
	options: {}, // Nothing for now
	
	onArrival: function() {
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
		Space._shipTimer = setInterval(Space.moveShip, 33);
		Space._volumeTimer = setInterval(Space.lowerVolume, 1000);
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SPACE);
	},
	
	setTitle: function() {
		if(Engine.activeModule == this) {
			var t;
			if(Space.altitude < 10) {
				t = _("Troposphere");
			} else if(Space.altitude < 20) {
				t = _("Stratosphere");
			} else if(Space.altitude < 30) {
				t = _("Mesosphere");
			} else if(Space.altitude < 45) {
				t = _("Thermosphere");
			} else if(Space.altitude < 60){
				t = _("Exosphere");
			} else {
				t = _("Space");
			}
			document.title = t;
		}
	},
	
	getSpeed: function() {
		return Space.SHIP_SPEED + $SM.get('game.spaceShip.thrusters');
	},
	
	updateHull: function() {
		$('div#hullRemaining div.row_val', Space.panel).text(Space.hull + '/' + Ship.getMaxHull());
	},
	
	createAsteroid: function(noNext) {
		var r = Math.random();
		var c;
		if(r < 0.2)
			c = '#';
		else if(r < 0.4)
			c = '$';
		else if(r < 0.6)
			c = '%';
		else if(r < 0.8)
			c = '&';
		else
			c = 'H';
		
		var x = Math.floor(Math.random() * 700);
		var a = $('<div>').addClass('asteroid').text(c).appendTo('#spacePanel').css('left', x + 'px');
		a.data({
			xMin: x,
			xMax: x + a.width(),
			height: a.height()
		});
		a.animate({
			top: '740px'
		}, {
			duration: Space.BASE_ASTEROID_SPEED - Math.floor(Math.random() * (Space.BASE_ASTEROID_SPEED * 0.65)),
			easing: 'linear', 
			progress: function() {
				// Collision detection
				var t = $(this);
				if(t.data('xMin') <= Space.shipX && t.data('xMax') >= Space.shipX) {
					var aY = t.css('top');
					aY = parseFloat(aY.substring(0, aY.length - 2));
					
					if(aY <= Space.shipY && aY + t.data('height') >= Space.shipY) {
						// Collision
						Engine.log('collision');
						t.remove();
						Space.hull--;
						Space.updateHull();

						// play audio on asteroid hit
						// higher altitudes play higher frequency hits
						var r = Math.floor(Math.random() * 2);
						if(Space.altitude > 40) {
							r += 6;
							AudioEngine.playSound(AudioLibrary['ASTEROID_HIT_' + r]);
						} else if(Space.altitude > 20) {
							r += 4;
							AudioEngine.playSound(AudioLibrary['ASTEROID_HIT_' + r]);
						} else  {
							r += 1;
							AudioEngine.playSound(AudioLibrary['ASTEROID_HIT_' + r]);
						}

						if(Space.hull === 0) {
							Space.crash();
						}
					}
				}
			},
			complete: function() {
				$(this).remove();
			}
		});
		if(!noNext) {
			
			// Harder
			if(Space.altitude > 10) {
				Space.createAsteroid(true);
			}
			
			// HARDER
			if(Space.altitude > 20) {
				Space.createAsteroid(true);
				Space.createAsteroid(true);
			}
			
			// HAAAAAARDERRRRR!!!!1
			if(Space.altitude > 40) {
				Space.createAsteroid(true);
				Space.createAsteroid(true);
			}
			
			if(!Space.done) {
				Engine.setTimeout(Space.createAsteroid, 1000 - (Space.altitude * 10), true);
			}
		}
	},
	
	moveShip: function() {
		var x = Space.ship.css('left');
		x = parseFloat(x.substring(0, x.length - 2));
		var y = Space.ship.css('top');
		y = parseFloat(y.substring(0, y.length - 2));
		
		var dx = 0, dy = 0;
		
		if(Space.up) {
			dy -= Space.getSpeed();
		} else if(Space.down) {
			dy += Space.getSpeed();
		}
		if(Space.left) {
			dx -= Space.getSpeed();
		} else if(Space.right) {
			dx += Space.getSpeed();
		}
		
		if(dx !== 0 && dy !== 0) {
			dx = dx / Math.sqrt(2);
			dy = dy / Math.sqrt(2);
		}
		
		if(Space.lastMove != null) {
			var dt = Date.now() - Space.lastMove;
			dx *= dt / 33;
			dy *= dt / 33;
		}
		
		x = x + dx;
		y = y + dy;
		if(x < 10) {
			x = 10;
		} else if(x > 690) {
			x = 690;
		}
		if(y < 10) {
			y = 10;
		} else if(y > 690) {
			y = 690;
		}
		
		Space.shipX = x;
		Space.shipY = y;
		
		Space.ship.css({
			left: x + 'px',
			top: y + 'px'
		});

		Space.lastMove = Date.now();
	},
	
	startAscent: function() {
		var body_color;
		var to_color;
		if (Engine.isLightsOff()) {
			body_color = '#272823';
			to_color = '#EEEEEE';
		}
		else {
			body_color = '#FFFFFF';
			to_color = '#000000';
		}

		$('body').addClass('noMask').css({backgroundColor: body_color}).animate({
			backgroundColor: to_color
		}, {
			duration: Space.FTB_SPEED, 
			easing: 'linear',
			progress: function() {
				var cur = $('body').css('background-color');
				var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' + 
					cur.substring(3, cur.length - 1) + ', 1) 100%)';
				$('#notifyGradient').attr('style', 'background-color:'+cur+';background:-webkit-' + s + ';background:' + s);
			},
			complete: Space.endGame
		});
		Space.drawStars();
		Space._timer = setInterval(function() {
			Space.altitude += 1;
			if(Space.altitude % 10 === 0) {
				Space.setTitle();
			}
			if(Space.altitude > 60) {
				clearInterval(Space._timer);
			}
		}, 1000);
		
		Space._panelTimeout = Engine.setTimeout(function() {
			if (Engine.isLightsOff())
				$('#spacePanel, .menu, select.menuBtn').animate({color: '#272823'}, 500, 'linear');
			else
				$('#spacePanel, .menu, select.menuBtn').animate({color: 'white'}, 500, 'linear');
		}, Space.FTB_SPEED / 2, true);
		
		Space.createAsteroid();
	},

	drawStars: function(duration) {
		var starsContainer = $('<div>').attr('id', 'starsContainer').appendTo('body');
		Space.stars = $('<div>').css('bottom', '0px').attr('id', 'stars').appendTo(starsContainer);
		var s1 = $('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});
		var s2 = s1.clone();
		Space.stars.append(s1).append(s2);
		Space.drawStarAsync(s1, s2, 0);
		Space.stars.data('speed', Space.STAR_SPEED);
		Space.startAnimation(Space.stars);
		
		Space.starsBack = $('<div>').css('bottom', '0px').attr('id', 'starsBack').appendTo(starsContainer);
		s1 = $('<div>').css({
			width: Space.STAR_WIDTH + 'px',
			height: Space.STAR_HEIGHT + 'px'
		});
		s2 = s1.clone();
		Space.starsBack.append(s1).append(s2);
		Space.drawStarAsync(s1, s2, 0);
		Space.starsBack.data('speed', Space.STAR_SPEED * 2);
		Space.startAnimation(Space.starsBack);
	},
	
	startAnimation: function(el) {
		el.animate({bottom: '-3000px'}, el.data('speed'), 'linear', function() {
			$(this).css('bottom', '0px');
			Space.startAnimation($(this));
		});
	},
	
	drawStarAsync: function(el, el2, num) {
		var top = Math.floor(Math.random() * Space.STAR_HEIGHT) + 'px';
		var left = Math.floor(Math.random() * Space.STAR_WIDTH) + 'px';
		$('<div>').text('.').addClass('star').css({
			top: top,
			left: left
		}).appendTo(el);
		$('<div>').text('.').addClass('star').css({
			top: top,
			left: left
		}).appendTo(el2);
		if(num < Space.NUM_STARS) {
			Engine.setTimeout(function() { Space.drawStarAsync(el, el2, num + 1); }, 100);
		}
	},
	
	crash: function() {
		if(Space.done) return;
		Engine.keyLock = true;
		Space.done = true;
		clearInterval(Space._timer);
		clearInterval(Space._shipTimer);
		clearInterval(Space._volumeTimer);
		clearTimeout(Space._panelTimeout);
		var body_color;
		if (Engine.isLightsOff())
			body_color = '#272823';
		else
			body_color = '#FFFFFF';
		// Craaaaash!
		$('body').removeClass('noMask').stop().animate({
			backgroundColor: body_color
		}, {
			duration: 300, 
			progress: function() {
				var cur = $('body').css('background-color');
				var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' + 
					cur.substring(3, cur.length - 1) + ', 1) 100%)';
				$('#notifyGradient').attr('style', 'background-color:'+cur+';background:-webkit-' + s + ';background:' + s);
			},
			complete: function() {
				Space.stars.remove();
				Space.starsBack.remove();
				Space.stars = Space.starsBack = null;
				$('#starsContainer').remove();
				$('body').attr('style', '');
				$('#notifyGradient').attr('style', '');	
				$('#spacePanel').attr('style', '');			
			}
		});
		$('.menu, select.menuBtn').animate({color: '#666'}, 300, 'linear');
		$('#outerSlider').animate({top: '0px'}, 300, 'linear');
		Engine.activeModule = Ship;
		Ship.onArrival();
		Button.cooldown($('#liftoffButton'));
		Engine.event('progress', 'crash');
		AudioEngine.playSound(AudioLibrary.CRASH);
	},
	
	endGame: function() {
		if(Space.done) return;
		Engine.event('progress', 'win');
		Space.done = true;
		clearInterval(Space._timer);
		clearInterval(Space._shipTimer);
		clearInterval(Space._volumeTimer);
		clearTimeout(Engine._saveTimer);
		clearTimeout(Outside._popTimeout);
		clearTimeout(Engine._incomeTimeout);
		clearTimeout(Events._eventTimeout);
		clearTimeout(Room._fireTimer);
		clearTimeout(Room._tempTimer);
		for(var j in Room.Craftables) {
			Room.Craftables[j].button = null;
		}
		for(var k in Room.TradeGoods) {
			Room.TradeGoods[k].button = null;
		}
		delete Outside._popTimeout;
		
		AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_ENDING);

		$('#hullRemaining', Space.panel).animate({opacity: 0}, 500, 'linear');
		Space.ship.animate({
			top: '350px',
			left: '240px'
		}, 3000, 'linear', function() {
			Engine.setTimeout(function() {
				Space.ship.animate({
					top: '-100px'
				}, 200, 'linear', function() {
					// Restart everything! Play FOREVER!
					$('#outerSlider').css({'left': '0px', 'top': '0px'});
					$('#locationSlider, #worldPanel, #spacePanel, #notifications').remove();
					$('#header').empty();
					Engine.setTimeout(function() {
						$('body').stop();
						var container_color;
						if (Engine.isLightsOff())
							container_color = '#EEE';
						else
							container_color = '#000';
						$('#starsContainer').animate({
							opacity: 0,
							'background-color': container_color
						}, {
							duration: 2000, 
							progress: function() {
								var cur = $('body').css('background-color');
								var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' + 
									cur.substring(3, cur.length - 1) + ', 1) 100%)';
								$('#notifyGradient').attr('style', 'background-color:'+cur+';background:-webkit-' + s + ';background:' + s);
							},
							complete: function() {
								Engine.GAME_OVER = true;
								Score.save();
								Prestige.save();
								$('#starsContainer').remove();
								$('#content, #notifications').remove();
								Space.showExpansionEnding().then(() => {
									Space.showEndingOptions();
									Engine.options = {};
									Engine.deleteSave(true);
								});
							}
						});
					}, 2000);
				});
			}, 2000);
		});
	},

	showExpansionEnding: () => {
		return new Promise((resolve) => {
			if (!$SM.get('stores["fleet beacon"]')) {
				resolve();
				return;
			}

			const c = $('<div>')
				.addClass('outroContainer')
				.appendTo('body');

			setTimeout(() => {
				$('<div>')
					.addClass('outro')
					.html('the beacon pulses gently as the ship glides through space.<br>coordinates are locked. nothing to do but wait.')
					.appendTo(c)
					.animate({ opacity: 1}, 500);
			}, 2000);

			setTimeout(() => {
				$('<div>')
					.addClass('outro')
					.html('the beacon glows a solid blue, and then goes dim. the ship slows.<br>gradually, the vast wanderer homefleet comes into view.<br>massive worldships drift unnaturally through clouds of debris, scarred and dead.')
					.appendTo(c)
					.animate({ opacity: 1}, 500);
			}, 7000);

			setTimeout(() => {
				$('<div>')
					.addClass('outro')
					.text('the air is running out.')
					.appendTo(c)
					.animate({ opacity: 1}, 500);
			}, 14000);

			setTimeout(() => {
				$('<div>')
					.addClass('outro')
					.text('the capsule is cold.')
					.appendTo(c)
					.animate({ opacity: 1}, 500);
			}, 17000);

			setTimeout(() => {
				Button.Button({
					id: 'wait-btn',
					text: _('wait'),
					click: (btn) => {
						btn.addClass('disabled');
						c.animate({ opacity: 0 }, 5000, 'linear', () => {
							c.remove();
							setTimeout(resolve, 3000);
						})
					}
				}).animate({ opacity: 1 }, 500).appendTo(c);
			}, 19500)
		});
	},

	showEndingOptions: () => {
		$('<center>')
			.addClass('centerCont')
			.appendTo('body');
		$('<span>')
			.addClass('endGame')
			.text(_('score for this game: {0}', Score.calculateScore()))
			.appendTo('.centerCont')
			.animate({opacity:1},1500);
		$('<br />')
			.appendTo('.centerCont');
		$('<span>')
			.addClass('endGame')
			.text(_('total score: {0}', Prestige.get().score))
			.appendTo('.centerCont')
			.animate({opacity:1},1500);
		$('<br />')
			.appendTo('.centerCont');
		$('<br />')
			.appendTo('.centerCont');
		$('<span>')
			.addClass('endGame endGameOption')
			.text(_('restart.'))
			.click(Engine.confirmDelete)
			.appendTo('.centerCont')
			.animate({opacity:1},1500);
		$('<br />')
			.appendTo('.centerCont');
		$('<br />')
				.appendTo('.centerCont');
		$('<span>')
				.addClass('endGame')
				.text(_('expanded story. alternate ending. behind the scenes commentary. get the app.'))
				.appendTo('.centerCont')
				.animate({opacity:1}, 1500);
		$('<br />')
				.appendTo('.centerCont');
		$('<br />')
				.appendTo('.centerCont');
		$('<span>')
			.addClass('endGame endGameOption')
			.text(_('iOS.'))
			.click(function() { window.open('https://itunes.apple.com/app/apple-store/id736683061?pt=2073437&ct=gameover&mt=8'); })
			.appendTo('.centerCont')
			.animate({opacity:1},1500);
		$('<br />')
				.appendTo('.centerCont');
		$('<span>')
				.addClass('endGame endGameOption')
				.text(_('android.'))
				.click(function() { window.open('https://play.google.com/store/apps/details?id=com.yourcompany.adarkroom'); })
				.appendTo('.centerCont')
				.animate({opacity:1},1500);
	},
	
	keyDown: function(event) {
		switch(event.which) {
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
	},
	
	keyUp: function(event) {
		switch(event.which) {
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
	},
	
	handleStateUpdates: function(e){
		
	},
	
	lowerVolume: function () {
		if (Space.done) return;
		
		// lower audio as ship gets further into space
		var progress = Space.altitude / 60;
		var newVolume = 1.0 - progress;
		AudioEngine.setBackgroundMusicVolume(newVolume, 0.3);
	}
};
/**
 * Module that registers the fabricator functionality
 */
const Fabricator = {
  _STORES_OFFSET: 0,
  name: _('Fabricator'),
  Craftables: {
    'energy blade': {
      name: _('energy blade'),
      type: 'weapon',
      buildMsg: _("the blade hums, charged particles sparking and fizzing."),
      cost: () => ({
        'alien alloy': 1
      })
    },
    'fluid recycler': {
      name: _('fluid recycler'),
      type: 'upgrade',
      maximum: 1,
      buildMsg: _('water out, water in. waste not, want not.'),
      cost: () => ({
        'alien alloy': 2
      })
    },
    'cargo drone': {
      name: _('cargo drone'),
      type: 'upgrade',
      maximum: 1,
      buildMsg: _('the workhorse of the wanderer fleet.'),
      cost: () => ({
        'alien alloy': 2
      })
    },
    'kinetic armour': {
      name: _('kinetic armour'),
      type: 'upgrade',
      maximum: 1,
      blueprintRequired: true,
      buildMsg: _('wanderer soldiers succeed by subverting the enemy\'s rage.'),
      cost: () => ({
        'alien alloy': 2
      })
    },
    'disruptor': {
      name: _('disruptor'),
      type: 'weapon',
      blueprintRequired: true,
      buildMsg: _("somtimes it is best not to fight."),
      cost: () => ({
        'alien alloy': 1
      })
    },
    'hypo': {
      name: _('hypo'),
      type: 'tool',
      blueprintRequired: true,
      buildMsg: _('a handful of hypos. life in a vial.'),
      cost: () => ({
        'alien alloy': 1
      }),
      quantity: 5
    },
    'stim': {
      name: _('stim'),
      type: 'tool',
      blueprintRequired: true,
      buildMsg: _('sometimes it is best to fight without restraint.'),
      cost: () => ({
        'alien alloy': 1
      })
    },
    'plasma rifle': {
      name: _('plasma rifle'),
      type: 'weapon',
      blueprintRequired: true,
      buildMsg: _("the peak of wanderer weapons technology, sleek and deadly."),
      cost: () => ({
        'alien alloy': 1
      })
    },
    'glowstone': {
      name: _('glow stone'),
      type: 'tool',
      blueprintRequired: true,
      buildMsg: _('a smooth, perfect sphere. its light is inextinguishable.'),
      cost: () => ({
        'alien alloy': 1
      })
    }
  },

  init: () => {

    if (!$SM.get('features.location.fabricator')) {
      $SM.set('features.location.fabricator', true);
    }

    // Create the Fabricator tab
    Fabricator.tab = Header.addLocation(_("A Whirring Fabricator"), "fabricator", Fabricator, 'ship');
    
    // Create the Fabricator panel
    Fabricator.panel = $('<div>').attr('id', "fabricatorPanel")
      .addClass('location');
    if (Ship.panel) {
      Fabricator.panel.insertBefore(Ship.panel);
    }
    else {
      Fabricator.panel.appendTo('div#locationSlider');
    }

    $.Dispatch('stateUpdate').subscribe(() => {
      Fabricator.updateBuildButtons();
      Fabricator.updateBlueprints();
    });
    
    Engine.updateSlider();
    Fabricator.updateBuildButtons();

  },

  onArrival: transition_diff => {
    Fabricator.setTitle();
    Fabricator.updateBlueprints(true);

    if(!$SM.get('game.fabricator.seen')) {
      Notifications.notify(Fabricator, _('the familiar hum of wanderer machinery coming to life. finally, real tools.'));
      $SM.set('game.fabricator.seen', true);
    }
    AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SHIP);

    Engine.moveStoresView(null, transition_diff);
  },

  setTitle: () => {
    if(Engine.activeModule == Fabricator) {
      document.title = _("A Whirring Fabricator");
    }
  },

  updateBuildButtons: () => {
    let section = $('#fabricateButtons');
    let needsAppend = false;
    if (section.length === 0) {
      section = $('<div>').attr({ 'id': 'fabricateButtons', 'data-legend': _('fabricate:') }).css('opacity', 0);
      needsAppend = true;
    }

    for (const [ key, value ] of Object.entries(Fabricator.Craftables)) {
      const max = $SM.num(key, value) + 1 > value.maximum;
      if (!value.button) {
        if (Fabricator.canFabricate(key)) {
          const name = _(value.name) + ((value.quantity ?? 1) > 1 ? ` (x${value.quantity})` : '');
          value.button = new Button.Button({
            id: 'fabricate_' + key,
            cost: value.cost(),
            text: name,
            click: Fabricator.fabricate,
            width: '150px',
            ttPos: section.children().length > 10 ? 'top right' : 'bottom right'
          }).css('opacity', 0).attr('fabricateThing', key).appendTo(section).animate({ opacity: 1 }, 300, 'linear');
        }
      } else {
        // refresh the tooltip
        const costTooltip = $('.tooltip', value.button);
        costTooltip.empty();
        const cost = value.cost();
        for (const [ resource, num ] of Object.entries(cost)) {
          $("<div>").addClass('row_key').text(_(resource)).appendTo(costTooltip);
          $("<div>").addClass('row_val').text(num).appendTo(costTooltip);
        }
        if (max && value.maxMsg && !value.button.hasClass('disabled')) {
          Notifications.notify(Fabricator, value.maxMsg);
        }
      }
      if (max) {
        Button.setDisabled(value.button, true);
      } else {
        Button.setDisabled(value.button, false);
      }
    }

    if (needsAppend && section.children().length > 0) {
      section.appendTo(Fabricator.panel).animate({ opacity: 1 }, 300, 'linear');
    }
  },

  updateBlueprints: ignoreStores => {
    if(!$SM.get('character.blueprints')) {
      return;
    }

    let blueprints = $('#blueprints');
    let needsAppend = false;
    if(blueprints.length === 0) {
      needsAppend = true;
      blueprints = $('<div>').attr({'id': 'blueprints', 'data-legend': _('blueprints')});
    }

    for (const k in $SM.get('character.blueprints')) {
      const id = 'blueprint_' + k.replace(/ /g, '-');
      let r = $('#' + id);
      if($SM.get(`character.blueprints["${k}"]`) && r.length === 0) {
        r = $('<div>').attr('id', id).addClass('blueprintRow').appendTo(blueprints);
        $('<div>').addClass('row_key').text(_(k)).appendTo(r);
      }
    }
    
    if(needsAppend && blueprints.children().length > 0) {
      blueprints.prependTo(Fabricator.panel);
    }
  },

  canFabricate: itemKey => 
    !Fabricator.Craftables[itemKey].blueprintRequired || 
    $SM.get(`character.blueprints['${itemKey}']`),

  fabricate: button => {
    const thing = $(button).attr('fabricateThing');
    const craftable = Fabricator.Craftables[thing];
    const numThings = Math.min(0, $SM.get(`stores['${thing}']`, true));

    if (craftable.maximum <= numThings) {
      return;
    }

    const storeMod = {};
    const cost = craftable.cost();
    for (const [ key, value ] of Object.entries(cost)) {
      const have = $SM.get(`stores['${key}']`, true);
      if (have < value) {
        Notifications.notify(Fabricator, _(`not enough ${key}`));
        return false;
      } else {
        storeMod[key] = have - value;
      }
    }
    $SM.setM('stores', storeMod);
    $SM.add(`stores['${thing}']`, craftable.quantity ?? 1);

    Notifications.notify(Fabricator, craftable.buildMsg);
    AudioEngine.playSound(AudioLibrary.CRAFT);
  }

};
var Prestige = {
		
	name: 'Prestige',

	options: {},

	init: function(options) {
		this.options = $.extend(this.options, options);
	},
	
	storesMap: [
		{ store: 'wood', type: 'g' },
		{ store: 'fur', type: 'g' },
		{ store: 'meat', type: 'g' },
		{ store: 'iron', type: 'g' },
		{ store: 'coal', type: 'g' },
		{ store: 'sulphur', type: 'g' },
		{ store: 'steel', type: 'g' },
		{ store: 'cured meat', type: 'g' },
		{ store: 'scales', type: 'g' },
		{ store: 'teeth', type: 'g' },
		{ store: 'leather', type: 'g' },
		{ store: 'bait', type: 'g' },
		{ store: 'torch', type: 'g' },
		{ store: 'cloth', type: 'g' },
		{ store: 'bone spear', type: 'w' },
		{ store: 'iron sword', type: 'w' },
		{ store: 'steel sword', type: 'w' },
		{ store: 'bayonet', type: 'w' },
		{ store: 'rifle', type: 'w' },
		{ store: 'laser rifle', type: 'w' },
		{ store: 'bullets', type: 'a' },
		{ store: 'energy cell', type: 'a' },
		{ store: 'grenade', type: 'a' },
		{ store: 'bolas', type: 'a' }
	],
	
	getStores: function(reduce) {
		var stores = [];
		
		for(var i in this.storesMap) {
			var s = this.storesMap[i];
			stores.push(Math.floor($SM.get('stores["' + s.store + '"]', true) / 
					(reduce ? this.randGen(s.type) : 1)));
		}
		
		return stores;
	},
	
	get: function() {
		return {
			stores: $SM.get('previous.stores'),
			score: $SM.get('previous.score')
		};
	},
	
	set: function(prestige) {
		$SM.set('previous.stores', prestige.stores);
		$SM.set('previous.score', prestige.score);
	},
	
	save: function() {
		$SM.set('previous.stores', this.getStores(true));
		$SM.set('previous.score', Score.totalScore());
	},
  
	collectStores : function() {
		var prevStores = $SM.get('previous.stores');
		if(prevStores != null) {
			var toAdd = {};
			for(var i in this.storesMap) {
				var s = this.storesMap[i];
				toAdd[s.store] = prevStores[i];
			}
			$SM.addM('stores', toAdd);
			
			// Loading the stores clears em from the save
			prevStores.length = 0;
		}
	},

	randGen : function(storeType) {
		var amount;
		switch(storeType) {
		case 'g':
			amount = Math.floor(Math.random() * 10);
			break;
		case 'w':
			amount = Math.floor(Math.floor(Math.random() * 10) / 2);
			break;
		case 'a':
			amount = Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
			break;
		default:
			return 1;
		}
		if (amount !== 0) {
			return amount;
		}
		return 1;
	}

};
var Score = {

	name : 'Score',

	options : {},

	init : function(options) {
		this.options = $.extend(this.options, options);
	},

	calculateScore : function() {
		var scoreUnadded = Prestige.getStores(false);
		var fullScore = 0;
		
		var factor = [1, 1.5, 1, 2, 2, 3, 3, 2, 2, 2, 2, 1.5, 1, 
			     1, 10, 30, 50, 100, 150, 150, 3, 3, 5, 4];
		for(var i = 0; i< factor.length; i++){
			fullScore += scoreUnadded[i] * factor[i];
		}
		
		fullScore = fullScore + $SM.get('stores["alien alloy"]', true) * 10;
		fullScore = fullScore + $SM.get('stores["fleet beacon"]', true) * 500;
		fullScore = fullScore + Ship.getMaxHull() * 50;
		return Math.floor(fullScore);
	},

	save: function() {
		$SM.set('playStats.score', Score.calculateScore());
	},

	totalScore : function() {
		return $SM.get('previous.score', true) + Score.calculateScore();
	}
};
(function() {
  var Engine = window.Engine = {

    SITE_URL: encodeURIComponent("http://adarkroom.doublespeakgames.com"),
    VERSION: 1.3,
    MAX_STORE: 99999999999999,
    SAVE_DISPLAY: 30 * 1000,
    GAME_OVER: false,

    //object event types
    topics: {},

    Perks: {
      'boxer': {
        name: _('boxer'),
        desc: _('punches do more damage'),
        /// TRANSLATORS : means with more force.
        notify: _('learned to throw punches with purpose')
      },
      'martial artist': {
        name: _('martial artist'),
        desc: _('punches do even more damage.'),
        notify: _('learned to fight quite effectively without weapons')
      },
      'unarmed master': {
        /// TRANSLATORS : master of unarmed combat
        name: _('unarmed master'),
        desc: _('punch twice as fast, and with even more force'),
        notify: _('learned to strike faster without weapons')
      },
      'barbarian': {
        name: _('barbarian'),
        desc: _('melee weapons deal more damage'),
        notify: _('learned to swing weapons with force')
      },
      'slow metabolism': {
        name: _('slow metabolism'),
        desc: _('go twice as far without eating'),
        notify: _('learned how to ignore the hunger')
      },
      'desert rat': {
        name: _('desert rat'),
        desc: _('go twice as far without drinking'),
        notify: _('learned to love the dry air')
      },
      'evasive': {
        name: _('evasive'),
        desc: _('dodge attacks more effectively'),
        notify: _("learned to be where they're not")
      },
      'precise': {
        name: _('precise'),
        desc: _('land blows more often'),
        notify: _('learned to predict their movement')
      },
      'scout': {
        name: _('scout'),
        desc: _('see farther'),
        notify: _('learned to look ahead')
      },
      'stealthy': {
        name: _('stealthy'),
        desc: _('better avoid conflict in the wild'),
        notify: _('learned how not to be seen')
      },
      'gastronome': {
        name: _('gastronome'),
        desc: _('restore more health when eating'),
        notify: _('learned to make the most of food')
      }
    },

    options: {
      state: null,
      debug: false,
      log: false,
      dropbox: false,
      doubleTime: false
    },

    init: function(options) {
      this.options = $.extend(
        this.options,
        options
      );
      this._debug = this.options.debug;
      this._log = this.options.log;

      // Check for HTML5 support
      if(!Engine.browserValid()) {
        window.location = 'browserWarning.html';
      }

      // Check for mobile
      if(Engine.isMobile()) {
        window.location = 'mobileWarning.html';
      }

      Engine.disableSelection();

      if(this.options.state != null) {
        window.State = this.options.state;
      } else {
        Engine.loadGame();
      }

      // start loading music and events early
      for (var key in AudioLibrary) {
        if (
          key.toString().indexOf('MUSIC_') > -1 ||
          key.toString().indexOf('EVENT_') > -1) {
            AudioEngine.loadAudioFile(AudioLibrary[key]);
          }
      }

      $('<div>').attr('id', 'locationSlider').appendTo('#main');

      var menu = $('<div>')
        .addClass('menu')
        .appendTo('body');

      if(typeof langs != 'undefined'){
        var customSelect = $('<span>')
          .addClass('customSelect')
          .addClass('menuBtn')
          .appendTo(menu);
        var selectOptions = $('<span>')
          .addClass('customSelectOptions')
          .appendTo(customSelect);
        var optionsList = $('<ul>')
          .appendTo(selectOptions);
        $('<li>')
          .text("language.")
          .appendTo(optionsList);

        $.each(langs, function(name,display){
          $('<li>')
            .text(display)
            .attr('data-language', name)
            .on("click", function() { Engine.switchLanguage(this); })
            .appendTo(optionsList);
        });
      }

      $('<span>')
        .addClass('volume menuBtn')
        .text(_('sound on.'))
        .click(() => Engine.toggleVolume())
        .appendTo(menu);

      $('<span>')
        .addClass('appStore menuBtn')
        .text(_('get the app.'))
        .click(Engine.getApp)
        .appendTo(menu);

      $('<span>')
        .addClass('lightsOff menuBtn')
        .text(_('lights off.'))
        .click(Engine.turnLightsOff)
        .appendTo(menu);

      $('<span>')
        .addClass('hyper menuBtn')
        .text(_('hyper.'))
        .click(Engine.confirmHyperMode)
        .appendTo(menu);

      $('<span>')
        .addClass('menuBtn')
        .text(_('restart.'))
        .click(Engine.confirmDelete)
        .appendTo(menu);

      $('<span>')
        .addClass('menuBtn')
        .text(_('share.'))
        .click(Engine.share)
        .appendTo(menu);

      $('<span>')
        .addClass('menuBtn')
        .text(_('save.'))
        .click(Engine.exportImport)
        .appendTo(menu);

      if(this.options.dropbox && Engine.Dropbox) {
        this.dropbox = Engine.Dropbox.init();

        $('<span>')
          .addClass('menuBtn')
          .text(_('dropbox.'))
          .click(Engine.Dropbox.startDropbox)
          .appendTo(menu);
      }

      $('<span>')
        .addClass('menuBtn')
        .text(_('github.'))
        .click(function() { window.open('https://github.com/doublespeakgames/adarkroom'); })
        .appendTo(menu);

      // Register keypress handlers
      $('body').off('keydown').keydown(Engine.keyDown);
      $('body').off('keyup').keyup(Engine.keyUp);

      // Register swipe handlers
      swipeElement = $('#outerSlider');
      swipeElement.on('swipeleft', Engine.swipeLeft);
      swipeElement.on('swiperight', Engine.swipeRight);
      swipeElement.on('swipeup', Engine.swipeUp);
      swipeElement.on('swipedown', Engine.swipeDown);

      // subscribe to stateUpdates
      $.Dispatch('stateUpdate').subscribe(Engine.handleStateUpdates);

      $SM.init();
      AudioEngine.init();
      Notifications.init();
      Events.init();
      Room.init();


      if(typeof $SM.get('stores.wood') != 'undefined') {
        Outside.init();
      }
      if($SM.get('stores.compass', true) > 0) {
        Path.init();
      }
      if ($SM.get('features.location.fabricator')) {
        Fabricator.init();
      }
      if($SM.get('features.location.spaceShip')) {
        Ship.init();
      }

      if($SM.get('config.lightsOff', true)){
        Engine.turnLightsOff();
      }

      if($SM.get('config.hyperMode', true)){
        Engine.triggerHyperMode();
      }

      Engine.toggleVolume(Boolean($SM.get('config.soundOn')));
      if(!AudioEngine.isAudioContextRunning()){
        document.addEventListener('click', Engine.resumeAudioContext, true);
      }
      
      Engine.saveLanguage();
      Engine.travelTo(Room);

      setTimeout(notifyAboutSound, 3000);

    },
    resumeAudioContext: function () {
      AudioEngine.tryResumingAudioContext();
      
      // turn on music!
          AudioEngine.setMasterVolume($SM.get('config.soundOn') ? 1.0 : 0.0, 0);

      document.removeEventListener('click', Engine.resumeAudioContext);
    },
    browserValid: function() {
      return ( location.search.indexOf( 'ignorebrowser=true' ) >= 0 || ( typeof Storage != 'undefined' && !oldIE ) );
    },

    isMobile: function() {
      return ( location.search.indexOf( 'ignorebrowser=true' ) < 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
    },

    saveGame: function() {
      if(typeof Storage != 'undefined' && localStorage) {
        if(Engine._saveTimer != null) {
          clearTimeout(Engine._saveTimer);
        }
        if(typeof Engine._lastNotify == 'undefined' || Date.now() - Engine._lastNotify > Engine.SAVE_DISPLAY){
          $('#saveNotify').css('opacity', 1).animate({opacity: 0}, 1000, 'linear');
          Engine._lastNotify = Date.now();
        }
        localStorage.gameState = JSON.stringify(State);
      }
    },

    loadGame: function() {
      try {
        var savedState = JSON.parse(localStorage.gameState);
        if(savedState) {
          State = savedState;
          $SM.updateOldState();
          Engine.log("loaded save!");
        }
      } catch(e) {
        State = {};
        $SM.set('version', Engine.VERSION);
        Engine.event('progress', 'new game');
      }
    },

    exportImport: function() {
      Events.startEvent({
        title: _('Export / Import'),
        scenes: {
          start: {
            text: [
              _('export or import save data, for backing up'),
              _('or migrating computers')
            ],
            buttons: {
              'export': {
                text: _('export'),
                nextScene: {1: 'inputExport'}
              },
              'import': {
                text: _('import'),
                nextScene: {1: 'confirm'}
              },
              'cancel': {
                text: _('cancel'),
                nextScene: 'end'
              }
            }
          },
          'inputExport': {
            text: [_('save this.')],
            textarea: Engine.export64(),
            onLoad: function() { Engine.event('progress', 'export'); },
            readonly: true,
            buttons: {
              'done': {
                text: _('got it'),
                nextScene: 'end',
                onChoose: Engine.disableSelection
              }
            }
          },
          'confirm': {
            text: [
              _('are you sure?'),
              _('if the code is invalid, all data will be lost.'),
              _('this is irreversible.')
            ],
            buttons: {
              'yes': {
                text: _('yes'),
                nextScene: {1: 'inputImport'},
                onChoose: Engine.enableSelection
              },
              'no': {
                text: _('no'),
                nextScene: {1: 'start'}
              }
            }
          },
          'inputImport': {
            text: [_('put the save code here.')],
            textarea: '',
            buttons: {
              'okay': {
                text: _('import'),
                nextScene: 'end',
                onChoose: Engine.import64
              },
              'cancel': {
                text: _('cancel'),
                nextScene: 'end'
              }
            }
          }
        }
      });
    },

    generateExport64: function(){
      var string64 = Base64.encode(localStorage.gameState);
      string64 = string64.replace(/\s/g, '');
      string64 = string64.replace(/\./g, '');
      string64 = string64.replace(/\n/g, '');

      return string64;
    },

    export64: function() {
      Engine.saveGame();
      Engine.enableSelection();
      return Engine.generateExport64();
    },

    import64: function(string64) {
      Engine.event('progress', 'import');
      Engine.disableSelection();
      string64 = string64.replace(/\s/g, '');
      string64 = string64.replace(/\./g, '');
      string64 = string64.replace(/\n/g, '');
      var decodedSave = Base64.decode(string64);
      localStorage.gameState = decodedSave;
      location.reload();
    },

    event: function(cat, act) {
      if(typeof ga === 'function') {
        ga('send', 'event', cat, act);
      }
    },

    confirmDelete: function() {
      Events.startEvent({
        title: _('Restart?'),
        scenes: {
          start: {
            text: [_('restart the game?')],
            buttons: {
              'yes': {
                text: _('yes'),
                nextScene: 'end',
                onChoose: Engine.deleteSave
              },
              'no': {
                text: _('no'),
                nextScene: 'end'
              }
            }
          }
        }
      });
    },

    deleteSave: function(noReload) {
      if(typeof Storage != 'undefined' && localStorage) {
        var prestige = Prestige.get();
        window.State = {};
        localStorage.clear();
        Prestige.set(prestige);
      }
      if(!noReload) {
        location.reload();
      }
    },

    getApp: function() {
      Events.startEvent({
        title: _('Get the App'),
        scenes: {
          start: {
            text: [_('bring the room with you.')],
            buttons: {
              'ios': {
                text: _('ios'),
                nextScene: 'end',
                onChoose: function () {
                  window.open('https://itunes.apple.com/app/apple-store/id736683061?pt=2073437&ct=adrproper&mt=8');
                }
              },
              'android': {
                text: _('android'),
                nextScene: 'end',
                onChoose: function() {
                  window.open('https://play.google.com/store/apps/details?id=com.yourcompany.adarkroom');
                }
              },
              'close': {
                text: _('close'),
                nextScene: 'end'
              }
            }
          }
        }
      });
    },

    share: function() {
      Events.startEvent({
        title: _('Share'),
        scenes: {
          start: {
            text: [_('bring your friends.')],
            buttons: {
              'facebook': {
                text: _('facebook'),
                nextScene: 'end',
                onChoose: function() {
                  window.open('https://www.facebook.com/sharer/sharer.php?u=' + Engine.SITE_URL, 'sharer', 'width=626,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
                }
              },
              'google': {
                text:_('google+'),
                nextScene: 'end',
                onChoose: function() {
                  window.open('https://plus.google.com/share?url=' + Engine.SITE_URL, 'sharer', 'width=480,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
                }
              },
              'twitter': {
                text: _('twitter'),
                nextScene: 'end',
                onChoose: function() {
                  window.open('https://twitter.com/intent/tweet?text=A%20Dark%20Room&url=' + Engine.SITE_URL, 'sharer', 'width=660,height=260,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
                }
              },
              'reddit': {
                text: _('reddit'),
                nextScene: 'end',
                onChoose: function() {
                  window.open('http://www.reddit.com/submit?url=' + Engine.SITE_URL, 'sharer', 'width=960,height=700,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
                }
              },
              'close': {
                text: _('close'),
                nextScene: 'end'
              }
            }
          }
        }
      },
      {
        width: '400px'
      });
    },

    findStylesheet: function(title) {
      for(var i=0; i<document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if(sheet.title == title) {
          return sheet;
        }
      }
      return null;
    },

    isLightsOff: function() {
      var darkCss = Engine.findStylesheet('darkenLights');
      if ( darkCss != null && !darkCss.disabled ) {
        return true;
      }
      return false;
    },

    turnLightsOff: function() {
      var darkCss = Engine.findStylesheet('darkenLights');
      if (darkCss == null) {
        $('head').append('<link rel="stylesheet" href="css/dark.css" type="text/css" title="darkenLights" />');
        $('.lightsOff').text(_('lights on.'));
        $SM.set('config.lightsOff', true, true);
      } else if (darkCss.disabled) {
        darkCss.disabled = false;
        $('.lightsOff').text(_('lights on.'));
        $SM.set('config.lightsOff', true,true);
      } else {
        $("#darkenLights").attr("disabled", "disabled");
        darkCss.disabled = true;
        $('.lightsOff').text(_('lights off.'));
        $SM.set('config.lightsOff', false, true);
      }
    },

    confirmHyperMode: function(){
      if (!Engine.options.doubleTime) {
        Events.startEvent({
          title: _('Go Hyper?'),
          scenes: {
            start: {
              text: [_('turning hyper mode speeds up the game to x2 speed. do you want to do that?')],
              buttons: {
                'yes': {
                  text: _('yes'),
                  nextScene: 'end',
                  onChoose: Engine.triggerHyperMode
                },
                'no': {
                  text: _('no'),
                  nextScene: 'end'
                }
              }
            }
          }
        });
      } else {
        Engine.triggerHyperMode();
      }
    },

    triggerHyperMode: function() {
      Engine.options.doubleTime = !Engine.options.doubleTime;
      if(Engine.options.doubleTime)
        $('.hyper').text(_('classic.'));
      else
        $('.hyper').text(_('hyper.'));

      $SM.set('config.hyperMode', Engine.options.doubleTime, false);
    },

    // Gets a guid
    getGuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },

    activeModule: null,

    travelTo: function(module) {
      if(Engine.activeModule == module) {
        return;
      }

      var currentIndex = Engine.activeModule ? $('.location').index(Engine.activeModule.panel) : 1;
      $('div.headerButton').removeClass('selected');
      module.tab.addClass('selected');

      var slider = $('#locationSlider');
      var stores = $('#storesContainer');
      var panelIndex = $('.location').index(module.panel);
      var diff = Math.abs(panelIndex - currentIndex);
      slider.animate({left: -(panelIndex * 700) + 'px'}, 300 * diff);

      if($SM.get('stores.wood') !== undefined) {
        // FIXME Why does this work if there's an animation queue...?
        stores.animate({right: -(panelIndex * 700) + 'px'}, 300 * diff);
      }

      if(Engine.activeModule == Room || Engine.activeModule == Path || Engine.activeModule == Fabricator) {
        // Don't fade out the weapons if we're switching to a module
        // where we're going to keep showing them anyway.
        if (module != Room && module != Path && module != Fabricator) {
          $('div#weapons').animate({opacity: 0}, 300);
        }
      }

      if(module == Room || module == Path || module == Fabricator) {
        $('div#weapons').animate({opacity: 1}, 300);
      }

      Engine.activeModule = module;
      module.onArrival(diff);
      Notifications.printQueue(module);
    },

    /* Move the stores panel beneath top_container (or to top: 0px if top_container
     * either hasn't been filled in or is null) using transition_diff to sync with
     * the animation in Engine.travelTo().
     */
    moveStoresView: function(top_container, transition_diff) {
      var stores = $('#storesContainer');

      // If we don't have a storesContainer yet, leave.
      if(typeof(stores) === 'undefined') return;

      if(typeof(transition_diff) === 'undefined') transition_diff = 1;

      if(top_container === null) {
        stores.animate({top: '0px'}, {queue: false, duration: 300 * transition_diff});
      }
      else if(!top_container.length) {
        stores.animate({top: '0px'}, {queue: false, duration: 300 * transition_diff});
      }
      else {
        stores.animate({
          top: top_container.height() + 26 + 'px'
        }, {
          queue: false,
          duration: 300 * transition_diff
        });
      }
    },

    log: function(msg) {
      if(this._log) {
        console.log(msg);
      }
    },

    updateSlider: function() {
      var slider = $('#locationSlider');
      slider.width((slider.children().length * 700) + 'px');
    },

    updateOuterSlider: function() {
      var slider = $('#outerSlider');
      slider.width((slider.children().length * 700) + 'px');
    },

    getIncomeMsg: function(num, delay) {
      return _("{0} per {1}s", (num > 0 ? "+" : "") + num, delay);
      //return (num > 0 ? "+" : "") + num + " per " + delay + "s";
    },

    keyLock: false,
    tabNavigation: true,
    restoreNavigation: false,

    keyDown: function(e) {
      e = e || window.event;
      if(!Engine.keyPressed && !Engine.keyLock) {
        Engine.pressed = true;
        if(Engine.activeModule.keyDown) {
          Engine.activeModule.keyDown(e);
        }
      }
      return jQuery.inArray(e.keycode, [37,38,39,40]) < 0;
    },

    keyUp: function(e) {
      Engine.pressed = false;
      if(Engine.activeModule.keyUp) {
        Engine.activeModule.keyUp(e);
      } else {
        switch(e.which) {
          case 38: // Up
          case 87:
            Engine.log('up');
            break;
          case 40: // Down
          case 83:
            Engine.log('down');
            break;
          case 37: // Left
          case 65:
            if (Engine.tabNavigation) {
              if (Engine.activeModule == Ship && Fabricator.tab) {
                Engine.travelTo(Fabricator);
              }
              else if ((Engine.activeModule == Ship || Engine.activeModule == Fabricator) && Path.tab) {
                Engine.travelTo(Path);
              }
              else if (Engine.activeModule == Path && Outside.tab) {
                Engine.travelTo(Outside);
              } 
              else if (Engine.activeModule == Outside && Room.tab) {
                Engine.travelTo(Room);
              }
            }
            Engine.log('left');
            break;
          case 39: // Right
          case 68:
            if (Engine.tabNavigation){
              if (Engine.activeModule == Room && Outside.tab) {
                Engine.travelTo(Outside);
              }
              else if (Engine.activeModule == Outside && Path.tab){
                Engine.travelTo(Path);
              }
              else if(Engine.activeModule == Path && Fabricator.tab) {
                Engine.travelTo(Fabricator);
              }
              else if ((Engine.activeModule == Path || Engine.activeModule == Fabricator) && Ship.tab){
                Engine.travelTo(Ship);
              }
            }
            Engine.log('right');
            break;
        }
      }
      if(Engine.restoreNavigation){
        Engine.tabNavigation = true;
        Engine.restoreNavigation = false;
      }
      return false;
    },

    swipeLeft: function(e) {
      if(Engine.activeModule.swipeLeft) {
        Engine.activeModule.swipeLeft(e);
      }
    },

    swipeRight: function(e) {
      if(Engine.activeModule.swipeRight) {
        Engine.activeModule.swipeRight(e);
      }
    },

    swipeUp: function(e) {
      if(Engine.activeModule.swipeUp) {
        Engine.activeModule.swipeUp(e);
      }
    },

    swipeDown: function(e) {
      if(Engine.activeModule.swipeDown) {
        Engine.activeModule.swipeDown(e);
      }
    },

    disableSelection: function() {
      document.onselectstart = eventNullifier; // this is for IE
      document.onmousedown = eventNullifier; // this is for the rest
    },

    enableSelection: function() {
      document.onselectstart = eventPassthrough;
      document.onmousedown = eventPassthrough;
    },

    autoSelect: function(selector) {
      $(selector).focus().select();
    },

    handleStateUpdates: function(e){

    },

    switchLanguage: function(dom){
      var lang = $(dom).data("language");
      if(document.location.href.search(/[\?\&]lang=[a-z_]+/) != -1){
        document.location.href = document.location.href.replace( /([\?\&]lang=)([a-z_]+)/gi , "$1"+lang );
      }else{
        document.location.href = document.location.href + ( (document.location.href.search(/\?/) != -1 )?"&":"?") + "lang="+lang;
      }
    },

    saveLanguage: function(){
      var lang = decodeURIComponent((new RegExp('[?|&]lang=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
      if(lang && typeof Storage != 'undefined' && localStorage) {
        localStorage.lang = lang;
      }
    },

    toggleVolume: function(enabled /* optional */) {
      if (enabled == null) {
        enabled = !$SM.get('config.soundOn');
      }
      if (!enabled) {
        $('.volume').text(_('sound on.'));
        $SM.set('config.soundOn', false);
        AudioEngine.setMasterVolume(0.0);
      } else {
        $('.volume').text(_('sound off.'));
        $SM.set('config.soundOn', true);
        AudioEngine.setMasterVolume(1.0);
      }
    },

    setInterval: function(callback, interval, skipDouble){
      if( Engine.options.doubleTime && !skipDouble ){
        Engine.log('Double time, cutting interval in half');
        interval /= 2;
      }

      return setInterval(callback, interval);

    },

    setTimeout: function(callback, timeout, skipDouble){

      if( Engine.options.doubleTime && !skipDouble ){
        Engine.log('Double time, cutting timeout in half');
        timeout /= 2;
      }

      return setTimeout(callback, timeout);

    }
  };

  function eventNullifier(e) {
    return $(e.target).hasClass('menuBtn');
  }

  function eventPassthrough(e) {
    return true;
  }

  function notifyAboutSound() {
    if ($SM.get('playStats.audioAlertShown')) {
      return;
    }

    // Tell new users that there's sound now!
    $SM.set('playStats.audioAlertShown', true);
    Events.startEvent({
      title: _('Sound Available!'),
      scenes: {
        start: {
          text: [
            _('ears flooded with new sensations.'),
            _('perhaps silence is safer?')
          ],
          buttons: {
            'yes': {
              text: _('enable audio'),
              nextScene: 'end',
              onChoose: () => Engine.toggleVolume(true)
            },
            'no': {
              text: _('disable audio'),
              nextScene: 'end',
              onChoose: () => Engine.toggleVolume(false)
            }
          }
        }
      }
    });
  }

})();

function inView(dir, elem){

  var scTop = $('#main').offset().top;
  var scBot = scTop + $('#main').height();

  var elTop = elem.offset().top;
  var elBot = elTop + elem.height();

  if( dir == 'up' ){
    // STOP MOVING IF BOTTOM OF ELEMENT IS VISIBLE IN SCREEN
    return ( elBot < scBot );
  } else if( dir == 'down' ){
    return ( elTop > scTop );
  } else {
    return ( ( elBot <= scBot ) && ( elTop >= scTop ) );
  }

}

function setYPosition(elem, y) {
  var elTop = parseInt( elem.css('top'), 10 );
  elem.css('top', `${y}px`);
}


//create jQuery Callbacks() to handle object events
$.Dispatch = function( id ) {
  var callbacks, topic = id && Engine.topics[ id ];
  if ( !topic ) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if ( id ) {
      Engine.topics[ id ] = topic;
    }
  }
  return topic;
};

$(function() {
  Engine.init();
});
/**
 * Events that can occur when any module is active (Except World. It's special.)
 **/
Events.Global = [
	{ /* The Thief */
		title: _('The Thief'),
		isAvailable: function() {
			return (Engine.activeModule == Room || Engine.activeModule == Outside) && $SM.get('game.thieves') == 1;
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
					$SM.set('game.thieves', 2);
					$SM.remove('income.thieves');
					$SM.addM('stores', $SM.get('game.stolen'));
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
					$SM.set('game.thieves', 2);
					$SM.remove('income.thieves');
					$SM.addPerk('stealthy');
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
/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Nomad  --  Merchant */
		title: _('The Nomad'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.fur', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a nomad shuffles into view, laden with makeshift bags bound with rough twine.'),
					_("won't say from where he came, but it's clear that he's not staying.")
				],
				notification: _('a nomad arrives, looking to trade'),
				blink: true,
				buttons: {
					'buyScales': {
						text: _('buy scales'),
						cost: { 'fur': 100 },
						reward: { 'scales': 1 }
					},
					'buyTeeth': {
						text: _('buy teeth'),
						cost: { 'fur': 200 },
						reward: { 'teeth': 1 }
					},
					'buyBait': {
						text: _('buy bait'),
						cost: { 'fur': 5 },
						reward: { 'bait': 1 },
						notification: _('traps are more effective with bait.')
					},
					'buyCompass': {
						available: function() {
							return $SM.get('stores.compass', true) < 1;
						},
						text: _('buy compass'),
						cost: { fur: 300, scales: 15, teeth: 5 },
						reward: { 'compass': 1 },
						notification: _('the old compass is dented and dusty, but it looks to work.')
					},
					'goodbye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_NOMAD
	},
	{ /* Noises Outside  --  gain wood/fur */
		title: _('Noises'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.wood');
		},
		scenes: {
			'start': {
				text: [
					_('through the walls, shuffling noises can be heard.'),
					_("can't tell what they're up to.")
				],
				notification: _('strange noises can be heard through the walls'),
				blink: true,
				buttons: {
					'investigate': {
						text: _('investigate'),
						nextScene: { 0.3: 'stuff', 1: 'nothing' }
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_('vague shapes move, just out of sight.'),
					_('the sounds stop.')
				],
				buttons: {
					'backinside': {
						text: _('go back inside'),
						nextScene: 'end'
					}
				}
			},
			'stuff': {
				reward: { wood: 100, fur: 10 },
				text: [
					_('a bundle of sticks lies just beyond the threshold, wrapped in coarse furs.'),
					_('the night is silent.')
				],
				buttons: {
					'backinside': {
						text: _('go back inside'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_NOISES_OUTSIDE
	},
	{ /* Noises Inside  --  trade wood for better good */
		title: _('Noises'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.wood');
		},
		scenes: {
			start: {
				text: [
					_('scratching noises can be heard from the store room.'),
					_('something\'s in there.')
				],
				notification: _('something\'s in the store room'),
				blink: true,
				buttons: {
					'investigate': {
						text: _('investigate'),
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			scales: {
				text: [
					_('some wood is missing.'),
					_('the ground is littered with small scales')
				],
				onLoad: function() {
					var numWood = $SM.get('stores.wood', true);
					numWood = Math.floor(numWood * 0.1);
					if(numWood === 0) numWood = 1;
					var numScales = Math.floor(numWood / 5);
					if(numScales === 0) numScales = 1;
					$SM.addM('stores', {'wood': -numWood, 'scales': numScales});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			teeth: {
				text: [
					_('some wood is missing.'),
					_('the ground is littered with small teeth')
				],
				onLoad: function() {
					var numWood = $SM.get('stores.wood', true);
					numWood = Math.floor(numWood * 0.1);
					if(numWood === 0) numWood = 1;
					var numTeeth = Math.floor(numWood / 5);
					if(numTeeth === 0) numTeeth = 1;
					$SM.addM('stores', {'wood': -numWood, 'teeth': numTeeth});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			cloth: {
				text: [
					_('some wood is missing.'),
					_('the ground is littered with scraps of cloth')
				],
				onLoad: function() {
					var numWood = $SM.get('stores.wood', true);
					numWood = Math.floor(numWood * 0.1);
					if(numWood === 0) numWood = 1;
					var numCloth = Math.floor(numWood / 5);
					if(numCloth === 0) numCloth = 1;
					$SM.addM('stores', {'wood': -numWood, 'cloth': numCloth});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_NOISES_INSIDE
	},
	{ /* The Beggar  --  trade fur for better good */
		title: _('The Beggar'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.fur');
		},
		scenes: {
			start: {
				text: [
					_('a beggar arrives.'),
					_('asks for any spare furs to keep him warm at night.')
				],
				notification: _('a beggar arrives'),
				blink: true,
				buttons: {
					'50furs': {
						text: _('give 50'),
						cost: {fur: 50},
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'100furs': {
						text: _('give 100'),
						cost: {fur: 100},
						nextScene: { 0.5: 'teeth', 0.8: 'scales', 1: 'cloth' }
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			scales: {
				reward: { scales: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves a pile of small scales behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			teeth: {
				reward: { teeth: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves a pile of small teeth behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			cloth: {
				reward: { cloth: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves some scraps of cloth behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_BEGGAR
	},
	{/* The Shady Builder */
		title: _('The Shady Builder'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('game.buildings["hut"]', true) >= 5 && $SM.get('game.buildings["hut"]', true) < 20;
		},
		scenes: {
			'start':{
				text: [
					_('a shady builder passes through'),
					_('says he can build you a hut for less wood')
				],
				notification: _('a shady builder passes through'),
				buttons: {
					'build': {
						text: _('300 wood'),
						cost: { 'wood' : 300 },
						nextScene: {0.6: 'steal', 1: 'build'}
					},
					'deny': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'steal': {
				text:[
					_("the shady builder has made off with your wood")
				],
				notification: _('the shady builder has made off with your wood'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'build': {
				text:[
					_("the shady builder builds a hut")
				],
				notification: _('the shady builder builds a hut'),
				onLoad: function() {
					var n = $SM.get('game.buildings["hut"]', true);
					if(n < 20){
						$SM.set('game.buildings["hut"]',n+1);
					}
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_SHADY_BUILDER
	},

	{ /* Mysterious Wanderer  --  wood gambling */
		title: _('The Mysterious Wanderer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.wood');
		},
		scenes: {
			start: {
				text: [
					_('a wanderer arrives with an empty cart. says if he leaves with wood, he\'ll be back with more.'),
					_("builder's not sure he's to be trusted.")
				],
				notification: _('a mysterious wanderer arrives'),
				blink: true,
				buttons: {
					'wood100': {
						text: _('give 100'),
						cost: {wood: 100},
						nextScene: { 1: 'wood100'}
					},
					'wood500': {
						text: _('give 500'),
						cost: {wood: 500},
						nextScene: { 1: 'wood500' }
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			'wood100': {
				text: [
					_('the wanderer leaves, cart loaded with wood')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.wood', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with wood.'));
					}, 'Room[4].scenes.wood100.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.5) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'wood500': {
				text: [
					_('the wanderer leaves, cart loaded with wood')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.wood', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with wood.'));
					}, 'Room[4].scenes.wood500.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.3) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_MYSTERIOUS_WANDERER
	},

	{ /* Mysterious Wanderer  --  fur gambling */
		title: _('The Mysterious Wanderer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.fur');
		},
		scenes: {
			start: {
				text: [
					_('a wanderer arrives with an empty cart. says if she leaves with furs, she\'ll be back with more.'),
					_("builder's not sure she's to be trusted.")
				],
				notification: _('a mysterious wanderer arrives'),
				blink: true,
				buttons: {
					'fur100': {
						text: _('give 100'),
						cost: {fur: 100},
						nextScene: { 1: 'fur100'}
					},
					'fur500': {
						text: _('give 500'),
						cost: {fur: 500},
						nextScene: { 1: 'fur500' }
					},
					'deny': {
						text: _('turn her away'),
						nextScene: 'end'
					}
				}
			},
			'fur100': {
				text: [
					_('the wanderer leaves, cart loaded with furs')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.fur', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with furs.'));
					}, 'Room[5].scenes.fur100.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.5) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'fur500': {
				text: [
					_('the wanderer leaves, cart loaded with furs')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.fur', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with furs.'));
					}, 'Room[5].scenes.fur500.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.3) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_MYSTERIOUS_WANDERER
	},

	{ /* The Scout  --  Map Merchant */
		title: _('The Scout'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					_("the scout says she's been all over."),
					_("willing to talk about it, for a price.")
				],
				notification: _('a scout stops for the night'),
				blink: true,
				buttons: {
					'buyMap': {
						text: _('buy map'),
						cost: { 'fur': 200, 'scales': 10 },
						available: function() {
							return !World.seenAll;
						},
						notification: _('the map uncovers a bit of the world'),
						onChoose: World.applyMap
					},
					'learn': {
						text: _('learn scouting'),
						cost: { 'fur': 1000, 'scales': 50, 'teeth': 20 },
						available: function() {
							return !$SM.hasPerk('scout');
						},
						onChoose: function() {
							$SM.addPerk('scout');
						}
					},
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_SCOUT
	},

	{ /* The Wandering Master */
		title: _('The Master'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					_('an old wanderer arrives.'),
					_('he smiles warmly and asks for lodgings for the night.')
				],
				notification: _('an old wanderer arrives'),
				blink: true,
				buttons: {
					'agree': {
						text: _('agree'),
						cost: {
							'cured meat': 100,
							'fur': 100,
							'torch': 1
						},
						nextScene: {1: 'agree'}
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			'agree': {
				text: [
					_('in exchange, the wanderer offers his wisdom.')
				],
				buttons: {
					'evasion': {
						text: _('evasion'),
						available: function() {
							return !$SM.hasPerk('evasive');
						},
						onChoose: function() {
							$SM.addPerk('evasive');
						},
						nextScene: 'end'
					},
					'precision': {
						text: _('precision'),
						available: function() {
							return !$SM.hasPerk('precise');
						},
						onChoose: function() {
							$SM.addPerk('precise');
						},
						nextScene: 'end'
					},
					'force': {
						text: _('force'),
						available: function() {
							return !$SM.hasPerk('barbarian');
						},
						onChoose: function() {
							$SM.addPerk('barbarian');
						},
						nextScene: 'end'
					},
					'nothing': {
						text: _('nothing'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_WANDERING_MASTER
	},

	{ /* The Sick Man */
		title: _('The Sick Man'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_("a man hobbles up, coughing."),
					_("he begs for medicine.")
				],
				notification: _('a sick man hobbles up'),
				blink: true,
				buttons: {
					'help': {
						text: _('give 1 medicine'),
						cost: { 'medicine': 1 },
						notification: _('the man swallows the medicine eagerly'),
						nextScene: { 0.1: 'alloy', 0.3: 'cells', 0.5: 'scales', 1.0: 'nothing' }
					},
					'ignore': {
						text: _('tell him to leave'),
						nextScene: 'end'
					}
				}
			},
			'alloy': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('some weird metal he picked up on his travels.')
				],
				onLoad: function() {
					$SM.add('stores["alien alloy"]', 1);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'cells': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('some weird glowing boxes he picked up on his travels.')
				],
				onLoad: function() {
					$SM.add('stores["energy cell"]', 3);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'scales': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('all he has are some scales.')
				],
				onLoad: function() {
					$SM.add('stores.scales', 5);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_("the man expresses his thanks and hobbles off.")
				],
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_SICK_MAN
	}
];
/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
	{ /* Ruined traps */
	title: _('A Ruined Trap'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["trap"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('some of the traps have been torn apart.'),
					_('large prints lead away, into the forest.')
				],
				onLoad: function() {
					var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["trap"]', true)) + 1;
					$SM.add('game.buildings["trap"]', -numWrecked);
					Outside.updateVillage();
					Outside.updateTrapButton();
				},
				notification: _('some traps have been destroyed'),
				blink: true,
				buttons: {
					'track': {
						text: _('track them'),
						nextScene: {0.5: 'nothing', 1: 'catch'}
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_('the tracks disappear after just a few minutes.'),
					_('the forest is silent.')
				],
				notification: _('nothing was found'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'catch': {
				text: [
					_('not far from the village lies a large beast, its fur matted with blood.'),
					_('it puts up little resistance before the knife.')
				],
				notification: _('there was a beast. it\'s dead now'),
				reward: {
					fur: 100,
					meat: 100,
					teeth: 10
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_RUINED_TRAP
	},
	{ /* Hut fire */
		title: _('Fire'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["hut"]', true) > 0 && $SM.get('game.population', true) > 50;
		},
		scenes: {
			'start': {
				text: [
					_('a fire rampages through one of the huts, destroying it.'),
					_('all residents in the hut perished in the fire.')
				],
				notification: _('a fire has started'),
				blink: true,
				onLoad: function() {
					Outside.destroyHuts(1);
				},
				buttons: {
					'mourn': {
						text: _('mourn'),
						notification: _('some villagers have died'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_HUT_FIRE
	},
	{ /* Sickness */
		title: _('Sickness'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 10 && $SM.get('game.population', true) < 50 && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a sickness is spreading through the village.'),
					_('medicine is needed immediately.')
				],
				notification: _('some villagers are ill'),
				blink: true,
				buttons: {
					'heal': {
						text: _('1 medicine'),
						cost: { 'medicine' : 1 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('ignore it'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the sickness is cured in time.')
				],
				notification: _('sufferers are healed'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the sickness spreads through the village.'),
					_('the days are spent with burials.'),
					_('the nights are rent with screams.')
				],
				notification: _('sufferers are left to die'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * Math.floor($SM.get('game.population', true)/2)) + 1;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_SICKNESS
	},

	{ /* Plague */
		title: _('Plague'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a terrible plague is fast spreading through the village.'),
					_('medicine is needed immediately.')
				],
				notification: _('a plague afflicts the village'),
				blink: true,
				buttons: {
					/* Because there is a serious need for medicine, the price is raised. */
					'buyMedicine': {
						text: _('buy medicine'),
						cost: { 'scales': 70,
								'teeth': 50 },
						reward: { 'medicine': 1 }
					},
					'heal': {
						text: _('5 medicine'),
						cost: { 'medicine' : 5 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('do nothing'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the plague is kept from spreading.'),
					_('only a few die.'),
					_('the rest bury them.')
				],
				notification: _('epidemic is eradicated eventually'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 5) + 2;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the plague rips through the village.'),
					_('the nights are rent with screams.'),
					_('the only hope is a quick death.')
				],
				notification: _('population is almost exterminated'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 80) + 10;
					Outside.killVillagers(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_PLAGUE
	},

	{ /* Beast attack */
		title: _('A Beast Attack'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					 _('a pack of snarling beasts pours out of the trees.'),
					 _('the fight is short and bloody, but the beasts are repelled.'),
					 _('the villagers retreat to mourn the dead.')
				],
				notification: _('wild beasts attack the villagers'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 10) + 1;
					Outside.killVillagers(numKilled);
				},
				reward: {
					fur: 100,
					meat: 100,
					teeth: 10
				},
				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						notification: _('predators become prey. price is unfair'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_BEAST_ATTACK
	},

	{ /* Soldier attack */
		title: _('A Military Raid'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');
		},
		scenes: {
			'start': {
				text: [
					_('a gunshot rings through the trees.'),
					_('well armed men charge out of the forest, firing into the crowd.'),
					_('after a skirmish they are driven away, but not without losses.')
				],
				notification: _('troops storm the village'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 40) + 1;
					Outside.killVillagers(numKilled);
				},
				reward: {
					bullets: 10,
					'cured meat': 50
				},

				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						notification: _('warfare is bloodthirsty'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.EVENT_SOLDIER_ATTACK
	}

];
/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
	/* Tier 1 */
	{ /* Snarling Beast */
		title: _('A Snarling Beast'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'snarling beast',
				enemyName: _('snarling beast'),
				deathMessage: _('the snarling beast is dead'),
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				loot: {
					'fur': {
						min: 1,
						max: 3,
						chance: 1
					},
					'meat': {
						min: 1,
						max: 3,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 3,
						chance: 0.8
					}
				},
				notification: _('a snarling beast leaps out of the underbrush')
			}
		}
	},
	{ /* Gaunt Man */
	title: _('A Gaunt Man'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'gaunt man',
				enemyName: _('gaunt man'),
				deathMessage: _('the gaunt man is dead'),
				chara: 'E',
				damage: 2,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				loot: {
					'cloth': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.8
					},
					'leather': {
						min: 1,
						max: 2,
						chance: 0.5
					}
				},
				notification: _('a gaunt man approaches, a crazed look in his eye')
			}
		}
	},
	{ /* Strange Bird */
	title: _('A Strange Bird'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'strange bird',
				enemyName: _('strange bird'),
				deathMessage: _('the strange bird is dead'),
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 4,
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.5
					},
					'meat': {
						min: 1,
						max: 3,
						chance: 0.8
					}
				},
				notification: _('a strange looking bird speeds across the plains')
			}
		}
	},
	/* Tier 2*/
	{ /* Shivering Man */
	title: _('A Shivering Man'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'shivering man',
				enemyName: _('shivering man'),
				deathMessage: _('the shivering man is dead'),
				chara: 'E',
				damage: 5,
				hit: 0.5,
				attackDelay: 1,
				health: 20,
				loot: {
					'cloth': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.8
					},
					'leather': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.7
					}
				},
				notification: _('a shivering man approaches and attacks with surprising strength')
			}
		}
	},
	{ /* Man-eater */
		title: _('A Man-Eater'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'man-eater',
				enemyName: _('man-eater'),
				deathMessage: _('the man-eater is dead'),
				chara: 'T',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('a large creature attacks, claws freshly bloodied')
			}
		}
	},
	{ /* Scavenger */
	title: _('A Scavenger'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'scavenger',
				enemyName: _('scavenger'),
				deathMessage: _('the scavenger is dead'),
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'iron': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a scavenger draws close, hoping for an easy score')
			}
		}
	},
	{ /* Huge Lizard */
	title: _('A Huge Lizard'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'lizard',
				enemyName: _('lizard'),
				deathMessage: _('the lizard is dead'),
				chara: 'T',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'scales': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('the grass thrashes wildly as a huge lizard pushes through')
			}
		}
	},
	/* Tier 3*/
	{ /* Feral Terror */
		title: _('A Feral Terror'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'feral terror',
				enemyName: _('feral terror'),
				deathMessage: _('the feral terror is dead'),
				chara: 'T',
				damage: 6,
				hit: 0.8,
				attackDelay: 1,
				health: 45,
				loot: {
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('a beast, wilder than imagining, erupts out of the foliage')
			}
		}
	},
	{ /* Soldier */
	title: _('A Soldier'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'soldier',
				enemyName: _('soldier'),
				deathMessage: _('the soldier is dead'),
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a soldier opens fire from across the desert')
			}
		}
	},
	{ /* Sniper */
	title: _('A Sniper'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'sniper',
				enemyName: _('sniper'),
				deathMessage: _('the sniper is dead'),
				chara: 'D',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a shot rings out, from somewhere in the long grass')
			}
		}
	}
];
/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
	"outpost": { /* Friendly Outpost */
		title: _('An Outpost'),
		scenes: {
			'start': {
				text: [
					_('a safe place in the wilds.')
				],
				notification: _('a safe place in the wilds.'),
				loot: {
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				onLoad: function() {
					World.useOutpost();
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_FRIENDLY_OUTPOST
	},
	"swamp": { /* Swamp */
		title: _('A Murky Swamp'),
		scenes: {
			'start': {
				text: [
					_('rotting reeds rise out of the swampy earth.'),
					_('a lone frog sits in the muck, silently.')
				],
				notification: _('a swamp festers in the stagnant air.'),
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {1: 'cabin'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'cabin': {
				text: [
					_('deep in the swamp is a moss-covered cabin.'),
					_('an old wanderer sits inside, in a seeming trance.')
				],
				buttons: {
					'talk': {
						cost: {'charm': 1},
						text: _('talk'),
						nextScene: {1: 'talk'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'talk': {
				text: [
					_('the wanderer takes the charm and nods slowly.'),
					_('he speaks of once leading the great fleets to fresh worlds.'),
					_('unfathomable destruction to fuel wanderer hungers.'),
					_('his time here, now, is his penance.')
				],
				onLoad: function() {
					$SM.addPerk('gastronome');
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_SWAMP
	},
	"cave": { /* Cave */
		title: _('A Damp Cave'),
		scenes: {
			'start': {
				text: [
					_('the mouth of the cave is wide and dark.'),
					_("can't see what's inside.")
				],
				notification: _('the earth here is split, as if bearing an ancient wound'),
				buttons: {
					'enter': {
						text: _('go inside'),
						cost: { torch: 1 },
						nextScene: {0.3: 'a1', 0.6: 'a2', 1: 'a3'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: _('a startled beast defends its home'),
				loot: {
					'fur': {
						min: 1,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text: [
					_('the cave narrows a few feet in.'),
					_("the walls are moist and moss-covered")
				],
				buttons: {
					'continue': {
						text: _('squeeze'),
						nextScene: {0.5: 'b2', 1: 'b3'}
					},
					'leave': {
						text: _('leave cave'),
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_('the remains of an old camp sits just inside the cave.'),
					_('bedrolls, torn and blackened, lay beneath a thin layer of dust.')
				],
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'leather': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('the body of a wanderer lies in a small cavern.'),
					_("rot's been to work on it, and some of the pieces are missing."),
                    /// TRANSLATORS : 'it' is a rotting wanderer's body
					_("can't tell what left it here.")
				],
				loot: {
					'iron sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'medicine': {
					min: 1,
					max: 2,
					chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b2': {
				text: [
					_('the torch sputters and dies in the damp air'),
					_('the darkness is absolute')
				],
				notification: _('the torch goes out'),
				buttons: {
					'continue': {
						text: _('continue'),
						cost: {'torch': 1},
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: _('leave cave'),
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: _('a startled beast defends its home'),
				loot: {
					'fur': {
						min: 1,
						max: 3,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				combat: true,
				enemy: 'cave lizard',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				notification: _('a cave lizard attacks'),
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a large beast charges out of the dark'),
				loot: {
					'fur': {
						min: 1,
						max: 3,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'lizard',
				chara: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a giant lizard shambles forward'),
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.7: 'end2', 1: 'end3'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
					_('the nest of a large animal lies at the back of the cave.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scales': {
						min: 5,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 1
					},
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
					_('a small supply cache is hidden at the back of the cave.')
				],
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 1
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 1
					},
					'iron': {
						min: 5,
						max: 10,
						chance: 1
					},
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'steel': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'bolas': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 4,
						chance: 0.15
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
					_('an old case is wedged behind a rock, covered in a thick layer of dust.')
				],
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.3
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_CAVE
	},
	"town": { /* Town */
		title: _('A Deserted Town'),
		scenes: {
			'start': {
				text: [
					_('a small suburb lays ahead, empty houses scorched and peeling.'),
					_("broken streetlights stand, rusting. light hasn't graced this place in a long time.")
				],
				notification: _("the town lies abandoned, its citizens long dead"),
				buttons: {
					'enter': {
						text: _('explore'),
						nextScene: {0.3: 'a1', 0.7: 'a3', 1: 'a2'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				text: [
					_("where the windows of the schoolhouse aren't shattered, they're blackened with soot."),
					_('the double doors creak endlessly in the wind.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'b1', 1: 'b2'},
						cost: {torch: 1}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			
			'a2': {
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('ambushed on the street.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_("a squat building up ahead."),
					_('a green cross barely visible behind grimy windows.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'b5', 1: 'end5'},
						cost: {torch: 1}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('a small cache of supplies is tucked inside a rusting locker.')
				],
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.05
					}
			},
			buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				enemy: 'scavenger',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('a scavenger waits just inside the door.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'teeth': {
						min: 1,
						max: 5,
						chance: 1
					},
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('a beast stands alone in an overgrown park.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				text: [
					_('an overturned caravan is spread across the pockmarked street.'),
					_("it's been picked over by scavengers, but there's still some things worth taking.")
				],
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c5', 1: 'c6' }
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b5': {
				combat: true,
				enemy: 'madman',
				chara: 'E',
				damage: 6,
				hit: 0.3,
				attackDelay: 1,
				health: 10,
				loot: {
					'cloth': {
						min: 2,
						max: 4,
						chance: 0.3
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.9
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.4
					}
				},
				notification: _('a madman attacks, screeching.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.3: 'end5', 1: 'end6'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('a thug moves out of the shadows.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'teeth': {
						min: 1,
						max: 5,
						chance: 1
					},
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('a beast charges out of a ransacked classroom.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c3': {
				text: [
					_('through the large gymnasium doors, footsteps can be heard.'),
					_('the torchlight casts a flickering glow down the hallway.'),
					_('the footsteps stop.')
				],
				buttons: {
					'continue': {
						text: _('enter'),
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'c4': {
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 4,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'teeth': {
						min: 1,
						max: 5,
						chance: 1
					},
					'fur': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('another beast, draw by the noise, leaps out of a copse of trees.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c5': {
				text: [
					_("something's causing a commotion a ways down the road."),
					_("a fight, maybe.")
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'c6': {
				text: [
					_('a small basket of food is hidden under a park bench, with a note attached.'),
					_("can't read the words.")
				],
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'd1': {
				combat: true,
				enemy: 'scavenger',
				chara: 'E',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 1
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: _('a panicked scavenger bursts through the door, screaming.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'd2': {
				combat: true,
				enemy: 'vigilante',
				chara: 'D',
				damage: 6,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 1
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: _("a man stands over a dead wanderer. notices he's not alone."),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end3', 1: 'end4'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
					_('scavenger had a small camp in the school.'),
					_('collected scraps spread across the floor like they fell from heaven.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'steel': {
						min: 5,
						max: 10,
						chance: 1
					},
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
					_("scavenger'd been looking for supplies in here, it seems."),
					_("a shame to let what he'd found go to waste.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'coal': {
						min: 5,
						max: 10,
						chance: 1
					},
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'leather': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
					_("beneath the wanderer's rags, clutched in one of its many hands, a glint of steel."),
					_("worth killing for, it seems.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 1
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end4': {
				text: [
					_("eye for an eye seems fair."),
					_("always worked before, at least."),
					_("picking the bones finds some useful trinkets.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'iron': {
						min: 5,
						max: 10,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 5,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'medicine': {
					min: 1,
					max: 2,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end5': {
				text: [
					_('some medicine abandoned in the drawers.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'medicine': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end6': {
				text: [
					_('the clinic has been ransacked.'),
					_('only dust and stains remain.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave town'),

						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_TOWN
	},
	"city": { /* City */
		title: _('A Ruined City'),
		scenes: {
			'start': {
				text: [
					_('a battered highway sign stands guard at the entrance to this once-great city.'),
					_("the towers that haven't crumbled jut from the landscape like the ribcage of some ancient beast."),
					_('might be things worth having still inside.')
				],
				notification: _("the towers of a decaying city dominate the skyline"),
				buttons: {
					'enter': {
						text: _('explore'),
						nextScene: {0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				text:[
					_('the streets are empty.'),
					_('the air is filled with dust, driven relentlessly by the hard winds.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text:[
					_('orange traffic cones are set across the street, faded and cracked.'),
					_('lights flash through the alleys between buildings.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_('a large shanty town sprawls across the streets.'),
					_('faces, darkened by soot and blood, stare out from crooked huts.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b5', 1: 'b6'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a4': {
				text: [
					_('the shell of an abandoned hospital looms ahead.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						cost: { 'torch': 1 },
						nextScene: {0.5: 'b7', 1: 'b8'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('the old tower seems mostly intact.'),
					_('the shell of a burned out car blocks the entrance.'),
					_('most of the windows at ground level are busted anyway.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				notification: _('a huge lizard scrambles up out of the darkness of an old metro station.'),
				enemy: 'lizard',
				chara: 'R',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'scales': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'descend': {
						text: _('descend'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b3': {
				notification: _('the shot echoes in the empty street.'),
				combat: true,
				enemy: 'sniper',
				chara: 'D',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				notification: _('the soldier steps out from between the buildings, rifle raised.'),
				combat: true,
				enemy: 'soldier',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c5', 1: 'c6'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b5': {
				notification: _('a frail man stands defiantly, blocking the path.'),
				combat: true,
				enemy: 'frail man',
				chara: 'E',
				damage: 1,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'leather': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.05
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c7', 1: 'c8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b6': {
				text: [
					_('nothing but downcast eyes.'),
					_('the people here were broken a long time ago.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'c8', 1: 'c9'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b7': {
				text: [
					_('empty corridors.'),
					_('the place has been swept clean by scavengers.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.3: 'c12', 0.7: 'c10', 1: 'c11'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b8': {
				notification: _('an old man bursts through a door, wielding a scalpel.'),
				combat: true,
				enemy: 'old man',
				chara: 'E',
				damage: 3,
				hit: 0.5,
				attackDelay: 2,
				health: 10,
				loot: {
					'cured meat': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.3: 'c13', 0.7: 'c11', 1: 'end15'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				notification: _('a thug is waiting on the other side of the wall.'),
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'd1', 1: 'd2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c2': {
				notification: _('a snarling beast jumps out from behind a car.'),
				combat: true,
				enemy: 'beast',
				chara: 'R',
				damage: 2,
				hit: 0.8,
				attackDelay: 1,
				health: 30,
				loot: {
					'meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'fur': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c3': {
				text: [
					_('street above the subway platform is blown away.'),
					_('lets some light down into the dusty haze.'),
					_('a sound comes from the tunnel, just ahead.')
				],
				buttons: {
					'enter': {
						text: _('investigate'),
						cost: { 'torch': 1 },
						nextScene: {0.5: 'd2', 1: 'd3'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c4': {
				text: [
					_('looks like a camp of sorts up ahead.'),
                    /// TRANSLATORS : chainlink is a type of metal fence.
					_('rusted chainlink is pulled across an alleyway.'),
					_('fires burn in the courtyard beyond.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd4', 1: 'd5'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c5': {
				text: [
					_('more voices can be heard ahead.'),
					_('they must be here for a reason.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {1: 'd5'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c6': {
				text: [
					_('the sound of gunfire carries on the wind.'),
					_('the street ahead glows with firelight.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd5', 1: 'd6'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c7': {
				text: [
                    /// TRANSLATORS : squatters occupy abandoned dwellings they don't own.
					_('more squatters are crowding around now.'),
					_('someone throws a stone.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd7', 1: 'd8'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c8': {
				text: [
					_('an improvised shop is set up on the sidewalk.'),
					_('the owner stands by, stoic.')
				],
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 8,
						chance: 0.25
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'medicine': {
						min: 1,
						max: 4,
						chance: 0.5
					}
				},
				buttons: {
					'enter': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c9': {
				text: [
					_('strips of meat hang drying by the side of the street.'),
					_('the people back away, avoiding eye contact.')
				],
				loot: {
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'enter': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'd8', 1: 'd9'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c10': {
				text: [
					_('someone has locked and barricaded the door to this operating theatre.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.2: 'end12', 0.6: 'd10', 1: 'd11'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c11': {
				notification: _('a tribe of elderly squatters is camped out in this ward.'),
				combat: true,
				enemy: 'squatters',
				plural: true,
				chara: 'EEE',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'cured meat': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'cloth': {
						min: 3,
						max: 8,
						chance: 0.8
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'end10' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c12': {
				notification: _('a pack of lizards rounds the corner.'),
				combat: true,
				enemy: 'lizards',
				plural: true,
				chara: 'RRR',
				damage: 4,
				hit: 0.7,
				attackDelay: 0.7,
				health: 30,
				loot: {
					'meat': {
						min: 3,
						max: 8,
						chance: 1
					},
					'teeth': {
						min: 2,
						max: 4,
						chance: 1
					},
					'scales': {
						min: 3,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'end10' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c13': {
				text: [
					_('strips of meat are hung up to dry in this ward.')
				],
				loot: {
					'cured meat': {
						min: 3,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 0.5: 'end10', 1: 'end11' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
						
			'd1': {
				notification: _('a large bird nests at the top of the stairs.'),
				combat: true,
				enemy: 'bird',
				chara: 'R',
				damage: 5,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'meat': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd2': {
				text: [
					_("the debris is denser here."),
					_("maybe some useful stuff in the rubble.")
				],
				loot: {
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'steel': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'cloth': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd3': {
				notification: _('a swarm of rats rushes up the tunnel.'),
				combat: true,
				enemy: 'rats',
				plural: true,
				chara: 'RRR',
				damage: 1,
				hit: 0.8,
				attackDelay: 0.25,
				health: 60,
				loot: {
					'fur': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'teeth': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end2', 1: 'end3'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd4': {
				notification: _('a large man attacks, waving a bayonet.'),
				combat: true,
				enemy: 'veteran',
				chara: 'D',
				damage: 6,
				hit: 0.8,
				attackDelay: 2,
				health: 45,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end4', 1: 'end5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd5': {
				notification: _('a second soldier opens fire.'),
				combat: true,
				enemy: 'soldier',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd6': {
				notification: _('a masked soldier rounds the corner, gun drawn'),
				combat: true,
				enemy: 'commando',
				chara: 'D',
				ranged: true,
				damage: 3,
				hit: 0.9,
				attackDelay: 2,
				health: 55,
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end5', 1: 'end6'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd7': {
				notification: _('the crowd surges forward.'),
				combat: true,
				enemy: 'squatters',
				plural: true,
				chara: 'EEE',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end7', 1: 'end8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd8': {
				notification: _('a youth lashes out with a tree branch.'),
				combat: true,
				enemy: 'youth',
				chara: 'E',
				damage: 2,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd9': {
				notification: _('a squatter stands firmly in the doorway of a small hut.'),
				combat: true,
				enemy: 'squatter',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'teeth': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end8', 1: 'end9'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd10': {
				notification: _('behind the door, a deformed figure awakes and attacks.'),
				combat: true,
				enemy: 'deformed',
				chara: 'T',
				damage: 8,
				hit: 0.6,
				attackDelay: 2,
				health: 40,
				loot: {
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'teeth': {
						min: 2,
						max: 2,
						chance: 1
					},
					'steel': {
						min: 1,
						max: 3,
						chance: 0.6
					},
					'scales': {
						min: 2,
						max: 3,
						chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end14'}
					}
				}
			},
			
			'd11': {
				notification: _('as soon as the door is open a little bit, hundreds of tentacles erupt.'),
				combat: true,
				enemy: 'tentacles',
				plural: true,
				chara: 'TTT',
				damage: 2,
				hit: 0.6,
				attackDelay: 0.5,
				health: 60,
				loot: {
					'meat': {
						min: 10,
						max: 20,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end13'}
					}
				}
			},
		
			'end1': {
				text: [
					_('bird must have liked shiney things.'),
					_('some good stuff woven into its nest.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					bullets: {
						min: 5,
						max: 10,
						chance: 0.8
					},
					bolas: {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end2': {
				text: [
					_('not much here.'),
					_('scavengers must have gotten to this place already.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					torch: {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end3': {
				text: [
                    /// TRANSLATORS : a platform in the subway
					_('the tunnel opens up at another platform.'),
					_('the walls are scorched from an old battle.'),
					_('bodies and supplies from both sides litter the ground.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 0.8
					},
					bullets: {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'laser rifle': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'energy cell': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end4': {
				text: [
					_('the small military outpost is well supplied.'),
					_('arms and munitions, relics from the war, are neatly arranged on the store-room floor.'),
					_('just as deadly now as they were then.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 1
					},
					bullets: {
						min: 1,
						max: 10,
						chance: 1
					},
					grenade: {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end5': {
				text: [
					_('searching the bodies yields a few supplies.'),
					_('more soldiers will be on their way.'),
					_('time to move on.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 1
					},
					bullets: {
						min: 1,
						max: 10,
						chance: 1
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'medicine': {
					min: 1,
					max: 4,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end6': {
				text: [
					_('the small settlement has clearly been burning a while.'),
					_('the bodies of the wanderers that lived here are still visible in the flames.'),
					_("still time to rescue a few supplies.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'laser rifle': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'energy cell': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end7': {
				text: [
					_('the remaining settlers flee from the violence, their belongings forgotten.'),
					_("there's not much, but some useful things can still be found.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'energy cell': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end8': {
				text: [
					_('the young settler was carrying a canvas sack.'),
					_("it contains travelling gear, and a few trinkets."),
					_("there's nothing else here.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'steel sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end9': {
				text: [
					_('inside the hut, a child cries.'),
					_("a few belongings rest against the walls."),
					_("there's nothing else here.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end10': {
				text: [
					_('the stench of rot and death fills the operating theatres.'),
					_("a few items are scattered on the ground."),
					_('there is nothing else here.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'energy cell': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'teeth': {
						min: 3,
						max: 8,
						chance: 1
					},
					'scales': {
						min: 4,
						max: 7,
						chance: 0.9
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end11': {
				text: [
					_('a pristine medicine cabinet at the end of a hallway.'),
					_("the rest of the hospital is empty.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'energy cell': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 3,
						max: 10,
						chance: 1
					},
					'teeth': {
						min: 1,
						max: 2,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end12': {
				text: [
					_('someone had been stockpiling loot here.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'energy cell': {
						min: 1,
						max: 3,
						chance: 0.2
					},
					'medicine': {
						min: 3,
						max: 10,
						chance: 0.5
					},
					'bullets': {
						min: 2,
						max: 8,
						chance: 1
					},
					'torch': {
					min: 1,
					max: 3,
					chance: 0.5
					},
					'grenade': {
					min: 1,
					max: 1,
					chance: 0.5
					},
					'alien alloy': {
					min: 1,
					max: 2,
					chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end13': {
				text: [
					_('the tentacular horror is defeated.'),
					_('inside, the remains of its victims are everywhere.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'steel sword': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 2,
						chance: 0.3
					},
					'teeth': {
						min: 2,
						max: 8,
						chance: 1
					},
					'cloth': {
					min: 3,
					max: 6,
					chance: 0.5
					},
					'alien alloy': {
					min: 1,
					max: 1,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end14': {
				text: [
                    /// TRANSLATORS : warped means extremely disfigured.
					_('the warped man lies dead.'),
					_('the operating theatre has a lot of curious equipment.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'energy cell': {
						min: 2,
						max: 5,
						chance: 0.8
					},
					'medicine': {
						min: 3,
						max: 12,
						chance: 1
					},
					'cloth': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'steel': {
						min: 2,
						max: 3,
						chance: 0.3
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end15': {
				text: [
					_('the old man had a small cache of interesting items.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'medicine': {
					min: 1,
					max: 4,
					chance: 1
					},
					'cured meat': {
					min: 3,
					max: 7,
					chance: 1
					},
					'bolas': {
					min: 1,
					max: 3,
					chance: 0.5
					},
					'fur': {
					min: 1,
					max: 5,
					chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_CITY
	},
	"house": { /* Abandoned House */
		title: _('An Old House'),
		scenes: {
			'start': {
				text: [
					_('an old house remains here, once white siding yellowed and peeling.'),
					_('the door hangs open.')
				],
				notification: _('the remains of an old house stand as a monument to simpler times'),
				buttons: {
					'enter': {
						text: _('go inside'),
						nextScene: { 0.25: 'medicine', 0.5: 'supplies', 1: 'occupied' }
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'supplies': {
				text: [
					_('the house is abandoned, but not yet picked over.'),
					_('still a few drops of water in the old well.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.setWater(World.getMaxWater());
					Notifications.notify(null, _('water replenished'));
				},
				loot: {
					'cured meat': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'cloth': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'medicine': {
				text: [
					_('the house has been ransacked.'),
					_('but there is a cache of medicine under the floorboards.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'medicine': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'occupied': {
				combat: true,
				enemy: 'squatter',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a man charges down the hall, a rusty blade in his hand'),
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'cured meat': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'leather': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'cloth': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_HOUSE
	},
	"battlefield": { /* Discovering an old battlefield */
		title: _('A Forgotten Battlefield'),
		scenes: {
			'start': {
				text: [
					_('a battle was fought here, long ago.'),
					_('battered technology from both sides lays dormant on the blasted landscape.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'rifle': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'bullets': {
						min: 5,
						max: 20,
						chance: 0.8
					},
					'laser rifle': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'energy cell': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'grenade': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'alien alloy': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),

						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_BATTLEFIELD
	},
	"borehole": { /* Admiring a huge borehole */
		title: _('A Huge Borehole'),
		scenes: {
			'start': {
				text: [
					_('a huge hole is cut deep into the earth, evidence of the past harvest.'),
					_('they took what they came for, and left.'),
					_('castoff from the mammoth drills can still be found by the edges of the precipice.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'alien alloy': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_BOREHOLE
	},
	"ship": { /* Finding a way off this rock */
		title: _('A Crashed Ship'),
		scenes: {
			'start': {
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.drawRoad();
					World.state.ship = true;
				},
				text: [
					_('the familiar curves of a wanderer vessel rise up out of the dust and ash. '),
					_("lucky that the natives can't work the mechanisms."),
					_('with a little effort, it might fly again.')
				],
				buttons: {
					'leavel': {
						text: _('salvage'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_CRASHED_SHIP
	},
	"sulphurmine": { /* Clearing the Sulphur Mine */
		title: _('The Sulphur Mine'),
		scenes: {
			'start': {
				text: [
					_("the military is already set up at the mine's entrance."),
					_('soldiers patrol the perimeter, rifles slung over their shoulders.')
				],
				notification: _('a military perimeter is set up around the mine.'),
				buttons: {
					'attack': {
						text: _('attack'),
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'soldier',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: _('a soldier, alerted, opens fire.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'soldier',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: _('a second soldier joins the fight.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'veteran',
				chara: 'D',
				damage: 10,
				hit: 0.8,
				attackDelay: 2,
				health: 65,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('a grizzled soldier attacks, waving a bayonet.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the military presence has been cleared.'),
					_('the mine is now safe for workers.')
				],
				notification: _('the sulphur mine is clear of dangers'),
				onLoad: function() {
					World.drawRoad();
					World.state.sulphurmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_SULPHUR_MINE
	},
	"coalmine": { /* Clearing the Coal Mine */
		title: _('The Coal Mine'),
		scenes: {
			'start': {
				text: [
					_('camp fires burn by the entrance to the mine.'),
					_('men mill about, weapons at the ready.')
				],
				notification: _('this old mine is not abandoned'),
				buttons: {
					'attack': {
						text: _('attack'),
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'man',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('a man joins the fight'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'man',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'cured meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'cloth': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('a man joins the fight'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'chief',
				chara: 'D',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'cured meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'iron': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('only the chief remains.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the camp is still, save for the crackling of the fires.'),
					_('the mine is now safe for workers.')
				],
				notification: _('the coal mine is clear of dangers'),
				onLoad: function() {
					World.drawRoad();
					World.state.coalmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_COAL_MINE
	},
	"ironmine": { /* Clearing the Iron Mine */
		title: _('The Iron Mine'),
		scenes: {
			'start': {
				text: [
					_('an old iron mine sits here, tools abandoned and left to rust.'),
					_('bleached bones are strewn about the entrance. many, deeply scored with jagged grooves.'),
					_('feral howls echo out of the darkness.')
				],
				notification: _('the path leads to an abandoned mine'),
				buttons: {
					'enter': {
						text: _('go inside'),
						nextScene: { 1: 'enter' },
						cost: { 'torch': 1 }
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'enter': {
				combat: true,
				enemy: 'beastly matriarch',
				chara: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'teeth': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scales': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'cloth': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				notification: _('a large creature lunges, muscles rippling in the torchlight'),
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the beast is dead.'),
					_('the mine is now safe for workers.')
				],
				notification: _('the iron mine is clear of dangers'),
				onLoad: function() {
					World.drawRoad();
					World.state.ironmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_IRON_MINE
	},
	
	"cache": { /* Cache - contains some of supplies from previous game */
		title: _('A Destroyed Village'),
		scenes: {
			'start': {
				text: [
					_('a destroyed village lies in the dust.'),
					_('charred bodies litter the ground.')
				],
                /// TRANSLATORS : tang = strong metallic smell, wanderer afterburner = ship's engines
				notification: _('the metallic tang of wanderer afterburner hangs in the air.'),
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {1: 'underground'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'underground': {
				text: [
					_('a shack stands at the center of the village.'),
					_('there are still supplies inside.')
				],
				buttons: {
					'take': {
						text: _('take'),
						nextScene: {1: 'exit'}
					}
				}
			},
			'exit': {
				text: [
					_('all the work of a previous generation is here.'),
				_('ripe for the picking.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					Prestige.collectStores();
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		},
		audio: AudioLibrary.LANDMARK_DESTROYED_VILLAGE
	}
};
/**
 Module for triggering marketing messages
 @author mtownsend
 @since Jan 2021
*/

Events.Marketing = [{
  /* Play Penrose! */
  title: _('Penrose'),
  isAvailable: () => !$SM.get('marketing.penrose'),
  scenes: {
    'start': {
      text: [
        _('a strange thrumming, pounding and crashing. visions of people and places, of a huge machine and twisting curves.'),
        _('inviting. it would be so easy to give in, completely.')
      ],
      notification: _('a strange thrumming, pounding and crashing. and then gone.'),
      blink: true,
      buttons: {
        'give in': {
          text: _('give in'),
          onClick: () => {
            $SM.set('marketing.penrose', true);
          },
          link: 'https://penrose.doublespeakgames.com/?utm_source=adarkroom&utm_medium=crosspromote&utm_campaign=event'
        },
        'ignore': {
          text: _('ignore it'),
          nextScene: 'end'
        }
      }
    }
  },
  audio: AudioLibrary.EVENT_NOISES_INSIDE
}];
Enemies = window.Enemies ?? {};
Enemies.Executioner = {
  'guard': {
    combat: true,
    notification: _('tripped a motion sensor.'),
    enemy: 'mechanical guard',
    enemyName: _('mechanical guard'),
    ranged: true,
    chara: 'G',
    damage: 10,
    hit: 0.8,
    attackDelay: 2,
    health: 60,
    loot: {
      'energy cell': {
        min: 1,
        max: 5,
        chance: 0.8
      },
      'laser rifle': {
        min: 1,
        max: 1,
        chance: 0.8
      },
      'alien alloy': {
        min: 1,
        max: 1,
        chance: 0.2
      }
    },
  },
  'quadruped': {
    combat: true,
    notification: _('a mobile defence platform trundles around the corner.'),
    enemy: 'mechanical quadruped',
    enemyName: _('mechanical quadruped'),
    ranged: false,
    chara: 'Q',
    damage: 8,
    hit: 0.8,
    attackDelay: 1,
    health: 70,
    loot: {
      'alien alloy': {
        min: 1,
        max: 1,
        chance: 1
      },
      'alien alloy': {
        min: 2,
        max: 4,
        chance: 0.2
      }
    }
  },
  'medic': {
    combat: true,
    notification: _('a medical drone wheels out of control.'),
    enemy: 'broken medic',
    enemyName: _('broken medic'),
    ranged: false,
    chara: 'M',
    damage: 15,
    hit: 0.8,
    attackDelay: 3,
    health: 80,
    atHealth: {
      40: fighter => {
        Events.setStatus(fighter, 'venomous');
        return 'venomous';
      }
    },
    loot: {
      'alien alloy': {
        min: 1,
        max: 2,
        chance: 1
      },
      'hypo': {
        min: 1,
        max: 4,
        chance: 0.2
      }
    }
  },
  'turret': {
    combat: true,
    notification: _('one of the defence turrets still works.'),
    enemy: 'defence turret',
    enemyName: _('defence turret'),
    ranged: true,
    chara: 'T',
    damage: 25,
    hit: 0.8,
    attackDelay: 4,
    health: 50,
    loot: {
      'energy cell': {
        min: 1,
        max: 5,
        chance: 0.8
      },
      'alien alloy': {
        min: 1,
        max: 1,
        chance: 0.8
      },
      'laser rifle': {
        min: 1,
        max: 1,
        chance: 0.2
      }
    },
  }
};

Events.Executioner = {
  "executioner-intro": { /* Exploring a ravaged battleship */
    title: _('A Ravaged Battleship'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        notification: _('the remains of a huge ship are embedded in the earth.'),
        text: [
          _('the remains of a massive battleship lie here, like a silent sealed city.'),
          _('it lists to the side in a deep crevasse, cut when it fell from the sky.'), 
          _('the hatches are all sealed, but the hull is blown out just above the dirt, providing an entrance.')
        ],
        buttons: {
          'enter': {
            text: _('enter'),
            cost: { torch: 1 },
            nextScene: {1: '1'}
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '1': {
        text: [
          _('the interior of the ship is cold and dark. what little light there is only accentuates its harsh angles.'),
          _('the walls hum faintly.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.4: '2-1', 0.8: '2-2', 1: '2-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '2-1': {
        'text': [
          _('thick, sticky webbing covers the walls of the corridor.'), 
          _('deeper into the ship, the darkness seems almost to writhe.'), 
          _('a small knapsack hangs from a cluster of webs, a few feet from the floor.')
        ],
        loot: {
          'cured meat': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'bullets': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '3-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-1': {
        notification: _('a huge arthropod lunges from the shadows, its mandibles thrashing.'),
        combat: true,
        enemy: 'chitinous horror',
        chara: 'H',
        damage: 1,
        hit: 0.7,
        attackDelay: 0.25,
        health: 60,
        loot: {
          'meat': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          'scales': {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '4-1': {
        notification: _('the webs part, and a grotesque insect lurches forward.'),
        combat: true,
        enemy: 'chitinous queen',
        chara: 'Q',
        damage: 1,
        hit: 0.7,
        attackDelay: 0.25,
        health: 70,
        loot: {
          'meat': {
            min: 8,
            max: 12,
            chance: 0.8
          },
          'scales': {
            min: 8,
            max: 12,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2-2': {
        notification: _('an operative waits in ambush around the corner.'),
        combat: true,
        enemy: 'operative',
        chara: 'O',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 60,
        loot: {
          'bayonet': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          'bullets': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'cured meat': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '3-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3-2': {
        'text': [
          _('the military has set up a small camp just inside the ship.'), 
          _('crude attempts have been made to cut into the walls.'), 
          _('scraps of copper wire litter the floor.'),
          _('two bedrolls are wedged into a corner.')
        ],
        loot: {
          'cured meat': {
            min: 1,
            max: 5,
            chance: 1
          },
          'torch': {
            min: 1,
            max: 3,
            chance: 0.8
          },
          'bullets': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          'alien alloy': {
            min: 1,
            max: 2,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4-2': {
        notification: _('a dusty researcher clumsily hides in the shadows.'),
        combat: true,
        enemy: 'researcher',
        chara: 'R',
        damage: 1,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          'torch': {
            min: 1,
            max: 3,
            chance: 0.8
          },
          'cloth': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'cured meat': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2-3': {
        'text': [
          _('debris is stacked in the corridor, forming a low barricade.'), 
          _('the walls are scorched and melted.'), 
          _('behind the barricade, a few weapons lay abandoned.')
        ],
        loot: {
          'laser rifle': {
            min: 1,
            max: 3,
            chance: 1
          },
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'plasma rifle': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '3-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-3': {
        'text': [
          _('the partially devoured remains of several wanderers are piled before a dark corridor.'), 
          _('shuffling noises can be heard from within.')
        ],
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          'cloth': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4-3': {
        combat: true,
        enemy: 'ancient beast',
        enemyName: _('ancient beast'),
        chara: 'A',
        damage: 6,
        hit: 0.8,
        attackDelay: 1,
        health: 60,
        loot: {
          'fur': {
            min: 5,
            max: 10,
            chance: 1
          },
          'meat': {
            min: 5,
            max: 10,
            chance: 1
          },
          'teeth': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        notification: _('an ancient beast has made these ruins its home.'),
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '5': {
        'text': [
          _('a maintenance panel is embedded in the wall next to a large sealed door.'), 
          _('perhaps the ship’s systems are still operational.')
        ],
        buttons: {
          'power': {
            text: _('power cycle'),
            nextScene: { 1: '6' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '6': {
        combat: true,
        notification: _('as the lights come online, so too do the defence systems.'),
        enemy: 'automated turret',
        enemyName: _('automated turret'),
        ranged: true,
        chara: 'T',
        damage: 10,
        hit: 0.8,
        attackDelay: 2.5,
        health: 60,
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'laser rifle': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '7' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '7': {
        'text': [
          _('beyond the bulkhead is a small antechamber, seemingly untouched by scavengers.'), 
          _('a large hatch grinds open, and the wind rushes in.'),
          _('a strange device sits on the floor. looks important.')
        ],
        onLoad: () => {
          World.drawRoad();
          World.state.executioner = true;
        },
        buttons: {
          'leave': {
            text: _('take device and leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },

  "executioner-antechamber": { /* Deeper into a ravaged battleship */
    title: _('A Ravaged Battleship'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        'text': [
          _('a large hatch opens into a wide corridor.'),
          _('the corridor leads to a bank of elevators, which appear to be functional.')
        ],
        buttons: {
          'engineering': {
            text: _('engineering'),
            available: function() {
              return !World.state.engineering;
            },
            nextEvent: 'executioner-engineering'
          },
          'medical': {
            text: _('medical'),
            available: function() {
              return !World.state.medical;
            },
            nextEvent: 'executioner-medical'
          },
          'martial': {
            text: _('martial'),
            available: function() {
              return !World.state.martial;
            },
            nextEvent: 'executioner-martial'
          },
          'command': {
            text: _('command deck'),
            available: function() {
              return World.state.engineering && World.state.medical && World.state.martial;
            },
            nextEvent: 'executioner-command'
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },

  "executioner-engineering": { /* Engineering wing */
    title: _('Engineering Wing'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        'text': [
          _('elevator doors open to a blasted corridor. debris covers the floor, piled into makeshift defences.'),
          _('emergency lighting flickers.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.3: '1-1', 0.7: '1-2', 1: '1-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '1-1': {
        text: [
          _('an automated assembly line performs its empty routines, long since deprived of materials.'),
          _('its final works lie forgotten, covered by a thin layer of dust.')
        ],
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'laser rifle': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '2-1a', 1: '2-1b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '2-1a': {
        combat: true,
        notification: _('assembly arms spin wildly out of control.'),
        enemy: 'unruly welder',
        enemyName: _('unruly welder'),
        ranged: false,
        chara: 'W',
        damage: 13,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'alien alloy': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '3-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2-1b': {
        text: [
          _('assembly arms spark and jitter.'),
          _('a cacophony of decrepit machinery fills the room.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '3-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-1': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '1-2': {
        ...Enemies.Executioner.turret,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '2-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2-2': {
        text: [
          _('must have been the engine room, once. the massive machines now stand inert, twisted and scorched by explosions.'),
          _('the destruction is uniform and precise.'),
          _('bits of them can be scavenged.')
        ],
        loot: {
          'alien alloy': {
            min: 2,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '3-2a', 1: '3-2b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-2a': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3-2b': {
        text: [
          _('none of the ship\'s engines escaped the destruction.'),
          _('it\'s no mystery why she no longer flies.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '1-3': {
        text: [
          _('sparks cascade from a reactivated power junction, and catch.'),
          _('the flames fill the corridor.')
        ],
        buttons: {
          'water': {
            text: _('extinguish'),
            cost: { 'water': 5 }, 
            nextScene: { 0.5: '2-3a', 1: '2-3b' }
          },
          'run': {
            text: _('rush through'),
            cost: { 'hp': 10 },
            nextScene: { 0.5: '2-3a', 1: '2-3b' }
          }
        }
      },
      '2-3a': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '3-3' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2-3b': {
        text: [
          _('rows of inert security robots hang suspended from the ceiling.'),
          _('wires run overhead, corroded and useless.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '3-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-3': {
        text: [
          _('more signs of past combat down the hall. guard post is ransacked.'),
          _('still, some things can be found.')
        ],
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'laser rifle': {
            min: 1,
            max: 1,
            chance: 0.7
          },
          'grenade': {
            min: 1,
            max: 3,
            chance: 0.6
          },
          'plasma rifle': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '4': {
        text: [
          _('marks on the door read \'research and development.\' everything seems mostly untouched, but dead.'),
          _('one machine thrums with power, and might still work.')
        ],
        buttons: {
          'use': {
            text: _('use machine'),
            cost: { 'alien alloy': 1 },
            onChoose: function() {
              World.setHp(World.getMaxHealth());
            },
            nextScene: { 1: '4-heal' }
          },
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '5-1', 1: '5-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4-heal': {
        text: [
          _('step inside, and the machine whirs. muscle and bone reknit. good as new.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '5-1', 1: '5-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '5-1': {
        ...Enemies.Executioner.turret,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '6' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '5-2': {
        text: [
          _('the machines here look unfinished, abandoned by their creator. wires and other scrap are scattered about the work benches.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '6' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '6': {
        text: [
          _('experimental plans cover one wall, held by an unseen force.'),
          _('this one looks useful.')
        ],
        loot: {
          'hypo blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '7-intro' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '7-intro': {
        text: [
          _('clattering metal and old servos. something is coming...')
        ],
        buttons: {
          'fight': {
            text: _('fight'),
            nextScene: { 1: '7' }
          }
        }
      },
      '7': {
        combat: true,
        notification: _('an unfinished automaton whirs to life.'),
        enemy: 'unstable prototype',
        enemyName: _('unstable prototype'),
        ranged: false,
        chara: 'P',
        damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 150,
        specials:[{
          delay: 5,
          action: (fighter) => {
            Events.setStatus(fighter, 'shield');
            return 'shield';
          }
        }],
        loot: {
          'alien alloy': {
            min: 1,
            max: 3,
            chance: 1
          },
          'kinetic armour blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '8' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '8': {
        text: [
          _('at the back of the workshop, elevator doors twitch and buzz.'),
          _('looks like a way out of here.')
        ],
        onLoad: () => {
          World.state.engineering = true;
        },
        buttons: {
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },

  "executioner-martial": { /* Martial wing */
    title: _('Martial Wing'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        text: [
          _('metal grinds, and the elevator doors open halfway. beyond is a brightly lit battlefield. remains litter the corridor, undisturbed by scavengers.'),
          _('looks like they tried to barricade the elevators.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '1': {
        text: [
          _('further along, the corridor branches.'),
          _('the door to the left is sealed and refuses to open.')
        ],
        buttons: {
          'explode': {
            text: _('blow it down'),
            cost: { grenade: 1 },
            nextScene: { 1: '2-1' }
          },
          'right': {
            text: _('continue right'),
            nextScene: { 0.5: '2-2', 1: '2-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '2-1': {
        text: [
          _('the blast throws the door inwards.'),
          _('through the bulkhead is a large room, walls lined with weapon racks. fighting seems to have passed it by.')
        ],
        loot: {
          'energy blade': {
            min: 2,
            max: 5,
            chance: 1
          },
          'laser rifle': {
            min: 2,
            max: 5,
            chance: 1
          },
          'energy cell': {
            min: 5,
            max: 20,
            chance: 1
          },
          'grenade': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          'plasma rifle': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '3-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-1': {
        ...Enemies.Executioner.turret,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '4-1': {
        text: [
          _('another door at the end of the hall, sealed from this side.'),
          _('should be able to open it.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '2-2': {
        ...Enemies.Executioner.turret,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 0.5: '3-2a', 1: '3-2b' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3-2a': {
        ...Enemies.Executioner.quadruped,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3-2b': {
        text: [
          _('the corridor is eerily silent.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4-2': {
        text: [
          _('crew cabins flank the hall, devoid of life.'),
          _('a few useful items can be scavenged.')
        ],
        loot: {
          'energy cell': {
            min: 1,
            max: 5,
            chance: 1
          },
          'energy blade': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '2-3': {
        text: [
          _('ruined defence turrets flank the corridor.'),
          _('could put the scrap to good use.')
        ],
        loot: {
          'alien alloy': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '3-3a', 1: '3-3b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3-3a': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4-3' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3-3b': {
        text: [
          _('small sensors in the walls still look to be operational.'),
          _('easily avoided.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4-3' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4-3': {
        ...Enemies.Executioner.quadruped,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '5': {
        text: [
          _('large barricades bisect the corridor, scorched by weapons fire.'),
          _('bodies litter the ground on either side.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '6' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '6': {
        text: [
          _('documents are scattered down the hall, most charred and curled.'),
          _('this one looks interesting.')
        ],
        loot: {
          'plasma rifle blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '7-1', 1: '7-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '7-1': {
        text: [
          _('the next door leads to a ransacked planning room.'),
          _('maps of the surface can still be found amongst the debris.')
        ],
        buttons: {
          'scavenge': {
            text: _('scavenge maps'),
            onChoose: () => {
              for (let i = 0; i < 3; i++) {
                World.applyMap();
              }
            },
            nextScene: { 1: '8-1a' }
          },
          'continue': {
            text: _('continue'),
            nextScene: { 1: '8-1b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '8-1a': {
        ...Enemies.Executioner.guard,
        notification: _('drew some attention with all that noise.'),
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '9-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '8-1b': {
        text: [
          _('slipped past an automated sentry.'),
          _('if only they\'d been destroyed along with everything else.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '9-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '9-1': {
        ...Enemies.Executioner.guard,
        notification: _('ran straight into another one.'),
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '10' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '7-2': {
        text: [
          _('the corridor passes through a security checkpoint. the defences are blown apart, ragged edges scorched by laser fire.'),
          _('past the checkpoint, banks of containment cells can be seen.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '8-2a', 1: '8-2b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '8-2a': {
        text: [
          _('the cells are all empty.'),
          _('power cables running across the ceiling are split in several places, sparking occasionally.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '9-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '8-2b': {
        text: [
          _('the guards died at their posts, shot through with superheated plasma.'),
          _('their weapons lie on the floor beside them.')
        ],
        loot: {
          'laser rifle': {
            min: 2,
            max: 2,
            chance: 1
          },
          'energy cell': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '9-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '9-2': {
        ...Enemies.Executioner.quadruped,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '10' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '10': {
        'text': [
          _('the corridor opens onto a vast training complex, obstacles and features blackened by real combat.'),
          _('a regenerative machine hums uncannily by one of the courses.')
        ],
        buttons: {
          'use': {
            text: _('use machine'),
            cost: { 'alien alloy': 1 },
            onChoose: function() {
              World.setHp(World.getMaxHealth());
            },
            nextScene: { 1: '11' }
          },
          'continue': {
            text: _('continue'),
            nextScene: { 1: '11' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '11': {
        'text': [
          _('motion from the centre of the yard.'),
          _('a sparring automaton, still fully function and crusted with timeworn blood, lunges forward.')
        ],
        buttons: {
          'engage': {
            text: _('engage'),
            nextScene: { 1: '12' }
          }
        }
      },
      '12': {
        combat: true,
        notification: _('the machine attacks, blades whirling.'),
        enemy: 'murderous robot',
        enemyName: _('murderous robot'),
        ranged: false,
        chara: 'M',
        damage: 10,
				hit: 0.8,
				attackDelay: 3,
				health: 250,
        specials:[{
          delay: 13,
          action: (fighter) => {
            Events.setStatus(fighter, 'energised');
            return 'energised';
          }
        }],
        loot: {
          'alien alloy': {
            min: 1,
            max: 3,
            chance: 1
          },
          'disruptor blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '13' }
          }
        }
      },
      '13': {
        'text': [
          _('the ruins of the sparring machine clatter to the ground.'),
          _('picked this deck clean.')
        ],
        onLoad: () => {
          World.state.martial = true;
        },
        buttons: {
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },

  "executioner-medical": { /* Medical wing */
    title: _('Medical Wing'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        'text': [
          _('elevator doors open to an empty corridor.'),
          _('a few dusty corpses can be seen further down, but this deck appears to have been spared most of the combat.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '1': {
        ...Enemies.Executioner.turret,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2': {
        'text': [
          _('past the checkpoint, the corridor is undamaged save for sporadic graffiti.'),
          _('there was no fighting here.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '3a', 1: '3b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3a': {
        ...Enemies.Executioner.quadruped,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '3b': {
        'text': [
          _('automated guardians still stalk the halls, unaware that their masters have long gone.'),
          _('clumsy machines, and easily avoided.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4': {
        'text': [
          _('medical gurneys are fixed to grooves running down the corridor walls.'),
          _('the automated patient transport system now sits motionless.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '5-1', 1: '5-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '5-1': {
        ...Enemies.Executioner.medic,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 0.5: '6-1a', 1: '6-1b' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '6-1a': {
        ...Enemies.Executioner.medic,
        notification: _('it had friends.'),
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '7-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '6-1b': {
        'text': [
          _('more medical robots stand frozen, attached by a network of wires.'),
          _('they take no notice of the intrusion.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '7-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '7-1': {
        'text': [
          _('weapons are strewn about the medical dispatch bay. must have been used as a muster point.'),
          _('more strange graffiti adorns the walls.')
        ],
        loot: {
          'laser rifle': {
            min: 1,
            max: 1,
            chance: 1
          },
          'energy cell': {
            min: 3,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '8' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '5-2': {
        'text': [
          _('this ward has been converted to a makeshift strategy room, maps scrawled hastily on any flat surface.'),
          _('a secure locker is set into one wall.')
        ],
        buttons: {
          'force': {
            text: _('force locker'),
            nextScene: { 1: '6-2a-intro' }
          },
          'continue': {
            text: _('continue'),
            nextScene: { 1: '6-2b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '6-2a-intro': {
        'text': [
          _('hinges rusted through. no challenge.'),
        ],
        loot: {
          'energy cell': {
            min: 5,
            max: 10,
            chance: 1
          },
          'hypo': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '6-2a' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '6-2a': {
        ...Enemies.Executioner.medic,
        notification: _('the noise draws attention.'),
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '7-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '6-2b': {
        'text': [
          _('better to move without drawing attention.'),
          _('noises can be heard from the corridor outside.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '7-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '7-2': {
        ...Enemies.Executioner.quadruped,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '8' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '8': {
        combat: true,
        notification: _('something\'s wrong with this robot.'),
        enemy: 'unstable automaton',
        enemyName: _('unstable automaton'),
        ranged: false,
        chara: 'A',
        damage: 10,
				hit: 0.7,
				attackDelay: 2,
				health: 100,
        explosion: 30,
        loot: {
          'glowstone blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '9' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '9': {
        'text': [
          _('another checkpoint ahead, fitted with heavy doors.'),
          _('security is even tighter here.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '10a', 1: '10b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '10a': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '11' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '10b': {
        'text': [
          _('slipped through unnoticed.'),
          _('air whistles as the doors open. this section must have lower pressure than the rest of the ship.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '11' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '11': {
        ...Enemies.Executioner.medic,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 0.5: '12-1', 1: '12-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '12-1': {
        'text': [
          _('the air is cooler here. low cabinets ring the room, doors dusted with frost.'),
          _('samples of something biological inside.')
        ],
        loot: {
          'cured meat': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '13-1a', 1: '13-1b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '13-1a': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '14-1' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '13-1b': {
        'text': [
          _('security drones still patrol the hallways.'),
          _('predictable paths.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '14-1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '14-1': {
        ...Enemies.Executioner.medic,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '15' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '12-2': {
        'text': [
          _('surgical tools are scattered on the floor, near what appears the be the remains of a fire.'),
          _('strange.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '13-2a', 1: '13-2b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '13-2a': {
        ...Enemies.Executioner.medic,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '14-2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '13-2b': {
        'text': [
          _('the air in this room has a metallic tinge. floor is covered in dark powder.'),
          _('some completed explosives in the corner.')
        ],
        loot: {
          'grenade': {
            min: 3,
            max: 8,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '14-2' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '14-2': {
        ...Enemies.Executioner.medic,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '15' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },

      '15': {
        'text': [
          _('containment cells arranged at the back of the room, all open.'),
          _('something moving up ahead.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '16' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '16': {
        combat: true,
        notification: _('a mutated beast leaps from its cell.'),
        enemy: 'malformed experiment',
        enemyName: _('malformed experiment'),
        ranged: false,
        chara: 'E',
        damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 200,
        specials: [{
          delay: 16,
          action: (fighter) => {
            Events.setStatus(fighter, 'enraged');
            return 'enraged';
          }
        }],
        loot: {
          'stim blueprint': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '17' }
          }
        }
      },
      '17': {
        'text': [
          _('the creature\'s tortured breathing ceases.'),
          _('nothing more here.')
        ],
        onLoad: () => {
          World.state.medical = true;
        },
        buttons: {
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  },

  "executioner-command": { /* Command deck */
    title: _('Command Deck'),
    audio: AudioLibrary.LANDMARK_CRASHED_SHIP,
    scenes: {
      'start': {
        'text': [
          _('the path to the command bridge is wide, walls adorned with decorative shields.'),
          _('fighting hadn\'t reached here, it seems.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '1' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },

      '1': {
        ...Enemies.Executioner.guard,
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '2' }
          },
          'leave': {
            text: _('leave'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: 'end'
          }
        }
      },
      '2': {
        'text': [
          _('detour through the officer\'s lounge.'),
          _('might be something useful here.')
        ],
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 0.5: '3a', 1: '3b' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3a': {
        'text': [
          _('small weapons cache in a cabinet.'),
          _('lucky.')
        ],
        loot: {
          'energy cell': {
            min: 3,
            max: 10,
            chance: 1
          },
          'grenade': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '3b': {
        'text': [
          _('found some medical supplies in a discarded bag.')
        ],
        loot: {
          'hypo': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            nextScene: { 1: '4' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '4': {
        'text': [
          _('the command deck is empty, save for a squat figure sitting motionless in the centre of the room.'),
          _('in a flash, the figure is standing.')
        ],
        buttons: {
          'approach': {
            text: _('approach'),
            nextScene: { 1: '5' }
          },
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      },
      '5': {
        'text': [
          _('wanderer form, but not quite flesh. not quite metal either. a crystal set into its chest pulses with light.'),
          _('it says it saw the rebellion coming. said it made arrangements.'),
          _('says it can\'t die.')
        ],
        buttons: {
          'observe': {
            text: _('observe'),
            nextScene: { 1: '6' }
          }
        }
      },
      '6': {
        combat: true,
        notification: _('the immortal wanderer attacks.'),
        enemy: 'immortal wanderer',
        enemyName: _('immortal wanderer'),
        ranged: false,
        chara: '@',
        damage: 12,
        hit: 0.8,
        attackDelay: 2,
        health: 500,
        onLoad: () => {
          Events._lastSpecial = 'none';
        },
        specials: [{
          delay: 7,
          action: (fighter) => {
            const last = Events._lastSpecial ?? 'none';
            const possible = [ 'shield', 'enraged', 'meditation' ].filter(p => p !== last);
            const status = possible[Math.floor(Math.random() * possible.length)];
            Events.setStatus(fighter, status);
            Events._lastSpecial = status;
            return status;
          }
        }],
        loot: {
          'fleet beacon': {
            min: 1,
            max: 1,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: _('continue'),
            cooldown: Events._LEAVE_COOLDOWN,
            nextScene: { 1: '7' }
          }
        }
      },
      '7': {
        'text': [
          _('the crystal pulses brightly, then goes dark. the assailant shimmers as its shape becomes less defined.'),
          _('then it is gone.'),
          _('time to get out of here.')
        ],
        onLoad: () => {
          World.clearDungeon();
        },
        buttons: {
          'leave': {
            text: _('leave'),
            nextScene: 'end'
          }
        }
      }
    }
  }

};