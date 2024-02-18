declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Refresh"; }
    | { type: "SendState"; target: "broadcast"; args: [Record<string, string>] }
    | { type: "RequestSync"; target: "broadcast" }



    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [Record<string, string>]; target?: "broadcast" }
    | { type: "GetState"; }

    | never;

declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; ratio: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void