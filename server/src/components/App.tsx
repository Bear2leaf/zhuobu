import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer.js';


function App() {
  return (
    <ReactBootstrap.Container fluid>
      <ReactBootstrap.Row>
        <Header ></Header>
      </ReactBootstrap.Row>
      <ReactBootstrap.Row>
        <Body></Body>
      </ReactBootstrap.Row>
      <ReactBootstrap.Row>
        <Footer></Footer>
      </ReactBootstrap.Row>
    </ReactBootstrap.Container>
  )
}

export default App