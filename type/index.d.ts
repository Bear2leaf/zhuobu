///<reference path="./wx/index.d.ts"/>



declare type WorkerResponse =
    | { type: "Refresh"; }
    | { type: "SendState"; broadcast: true; args: [StateData] }

    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [StateData]; broadcast?: boolean }
    | { type: "EngineLoaded"; }
    | never;

declare type GOAPAction = {
    preconditions: GOAPState;
    effects: GOAPState;
    cost: number;
    onExecute: () => void;
    onComplete?: () => void;
}
declare type GOAPPlan = {
    name: string,
    actions: Record<string, GOAPAction>,
    currentState: GOAPState,
    goalState: GOAPState,
    onPlanExecute?: () => void;
    onPlanComplete?: () => void;
    onPlanNotFound?: () => void;
}


declare type GOAPState = Record<string, boolean>;

declare type StateData = {
    changeAttributes?: Record<string, { object: string, name: string, start: number, value: number[] }[]>;
    modelTranslation?: [number, number, number];
    cameras?: Camera[];
    updateCalls?: UpdateCalls;
    animation?: boolean;
    objects?: string[];
    programs?: string[];
    varyings?: string[][];
    textures?: [string, number, string, number | null, boolean?][];
    framebuffers?: string[];
    textureFBOBindings?: string[][];
    attributes?: Record<string, { object: string, name: string, type?: GLType, value: number[], size?: number, divisor?: number }[]>;
    uniforms?: Record<string, { name: string, type: '1iv' | '1i' | '1f' | '2fv' | '3fv' | '4fv' | 'Matrix4fv', value: number[] }[]>;
    renderCalls?: [string, string, string, string | null, boolean, number | null][];
    instanceCounts?: Record<string, number>;
}
declare type Camera = {
    name: string;
    eye?: [number, number, number];
    target?: [number, number, number];
    up?: [number, number, number];
    fieldOfViewYInRadians?: number;
    zNear?: number;
    zFar?: number;
}
declare type UpdateCalls = [string, ...([string, string] | string)[]][];
declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void
declare type GLUniformType = '1iv' | '1i' | '1f' | '2fv' | '3fv' | '4fv' | 'Matrix4fv';
declare type GLType = "FLOAT" | "INT" | "UNSIGNED_BYTE";
