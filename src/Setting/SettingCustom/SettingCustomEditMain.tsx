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
import { editModeEnum } from '../Const/SettingConst';
import ComboComponent from '../../Common/ComboComponent';
import useSettingCustomEditMain from './Hook/useSettingCustomEditMain';


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
    caNm: string | undefined,
    caDescription: string | undefined,
    caType: string | undefined,
    caRequired: boolean | undefined,
    selectElementList: inputRefType[],
    setCaNm: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaDescription: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaRequired: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    caSelectList: radioType[] | undefined,
    addSelectElement: () => void,
    deleteSelectElement: () => void,
    registerTime: string,
    updTime: string,
    editMode: number,
    customAttributeId: string,
    authList: radioType[] | undefined,
    caAuth: string | undefined,
    setCaAuth: React.Dispatch<React.SetStateAction<string | undefined>>,
}


function SettingCustomEditMain(props: propsType) {

    console.log("SettingCustomMain render");

    const { isEditableAuth } = useSettingCustomEditMain();

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
                        {props.customAttributeId}
                    </HorizonLabelItemComponent>
                }
                <HorizonLabelItemComponent
                    title={'カスタム属性の名称'}
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
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>

                <HorizonLabelItemComponent
                    title={'カスタム属性の説明'}
                    width='30%'
                    position='left'
                >
                    {
                        props.caDescription !== undefined &&
                        <BaseTextAreaComponent
                            value={props.caDescription}
                            length={50}
                            onChange={props.setCaDescription}
                            textWidth='80%'
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>

                <HorizonLabelItemComponent
                    title={'カスタム属性の形式'}
                    width='30%'
                    position='left'
                >
                    {
                        //カスタム属性の形式リスト
                        props.caSelectList && props.caType !== undefined &&
                        <LabelRadioListComponent
                            radioList={props.caSelectList}
                            selectedValue={props.caType}
                            onChange={props.setCaType}
                            width='auto'
                            radioGap='5%'
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>

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
                            disabled={!isEditableAuth}
                        />
                    }
                </HorizonLabelItemComponent>

                {
                    (() => {
                        switch (props.caType) {
                            //選択形式
                            case "select":
                            case "radio":
                            case "checkbox":
                                return (
                                    <React.Fragment>
                                        <HorizonLabelItemComponent
                                            title={''}
                                            width='30%'
                                            position='left'
                                            outerStyle={{
                                                "height": "11%"
                                            }}
                                            elementStyle={{
                                                "height": "100%"
                                            }}
                                        >
                                            <HorizontalComponent
                                                style={{
                                                    "height": "100%"
                                                }}
                                            >
                                                <ButtonComponent
                                                    styleTypeNumber="GRAD_RED"
                                                    title={"選択項目を削除"}
                                                    onclick={props.deleteSelectElement}
                                                    style={{
                                                        "fontSize": "0.9rem",
                                                        "height": "80%",
                                                        "width": "20%",
                                                    }}
                                                    disabled={!isEditableAuth}
                                                />
                                                <SpaceComponent
                                                    space={"1%"}
                                                />
                                                <ButtonComponent
                                                    styleTypeNumber="GRAD_BLUE"
                                                    title={"選択項目を追加"}
                                                    onclick={props.addSelectElement}
                                                    style={{
                                                        "fontSize": "0.9rem",
                                                        "height": "80%",
                                                        "width": "20%",
                                                    }}
                                                    disabled={!isEditableAuth}
                                                />
                                            </HorizontalComponent>
                                        </HorizonLabelItemComponent>
                                        <HorizonLabelItemComponent
                                            title={'選択項目'}
                                            width='30%'
                                            position='left'
                                        >
                                            {
                                                props.selectElementList && props.selectElementList.map((element) => {
                                                    return (
                                                        <React.Fragment>
                                                            <BaseInputComponent
                                                                value={element.value}
                                                                ref={element.ref}
                                                                length={10}
                                                                textWidth='80%'
                                                                disabled={!isEditableAuth}
                                                            />
                                                            <VerticalSpaceComponent
                                                                space={'5px'}
                                                            />
                                                        </React.Fragment>
                                                    );
                                                })
                                            }
                                        </HorizonLabelItemComponent>
                                    </React.Fragment>
                                )
                            default:
                                return (
                                    <React.Fragment></React.Fragment>
                                )
                        }
                    })()
                }
                {
                    props.authList &&
                    props.authList.length > 1 &&
                    props.caAuth !== undefined &&
                    <HorizonLabelItemComponent
                        title={'権限'}
                        width='30%'
                        position='left'
                    >
                        <ComboComponent
                            combo={props.authList}
                            initValue={props.caAuth}
                            onChange={props.setCaAuth}
                            disabled={!isEditableAuth}
                        />
                    </HorizonLabelItemComponent>
                }
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

export default SettingCustomEditMain;