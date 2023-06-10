import React, { ReactElement, ReactNode } from 'react';
import Modal from 'react-modal';
import { IconType } from 'react-icons';
import IconComponent from './IconComponent';
import './css/ModalComponent.css';
import LabelComponent from './LabelComponent';
import styled from 'styled-components';
import { jsx } from '@emotion/react';


//引数の型
type propsType = {
    title: string | JSX.Element,
    labelWidth?: string,
    children: ReactNode,
}

const OuterDiv = styled.div`
    padding-top: 2%;
    padding-bottom: 1%;
    display: flex;
    align-items: center;
`;


function HorizonLabelItemComponent(props: propsType) {

    return (
        <OuterDiv>
            <LabelComponent
                {...props}
            />
            {props.children}
        </OuterDiv>
    );
}

export default HorizonLabelItemComponent;