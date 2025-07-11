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
    title: ReactNode,
    width?: string,
    children?: ReactNode,
    color?: string,
    position?: positionType,
    marginLt?: string,
    marginRt?: string,
    marginTp?: string,
    marginBt?: string,
    childWidth?: string,
    outerHeight?: string,
    childHeight?: string,
    outerStyle?: { [key: string]: string },
    elementStyle?: { [key: string]: string }
}

//内部要素の位置の型
type positionType = "left" | "center" | "right";

const OuterDiv = styled.div<{ marginLt?: string, marginRt?: string, marginTp?: string, marginBt?: string, outerHeight?: string }>`
    margin-left:${({ marginLt }) => (marginLt)};
    margin-right:${({ marginRt }) => (marginRt)};
    margin-top:${({ marginTp }) => (marginTp)};
    margin-bottom:${({ marginBt }) => (marginBt)};
    padding-top: 2%;
    padding-bottom: 1%;
    display: flex;
    align-items: center;
    height:${({ outerHeight }) => (outerHeight)};
`;

const ElementDiv = styled.div<{ width?: string, color?: string, position?: positionType, height?: string, }>`
    width:${({ width }) => (width)};
    text-align:${({ position }) => (position)};
    height:${({ height }) => (height)};
    overflow-wrap: break-word;
    box-sizing: border-box;
    padding-left: 5%;
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
        <OuterDiv
            marginLt={props.marginLt}
            marginRt={props.marginRt}
            marginTp={props.marginTp}
            marginBt={props.marginBt}
            outerHeight={props.outerHeight}
            style={props.outerStyle}
        >
            <LabelComponent
                {...props}
            />
            <ElementDiv
                width={props.childWidth ?? sliceWidthStr(props.width)}
                position={props.position}
                height={props.childHeight}
                style={props.elementStyle}
            >
                {props.children}
            </ElementDiv>
        </OuterDiv >
    );
}

export default HorizonLabelItemComponent;