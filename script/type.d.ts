declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Pong"; args: [1, 2, 3]; }
    | { type: "Refresh"; }

    | never;
declare type WorkerRequest =
    { type: "Ping"; args: ["Hello"]; }
    | {type: "Join"}
    
    | never;