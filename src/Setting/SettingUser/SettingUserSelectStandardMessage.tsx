import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserSelectStandardMessage from './Hook/useSettingUserSelectStandardMessage';
import ModalComponent from '../../Common/ModalComponent';
import SettingUserSelectStandardIconList from './SettingUserSelectStandardIconList';


//外側のスタイル
const OuterDiv = styled.div`
    display:flex;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    margin-right:10%;
    white-space: nowrap;
`;

//タイトルのスタイル
const TitleSpan = styled.span<{ isInactive: boolean }>`
    color:blue;
    cursor:${({ isInactive }) => (isInactive ? '' : 'pointer')};
    opacity: ${({ isInactive }) => (isInactive ? '0.7' : '1')};
    white-space: nowrap;
`;

//引数の型
type propsType = {
    isInactive: boolean,
    iconUrl: string | undefined,
    setIconUrl: (e: string) => void,
}

function SettingUserSelectStandardMessage(props: propsType) {

    console.log("SettingUserSelectStandardMessage render");

    const {
        isModalOpen,
        onFlag,
        offFlag
    } = useSettingUserSelectStandardMessage();

    return (
        <OuterDiv>
            <TitleDiv>
                標準の画像
            </TitleDiv>
            <TitleSpan
                isInactive={props.isInactive}
                onClick={props.isInactive ? () => { } : onFlag}
            >
                アイコンを選択する
            </TitleSpan>
            {/* アイコン選択モーダル */}
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <SettingUserSelectStandardIconList
                    width='100%'
                    height='100%'
                    iconUrl={props.iconUrl}
                    setIconUrl={props.setIconUrl}
                    closeModal={offFlag}
                />
            </ModalComponent>
        </OuterDiv>
    );
}
export default SettingUserSelectStandardMessage;