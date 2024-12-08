import React, { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { IconType } from 'react-icons';
import IconComponent from './IconComponent';
import './css/ModalComponent.css';


//引数の型
type propsType = {
    modalIsOpen: boolean,
    closeModal?: () => void,
    children: ReactNode,
    width?: string,
    height?: string,
    positionTop?: string,
    positionLeft?: string,
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
                    top: props.positionTop ?? '5%',
                    left: props.positionLeft ?? '15%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    width: props.width ?? '70%',
                    height: props.height ?? '85%',
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