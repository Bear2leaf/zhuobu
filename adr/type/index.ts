
export let langs: Record<string, string>;

export type LocalStorage = {
    gameState?: string,
    lang?: string,
    clear: () => void,
}

export type Position = [number, number];
export type WorldPos = { x: number, y: number };
export type Weapon = {
    verb: string,
    type: string,
    damage: string | number,
    cooldown: number,
    cost?: Record<string, number>,
};
export type Item = {
    type: string
}
export type Good = Item & {
    cost: () => Record<string, number>,
    audio: string,
    maximum?: number,
    buildMsg?: string,
    button?: any,
    maxMsg?: string,
}
export type Special = {
    delay: number;
    action: Action,
}
export type TrapDrop = {
    rollUnder: number,
    name: string,
    message: string,

}
export type Action = (target: any) => string;
export type WorldMap = (number | string)[][];
export type Adjacent = (number | string | null)[];
export type MapMask = boolean[][];
export type $Event = any;
export type ADREvent = any;
export type Topic = {};
export type Token = {
    value?: string;
    type?: string;
    matches?: RegExpMatchArray;
};
export type EnumItem = {
    value: number,
    text: string,
}
export type EnumFunc = {
    fromInt: (value: number) => EnumItem,
}
export type Enum = Record<string, EnumItem>;
export type TotalIncome = Record<string, Incom>;
export type Incom = {
    name?: string,
    delay?: number,
    stores?: Stores,
    income?: number
};
export type TempEnum = {
    Freezing: EnumItem,
    Cold: EnumItem,
    Mild: EnumItem,
    Warm: EnumItem,
    Hot: EnumItem,
} & EnumFunc
export type FireEnum = {

    Dead: EnumItem,
    Smoldering: EnumItem,
    Flickering: EnumItem,
    Burning: EnumItem,
    Roaring: EnumItem,
} & EnumFunc;
export type EffectAudio = {
    source: AudioBufferSourceNode,
    envelope?: GainNode,
}
export type StateUpdate = {
    callbacks: Function[],
    subscribe: Function,
    publish: (data: any) => void,

}
export type Offset = { top: number; left: number; };
export type Outfit = Record<string, number>;
export type Setpieces = Record<string, any>;
export type LootList = Record<string, any>;
export type Mod = Record<string, number>;
export type HeaderOptions = any;
export type ButtonOptions = any;
export type EngineInitOptions = any;
export type PrestigeOptions = any;
export type EventOptions = any;
export type RoomOptions = any;
export type OutsideOptions = any;
export type WorldOptions = any;
export type PathOptions = any;
export type ShipOptions = any;
export type SpaceOptions = any;
export type AnimateOptions = any;
export type ScoreOptions = any;
export type IncomeOptions = any;
export type StateManagerOptions = any;
export type EngineModule = any;
export type Executioner = any;
export type StateResult = any;
export type Craftables = Record<string, Craftable>;
export type Enemies = Record<string, Enemy>;
export type Craftable = any;
export type Enemy = any;
export type Store = any;
export type Stores = Record<string, Store>;
export type StateUpdateEvent = any;



export type WorkerResponseType = "Pong" | "WorkerInit" | "Refresh";
export type WorkerRequestType = "Ping";
export type WorkerResponse = { type: WorkerResponseType; args: unknown[]; };
export type WorkerRequest = { type: WorkerRequestType; args: unknown[]; };