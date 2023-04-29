import React, { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { IconType } from 'react-icons';
import IconComponent from './IconComponent';
import './css/ModalComponent.css';

const customStyles = {
    content: {
        top: '50%',
        left: '55%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '60%',
        height: '70%',
        transform: 'translate(-50%, -50%)',
    },
};

//引数の型
type propsType = {
    modalIsOpen: boolean,
    closeModal: () => void,
    children: ReactNode,
}

function ModalComponent(props: propsType) {

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                //onAfterOpen={props.openModal}
                onRequestClose={props.closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >
                {props.children}
            </Modal>
        </div>
    );
}

export default ModalComponent;