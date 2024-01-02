import Query  from "./query";
import _ from "./translate";
import Button from "./Button";

import AudioEngine from "./audio";
import { AudioLibrary } from "./audioLibrary";
import Engine from "./engine";
import Events from "./events";
import { Header } from "./header";
import Notifications from "./notifications";
import Ship from "./ship";
import StateManager from "./state_manager";
import { Craftables, Mod } from "./types.js";

/**
 * Module that registers the fabricator functionality
 */
export default class Fabricator {
  static tab: Query;
  static _STORES_OFFSET = 0;
  static Craftables: Craftables = {
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
  };
  static panel: Query;

  static init() {

    if (!StateManager.get('features.location.fabricator')) {
      StateManager.set('features.location.fabricator', true);
    }

    // Create the Fabricator tab
    Fabricator.tab = Header.addLocation(_("A Whirring Fabricator"), "fabricator", Fabricator, 'ship');

    // Create the Fabricator panel
    Fabricator.panel = Query.$('<div>').attr('id', "fabricatorPanel")
      .addClass('location');
    if (Ship.panel) {
      Fabricator.panel.insertBefore(Ship.panel);
    }
    else {
      Fabricator.panel.appendTo(Query.$('#locationSlider'));
    }

    Events.stateUpdate.subscribe(() => {
      Fabricator.updateBuildButtons();
      Fabricator.updateBlueprints();
    });

    Engine.updateSlider();
    Fabricator.updateBuildButtons();

  };

  static onArrival(transition_diff?: number) {
    Fabricator.setTitle();
    Fabricator.updateBlueprints(true);

    if (!StateManager.get('game.fabricator.seen')) {
      Notifications.notify(Fabricator, _('the familiar hum of wanderer machinery coming to life. finally, real tools.'));
      StateManager.set('game.fabricator.seen', true);
    }
    AudioEngine.playBackgroundMusic(AudioLibrary.MUSIC_SHIP);

    Engine.moveStoresView(null, transition_diff);
  };

  static setTitle() {
    if (Engine.activeModule === Fabricator) {
      Query.title(_("A Whirring Fabricator"));
    }
  }

  static updateBuildButtons() {
    let section = Query.$('#fabricateButtons');
    let needsAppend = false;
    if (section.found === 0) {
      section = Query.$('<div>').attr({ 'id': 'fabricateButtons', 'data-legend': _('fabricate:') }).css('opacity', 0);
      needsAppend = true;
    }

    for (const key in Fabricator.Craftables) {
      const value = Fabricator.Craftables[key];
      const max = StateManager.num(key, value) + 1 > value.maximum;
      if (!value.button) {
        if (Fabricator.canFabricate(key)) {
          const name = _(value.name) + ((value.quantity ?? 1) > 1 ? ` (x${value.quantity})` : '');
          value.button = Button.create({
            id: 'fabricate_' + key,
            cost: value.cost(),
            text: name,
            click: Fabricator.fabricate,
            width: '150px',
            ttPos: section.children().length > 10 ? 'top right' : 'bottom right'
          }).css('opacity', 0).attr('fabricateThing', key).appendTo(section).animate({ opacity: 1 }, 300);
        }
      } else {
        // refresh the tooltip
        const costTooltip = Query.$('.tooltip', value.button);
        costTooltip.empty();
        const cost = value.cost();
        for (const resource in cost) {
          const num = cost[resource];
          Query.$("<div>").addClass('row_key').text(_(resource)).appendTo(costTooltip);
          Query.$("<div>").addClass('row_val').text(num).appendTo(costTooltip);
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
      section.appendTo(Fabricator.panel).animate({ opacity: 1 }, 300);
    }
  };

  static updateBlueprints(ignoreStores?: boolean) {
    if (!StateManager.get('character.blueprints')) {
      return;
    }

    let blueprints = Query.$('#blueprints');
    let needsAppend = false;
    if (blueprints.found === 0) {
      needsAppend = true;
      blueprints = Query.$('<div>').attr({ 'id': 'blueprints', 'data-legend': _('blueprints') });
    }

    for (const k in StateManager.get('character.blueprints')) {
      const id = 'blueprint_' + k.replace(/ /g, '-');
      let r = Query.$('#' + id);
      if (StateManager.get(`character.blueprints.${k}`) && r.found === 0) {
        r = Query.$('<div>').attr('id', id).addClass('blueprintRow').appendTo(blueprints);
        Query.$('<div>').addClass('row_key').text(_(k)).appendTo(r);
      }
    }

    if (needsAppend && blueprints.children().length > 0) {
      blueprints.prependTo(Fabricator.panel);
    }
  };

  static canFabricate(itemKey: string) {
    return !Fabricator.Craftables[itemKey].blueprintRequired ||
      StateManager.get(`character.blueprints.${itemKey}`);
  };

  static fabricate(button: Query) {
    const thing = button.attr('fabricateThing');
    const craftable = Fabricator.Craftables[thing];
    const numThings = Math.min(0, StateManager.get(`stores.${thing}`, true));

    if (craftable.maximum <= numThings) {
      return;
    }

    const storeMod: Mod = {};
    const cost = craftable.cost();
    for (const key in cost) {
      const value = cost[key];
      const have = StateManager.get(`stores.${key}`, true);
      if (have < value) {
        Notifications.notify(Fabricator, _(`not enough ${key}`));
        return false;
      } else {
        storeMod[key] = have - value;
      }
    }
    StateManager.setM('stores', storeMod);
    StateManager.add(`stores.${thing}`, craftable.quantity ?? 1);

    Notifications.notify(Fabricator, craftable.buildMsg);
    AudioEngine.playSound(AudioLibrary.CRAFT);
  }

};
