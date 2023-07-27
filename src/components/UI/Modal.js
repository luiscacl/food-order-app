
import { Fragment } from 'react';

import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

function BackDrop(props){
    return (
        <div className={classes.backdrop} onClick={props.onShowModalHandler}></div>
    );
}

function ModalOverlay(props){
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

function Modal(props){

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <BackDrop onShowModalHandler={props.onShowModalHandler}/>,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay children={props.children}/>,
                document.getElementById('modal-root')
            )}
        </Fragment>
    );
}

export default Modal;