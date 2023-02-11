import React from 'react';
import ReactDom from 'react-dom';

import './Modal.css';



function Backdrop(props) {
    return <div className="backdrop" onClick={props.onHideModal}></div>
};

function ModalOverlay(props) {
    return <div className="modal">
        <div className="content">{props.children}</div>
    </div>
};


const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop onHideModal={props.onHideModal}/>, portalElement)}
            {ReactDom.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
}


export default Modal;