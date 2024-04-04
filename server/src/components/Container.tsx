import * as React from 'react';
import { BrowserDevice, Engine, Worker } from '../lib.js';

export function Container() {
  const canvasGLRef = React.useRef<HTMLCanvasElement>(null);
  const canvas2DRef = React.useRef<HTMLCanvasElement>(null);
  const [engineLoaded, setEngineLoaded] = React.useState(false);
  React.useEffect(() => {
    if (engineLoaded) {
      return;
    }
    const device = new BrowserDevice(canvasGLRef.current!, canvas2DRef.current!);
    device.setWorker(new Worker());
    const engine = new Engine(device);
    engine.start();
    setEngineLoaded(true);
    return () => {
      engine.stop();
      engine.clean();
    };
  }, [engineLoaded]);
  return (
    <>
      <canvas ref={canvasGLRef}></canvas>
      <canvas ref={canvas2DRef}></canvas>
    </>
  );
}
