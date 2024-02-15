/// <reference path="./wx/index.d.ts" />

declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "GameInit"; }
    | { type: "Pong"; args: [1, 2, 3]; }
    | { type: "Refresh"; }
    | { type: "Reconnect"; }
    | { type: "ToggleUI"; }
    | { type: "CreateMessageUI"; }
    | { type: "AddMessage"; args: [string] }
    | { type: "UpdateStatus"; args: [string] }
    | { type: "UpdateEagleVisible"; args: [boolean] }
    | { type: "UpdateWhalesVisible"; args: [boolean] }
    | { type: "UpdateResourceProgress"; args: [number] }


    | { type: "HelloCompInitWorker"; }
    | { type: "SendCameraFov"; args: [string] }

    | never;
declare type WorkerRequest =
    { type: "Ping"; args: ["Hello"]; }
    | { type: "EngineInit"; }
    | { type: "Explore"; }
    | { type: "Rest"; }
    | { type: "HelloCompInit"; }

    | { type: "GetCameraFov"; }
    | { type: "UpdateCamera"; args: [number] }

    | never;
