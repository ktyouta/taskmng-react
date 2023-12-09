import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelCheckBoxComponent from '../../Common/LabelCheckBoxComponent';
import HorizonLabelRadioListComponent from '../../Common/HorizonLabelRadioListComponent';
import LabelRadioListComponent, { radioType } from '../../Common/LabelRadioListComponent';
import { inputRefType } from '../Type/SettingType';
import VerticalSpaceComponent from '../../Common/VerticalSpaceComponent';
import LabelTextAreaComponent from '../../Common/LabelTextAreaComponent';
import BaseTextAreaComponent from '../../Common/BaseTextAreaComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import HorizontalComponent from '../../Common/HorizontalComponent';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

const MainDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 2%;
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    userName: string | undefined,
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>,
    password: string | undefined,
    setPassword: React.Dispatch<React.SetStateAction<string | undefined>>,
}


function SettingUserEditMain(props: propsType) {

    console.log("SettingUserMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'ユーザー名'}
                    width='30%'
                    position='left'
                >
                    {
                        props.userName !== undefined &&
                        <BaseInputComponent
                            value={props.userName}
                            length={50}
                            onChange={props.setUserName}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>

                <HorizonLabelItemComponent
                    title={'パスワード'}
                    width='30%'
                    position='left'
                >
                    {
                        props.password !== undefined &&
                        <BaseTextAreaComponent
                            value={props.password}
                            length={50}
                            onChange={props.setPassword}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingUserEditMain;