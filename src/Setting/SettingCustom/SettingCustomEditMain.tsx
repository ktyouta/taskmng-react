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
import LabelRadioListComponent from '../../Common/LabelRadioListComponent';
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
    outerHeight: string,
}


function SettingCustomEditMain(props: propsType) {

    console.log("SettingCustomMain render");

    const {
        isLoadinGetCustomAttribute,
        errMessage,
        caNm,
        setCaNm,
        caDescription,
        setCaDescription,
        caType,
        setCaType,
        caRequired,
        setCaRequired,
        addSelectElement,
        selectElementList,
        caSelectList, } = useSettingCustomEditMain();

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
                        caNm !== undefined &&
                        <BaseInputComponent
                            value={caNm}
                            length={50}
                            onChange={setCaNm}
                        />
                    }

                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の説明'}
                    width='30%'
                >
                    {
                        caDescription !== undefined &&
                        <BaseInputComponent
                            value={caDescription}
                            length={50}
                            onChange={setCaDescription}
                        />
                    }

                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'カスタム属性の形式'}
                    width='30%'
                >
                    {
                        caSelectList && caType !== undefined &&
                        <LabelRadioListComponent
                            radioList={caSelectList}
                            selectedValue={caType}
                            onChange={setCaType}
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
                        htmlForId={''}
                        initValue={caRequired}
                        onChangeBl={setCaRequired}
                    />
                    {
                        (() => {
                            switch (caType) {
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
                                                    selectElementList && selectElementList.map((element) => {
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
                {
                    (() => {
                        switch (caType) {
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
                                                    onclick={addSelectElement}
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

            </MainDiv>
        </OuterDiv>
    );
}

export default SettingCustomEditMain;