import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap';
import { Header } from './Header';
import { Container } from './Container';


function App() {
  return (
    <React.StrictMode>
      <ReactBootstrap.Container>
        <Header></Header>
        <ReactBootstrap.Row>
          <Container></Container>
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>

    </React.StrictMode>
  )
}

export default App