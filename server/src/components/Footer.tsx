import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { engineContainer } from '../lib.js';
export function Footer() {
    const [counter, setCounter] = React.useState(0);
    const [frames, setFrames] = React.useState(0);
    const [delta, setDelta] = React.useState(0);
    const [fps, setFps] = React.useState(0);
    const [now, setNow] = React.useState(0);
    const [elapsed, setElapsed] = React.useState(0);
    const engine = engineContainer.engine;
    React.useEffect(() => {
        const handler = requestAnimationFrame(() => {
            setCounter(counter + 1);
            setFrames(engine?.ticker.frames || 0)
            setDelta(engine?.ticker.delta || 0)
            setFps(engine?.ticker.fps || 0)
            setNow(engine?.ticker.now || 0)
            setElapsed(engine?.ticker.elapsed || 0)
        });
        return () => cancelAnimationFrame(handler)
    }, [counter])
    return (
        <>
            <ReactBootstrap.Col>
                now: {now.toFixed(2)}
            </ReactBootstrap.Col>
            <ReactBootstrap.Col>
                elapsed: {elapsed.toFixed(2)}
            </ReactBootstrap.Col>
            <ReactBootstrap.Col>
                frames: {frames}
            </ReactBootstrap.Col>
            <ReactBootstrap.Col>
                delta: {delta.toFixed(2)}
            </ReactBootstrap.Col>
            <ReactBootstrap.Col>
                fps: {fps.toFixed(2)}
            </ReactBootstrap.Col>
        </>
    );
}


