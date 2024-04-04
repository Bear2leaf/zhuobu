import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import { Header } from './Header';
import { Container } from './Container';


function App() {
  const [show, setShow] = React.useState(false);
  return (
    <ReactBootstrap.Container>
      <ReactBootstrap.Row>
        <Header ></Header>
      </ReactBootstrap.Row>
      <ReactBootstrap.Row>
        <Container></Container>
      </ReactBootstrap.Row>
    </ReactBootstrap.Container>
  )
}

export default App