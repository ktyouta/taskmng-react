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
import useSettingUserSelectOriginalMessage from './Hook/useSettingUserSelectOriginalMessage';
import CropperModalComponent from '../../Common/CropperModalComponent';
import CropModalComponent from '../../Common/CropModalComponent';
import { InputProfilePicture } from '../../Common/InputProfilePicture';


//外側のスタイル
const OuterDiv = styled.div`
    display:flex;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    margin-right:4%;
    white-space: nowrap;
`;

//タイトルのスタイル
const TitleSpan = styled.span<{ isInactive: boolean }>`
    opacity: ${({ isInactive }) => (isInactive ? '0.7' : '1')};
    white-space: nowrap;
`;

//引数の型
type propsType = {
    isInactive: boolean,
    setIconUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
}

function SettingUserSelectOriginalMessage(props: propsType) {

    console.log("SettingUserSelectOriginalMessage render");

    const {
        isModalOpen,
        onFlag,
        offFlag
    } = useSettingUserSelectOriginalMessage();

    return (
        <OuterDiv>
            <TitleDiv>
                オリジナルの画像
            </TitleDiv>
            <TitleSpan
                isInactive={props.isInactive}
            >
                <InputProfilePicture />
                {/*<CropModalComponent />*/}
                {/* <FileUploadComponent
                    onChange={props.setIconUrl}
                    disabled={props.isInactive}
                /> */}
            </TitleSpan>
        </OuterDiv>
    );
}
export default SettingUserSelectOriginalMessage;