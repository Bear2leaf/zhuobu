import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { BrowserDevice, Engine, Worker, createGame, engineContainer } from '../lib.js';

export function Body() {
  const canvasGLRef = React.useRef<HTMLCanvasElement>(null);
  const canvas2DRef = React.useRef<HTMLCanvasElement>(null);
  const [engineLoaded, setEngineLoaded] = React.useState(false);
  React.useEffect(() => {
    if (engineLoaded) {
      return;
    }
    createGame(canvasGLRef.current!, canvas2DRef.current!);
    const engine = engineContainer.engine!;
    setEngineLoaded(true);
    return () => {
      engine.stop();
      engine.clean();
    };
  }, [engineLoaded]);
  return (
    <>
      <ReactBootstrap.Col>
        aside-left
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <canvas ref={canvasGLRef}></canvas>
        <canvas hidden ref={canvas2DRef}></canvas>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        aside-right
      </ReactBootstrap.Col>
    </>
  );
}
