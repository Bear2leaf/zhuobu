import Query from "./query";
import _ from "./translate";
import Button from "./Button";

import AudioEngine from "./audio";
import { AudioLibrary } from "./audioLibrary";
import Engine from "./engine";
import Events from "./events";
import Fabricator from "./fabricator";
import Notifications from "./notifications";
import Path from "./path";
import Room from "./room";
import Ship from "./ship";
import StateManager from "./state_manager";
import { Position, Weapon, WorldPos, StateResult, WorldOptions, $Event, MapMask, WorldMap, Adjacent } from "./types";

export default class World {
  static hypoHeal = () => World.HYPO_HEAL;
  static readonly RADIUS = 30;
  static readonly VILLAGE_POS: Position = [30, 30];
  static readonly TILE: Record<string, string> = {
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
  }
  static readonly TILE_PROBS: Record<string, any> = {}
  static readonly LANDMARKS: Record<string, any> = {}
  static readonly STICKINESS = 0.5 // 0 <= x <= 
  static readonly LIGHT_RADIUS = 2
  static readonly BASE_WATER = 10
  static readonly MOVES_PER_FOOD = 2
  static readonly MOVES_PER_WATER = 1
  static readonly DEATH_COOLDOWN = 120
  static readonly FIGHT_CHANCE = 0.20
  static readonly BASE_HEALTH = 10
  static readonly BASE_HIT_CHANCE = 0.8
  static readonly MEAT_HEAL = 8
  static readonly MEDS_HEAL = 20
  static readonly HYPO_HEAL = 30
  static readonly FIGHT_DELAY = 3 // At least three moves between fight
  static readonly NORTH: Position = [0, -1]
  static readonly SOUTH: Position = [0, 1]
  static readonly WEST: Position = [-1, 0]
  static readonly EAST: Position = [1, 0]

  static readonly Weapons: Record<string, Weapon> = {
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
  };

  static options: WorkerOptions = {}; // Nothing for now
  static panel: Query;
  static ship: WorldPos[];
  static dir: string;
  static state: StateResult;
  static curPos: Position;
  static water: number;
  static health: number;
  static danger: unknown;
  static foodMove: number;
  static waterMove: number;
  static starvation: unknown;
  static thirst: unknown;
  static fightMove: number;
  static seenAll: unknown;
  static dead: unknown;
  static usedOutposts: Record<string, boolean>;
  static hp: any;
  static init(options?: WorldOptions) {
    this.options = Object.assign(
      this.options,
      options
    );

    // Setup probabilities. Sum must equal 1.
    World.TILE_PROBS[World.TILE.FOREST] = 0.15;
    World.TILE_PROBS[World.TILE.FIELD] = 0.35;
    World.TILE_PROBS[World.TILE.BARRENS] = 0.5;

    // Setpiece definitions
    World.LANDMARKS[World.TILE.OUTPOST] = { num: 0, minRadius: 0, maxRadius: 0, scene: 'outpost', label: _('An&nbsp;Outpost') };
    World.LANDMARKS[World.TILE.IRON_MINE] = { num: 1, minRadius: 5, maxRadius: 5, scene: 'ironmine', label: _('Iron&nbsp;Mine') };
    World.LANDMARKS[World.TILE.COAL_MINE] = { num: 1, minRadius: 10, maxRadius: 10, scene: 'coalmine', label: _('Coal&nbsp;Mine') };
    World.LANDMARKS[World.TILE.SULPHUR_MINE] = { num: 1, minRadius: 20, maxRadius: 20, scene: 'sulphurmine', label: _('Sulphur&nbsp;Mine') };
    World.LANDMARKS[World.TILE.HOUSE] = { num: 10, minRadius: 0, maxRadius: World.RADIUS * 1.5, scene: 'house', label: _('An&nbsp;Old&nbsp;House') };
    World.LANDMARKS[World.TILE.CAVE] = { num: 5, minRadius: 3, maxRadius: 10, scene: 'cave', label: _('A&nbsp;Damp&nbsp;Cave') };
    World.LANDMARKS[World.TILE.TOWN] = { num: 10, minRadius: 10, maxRadius: 20, scene: 'town', label: _('An&nbsp;Abandoned&nbsp;Town') };
    World.LANDMARKS[World.TILE.CITY] = { num: 20, minRadius: 20, maxRadius: World.RADIUS * 1.5, scene: 'city', label: _('A&nbsp;Ruined&nbsp;City') };
    World.LANDMARKS[World.TILE.SHIP] = { num: 1, minRadius: 28, maxRadius: 28, scene: 'ship', label: _('A&nbsp;Crashed&nbsp;Starship') };
    World.LANDMARKS[World.TILE.BOREHOLE] = { num: 10, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: 'borehole', label: _('A&nbsp;Borehole') };
    World.LANDMARKS[World.TILE.BATTLEFIELD] = { num: 5, minRadius: 18, maxRadius: World.RADIUS * 1.5, scene: 'battlefield', label: _('A&nbsp;Battlefield') };
    World.LANDMARKS[World.TILE.SWAMP] = { num: 1, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: 'swamp', label: _('A&nbsp;Murky&nbsp;Swamp') };
    World.LANDMARKS[World.TILE.EXECUTIONER] = { num: 1, minRadius: 28, maxRadius: 28, scene: 'executioner', 'label': _('A&nbsp;Ravaged&nbsp;Battleship') };

    // Only add the cache if there is prestige data
    if (StateManager.get('previous.stores')) {
      World.LANDMARKS[World.TILE.CACHE] = { num: 1, minRadius: 10, maxRadius: World.RADIUS * 1.5, scene: 'cache', label: _('A&nbsp;Destroyed&nbsp;Village') };
    }

    if (typeof StateManager.get('features.location.world') === 'undefined') {
      StateManager.set('features.location.world', true);
      StateManager.set('features.executioner', true);
      StateManager.setM('game.world', {
        map: World.generateMap(),
        mask: World.newMask()
      });
    }
    else if (!StateManager.get('features.executioner')) {
      // Place the Executioner in previously generated maps that don't have it
      const map = StateManager.get('game.world.map');
      const landmark = World.LANDMARKS[World.TILE.EXECUTIONER]
      for (let l = 0; l < landmark.num; l++) {
        World.placeLandmark(landmark.minRadius, landmark.maxRadius, World.TILE.EXECUTIONER, map);
      }
      StateManager.set('game.world.map', map);
      StateManager.set('features.executioner', true);
    }

    // Create the World panel
    this.panel = Query.$('<div>').attr('id', "worldPanel").addClass('location').appendTo(Query.$('#outerSlider'));

    // Create the shrink wrapper
    const outer = Query.$('<div>').attr('id', 'worldOuter').appendTo(this.panel);

    // Create the bag panel
    Query.$('<div>').attr('id', 'bagspace-world').append(Query.$('<div>')).appendTo(outer);
    Query.$('<div>').attr('id', 'backpackTitle').appendTo(outer);
    Query.$('<div>').attr('id', 'backpackSpace').appendTo(outer);
    Query.$('<div>').attr('id', 'healthCounter').appendTo(outer);

    Engine.updateOuterSlider();

    // Map the ship and show compass tooltip
    World.ship = World.mapSearch(World.TILE.SHIP, StateManager.get('game.world.map'), 1);
    if (!World.ship) {
      throw new Error('No ship found');
    }
    World.dir = World.compassDir(World.ship[0]);
    // compass tooltip text
    Room.compassTooltip(World.dir);

    // Check if everything has been seen
    World.testMap();

    //subscribe to stateUpdates
    Events.stateUpdate.subscribe(World.handleStateUpdates);
  };

  static clearDungeon() {
    Engine.event('progress', 'dungeon cleared');
    World.state.map[World.curPos[0]][World.curPos[1]] = World.TILE.OUTPOST;
    World.drawRoad();
  };

  static drawRoad() {
    const findClosestRoad = function (startPos: Position) {
      // We'll search in a spiral to find the closest road tile
      // We spiral out along manhattan distance contour
      // lines to ensure we draw the shortest road possible.
      // No attempt is made to reduce the search space for
      // tiles outside the map.
      let searchX, searchY, dtmp;
      let x = 0,
        y = 0,
        dx = 1,
        dy = -1;
      for (let i = 0; i < Math.pow(World.getDistance(startPos, World.VILLAGE_POS) + 2, 2); i++) {
        searchX = startPos[0] + x;
        searchY = startPos[1] + y;
        if (0 < searchX && searchX < World.RADIUS * 2 && 0 < searchY && searchY < World.RADIUS * 2) {
          // check for road
          const tile = World.state.map[searchX][searchY];
          if (
            tile === World.TILE.ROAD ||
            (tile === World.TILE.OUTPOST && !(x === 0 && y === 0)) || // outposts are connected to roads
            tile === World.TILE.VILLAGE // all roads lead home
          ) {
            return [searchX, searchY];
          }
        }
        if (x === 0 || y === 0) {
          // Turn the corner
          dtmp = dx;
          dx = -dy;
          dy = dtmp;
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
    const closestRoad = findClosestRoad(World.curPos);
    const xDist = World.curPos[0] - closestRoad[0];
    const yDist = World.curPos[1] - closestRoad[1];
    const xDir = Math.abs(xDist) / xDist;
    const yDir = Math.abs(yDist) / yDist;
    let xIntersect, yIntersect;
    if (Math.abs(xDist) > Math.abs(yDist)) {
      xIntersect = closestRoad[0];
      yIntersect = closestRoad[1] + yDist;
    } else {
      xIntersect = closestRoad[0] + xDist;
      yIntersect = closestRoad[1];
    }

    for (let x = 0; x < Math.abs(xDist); x++) {
      if (World.isTerrain(World.state.map[closestRoad[0] + (xDir * x)][yIntersect])) {
        World.state.map[closestRoad[0] + (xDir * x)][yIntersect] = World.TILE.ROAD;
      }
    }
    for (let y = 0; y < Math.abs(yDist); y++) {
      if (World.isTerrain(World.state.map[xIntersect][closestRoad[1] + (yDir * y)])) {
        World.state.map[xIntersect][closestRoad[1] + (yDir * y)] = World.TILE.ROAD;
      }
    }
    World.drawMap();
  };

  static updateSupplies() {
    const supplies = Query.$('#bagspace-world').find('div');

    if (!Path.outfit) {
      Path.outfit = {};
    }

    // Add water
    let water = Query.$('#supply_water');
    if (World.water > 0 && water.found === 0) {
      water = World.createItemDiv('water', World.water);
      water.prependTo(supplies);
    } else if (World.water > 0) {
      Query.$('#supply_water', supplies).text(_('water:{0}', World.water.toString()));
    } else {
      water.remove();
    }

    let total = 0;
    for (const k in Path.outfit) {
      let item = Query.$('#supply_' + k.replace(' ', '-'), supplies);
      const num = Path.outfit[k];
      total += num * Path.getWeight(k);
      if (num > 0 && item.found === 0) {
        item = World.createItemDiv(k, num);
        if (k === 'cured meat' && World.water > 0) {
          item.insertAfter(water);
        } else if (k === 'cured meat') {
          item.prependTo(supplies);
        } else {
          item.appendTo(supplies);
        }
      } else if (num > 0) {
        Query.$('#' + item.attr('id'), supplies).text(_(k) + ':' + num);
      } else {
        item.remove();
      }
    }

    // Update label
    let t = _('pockets');
    if (StateManager.get('stores.rucksack', true) > 0) {
      t = _('rucksack');
    }
    Query.$('#backpackTitle').text(t);

    // Update bagspace
    Query.$('#backpackSpace').text(_('free {0}/{1}', Math.floor(Path.getCapacity() - total).toString(), Path.getCapacity().toString()));
  };

  static setWater(w: number) {
    World.water = w;
    if (World.water > World.getMaxWater()) {
      World.water = World.getMaxWater();
    }
    World.updateSupplies();
  };

  static setHp(hp: number) {
    if (typeof hp === 'number' && !isNaN(hp)) {
      World.health = hp;
      if (World.health > World.getMaxHealth()) {
        World.health = World.getMaxHealth();
      }
      Query.$('#healthCounter').text(_('hp: {0}/{1}', World.health.toString(), World.getMaxHealth().toString()));
    }
  };

  static createItemDiv(name: string, num: number) {
    const div = Query.$('<div>').attr('id', 'supply_' + name.replace(' ', '-'))
      .addClass('supplyItem')
      .text(_('{0}:{1}', _(name), num.toString()));

    return div;
  };

  static moveNorth() {
    Engine.log('North');
    if (World.curPos[1] > 0) World.move(World.NORTH);
  };

  static moveSouth() {
    Engine.log('South');
    if (World.curPos[1] < World.RADIUS * 2) World.move(World.SOUTH);
  };

  static moveWest() {
    Engine.log('West');
    if (World.curPos[0] > 0) World.move(World.WEST);
  };

  static moveEast() {
    Engine.log('East');
    if (World.curPos[0] < World.RADIUS * 2) World.move(World.EAST);
  };

  static move(direction: Position) {
    const oldTile = World.state.map[World.curPos[0]][World.curPos[1]];
    World.curPos[0] += direction[0];
    World.curPos[1] += direction[1];
    World.narrateMove(oldTile, World.state.map[World.curPos[0]][World.curPos[1]]);
    World.lightMap(World.curPos[0], World.curPos[1], World.state.mask);
    World.drawMap();
    World.doSpace();

    // play random footstep
    const randomFootstep = Math.floor(Math.random() * 5) + 1;
    AudioEngine.playSound(AudioLibrary['FOOTSTEPS_' + randomFootstep]);

    if (World.checkDanger()) {
      if (World.danger) {
        Notifications.notify(World, _('dangerous to be this far from the village without proper protection'));
      } else {
        Notifications.notify(World, _('safer here'));
      }
    }
  };

  static keyDown(event: $Event) {
    switch (event.which) {
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
  };

  static swipeLeft(e: $Event) {
    World.moveWest();
  };

  static swipeRight(e: $Event) {
    World.moveEast();
  };

  static swipeUp(e: $Event) {
    World.moveNorth();
  };

  static swipeDown(e: $Event) {
    World.moveSouth();
  };

  static click(event: $Event) {
    const map = Query.$('#map'),
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
  };

  static checkDanger() {
    World.danger = typeof World.danger === 'undefined' ? false : World.danger;
    if (!World.danger) {
      if (StateManager.get('stores.i armour', true) === 0 && World.getDistance() >= 8) {
        World.danger = true;
        return true;
      }
      if (StateManager.get('stores.s armour', true) === 0 && World.getDistance() >= 18) {
        World.danger = true;
        return true;
      }
    } else {
      if (World.getDistance() < 8) {
        World.danger = false;
        return true;
      }
      if (World.getDistance() < 18 && StateManager.get('stores.i armour', true) > 0) {
        World.danger = false;
        return true;
      }
    }
    return false;
  };

  static useSupplies() {
    World.foodMove++;
    World.waterMove++;
    // Food
    let movesPerFood = World.MOVES_PER_FOOD;
    movesPerFood *= StateManager.hasPerk('slow metabolism') ? 2 : 1;
    if (World.foodMove >= movesPerFood) {
      World.foodMove = 0;
      let num = Path.outfit['cured meat'];
      num--;
      if (num === 0) {
        Notifications.notify(World, _('the meat has run out'));
      } else if (num < 0) {
        // Starvation! Hooray!
        num = 0;
        if (!World.starvation) {
          Notifications.notify(World, _('starvation sets in'));
          World.starvation = true;
        } else {
          StateManager.set('character.starved', StateManager.get('character.starved', true));
          StateManager.add('character.starved', 1);
          if (StateManager.get('character.starved') >= 10 && !StateManager.hasPerk('slow metabolism')) {
            StateManager.addPerk('slow metabolism');
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
    let movesPerWater = World.MOVES_PER_WATER;
    movesPerWater *= StateManager.hasPerk('desert rat') ? 2 : 1;
    if (World.waterMove >= movesPerWater) {
      World.waterMove = 0;
      let water = World.water;
      water--;
      if (water === 0) {
        Notifications.notify(World, _('there is no more water'));
      } else if (water < 0) {
        water = 0;
        if (!World.thirst) {
          Notifications.notify(World, _('the thirst becomes unbearable'));
          World.thirst = true;
        } else {
          StateManager.set('character.dehydrated', StateManager.get('character.dehydrated', true));
          StateManager.add('character.dehydrated', 1);
          if (StateManager.get('character.dehydrated') >= 10 && !StateManager.hasPerk('desert rat')) {
            StateManager.addPerk('desert rat');
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
  };

  static meatHeal() {
    return World.MEAT_HEAL * (StateManager.hasPerk('gastronome') ? 2 : 1);
  };

  static medsHeal() {
    return World.MEDS_HEAL;
  };


  static checkFight() {
    World.fightMove = typeof World.fightMove === 'number' ? World.fightMove : 0;
    World.fightMove++;
    if (World.fightMove > World.FIGHT_DELAY) {
      let chance = World.FIGHT_CHANCE;
      chance *= StateManager.hasPerk('stealthy') ? 0.5 : 1;
      if (Math.random() < chance) {
        World.fightMove = 0;
        Events.triggerFight();
      }
    }
  };

  static doSpace() {
    const curTile = World.state.map[World.curPos[0]][World.curPos[1]];

    if (curTile === World.TILE.VILLAGE) {
      World.goHome();
    } else if (curTile === World.TILE.EXECUTIONER) {
      const scene = World.state.executioner ? 'executioner-antechamber' : 'executioner-intro';
      const sceneData = Events.Executioner[scene];
      Events.startEvent(sceneData);
    } else if (typeof World.LANDMARKS[curTile] !== 'undefined') {
      if (curTile !== World.TILE.OUTPOST || !World.outpostUsed()) {
        Events.startEvent(Events.Setpieces[World.LANDMARKS[curTile].scene]);
      }
    } else {
      if (World.useSupplies()) {
        World.checkFight();
      }
    }
  };

  static getDistance(from?: Position, to?: Position) {
    from = from || World.curPos;
    to = to || World.VILLAGE_POS;
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  };

  static getTerrain() {
    return World.state.map[World.curPos[0]][World.curPos[1]];
  };

  static getDamage(thing: string) {
    return World.Weapons[thing].damage;
  };

  static narrateMove(oldTile: string, newTile: string) {
    let msg = null;
    switch (oldTile) {
      case World.TILE.FOREST:
        switch (newTile) {
          case World.TILE.FIELD:
            msg = _("the trees yield to dry grass. the yellowed brush rustles in the wind.");
            break;
          case World.TILE.BARRENS:
            msg = _("the trees are gone. parched earth and blowing dust are poor replacements.");
            break;
        }
        break;
      case World.TILE.FIELD:
        switch (newTile) {
          case World.TILE.FOREST:
            msg = _("trees loom on the horizon. grasses gradually yield to a forest floor of dry branches and fallen leaves.");
            break;
          case World.TILE.BARRENS:
            msg = _("the grasses thin. soon, only dust remains.");
            break;
        }
        break;
      case World.TILE.BARRENS:
        switch (newTile) {
          case World.TILE.FIELD:
            msg = _("the barrens break at a sea of dying grass, swaying in the arid breeze.");
            break;
          case World.TILE.FOREST:
            msg = _("a wall of gnarled trees rises from the dust. their branches twist into a skeletal canopy overhead.");
            break;
        }
        break;
    }
    if (msg !== null) {
      Notifications.notify(World, msg);
    }
  };

  static newMask() {
    const mask = new Array(World.RADIUS * 2 + 1);
    for (let i = 0; i <= World.RADIUS * 2; i++) {
      mask[i] = new Array(World.RADIUS * 2 + 1);
    }
    World.lightMap(World.RADIUS, World.RADIUS, mask);
    return mask;
  };

  static lightMap(x: number, y: number, mask: MapMask) {
    let r = World.LIGHT_RADIUS;
    r *= StateManager.hasPerk('scout') ? 2 : 1;
    World.uncoverMap(x, y, r, mask);
    return mask;
  };

  static uncoverMap(x: number, y: number, r: number, mask: MapMask) {
    mask[x][y] = true;
    for (let i = -r; i <= r; i++) {
      for (let j = -r + Math.abs(i); j <= r - Math.abs(i); j++) {
        if (y + j >= 0 && y + j <= World.RADIUS * 2 &&
          x + i <= World.RADIUS * 2 &&
          x + i >= 0) {
          mask[x + i][y + j] = true;
        }
      }
    }
  };

  static testMap() {
    if (!World.seenAll) {
      let dark;
      const mask = StateManager.get('game.world.mask');
      loop:
      for (let i = 0; i < mask.length; i++) {
        for (let j = 0; j < mask[i].length; j++) {
          if (!mask[i][j]) {
            dark = true;
            break loop;
          }
        }
      }
      World.seenAll = !dark;
    }
  };

  static applyMap() {
    if (!World.seenAll) {
      let x, y;
      const mask = StateManager.get('game.world.mask');
      do {
        x = Math.floor(Math.random() * (World.RADIUS * 2 + 1));
        y = Math.floor(Math.random() * (World.RADIUS * 2 + 1));
      } while (mask[x][y]);
      World.uncoverMap(x, y, 5, mask);
    }
    World.testMap();
  };

  static generateMap() {
    const map = new Array(World.RADIUS * 2 + 1);
    for (let i = 0; i <= World.RADIUS * 2; i++) {
      map[i] = new Array(World.RADIUS * 2 + 1);
    }
    // The Village is always at the exact center
    // Spiral out from there
    map[World.RADIUS][World.RADIUS] = World.TILE.VILLAGE;
    for (let r = 1; r <= World.RADIUS; r++) {
      for (let t = 0; t < r * 8; t++) {
        let x, y;
        if (t < 2 * r) {
          x = World.RADIUS - r + t;
          y = World.RADIUS - r;
        } else if (t < 4 * r) {
          x = World.RADIUS + r;
          y = World.RADIUS - (3 * r) + t;
        } else if (t < 6 * r) {
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
    for (let k in World.LANDMARKS) {
      const landmark = World.LANDMARKS[k];
      for (let l = 0; l < landmark.num; l++) {
        const pos = World.placeLandmark(landmark.minRadius, landmark.maxRadius, k, map);
      }
    }

    return map;
  };

  static mapSearch(target: string, map: WorldMap, required: number) {
    let max = World.LANDMARKS[target].num;
    if (!max) {
      // this restrict the research to numerable landmarks
      throw new Error('Landmark not found');
    }
    // restrict research if only a fixed number (usually 1) is required
    max = (required) ? Math.min(required, max) : max;
    let index = 0;
    const targets = [];
    search: // label for coordinate research
    for (let i = 0; i <= World.RADIUS * 2; i++) {
      for (let j = 0; j <= World.RADIUS * 2; j++) {
        if (map[i][j].toString().charAt(0) === target) {
          // search result is stored as an object;
          // items are listed as they appear in the map, tl-br
          // each item has relative coordinates and a compass-type direction
          targets[index] = {
            x: i - World.RADIUS,
            y: j - World.RADIUS,
          };
          index++;
          if (index === max) {
            // optimisation: stop the research if maximum number of items has been reached
            break search;
          }
        }
      }
    }
    return targets;
  };

  static compassDir(pos: WorldPos) {
    let dir = '';
    const horz = pos.x < 0 ? 'west' : 'east';
    const vert = pos.y < 0 ? 'north' : 'south';
    if (Math.abs(pos.x) / 2 > Math.abs(pos.y)) {
      dir = horz;
    } else if (Math.abs(pos.y) / 2 > Math.abs(pos.x)) {
      dir = vert;
    } else {
      dir = vert + horz;
    }
    return dir;
  };

  static placeLandmark(minRadius: number, maxRadius: number, landmark: string, map: WorldMap) {

    let x = World.RADIUS, y = World.RADIUS;
    while (!World.isTerrain(map[x][y])) {
      const r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
      let xDist = Math.floor(Math.random() * r);
      let yDist = r - xDist;
      if (Math.random() < 0.5) xDist = -xDist;
      if (Math.random() < 0.5) yDist = -yDist;
      x = World.RADIUS + xDist;
      if (x < 0) x = 0;
      if (x > World.RADIUS * 2) x = World.RADIUS * 2;
      y = World.RADIUS + yDist;
      if (y < 0) y = 0;
      if (y > World.RADIUS * 2) y = World.RADIUS * 2;
    }
    map[x][y] = landmark;
    return [x, y];
  };

  static isTerrain(tile: string | number) {
    return tile === World.TILE.FOREST || tile === World.TILE.FIELD || tile === World.TILE.BARRENS;
  };

  static chooseTile(x: number, y: number, map: WorldMap) {

    const adjacent: Adjacent = [
      y > 0 ? map[x][y - 1] : null,
      y < World.RADIUS * 2 ? map[x][y + 1] : null,
      x < World.RADIUS * 2 ? map[x + 1][y] : null,
      x > 0 ? map[x - 1][y] : null
    ];

    const chances: Record<string, number> = {};
    let nonSticky = 1;
    let cur;
    for (const i in adjacent) {
      if (adjacent[i] === World.TILE.VILLAGE) {
        // Village must be in a forest to maintain thematic consistency, yo.
        return World.TILE.FOREST;
      } else if (typeof adjacent[i] === 'string') {
        const adj = adjacent[i];
        if (adj === null) {
          throw new Error('adjacent tile is null');
        }
        cur = chances[adj];
        cur = typeof cur === 'number' ? cur : 0;
        chances[adj] = cur + World.STICKINESS;
        nonSticky -= World.STICKINESS;
      }
    }
    for (const t in World.TILE) {
      const tile = World.TILE[t];
      if (World.isTerrain(tile)) {
        cur = chances[tile];
        cur = typeof cur === 'number' ? cur : 0;
        cur += World.TILE_PROBS[tile] * nonSticky;
        chances[tile] = cur;
      }
    }

    const list = [];
    for (const j in chances) {
      list.push(chances[j] + '' + j);
    }
    list.sort(function (a, b) {
      const n1 = parseFloat(a.substring(0, a.length - 1));
      const n2 = parseFloat(b.substring(0, b.length - 1));
      return n2 - n1;
    });

    let c = 0;
    const r = Math.random();
    for (const l in list) {
      const prob = list[l];
      c += parseFloat(prob.substring(0, prob.length - 1));
      if (r < c) {
        return prob.charAt(prob.length - 1);
      }
    }

    return World.TILE.BARRENS;
  };

  static markVisited(x: number, y: number) {
    World.state.map[x][y] = World.state.map[x][y] + '!';
  };

  static drawMap() {
    let map = Query.$('#map');
    if (map.found === 0) {
      map = Query.$('<div>').attr('id', 'map').appendTo(Query.$('#worldOuter'));
      // register click handler
      map.click(World.click);
    }
    let mapString = "";
    for (let j = 0; j <= World.RADIUS * 2; j++) {
      for (let i = 0; i <= World.RADIUS * 2; i++) {
        let ttClass = "";
        if (i > World.RADIUS) {
          ttClass += " left";
        } else {
          ttClass += " right";
        }
        if (j > World.RADIUS) {
          ttClass += " top";
        } else {
          ttClass += " bottom";
        }
        if (World.curPos[0] === i && World.curPos[1] === j) {
          mapString += '<span class="landmark">@<div class="tooltip ' + ttClass + '">' + _('Wanderer') + '</div></span>';
        } else if (World.state.mask[i][j]) {
          let c = World.state.map[i][j];
          switch (c) {
            case World.TILE.VILLAGE:
              mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">' + _('The&nbsp;Village') + '</div></span>';
              break;
            default:
              if (typeof World.LANDMARKS[c] !== 'undefined' && (c !== World.TILE.OUTPOST || !World.outpostUsed(i, j))) {
                mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">' + World.LANDMARKS[c].label + '</div></span>';
              } else {
                if (c.length > 1) {
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
  };

  static die() {
    if (!World.dead) {
      World.dead = true;
      Engine.log('player death');
      Engine.event('game event', 'death');
      Engine.keyLock = true;
      // Dead! Discard any world changes and go home
      Notifications.notify(World, _('the world fades'));
      World.state = null;
      Path.outfit = {};
      StateManager.remove('outfit');
      AudioEngine.playSound(AudioLibrary.DEATH);
      Query.$('#outerSlider').animate({ opacity: '0' }, 600, function () {
        Query.$('#outerSlider').css('left', '0px');
        Query.$('#locationSlider').css('left', '0px');
        Query.$('#storesContainer').css({ 'top': '0px', 'right': '0px' });
        Engine.activeModule = Room;
        Query.$('#header').children().forEach(v => v.removeClass('selected'));
        Room.tab.addClass('selected');
        Engine.setTimeout(function () {
          Room.onArrival();
          Query.$('#outerSlider').animate({ opacity: '1' }, 600);
          Button.cooldown(Query.$('#embarkButton'));
          Engine.keyLock = false;
          Engine.tabNavigation = true;
        }, 2000, true);
      });
    }
  };

  static goHome() {
    // Home safe! Commit the changes.
    StateManager.setM('game.world', World.state);
    World.testMap();

    if (World.state.sulphurmine && StateManager.get('game.buildings.sulphur mine', true) === 0) {
      StateManager.add('game.buildings.sulphur mine', 1);
      Engine.event('progress', 'sulphur mine');
    }
    if (World.state.ironmine && StateManager.get('game.buildings.iron mine', true) === 0) {
      StateManager.add('game.buildings.iron mine', 1);
      Engine.event('progress', 'iron mine');
    }
    if (World.state.coalmine && StateManager.get('game.buildings.coal mine', true) === 0) {
      StateManager.add('game.buildings.coal mine', 1);
      Engine.event('progress', 'coal mine');
    }
    if (World.state.ship && !StateManager.get('features.location.spaceShip')) {
      Ship.init();
      Engine.event('progress', 'ship');
    }
    if (World.state.executioner && !StateManager.get('features.location.fabricator')) {
      Fabricator.init();
      Notifications.notify(null, _('builder knows the strange device when she sees it. takes it for herself real quick. doesn’t ask where it came from.'));
      Engine.event('progress', 'fabricator');
    }
    World.redeemBlueprints();
    World.state = null;

    if (Path.outfit['cured meat'] > 0) {
      Button.setDisabled(Query.$('#embarkButton'), false);
    }

    World.returnOutfit();

    Query.$('#outerSlider').animate({ left: '0px' }, 300);
    Engine.activeModule = Path;
    Path.onArrival();
    Engine.restoreNavigation = true;
  }

  static redeemBlueprints = () => {
    let redeemed = false;
    const redeem = (blueprint: string, item: string) => {
      if (Path.outfit[blueprint]) {
        StateManager.set(`character.blueprints.${item}`, true);
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
  };

  static returnOutfit = () => {
    for (const k in Path.outfit) {
      StateManager.add('stores.' + k + '', Path.outfit[k]);
      if (World.leaveItAtHome(k)) {
        Path.outfit[k] = 0;
      }
    }
  };

  static leaveItAtHome(thing: string) {
    return thing !== 'cured meat' && thing !== 'bullets' && thing !== 'energy cell' &&
      thing !== 'charm' && thing !== 'medicine' && thing !== 'stim' && thing !== 'hypo' &&
      typeof World.Weapons[thing] === 'undefined' && typeof Room.Craftables[thing] === 'undefined';
  };

  static getMaxHealth() {
    if (StateManager.get('stores.kinetic armour', true) > 0) {
      return World.BASE_HEALTH + 75;
    } else if (StateManager.get('stores.s armour', true) > 0) {
      return World.BASE_HEALTH + 35;
    } else if (StateManager.get('stores.i armour', true) > 0) {
      return World.BASE_HEALTH + 15;
    } else if (StateManager.get('stores.l armour', true) > 0) {
      return World.BASE_HEALTH + 5;
    }
    return World.BASE_HEALTH;
  };

  static getHitChance() {
    if (StateManager.hasPerk('precise')) {
      return World.BASE_HIT_CHANCE + 0.1;
    }
    return World.BASE_HIT_CHANCE;
  };

  static getMaxWater() {

    if (StateManager.get('stores.fluid recycler', true) > 0) {
      return World.BASE_WATER + 100;
    } else if (StateManager.get('stores.water tank', true) > 0) {
      return World.BASE_WATER + 50;
    } else if (StateManager.get('stores.cask', true) > 0) {
      return World.BASE_WATER + 20;
    } else if (StateManager.get('stores.waterskin', true) > 0) {
      return World.BASE_WATER + 10;
    }
    return World.BASE_WATER;
  };

  static outpostUsed(x?: number, y?: number) {
    x = typeof x === 'number' ? x : World.curPos[0];
    y = typeof y === 'number' ? y : World.curPos[1];
    const used = World.usedOutposts[x + ',' + y];
    return typeof used !== 'undefined' && used === true;
  };

  static useOutpost() {
    Notifications.notify(null, _('water replenished'));
    World.setWater(World.getMaxWater());
    // Mark this outpost as used
    World.usedOutposts[World.curPos[0] + ',' + World.curPos[1]] = true;
  };

  static onArrival() {
    Engine.tabNavigation = false;
    // Clear the embark cooldown
    Button.clearCooldown(Query.$('#embarkButton'));
    Engine.keyLock = false;
    // Explore in a temporary world-state. We'll commit the changes if you return home safe.
    World.state = Object.assign(true, {}, StateManager.get('game.world'));
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
    Query.$('#bagspace-world').find('div').empty();
    World.updateSupplies();
    Query.$('#bagspace-world').width(Query.$('#map').width());
  };

  static setTitle() {
    Query.title(_('A Barren World'));
  };

  static copyPos(pos: Position): Position {
    return [pos[0], pos[1]];
  };

  static handleStateUpdates(e: Query) {

  }
};
