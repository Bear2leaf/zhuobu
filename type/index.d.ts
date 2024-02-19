///<reference path="./wx/index.d.ts"/>

declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Refresh"; }
    | { type: "SendState"; broadcast: true; args: [Record<string, string>] }
    | { type: "SendModelTranslation"; broadcast: true; args: [[number, number, number]] }
    | { type: "RequestSync"; broadcast: true }



    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [Record<string, string>]; broadcast?: boolean }
    | { type: "GetState"; }
    | { type: "ChangeModelTranslation"; broadcast: true; args: [[number, number, number]] }
    | never;

declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; ratio: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void