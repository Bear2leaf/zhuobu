export default interface WorkerDevice {
    onmessage: (data: WorkerRequest) => void;
    emit(data: WorkerResponse): void;
}