import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserSelectStandardMessage from './Hook/useSettingUserSelectStandardMessage';
import ModalComponent from '../../Common/ModalComponent';
import SettingUserSelectStandardIconList from './SettingUserSelectStandardIconList';
import FileUploadComponent from '../../Common/FileUploadComponent';


//外側のスタイル
const OuterDiv = styled.div`
    display:flex;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    margin-right:4%;
    white-space: nowrap;
`;



//引数の型
type propsType = {
}

function SettingUserSelectOriginalMessage(props: propsType) {

    console.log("SettingUserSelectOriginalMessage render");

    return (
        <OuterDiv>
            <TitleDiv>
                画像をアップロードする
            </TitleDiv>
            <FileUploadComponent
                onChange={function (): void {
                    throw new Error('Function not implemented.');
                }}
                id={undefined}
            />
        </OuterDiv>
    );
}
export default SettingUserSelectOriginalMessage;