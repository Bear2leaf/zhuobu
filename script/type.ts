export type WorkerResponseType = "Pong" | "WorkerInit" | "Refresh";
export type WorkerRequestType = "Ping";
export type WorkerResponse = { type: WorkerResponseType; args: unknown[]; };
export type WorkerRequest = { type: WorkerRequestType; args: unknown[]; };