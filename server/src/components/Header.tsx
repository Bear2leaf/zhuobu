import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Title } from './Title';

export function Header() {
  return (
    <>
      <ReactBootstrap.Col>
        <Title></Title>
      </ReactBootstrap.Col>
      <ReactBootstrap.Col>
        <ReactBootstrap.Button>Hah2</ReactBootstrap.Button>
      </ReactBootstrap.Col>
    </>
  );
}


