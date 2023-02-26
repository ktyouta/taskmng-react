import React, { ReactElement } from 'react';
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
        width:'60%',
        height:'70%',
        transform: 'translate(-50%, -50%)',
    },
};

//引数の型
type propsType = {
    component: JSX.Element,
    icon:IconType,
    onclick: () => void,
}

function ModalComponent(props: propsType) {

    //モーダル開閉用フラグ
    const [modalIsOpen, setIsOpen] = React.useState(false);

    //モーダルを開く
    function openModal() {
        if (props.onclick) {
            props.onclick();
        }
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    //モーダルを閉じる
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <IconComponent icon={props.icon} onclick={openModal}/>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >
                {props.component}
            </Modal>
        </div>
    );
}

export default ModalComponent;