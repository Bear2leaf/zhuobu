
type WorkerInitResponse = { type: "WorkerInit"; };
type WorkerRefreshResponse = { type: "Refresh"; };
type WorkerPongResponse = { type: "Pong"; args: unknown[]; };
type WorkerPingRequest = { type: "Ping"; args: unknown[]; };


declare type WorkerResponse = WorkerPongResponse | WorkerInitResponse | WorkerRefreshResponse;
declare type WorkerRequest = WorkerPingRequest;
declare type PostMessageCallback = (data: WorkerRequest) => void;