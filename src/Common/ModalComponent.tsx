import React, { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { IconType } from 'react-icons';
import IconComponent from './IconComponent';
import './css/ModalComponent.css';


//引数の型
type propsType = {
    modalIsOpen: boolean,
    closeModal: () => void,
    children: ReactNode,
}

function ModalComponent(props: propsType) {

    return (
        <Modal
            isOpen={props.modalIsOpen}
            //onAfterOpen={props.openModal}
            onRequestClose={props.closeModal}
            style={{
                content: {
                    position: 'fixed',
                    top: '5%',
                    left: '15%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    width: '70%',
                    height: '85%',
                }
            }}
            ariaHideApp={false}
            contentLabel="Example Modal"
            overlayClassName="Overlay"
        >
            {props.children}
        </Modal>
    );
}

export default ModalComponent;