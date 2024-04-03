import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import { Header } from './Header';
import { Container } from './Container';


function App() {
  const [show, setShow] = React.useState(false);
  return (
    <ReactBootstrap.Container>
      <ReactBootstrap.Row>
        <Header onToggleOffcanvas={() => setShow(true)}></Header>
      </ReactBootstrap.Row>
      <ReactBootstrap.Row>
        <Container show={show} onHide={() => setShow(false)}></Container>
      </ReactBootstrap.Row>
    </ReactBootstrap.Container>
  )
}

export default App