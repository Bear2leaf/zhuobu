///<reference path="./wx/index.d.ts"/>

declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Refresh"; }
    | { type: "SendState"; broadcast: true; args: [StateData] }
    | { type: "SendUniforms"; broadcast: true; args: [string, ...{ name: string, type: '1iv' | '1i' | '1fv' | '2fv' | '3fv' | 'Matrix4fv', value: number[] }[]] }
    | { type: "SendAttributes"; broadcast: true; args: [string, ...{ name: string, type: "FLOAT" | "INT", value: number[], size: number }[]] }
    | { type: "SendInstanceCount"; broadcast: true; args: [string, number] }
    | { type: "SendCreateObjects"; broadcast: true; args: [string[], string[], string[]] }
    | { type: "RequestSync"; broadcast: true }
    | { type: "SendObjectCreated"; broadcast: true }



    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [StateData]; broadcast?: boolean }
    | { type: "GetState"; }
    | { type: "RequestTerrain"; }
    | { type: "RequestLoadStart"; }
    | { type: "RequestObjectCreated"; }
    | { type: "ChangeModelTranslation"; broadcast: true; args: [[number, number, number]] }
    | never;

declare type StateData = {
    modelTranslation?: [number, number, number];
    animation?: boolean;
    foo?: "bar1";
}
declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; ratio: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void