import React, { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { IconType } from 'react-icons';
import IconComponent from './IconComponent';
import './css/ModalComponent.css';
import LabelComponent from './LabelComponent';


//引数の型
type propsType = {
    title: string,
    titleWidth?: string,
    children: ReactNode,
}

function HrizonLabelItemComponent(props: propsType) {

    return (
        <React.Fragment>
            <LabelComponent
                {...props}
            />
            {props.children}
        </React.Fragment>
    );
}

export default HrizonLabelItemComponent;