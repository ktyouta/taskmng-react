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
import CheckBoxComponent from '../../Common/CheckBoxComponent';
import { editModeEnum } from '../Const/SettingConst';
import useSettingCategoryEditMain from './Hook/useSettingCategoryEditMain';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

const MainDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 8%;
    box-sizing: border-box;
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    categoryId: string | undefined,
    path: string | undefined,
    setPath: React.Dispatch<React.SetStateAction<string | undefined>>,
    name: string | undefined,
    setName: React.Dispatch<React.SetStateAction<string | undefined>>,
    isHidden: string | undefined,
    setIsHidden: React.Dispatch<React.SetStateAction<string | undefined>>,
    registerTime: string,
    updTime: string,
    editMode: number,
    id: string,
}


function SettingCategoryEditMain(props: propsType) {

    console.log("SettingCategoryMain render");

    const { isEditableAuth } = useSettingCategoryEditMain();

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                {
                    props.editMode === editModeEnum.update &&
                    <HorizonLabelItemComponent
                        title={'ID'}
                        width='30%'
                        position='left'
                    >
                        {props.id}
                    </HorizonLabelItemComponent>
                }
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
                            disabled={!isEditableAuth}
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
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カテゴリを表示しない'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isHidden !== undefined &&
                        <CheckBoxComponent
                            value={props.isHidden}
                            htmlForId={'categoryValue'}
                            initValue={props.isHidden === "1"}
                            onChange={(e) => {
                                props.setIsHidden(e === "0" ? "1" : "0");
                            }}
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>
                {
                    props.editMode === editModeEnum.update &&
                    <HorizonLabelItemComponent
                        title={'登録日'}
                        width='30%'
                        position='left'
                    >
                        {props.registerTime}
                    </HorizonLabelItemComponent>
                }
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

export default SettingCategoryEditMain;