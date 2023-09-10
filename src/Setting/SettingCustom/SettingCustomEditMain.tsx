import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingCustomEditMain from './Hook/useSettingCustomEditMain';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelCheckBoxComponent from '../../Common/LabelCheckBoxComponent';
import HorizonLabelRadioListComponent from '../../Common/HorizonLabelRadioListComponent';
import LabelRadioListComponent, { radioType } from '../../Common/LabelRadioListComponent';
import { inputRefType } from '../Type/SettingType';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

const MainDiv = styled.div`
    height: 100%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 2%;
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    caNm: string | undefined,
    caDescription: string | undefined,
    caType: string | undefined,
    caRequired: boolean,
    selectElementList: inputRefType[],
    setCaNm: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaDescription: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaRequired: React.Dispatch<React.SetStateAction<boolean>>,
    caSelectList: radioType[] | undefined,
    addSelectElement: () => void,
}


function SettingCustomEditMain(props: propsType) {

    console.log("SettingCustomMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'カスタム属性の名称'}
                    width='30%'
                >
                    {
                        props.caNm !== undefined &&
                        <BaseInputComponent
                            value={props.caNm}
                            length={50}
                            onChange={props.setCaNm}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の説明'}
                    width='30%'
                >
                    {
                        props.caDescription !== undefined &&
                        <BaseInputComponent
                            value={props.caDescription}
                            length={50}
                            onChange={props.setCaDescription}
                        />
                    }

                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の形式'}
                    width='30%'
                >
                    {
                        //カスタム属性の形式リスト
                        props.caSelectList && props.caType !== undefined &&
                        <LabelRadioListComponent
                            radioList={props.caSelectList}
                            selectedValue={props.caType}
                            onChange={props.setCaType}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'属性の設定'}
                    width='30%'
                >
                    <LabelCheckBoxComponent
                        title={'必須項目とする'}
                        value={''}
                        htmlForId={'requiredItem'}
                        initValue={props.caRequired}
                        onChangeBl={props.setCaRequired}
                    />
                    {
                        (() => {
                            switch (props.caType) {
                                //選択形式
                                case "select":
                                case "radio":
                                case "checkbox":
                                    return (
                                        <React.Fragment>
                                            <div>
                                                {
                                                    <ButtonComponent
                                                        styleTypeNumber="RUN"
                                                        title={"要素を追加"}
                                                        onclick={props.addSelectElement}
                                                    />
                                                }
                                            </div>
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
                        //カスタム属性の選択リスト
                        (() => {
                            switch (props.caType) {
                                //選択形式
                                case "select":
                                case "radio":
                                case "checkbox":
                                    return (
                                        <React.Fragment>
                                            <div>
                                                項目
                                            </div>
                                            <div>
                                                {
                                                    props.selectElementList && props.selectElementList.map((element) => {
                                                        return (
                                                            <BaseInputComponent
                                                                value={element.value}
                                                                ref={element.ref}
                                                                length={10}
                                                            />
                                                        );
                                                    })
                                                }
                                            </div>
                                        </React.Fragment>
                                    )
                                default:
                                    return (
                                        <React.Fragment></React.Fragment>
                                    )
                            }
                        })()
                    }
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingCustomEditMain;