import Query  from "./query";
import { Prestige } from "./prestige";
import Ship from "./ship";
import StateManager from "./state_manager";
import { ScoreOptions } from "./types.js";

const Score = {

	name : 'Score',

	options : {},

	init : function(options: ScoreOptions) {
		this.options = Object.assign(this.options, options);
	},

	calculateScore : function() {
		const scoreUnadded = Prestige.getStores(false);
		let fullScore = 0;
		
		const factor = [1, 1.5, 1, 2, 2, 3, 3, 2, 2, 2, 2, 1.5, 1, 
			     1, 10, 30, 50, 100, 150, 150, 3, 3, 5, 4];
		for(let i = 0; i< factor.length; i++){
			fullScore += scoreUnadded[i] * factor[i];
		}
		
		fullScore = fullScore + StateManager.get('stores.alien alloy', true) * 10;
		fullScore = fullScore + StateManager.get('stores.fleet beacon', true) * 500;
		fullScore = fullScore + Ship.getMaxHull() * 50;
		return Math.floor(fullScore);
	},

	save: function() {
		StateManager.set('playStats.score', Score.calculateScore());
	},

	totalScore : function() {
		return StateManager.get('previous.score', true) + Score.calculateScore();
	}
};

export default Score;
