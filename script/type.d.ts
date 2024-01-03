declare type WorkerResponse =
    { type: "GameInit"; }
    | { type: "Pong"; args: [1, 2, 3]; }
    | { type: "Refresh"; }
    | { type: "ToggleUI"; }

    | never;
declare type WorkerRequest =
    { type: "Ping"; args: ["Hello"]; }
    | {type: "Game"}
    
    | never;