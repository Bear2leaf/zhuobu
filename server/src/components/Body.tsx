import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { BrowserDevice, Engine, Worker, createGame, engineContainer } from '../lib.js';
import { Browser } from './Browser.js';

export function Body() {
  const [inspectItem, setInspectItem] = React.useState("");
  const canvasGLRef = React.useRef<HTMLCanvasElement>(null);
  const canvas2DRef = React.useRef<HTMLCanvasElement>(null);
  const [engineLoaded, setEngineLoaded] = React.useState(false);
  const [drawcalls, setDrawcalls] = React.useState<[string, string, string, string | null, boolean, number | null][]>([]);
  React.useEffect(() => {
    if (engineLoaded) {
      return;
    }
    createGame(canvasGLRef.current!, canvas2DRef.current!);
    const engine = engineContainer.engine!;
    console.log(engine)
    setEngineLoaded(true);
    return () => {
      engine.stop();
    };
  }, [engineLoaded]);
  return (
    <>
      <ReactBootstrap.Col>
        <p>aside-left</p>
        <textarea onClick={() => { setDrawcalls(engineContainer.engine?.renderCalls || []) }} cols={50} rows={40} readOnly value={drawcalls.map(drawcall => drawcall.join(",") + "\n")}></textarea>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <ReactBootstrap.Row>
          <canvas ref={canvasGLRef}></canvas>
          <canvas hidden ref={canvas2DRef}></canvas>
        </ReactBootstrap.Row>
        <ReactBootstrap.Row>
          <Browser onSelectItem={(plan) => setInspectItem(JSON.stringify(plan))}></Browser>
        </ReactBootstrap.Row>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <p>aside-right</p>
        <textarea cols={50} rows={40} readOnly value={inspectItem}></textarea>
      </ReactBootstrap.Col>
    </>
  );
}
