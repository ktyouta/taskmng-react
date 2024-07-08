import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserSelectStandardMessage from './Hook/useSettingUserSelectStandardMessage';
import ModalComponent from '../../Common/ModalComponent';
import useSettingUserSelectStandardIcon from './Hook/useSettingUserSelectStandardIcon';


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
}

function SettingUserSelectStandardIcon(props: propsType) {

    console.log("SettingUserSelectStandardIcon render");

    const {
        clickImg
    } = useSettingUserSelectStandardIcon({ ...props });

    return (
        <OuterDiv
            width={props.width}
            height={props.height}
        >
            <IconImg
                width='95%'
                height='95%'
                isSelected={props.iconUrl === props.selectedIconUrl}
                isHoverLine={props.isHoverLine}
                isPointer={!!props.clickIcon}
                src={props.iconUrl}
                onClick={() => {
                    clickImg(props.iconUrl);
                }}
            />
        </OuterDiv>
    );
}
export default SettingUserSelectStandardIcon;