import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { BrowserDevice, Engine, Worker, createGame, engineContainer } from '../lib.js';
import { Browser } from './Browser.js';
import { GOAPAction, GOAPPlan, GOAPState } from '../../../worker/third/goap/index.js';

export function Body() {
  const [inspectItem, setInspectItem] = React.useState<GOAPPlan | null>(null);
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
  function formatState(state: GOAPState) {
    return Object.entries(state).map(([key, value]) => key + ":" + value);
  }
  function formatPlan(inspectItem: any | null): string | number | readonly string[] | undefined {
    if (inspectItem === null) {
      return "";
    }
    const actions = (inspectItem.actions as Array<any>).reduce<Record<string, GOAPAction>>((acc, cur) => {
      acc[cur.name] = cur;
      return acc;
    }, {})
    return `name: ${inspectItem.name}\nactions:\n${Object.entries(actions).map(([key, action]) => `${key}: state:${formatState(action.preconditions)}`).join("\n")}`;
  }

  return (
    <>
      <ReactBootstrap.Col>
        <p>aside-left</p>
        <textarea onClick={() => { setDrawcalls(engineContainer.engine?.renderCalls || []) }} cols={50} rows={40} readOnly value={drawcalls.join("\n")}></textarea>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <ReactBootstrap.Row>
          <canvas ref={canvasGLRef}></canvas>
          <canvas hidden ref={canvas2DRef}></canvas>
        </ReactBootstrap.Row>
        <Browser onSelectItem={(plan) => setInspectItem(plan)}></Browser>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <p>aside-right</p>
        <textarea cols={50} rows={40} readOnly value={formatPlan(inspectItem)}></textarea>
      </ReactBootstrap.Col>
    </>
  );
}
