import { Base64 } from "./base64.js";
import Query from "./query.js";
import _ from "./translate.js";
import adr from "./adr.js";
import AudioEngine from "./audio.js";
import { AudioLibrary } from "./audioLibrary.js";
import Events from "./events.js";
import Fabricator from "./fabricator.js";
import Notifications from "./notifications.js";
import Outside from "./outside.js";
import Path from "./path.js";
import { Prestige } from "./prestige.js";
import Room from "./room.js";
import Ship from "./ship.js";
import StateManager from "./state_manager.js";

export default class Engine {
  static _incomeTimeout: number;
  static readonly SITE_URL = encodeURIComponent("#");
  static readonly VERSION = 1.3;
  static readonly MAX_STORE = 99999999999999;
  static readonly SAVE_DISPLAY = 30 * 1000;
  static GAME_OVER = false;

  //object event types
  static topics: Record<string, Topic> = {};

  static readonly Perks: Record<string, {
    name: string;
    desc: string;
    notify: string;
  }> = {
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
    };

  static options: EngineInitOptions = {
    state: null,
    debug: false,
    log: false,
    dropbox: false,
    doubleTime: false
  };
  static _debug: boolean;
  static _log: boolean;
  static dropbox: unknown;
  static _saveTimer: number;
  static _lastNotify: number;
  static activeModule: EngineModule;
  static keyPressed: unknown;
  static keyLock: unknown;
  static pressed: boolean;
  static tabNavigation: unknown;
  static restoreNavigation: unknown;


  static createDefaultElements() {
    adr.$('<div>').attr('id', 'wrapper').appendTo(adr.$('body'));
    adr.$('<div>').attr('id', 'saveNotify').appendTo(adr.$('#wrapper'));
    adr.$('<div>').attr('id', 'content').appendTo(adr.$('#wrapper'));
    adr.$('<div>').attr('id', 'outerSlider').appendTo(adr.$('#content'));
    adr.$('<div>').attr('id', 'main').appendTo(adr.$('#outerSlider'));
    adr.$('<div>').attr('id', 'header').appendTo(adr.$('#main'));
  }

  static init(options?: EngineInitOptions) {
    this.options = Object.assign(
      this.options,
      options
    );
    this._debug = this.options.debug;
    this._log = this.options.log;

    // Check for HTML5 support
    if (!Engine.browserValid()) {
      adr.setLocation('browserWarning.html');
    }

    // Check for mobile
    if (Engine.isMobile()) {
      adr.setLocation('mobileWarning.html');
    }

    Engine.disableSelection();

    if (this.options.state !== null) {
      adr.State = this.options.state;
    } else {
      Engine.loadGame();
    }

    // start loading music and events early
    for (const key in AudioLibrary) {
      if (
        key.toString().indexOf('MUSIC_') > -1 ||
        key.toString().indexOf('EVENT_') > -1) {
        // AudioEngine.loadAudioFile(AudioLibrary[key]);
      }
    }

    adr.$('<div>').attr('id', 'locationSlider').appendTo(adr.$('#main'));

    const menu = adr.$('<div>')
      .addClass('menu')
      .appendTo(adr.$('#main'));

    if (typeof langs !== 'undefined') {
      const customSelect = adr.$('<span>')
        .addClass('customSelect')
        .addClass('menuBtn')
        .appendTo(menu);
      const selectOptions = adr.$('<span>')
        .addClass('customSelectOptions')
        .appendTo(customSelect);
      const optionsList = adr.$('<ul>')
        .appendTo(selectOptions);
      adr.$('<li>')
        .text("language.")
        .appendTo(optionsList);

      for (const name in langs) {
        if (Object.prototype.hasOwnProperty.call(langs, name)) {
          const display = langs[name];

          adr.$('<li>')
            .text(display)
            .attr('data-language', name)
            .click(Engine.switchLanguage)
            .appendTo(optionsList);
        }
      }
    }

    adr.$('<span>')
      .addClass('volume menuBtn')
      .text(_('sound on.'))
      .click(() => Engine.toggleVolume())
      .appendTo(menu);

    adr.$('<span>')
      .addClass('appStore menuBtn')
      .text(_('get the app.'))
      .click(Engine.getApp)
      .appendTo(menu);

    adr.$('<span>')
      .addClass('lightsOff menuBtn')
      .text(_('lights off.'))
      .click(Engine.turnLightsOff)
      .appendTo(menu);

    adr.$('<span>')
      .addClass('hyper menuBtn')
      .text(_('hyper.'))
      .click(Engine.confirmHyperMode)
      .appendTo(menu);

    adr.$('<span>')
      .addClass('menuBtn')
      .text(_('restart.'))
      .click(Engine.confirmDelete)
      .appendTo(menu);

    adr.$('<span>')
      .addClass('menuBtn')
      .text(_('share.'))
      .click(Engine.share)
      .appendTo(menu);

    adr.$('<span>')
      .addClass('menuBtn')
      .text(_('save.'))
      .click(Engine.exportImport)
      .appendTo(menu);


    adr.$('<span>')
      .addClass('menuBtn')
      .text(_('github.'))
      .click(function () { adr.open('https://github.com/doublespeakgames/adarkroom'); })
      .appendTo(menu);

    // Register keypress handlers
    adr.$('body').keydown(Engine.keyDown);
    adr.$('body').keyup(Engine.keyUp);

    // Register swipe handlers
    const swipeElement = adr.$('#outerSlider');
    swipeElement.swipeleft(Engine.swipeLeft);
    swipeElement.swiperight(Engine.swipeRight);
    swipeElement.swipeup(Engine.swipeUp);
    swipeElement.swipedown(Engine.swipeDown);

    // subscribe to stateUpdates
    Events.stateUpdate.subscribe(Engine.handleStateUpdates);

    StateManager.init();
    AudioEngine.init();
    Notifications.init();
    Events.init();
    Room.init();


    if (typeof StateManager.get('stores.wood') !== 'undefined') {
      Outside.init();
    }
    if (StateManager.get('stores.compass', true) as number > 0) {
      Path.init();
    }
    if (StateManager.get('features.location.fabricator')) {
      Fabricator.init();
    }
    if (StateManager.get('features.location.spaceShip')) {
      Ship.init();
    }

    if (StateManager.get('config.lightsOff', true)) {
      Engine.turnLightsOff();
    }

    if (StateManager.get('config.hyperMode', true)) {
      Engine.triggerHyperMode();
    }

    Engine.toggleVolume(Boolean(StateManager.get('config.soundOn')));
    if (!AudioEngine.isAudioContextRunning()) {
      adr.addEventListener('click', Engine.resumeAudioContext);
    }

    Engine.saveLanguage();
    Engine.travelTo(Room);

    adr.setTimeout(notifyAboutSound, 3000);

  }
  static resumeAudioContext() {
    AudioEngine.tryResumingAudioContext();

    // turn on music!
    AudioEngine.setMasterVolume(StateManager.get('config.soundOn') ? 1.0 : 0.0, 0);

    adr.removeEventListener('click', Engine.resumeAudioContext)
  }
  static browserValid() {
    return typeof Storage !== 'undefined';
  }

  static isMobile() {
    return false;
  }

  static saveGame() {
    if (typeof Storage !== 'undefined' && adr.localStorage()) {
      if (Engine._saveTimer !== null) {
        clearTimeout(Engine._saveTimer);
      }
      if (typeof Engine._lastNotify === 'undefined' || Date.now() - Engine._lastNotify > Engine.SAVE_DISPLAY) {
        adr.$('#saveNotify').text(_("saved.")).css('opacity', 1).animate({ opacity: 0 }, 1000);
        Engine._lastNotify = Date.now();
      }
      adr.localStorage().gameState = JSON.stringify(adr.State);
    }
  }

  static loadGame() {
    const gameState = adr.localStorage().gameState;
    if (!gameState) {
      adr.State = {};
      StateManager.set('version', Engine.VERSION);
      Engine.event('progress', 'new game');
    } else {
      adr.State = JSON.parse(gameState);
      StateManager.updateOldState();
      Engine.log("loaded save!");
    }
  }

  static exportImport() {
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
              nextScene: { 1: 'inputExport' }
            },
            'import': {
              text: _('import'),
              nextScene: { 1: 'confirm' }
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
          onLoad: function () { Engine.event('progress', 'export'); },
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
              nextScene: { 1: 'inputImport' },
              onChoose: Engine.enableSelection
            },
            'no': {
              text: _('no'),
              nextScene: { 1: 'start' }
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
  }

  static generateExport64() {
    const gameState = adr.localStorage().gameState;
    if (!gameState) {
      throw new Error("No game state to export");
    }
    let string64 = Base64.encode(gameState);
    string64 = string64.replace(/\s/g, '');
    string64 = string64.replace(/\./g, '');
    string64 = string64.replace(/\n/g, '');

    return string64;
  }

  static export64() {
    Engine.saveGame();
    Engine.enableSelection();
    return Engine.generateExport64();
  }

  static import64(string64: string) {
    Engine.event('progress', 'import');
    Engine.disableSelection();
    string64 = string64.replace(/\s/g, '');
    string64 = string64.replace(/\./g, '');
    string64 = string64.replace(/\n/g, '');
    const decodedSave = Base64.decode(string64);
    adr.localStorage().gameState = decodedSave;
    location.reload();
  }

  static event(cat: string, act: string) {
    if (typeof ga === 'function') {
      ga('send', 'event', cat, act);
    }
  }

  static confirmDelete() {
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
  }

  static deleteSave(noReload: boolean) {
    if (typeof Storage !== 'undefined' && adr.localStorage()) {
      const prestige = Prestige.get();
      adr.State = {};
      adr.localStorage().clear();
      Prestige.set(prestige);
    }
    if (!noReload) {
      location.reload();
    }
  }

  static getApp() {
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
                adr.open('https://itunes.apple.com/app/apple-store/id736683061?pt=2073437&ct=adrproper&mt=8');
              }
            },
            'android': {
              text: _('android'),
              nextScene: 'end',
              onChoose: function () {
                adr.open('https://play.google.com/store/apps/details?id=com.yourcompany.adarkroom');
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
  }

  static share() {
    Events.startEvent({
      title: _('Share'),
      scenes: {
        start: {
          text: [_('bring your friends.')],
          buttons: {
            'facebook': {
              text: _('facebook'),
              nextScene: 'end',
              onChoose: function () {
                adr.open('https://www.facebook.com/sharer/sharer.php?u=' + Engine.SITE_URL, 'sharer', 'width=626,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
              }
            },
            'google': {
              text: _('google+'),
              nextScene: 'end',
              onChoose: function () {
                adr.open('https://plus.google.com/share?url=' + Engine.SITE_URL, 'sharer', 'width=480,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
              }
            },
            'twitter': {
              text: _('twitter'),
              nextScene: 'end',
              onChoose: function () {
                adr.open('https://twitter.com/intent/tweet?text=A%20Dark%20Room&url=' + Engine.SITE_URL, 'sharer', 'width=660,height=260,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
              }
            },
            'reddit': {
              text: _('reddit'),
              nextScene: 'end',
              onChoose: function () {
                adr.open('http://www.reddit.com/submit?url=' + Engine.SITE_URL, 'sharer', 'width=960,height=700,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
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
  }

  static findStylesheet(title: string) {
    const styleSheets = adr.styleSheets();
    for (let i = 0; i < styleSheets.length; i++) {
      const sheet = styleSheets[i];
      if (sheet.title === title) {
        return sheet;
      }
    }
    return null;
  }

  static isLightsOff() {
    const darkCss = Engine.findStylesheet('darkenLights');
    if (darkCss !== null && !darkCss.disabled) {
      return true;
    }
    return false;
  }

  static turnLightsOff() {
    const darkCss = Engine.findStylesheet('darkenLights');
    if (darkCss === null) {
      adr.$('head').appendHeadLink('<link rel="stylesheet" href="css/dark.css" type="text/css" title="darkenLights" />');
      adr.$('.lightsOff').text(_('lights on.'));
      StateManager.set('config.lightsOff', true, true);
    } else if (darkCss.disabled) {
      darkCss.disabled = false;
      adr.$('.lightsOff').text(_('lights on.'));
      StateManager.set('config.lightsOff', true, true);
    } else {
      darkCss.disabled = true;
      adr.$('.lightsOff').text(_('lights off.'));
      StateManager.set('config.lightsOff', false, true);
    }
  }

  static confirmHyperMode() {
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
  }

  static triggerHyperMode() {
    Engine.options.doubleTime = !Engine.options.doubleTime;
    if (Engine.options.doubleTime)
      adr.$('.hyper').text(_('classic.'));
    else
      adr.$('.hyper').text(_('hyper.'));

    StateManager.set('config.hyperMode', Engine.options.doubleTime, false);
  }

  // Gets a guid
  static getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  activeModule = null

  static travelTo(module: EngineModule) {
    if (Engine.activeModule === module) {
      return;
    }

    const currentIndex = Engine.activeModule ? adr.$('#locationSlider').index(Engine.activeModule.panel) : 1;
    adr.$('#header').children().forEach(v => v.removeClass('selected'));
    module.tab.addClass('selected');

    const slider = adr.$('#locationSlider');
    const stores = adr.$('#storesContainer');
    const panelIndex = adr.$('#locationSlider').index(module.panel);
    const diff = Math.abs(panelIndex - currentIndex);
    slider.animate({ left: -(panelIndex * 700) + 'px' }, 300 * diff);

    if (StateManager.get('stores.wood') !== undefined) {
      // FIXME Why does this work if there's an animation queue...?
      stores.animate({ right: -(panelIndex * 700) + 'px' }, 300 * diff);
    }

    if (Engine.activeModule === Room || Engine.activeModule === Path || Engine.activeModule === Fabricator) {
      // Don't fade out the weapons if we're switching to a module
      // where we're going to keep showing them anyway.
      if (module !== Room && module !== Path && module !== Fabricator) {
        if (adr.$('#weapons').found) {
          adr.$('#weapons').animate({ opacity: 0 }, 300);
        }
      }
    }

    if (module === Room || module === Path || module === Fabricator) {
      if (adr.$('#weapons').found) {
        adr.$('#weapons').animate({ opacity: 1 }, 300);
      }
    }

    Engine.activeModule = module;
    module.onArrival(diff);
    Notifications.printQueue(module);
  }

  /* Move the stores panel beneath top_container (or to top: 0px if top_container
   * either hasn't been filled in or is null) using transition_diff to sync with
   * the animation in Engine.travelTo().
   */
  static moveStoresView(top_container: Query | null, transition_diff?: number) {
    const stores = adr.$('#storesContainer');

    // If we don't have a storesContainer yet, leave.
    if (typeof (stores) === 'undefined') return;

    if (typeof (transition_diff) === 'undefined') transition_diff = 1;

    if (top_container === null) {
      stores.animate({ top: '0px' }, 300 * transition_diff);
    }
    else if (!top_container.found) {
      stores.animate({ top: '0px' }, 300 * transition_diff);
    }
    else {
      stores.animate({
        top: top_container.height() + 26 + 'px'
      }, 300 * transition_diff);
    }
  }

  static log(msg: string) {
    if (this._log) {
      console.log(msg);
    }
  }

  static updateSlider() {
    const slider = adr.$('#locationSlider');
    slider.width((slider.children().length * 700) + 'px');
  }

  static updateOuterSlider() {
    const slider = adr.$('#outerSlider');
    slider.width((slider.children().length * 700) + 'px');
  }

  static getIncomeMsg(num: number, delay: string) {
    return _("{0} per {1}s", (num > 0 ? "+" : "") + num, delay);
    //return (num > 0 ? "+" : "") + num + " per " + delay + "s";
  }

  keyLock = false;
  tabNavigation = true;
  restoreNavigation = false;

  static keyDown(e: $Event) {
    if (!Engine.keyPressed && !Engine.keyLock) {
      Engine.pressed = true;
      if (Engine.activeModule.keyDown) {
        Engine.activeModule.keyDown(e);
      }
    }
    return [37, 38, 39, 40].indexOf(e.keycode) !== -1;
  }

  static keyUp(e: $Event) {
    Engine.pressed = false;
    if (Engine.activeModule.keyUp) {
      Engine.activeModule.keyUp(e);
    } else {
      switch (e.which) {
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
            if (Engine.activeModule === Ship && Fabricator.tab) {
              Engine.travelTo(Fabricator);
            }
            else if ((Engine.activeModule === Ship || Engine.activeModule === Fabricator) && Path.tab) {
              Engine.travelTo(Path);
            }
            else if (Engine.activeModule === Path && Outside.tab) {
              Engine.travelTo(Outside);
            }
            else if (Engine.activeModule === Outside && Room.tab) {
              Engine.travelTo(Room);
            }
          }
          Engine.log('left');
          break;
        case 39: // Right
        case 68:
          if (Engine.tabNavigation) {
            if (Engine.activeModule === Room && Outside.tab) {
              Engine.travelTo(Outside);
            }
            else if (Engine.activeModule === Outside && Path.tab) {
              Engine.travelTo(Path);
            }
            else if (Engine.activeModule === Path && Fabricator.tab) {
              Engine.travelTo(Fabricator);
            }
            else if ((Engine.activeModule === Path || Engine.activeModule === Fabricator) && Ship.tab) {
              Engine.travelTo(Ship);
            }
          }
          Engine.log('right');
          break;
      }
    }
    if (Engine.restoreNavigation) {
      Engine.tabNavigation = true;
      Engine.restoreNavigation = false;
    }
    return false;
  }

  static swipeLeft(e: $Event) {
    if (Engine.activeModule.swipeLeft) {
      Engine.activeModule.swipeLeft(e);
    }
  }

  static swipeRight(e: $Event) {
    if (Engine.activeModule.swipeRight) {
      Engine.activeModule.swipeRight(e);
    }
  }

  static swipeUp(e: $Event) {
    if (Engine.activeModule.swipeUp) {
      Engine.activeModule.swipeUp(e);
    }
  }

  static swipeDown(e: $Event) {
    if (Engine.activeModule.swipeDown) {
      Engine.activeModule.swipeDown(e);
    }
  }

  static disableSelection() {
    adr.onselectstart = eventNullifier; // this is for IE
    adr.onmousedown = eventNullifier; // this is for the rest
  }

  static enableSelection() {
    adr.onselectstart = eventPassthrough;
    adr.onmousedown = eventPassthrough;
  }

  static autoSelect(selector: Query) {
    selector.focus().select();
  }

  static handleStateUpdates(e: StateUpdateEvent) {

  }
  static switchLanguage(this: Element) {
    const lang = adr.$(this).attr("data-language");
    const href = adr.href() as string;
    if (href.search(/[\?\&]lang=[a-z_]+/) !== -1) {
      adr.href(href.replace(/([\?\&]lang=)([a-z_]+)/gi, "$1" + lang));
    } else {
      adr.href(href + ((href.search(/\?/) !== -1) ? "&" : "?") + "lang=" + lang);
    }
  }

  static saveLanguage() {
    const lang = decodeURIComponent((new RegExp('[?|&]lang=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    if (lang && typeof Storage !== 'undefined' && adr.localStorage()) {
      adr.localStorage().lang = lang;
    }
  }

  static toggleVolume(enabled?: boolean) {
    if (enabled === undefined) {
      enabled = !StateManager.get('config.soundOn');
    }
    if (!enabled) {
      adr.$('.volume').text(_('sound on.'));
      StateManager.set('config.soundOn', false);
      AudioEngine.setMasterVolume(0.0);
    } else {
      adr.$('.volume').text(_('sound off.'));
      StateManager.set('config.soundOn', true);
      AudioEngine.setMasterVolume(1.0);
    }
  }

  static setInterval(callback: VoidFunction, interval: number, skipDouble?: boolean) {
    if (Engine.options.doubleTime && !skipDouble) {
      Engine.log('Double time, cutting interval in half');
      interval /= 2;
    }

    return adr.setInterval(callback, interval);

  }
  static setTimeout(callback: VoidFunction, timeout: number, skipDouble: boolean = false) {

    if (Engine.options.doubleTime && !skipDouble) {
      Engine.log('Double time, cutting timeout in half');
      timeout /= 2;
    }

    return adr.setTimeout(callback, timeout);

  }
};

function eventNullifier(e: $Event) {
  // return adr.$(e.target).hasClass('menuBtn');
}

function eventPassthrough(e: $Event) {
  return true;
}

function notifyAboutSound() {
  if (StateManager.get('playStats.audioAlertShown')) {
    return;
  }

  // Tell new users that there's sound now!
  StateManager.set('playStats.audioAlertShown', true);
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


function inView(dir: string, elem: Query) {

  const scTop = adr.$('#main').offset().top;
  const scBot = scTop + adr.$('#main').height();

  const elTop = elem.offset().top;
  const elBot = elTop + elem.height();

  if (dir === 'up') {
    // STOP MOVING IF BOTTOM OF ELEMENT IS VISIBLE IN SCREEN
    return (elBot < scBot);
  } else if (dir === 'down') {
    return (elTop > scTop);
  } else {
    return ((elBot <= scBot) && (elTop >= scTop));
  }

}

function setYPosition(elem: Query, y: number) {
  const elTop = parseInt(elem.css('top'), 10);
  elem.css('top', `${y}px`);
}

