import * as React from 'react'
import { BrowserDevice, Engine, Worker } from 'src/lib.js';

function Title() {
  const [msg, setMsg] = React.useState("Hello6")
  return (
    <><h1>{msg}</h1></>)
}
function App() {
  const device = new BrowserDevice();
  device.setWorker(new Worker())
  const engine = new Engine(device);
  engine.start();
  return (
    <React.StrictMode>
      <Title></Title>
    </React.StrictMode>
  )
}

export default App