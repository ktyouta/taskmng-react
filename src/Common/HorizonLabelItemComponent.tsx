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
    width?: string,
    children: ReactNode,
    color?: string,
}

const OuterDiv = styled.div`
    padding-top: 2%;
    padding-bottom: 1%;
    display: flex;
    align-items: center;
`;

const ElementDiv = styled.div<{ width?: string, color?: string, }>`
    width:${({ width }) => (width)};
`;

/**
 * 横幅の数字のみを取得する
 */
const sliceWidthStr = (str?: string) => {
    if (!str) {
        return undefined;
    }
    let end = "";
    //末尾の文字を削除する
    while (str.length !== 0 && isNaN(Number(str))) {
        end += str.slice(-1);
        str = str.slice(0, -1);
    }
    //不正値
    if (str.length === 0) {
        return undefined;
    }
    //末尾が%,vh以外
    if (end !== "%" && end !== "vh") {
        return undefined;
    }
    //末尾を反転する
    let endArr = end.split("");
    let revEndArr = endArr.reverse();
    end = revEndArr.join();
    return `${100 - Number(str)}${end}`;
}


function HorizonLabelItemComponent(props: propsType) {

    return (
        <OuterDiv>
            <LabelComponent
                {...props}
            />
            <ElementDiv
                width={sliceWidthStr(props.width)}
            >
                {props.children}
            </ElementDiv>
        </OuterDiv >
    );
}

export default HorizonLabelItemComponent;