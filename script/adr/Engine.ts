import StateManager from "./StateManager";
import Room from "./Room";
import Notifications from "./Notifications";
export default class Engine {

    readonly MAX_STORE = 99999999999999;
    readonly SAVE_DISPLAY = 30 * 1000;
    _incomeTimeout: number = 0;
    _debug: boolean = false;
    _log: boolean = false;
    _saveTimer: number = 0;
    _lastNotify: number = 0;
    activeModule: Room | null = null;
    State: Record<string, any> = {};
    GAME_OVER = false;
    dropbox: unknown;
    options: Record<string, any> = {};
    stateManager = new StateManager(this);
    notifications = new Notifications(this);
    room = new Room(this, this.stateManager, this.notifications);


    _(template: string, ...args: any) {
        return template.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });
    };
    init(options?: Record<string, any>) {
        this.options = options || {
            state: {}
        }
        this._debug = this.options.debug;
        this._log = this.options.log;


        this.State = this.options.state;



        this.stateManager.init();


        this.travelTo(this.room);


    }

    // Gets a guid
    getGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    travelTo(module: Room) {
        if (this.activeModule === module) {
            return;
        }

        this.activeModule = module;
        module.onArrival();
    }

    /* Move the stores panel beneath top_container (or to top: 0px if top_container
     * either hasn't been filled in or is null) using transition_diff to sync with
     * the animation in this.travelTo().
     */
    moveStoresView() {
    }

    getIncomeMsg(num: number, delay: string) {
        return this._("{0} per {1}s", (num > 0 ? "+" : "") + num, delay);
        //return (num > 0 ? "+" : "") + num + " per " + delay + "s";
    }



    handleStateUpdates(e: unknown) {

    }
    setInterval(callback: VoidFunction, interval: number, skipDouble?: boolean) {
        if (this.options.doubleTime && !skipDouble) {
            console.log('Double time, cutting interval in half');
            interval /= 20;
        }

        return setInterval(callback, interval);

    }
    setTimeout(callback: VoidFunction, timeout: number, skipDouble: boolean = false) {

        if (this.options.doubleTime && !skipDouble) {
            console.log('Double time, cutting timeout in half');
            timeout /= 20;
        }

        return setTimeout(callback, timeout);

    }
};


