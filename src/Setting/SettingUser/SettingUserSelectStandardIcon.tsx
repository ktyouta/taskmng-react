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
const IconImg = styled.img<{ height: string | undefined, width: string | undefined, }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    border-radius: 50%;
    background-size: cover;
    background-position: center; 
`;


//引数の型
type propsType = {
    width: string,
    height: string,
    iconUrl: string,
    setIconUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedIconUrl: string,
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
                width={props.width}
                height={props.height}
                src={props.iconUrl}
                onClick={() => {
                    clickImg(props.iconUrl);
                }}
            />
        </OuterDiv>
    );
}
export default SettingUserSelectStandardIcon;