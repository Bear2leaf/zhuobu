import Query from "./query.js";
import Score from "./scoring.js";
import StateManager from "./state_manager.js";

export const Prestige = {
		
	name: 'Prestige',

	options: {},

	init: function(options: PrestigeOptions) {
		this.options = Object.assign(this.options, options);
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
	
	getStores: function(reduce: boolean) {
		const stores = [];
		
		for(const i in this.storesMap) {
			const s = this.storesMap[i];
			stores.push(Math.floor(StateManager.get('stores.' + s.store, true) / 
					(reduce ? this.randGen(s.type) : 1)));
		}
		
		return stores;
	},
	
	get: function() {
		return {
			stores: StateManager.get('previous.stores'),
			score: StateManager.get('previous.score')
		};
	},
	
	set: function(prestige: Prestige) {
		StateManager.set('previous.stores', prestige.stores);
		StateManager.set('previous.score', prestige.score);
	},
	
	save: function() {
		StateManager.set('previous.stores', this.getStores(true));
		StateManager.set('previous.score', Score.totalScore());
	},
  
	collectStores : function() {
		const prevStores = StateManager.get('previous.stores');
		if(prevStores !== null) {
			const toAdd: Record<string, Store> = {};
			for(const i in this.storesMap) {
				const s = this.storesMap[i];
				toAdd[s.store] = prevStores[i];
			}
			StateManager.addM('stores', toAdd);
			
			// Loading the stores clears em from the save
			prevStores.length = 0;
		}
	},

	randGen : function(storeType: string) {
		let amount;
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
