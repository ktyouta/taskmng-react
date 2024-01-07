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
import { editModeEnum } from './SettingDefault';
import NumberPickerComponent from '../../Common/NumberPickerComponent';


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
    id: string | undefined,
    caNm: string | undefined,
    caDescription: string | undefined,
    caType: string | undefined,
    caRequired: boolean | undefined,
    isHidden: boolean | undefined,
    isNewCreateVisible: boolean | undefined,
    typeValue: string,
    setId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaNm: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaDescription: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaRequired: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setIsNewCreateVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    registerTime: string,
    updTime: string,
    editMode: number,
}


function SettingDefaultEditMain(props: propsType) {

    console.log("SettingDefaultMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'ID'}
                    width='30%'
                    position='left'
                >
                    {props.id}
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'名称'}
                    width='30%'
                    position='left'
                >
                    {
                        props.caNm !== undefined &&
                        <BaseInputComponent
                            value={props.caNm}
                            length={50}
                            onChange={props.setCaNm}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'属性の形式'}
                    width='30%'
                    position='left'
                >
                    {props.typeValue}
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'入力可能文字数'}
                    width='30%'
                    position='left'
                >
                    <NumberPickerComponent
                        value={100}
                    />
                </HorizonLabelItemComponent>
                {
                    !props.isHidden &&
                    props.isNewCreateVisible &&
                    <HorizonLabelItemComponent
                        title={'属性の設定'}
                        width='30%'
                        position='left'
                    >
                        {
                            props.caRequired !== undefined &&

                            <LabelCheckBoxComponent
                                title={'必須項目とする'}
                                value={''}
                                htmlForId={'requiredItem'}
                                initValue={props.caRequired}
                                onChangeBl={props.setCaRequired}
                            />
                        }
                    </HorizonLabelItemComponent>
                }
                <HorizonLabelItemComponent
                    title={'表示非表示設定①'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isHidden !== undefined &&
                        <LabelCheckBoxComponent
                            title={'非表示項目とする'}
                            value={''}
                            htmlForId={'isHiddenItem'}
                            initValue={props.isHidden}
                            onChangeBl={props.setIsHidden}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'表示非表示設定②'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isNewCreateVisible !== undefined &&
                        <LabelCheckBoxComponent
                            title={'新規作成時に非表示項目とする'}
                            value={''}
                            htmlForId={'isNewCreateVisibleItem'}
                            initValue={!props.isNewCreateVisible}
                            onChangeBl={props.setIsNewCreateVisible}
                        />
                    }
                </HorizonLabelItemComponent>
                {
                    props.editMode === editModeEnum.update &&
                    <HorizonLabelItemComponent
                        title={'更新日'}
                        width='30%'
                        position='left'
                    >
                        {props.updTime}
                    </HorizonLabelItemComponent>
                }
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingDefaultEditMain;