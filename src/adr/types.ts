
declare let ga: unknown;
declare let langs: Record<string, string>;
declare let oldIE: boolean;

declare type LocalStorage = {
    gameState?: string,
    lang?: string,
    clear: () => void,
}

declare type Prestige = {
    stores: number[],
    score: number,
}
declare type Position = [number, number];
declare type WorldPos = { x: number, y: number };
declare type Weapon = {
    verb: string,
    type: string,
    damage: string | number,
    cooldown: number,
    cost?: Record<string, number>,
};
declare type Item = {
    type: string
}
declare type Good = Item & {
    cost: () => Record<string, number>,
    audio: string,
    maximum?: number,
    buildMsg?: string,
    button?: any,
    maxMsg?: string,
}
declare type Special = {
    delay: number;
    action: Action,
}
declare type TrapDrop = {
    rollUnder: number,
    name: string,
    message: string,

}
declare type Action = (target: any) => string;
declare type WorldMap = (number | string)[][];
declare type Adjacent = (number | string | null)[];
declare type MapMask = boolean[][];
declare type $Event = any;
declare type ADREvent = any;
declare type Topic = {};
declare type Token = {
    value?: string;
    type?: string;
    matches?: RegExpMatchArray;
};
declare type EnumItem = {
    value: number,
    text: string,
}
declare type EnumFunc = {
    fromInt: (value: number) => EnumItem,
}
declare type Enum = Record<string, EnumItem>;
declare type TotalIncome = Record<string, Incom>;
declare type Incom = {
    name?: string,
    delay?: number,
    stores?: Stores,
    income?: number
};
declare type TempEnum = {
    Freezing: EnumItem,
    Cold: EnumItem,
    Mild: EnumItem,
    Warm: EnumItem,
    Hot: EnumItem,
} & EnumFunc
declare type FireEnum = {

    Dead: EnumItem,
    Smoldering: EnumItem,
    Flickering: EnumItem,
    Burning: EnumItem,
    Roaring: EnumItem,
} & EnumFunc;
declare type EffectAudio = {
    source: AudioBufferSourceNode,
    envelope?: GainNode,
}
declare type StateUpdate = {
    callbacks: Function[],
    subscribe: Function,
    publish: (data: any) => void,

}
declare type Offset = { top: number; left: number; };
declare type Outfit = Record<string, number>;
declare type Setpieces = Record<string, any>;
declare type LootList = Record<string, any>;
declare type Mod = Record<string, number>;
declare type HeaderOptions = any;
declare type ButtonOptions = any;
declare type EngineInitOptions = any;
declare type PrestigeOptions = any;
declare type EventOptions = any;
declare type RoomOptions = any;
declare type OutsideOptions = any;
declare type WorldOptions = any;
declare type PathOptions = any;
declare type ShipOptions = any;
declare type SpaceOptions = any;
declare type AnimateOptions = any;
declare type ScoreOptions = any;
declare type IncomeOptions = any;
declare type StateManagerOptions = any;
declare type EngineModule = any;
declare type Executioner = any;
declare type StateResult = any;
declare type Craftables = Record<string, Craftable>;
declare type Enemies = Record<string, Enemy>;
declare type Craftable = any;
declare type Enemy = any;
declare type Store = any;
declare type Stores = Record<string, Store>;
declare type StateUpdateEvent = any;