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
import ComboComponent from '../../Common/ComboComponent';


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
    categoryId: string | undefined,
    path: string | undefined,
    setPath: React.Dispatch<React.SetStateAction<string | undefined>>,
    name: string | undefined,
    setName: React.Dispatch<React.SetStateAction<string | undefined>>,
    componentNm: string | undefined,
    setComponentNm: React.Dispatch<React.SetStateAction<string | undefined>>,
    authList: radioType[] | undefined,
    auth: string | undefined,
    setAuth: React.Dispatch<React.SetStateAction<string | undefined>>,
    registerTime: string,
    updTime: string,
}


function SettingCategoryEditMain(props: propsType) {

    console.log("SettingCategoryMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'パス'}
                    width='30%'
                    position='left'
                >
                    {
                        props.path !== undefined &&
                        <BaseInputComponent
                            value={props.path}
                            length={50}
                            onChange={props.setPath}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'名称'}
                    width='30%'
                    position='left'
                >
                    {
                        props.name !== undefined &&
                        <BaseInputComponent
                            value={props.name}
                            length={50}
                            onChange={props.setName}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'コンポーネント名称'}
                    width='30%'
                    position='left'
                >
                    {
                        props.componentNm !== undefined &&
                        <BaseInputComponent
                            value={props.componentNm}
                            length={50}
                            onChange={props.setComponentNm}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'権限'}
                    width='30%'
                    position='left'
                >
                    {
                        props.authList &&
                        props.auth !== undefined &&
                        <ComboComponent
                            combo={props.authList}
                            initValue={props.auth}
                            disabled={false}
                            onChange={props.setAuth}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'登録日'}
                    width='30%'
                    position='left'
                >
                    {props.registerTime}
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'更新日'}
                    width='30%'
                    position='left'
                >
                    {props.updTime}
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingCategoryEditMain;