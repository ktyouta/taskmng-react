import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserSelectStandardMessage from './Hook/useSettingUserSelectStandardMessage';
import ModalComponent from '../../Common/ModalComponent';
import useSettingUserSelectStandardIcon from './Hook/useSettingUserSelectStandardIconList';
import useSettingUserSelectStandardIconList from './Hook/useSettingUserSelectStandardIconList';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined, width: string | undefined }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    background-color: blue;
    border-radius: 8px;
    padding-left: 1%;
    color: white;
    height: 5%;
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
`;


//引数の型
type propsType = {
    width: string,
    height: string,
    iconUrl: string | undefined,
    setIconUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
}

function SettingUserSelectStandardIconList(props: propsType) {

    console.log("SettingUserSelectStandardIconList render");

    const {
        iconList
    } = useSettingUserSelectStandardIconList({ ...props });

    return (
        <OuterDiv
            width={props.width}
            height={props.height}
        >
            <TitleDiv>
                標準アイコン一覧
            </TitleDiv>
        </OuterDiv>
    );
}
export default SettingUserSelectStandardIconList;