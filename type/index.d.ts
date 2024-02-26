///<reference path="./wx/index.d.ts"/>

declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Refresh"; }
    | { type: "SendState"; broadcast: true; args: [StateData] }
    | { type: "SendUniforms"; broadcast: true; args: [string, ...{ name: string, value: number[] }[]] }
    | { type: "SendAttributes"; broadcast: true; args: [string, ...{ name: string, value: number[] }[]] }
    | { type: "RequestSync"; broadcast: true }



    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [StateData]; broadcast?: boolean }
    | { type: "GetState"; }
    | { type: "RequestTerrain"; }
    | { type: "ChangeModelTranslation"; broadcast: true; args: [[number, number, number]] }
    | never;

declare type StateData = {
    modelTranslation?: [number, number ,number];
    animation?: boolean;
    foo?: "bar1";
}
declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; ratio: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void