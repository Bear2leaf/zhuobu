import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { BrowserDevice, Engine, Worker } from '../lib.js';

function Offcanvas({ show, onHide }: { show: boolean, onHide: VoidFunction }) {
    return (
        <>
            <ReactBootstrap.Offcanvas show={show}>
                <ReactBootstrap.Offcanvas.Header >
                    <ReactBootstrap.Offcanvas.Title>
                        <ReactBootstrap.Button onClick={onHide}>
                            Hide
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Offcanvas.Title>
                </ReactBootstrap.Offcanvas.Header>
                <ReactBootstrap.Offcanvas.Body>
                    123
                </ReactBootstrap.Offcanvas.Body>
            </ReactBootstrap.Offcanvas>
        </>
    );
}

export default Offcanvas;