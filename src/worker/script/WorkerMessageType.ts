export type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "EngineInit"; }
    | { type: "Pong"; args: [1, 2, 3]; }
    | { type: "Refresh"; }
    | { type: "ToggleUI"; }
    | { type: "CreateMessageUI"; }

    | never;
export type WorkerRequest =
    { type: "Ping"; args: ["Hello"]; }
    | { type: "GameInit"; }

    | never;