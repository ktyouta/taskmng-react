import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined, width: string | undefined }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
`;

//アイコンのスタイル
const IconImg = styled.img<{
    height: string | undefined,
    width: string | undefined,
    isSelected: boolean,
    isHoverLine?: boolean,
    isPointer?: boolean,
}>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    cursor:${({ isPointer }) => (isPointer ? "pointer" : "")}; 
    &:hover {
        outline: ${({ isHoverLine }) => (isHoverLine ? "4px solid #00bfff" : "")};
    }
    outline: ${({ isSelected }) => (isSelected ? "4px solid #ff00ff" : "")};
`;


//引数の型
type propsType = {
    width: string,
    height: string,
    iconUrl: string,
    selectedIconUrl?: string,
    clickIcon?: (e: string,) => void,
    isHoverLine?: boolean,
    outerStyle?: { [key: string]: string, },
    imgStyle?: { [key: string]: string, },
}


function UserIconComponent(props: propsType) {

    console.log("UserIconComponent render");

    return (
        <OuterDiv
            width={props.width}
            height={props.height}
            style={props.outerStyle}
        >
            <IconImg
                width='95%'
                height='95%'
                isSelected={props.iconUrl === props.selectedIconUrl}
                isHoverLine={props.isHoverLine}
                isPointer={!!props.clickIcon}
                src={props.iconUrl}
                onClick={() => {
                    if (props.clickIcon) props.clickIcon(props.iconUrl);
                }}
                style={props.imgStyle}
            />
        </OuterDiv>
    );
}
export default UserIconComponent;