export type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "GameInit"; }
    | { type: "Pong"; args: [1, 2, 3]; }
    | { type: "Refresh"; }
    | { type: "Reconnect"; }
    | { type: "ToggleUI"; }
    | { type: "CreateMessageUI"; }
    | { type: "AddMessage"; args: [string] }

    | never;
export type WorkerRequest =
    { type: "Ping"; args: ["Hello"]; }
    | { type: "EngineInit"; }

    | never;