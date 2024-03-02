
export default interface Device {
  reload(): void;
  getWindowInfo(): WindowInfo;
  contextGL: WebGL2RenderingContext;
  now(): number;
  loadSubpackage(): Promise<null>;
  createImage(): HTMLImageElement;
  createWorker(path: string, onMessageCallback: (data: WorkerResponse, callback: (data: WorkerRequest) => void) => void): void;
  createWebAudioContext(): AudioContext;
  onTouchStart(listener: TouchInfoFunction): void;
  onTouchMove(listener: TouchInfoFunction): void;
  onTouchEnd(listener: TouchInfoFunction): void;
  onTouchCancel(listener: TouchInfoFunction): void;
  readJson(file: string): Promise<Object>;
  readText(file: string): Promise<string>;
  readBuffer(file: string): Promise<ArrayBuffer>;
}

