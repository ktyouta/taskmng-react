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
import NumberPickerComponent from '../../Common/NumberPickerComponent';
import { defaultAttributeInputRefType, initRefValueType } from './Type/SettingDefaultType';
import ComboComponent from '../../Common/ComboComponent';
import { editModeEnum } from '../Const/SettingConst';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

const MainDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    padding-top:2%;
    box-sizing: border-box;
    padding-left: 11%;
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    defaultId: string,
    type: string,
    caNm: string | undefined,
    caDescription: string | undefined,
    caType: string | undefined,
    caRequired: boolean | undefined,
    isHidden: boolean | undefined,
    isNewCreateVisible: boolean | undefined,
    typeValue: string,
    length: number | undefined,
    initValue: string | undefined,
    isSettingEditable: boolean,
    selectTypeInitRef: initRefValueType | undefined,
    setCaNm: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaDescription: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCaRequired: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setIsNewCreateVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setLength: React.Dispatch<React.SetStateAction<number | undefined>>,
    setInitValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    registerTime: string,
    updTime: string,
    editMode: number,
    selectElementList: defaultAttributeInputRefType[] | undefined,
    editSelectList: (e: string, index: number) => void,
    isEditableOther: boolean | undefined,
    setIsEditableOther: React.Dispatch<React.SetStateAction<boolean | undefined>>,
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
                    {props.defaultId}
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'名称'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isSettingEditable
                            ?
                            props.caNm !== undefined &&
                            <BaseInputComponent
                                value={props.caNm}
                                length={50}
                                onChange={props.setCaNm}
                                textWidth='80%'
                            />
                            :
                            <React.Fragment>{props.caNm}</React.Fragment>
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'説明'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isSettingEditable
                            ?
                            props.caDescription !== undefined &&
                            <BaseInputComponent
                                value={props.caDescription}
                                length={500}
                                onChange={props.setCaDescription}
                                textWidth='80%'
                            />
                            :
                            <React.Fragment>{props.caDescription}</React.Fragment>
                    }
                </HorizonLabelItemComponent>
                {
                    props.typeValue &&
                    <HorizonLabelItemComponent
                        title={'属性の形式'}
                        width='30%'
                        position='left'
                    >
                        {props.typeValue}
                    </HorizonLabelItemComponent>
                }
                {
                    props.selectElementList &&
                    <HorizonLabelItemComponent
                        title={'選択項目'}
                        width='30%'
                        position='left'
                    >
                        {
                            props.selectElementList.map((element, index) => {
                                return (
                                    <React.Fragment>
                                        <BaseInputComponent
                                            value={element.label}
                                            ref={element.ref}
                                            length={10}
                                            textWidth='80%'
                                            onChange={(e) => { props.editSelectList(e, index + 1) }}
                                        />
                                        <VerticalSpaceComponent
                                            space={'5px'}
                                        />
                                    </React.Fragment>
                                );
                            })
                        }
                    </HorizonLabelItemComponent>

                }
                {
                    <HorizonLabelItemComponent
                        title={'初期値'}
                        width='30%'
                        position='left'
                    >
                        {
                            props.isSettingEditable
                                ?
                                props.initValue !== undefined ?
                                    <BaseInputComponent
                                        value={props.initValue}
                                        length={50}
                                        onChange={props.setInitValue}
                                        textWidth='80%'
                                    />
                                    :
                                    props.selectTypeInitRef !== undefined &&
                                    <ComboComponent
                                        combo={props.selectTypeInitRef.selectElementList}
                                        initValue={props.selectTypeInitRef.initValue}
                                        ref={props.selectTypeInitRef.ref}
                                    />
                                :
                                <React.Fragment>{props.initValue}</React.Fragment>
                        }
                    </HorizonLabelItemComponent>
                }
                {/* テキストエリアまたはテキストボックスのみnumberpickerを表示する */}
                {
                    props.type &&
                    (props.type === "input" || props.type === "textarea") &&
                    <HorizonLabelItemComponent
                        title={'入力可能文字数'}
                        width='30%'
                        position='left'
                    >
                        {
                            props.length !== undefined &&
                            <NumberPickerComponent
                                value={props.length}
                                onChange={props.setLength}
                            />
                        }
                    </HorizonLabelItemComponent>
                }
                {
                    !props.isHidden &&
                    !props.isNewCreateVisible &&
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
                                disabled={!props.isSettingEditable}
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
                            disabled={!props.isSettingEditable}
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
                            initValue={props.isNewCreateVisible}
                            onChangeBl={props.setIsNewCreateVisible}
                            disabled={!props.isSettingEditable}
                        />
                    }
                </HorizonLabelItemComponent>
                <HorizonLabelItemComponent
                    title={'他ユーザーによる編集可能設定'}
                    width='30%'
                    position='left'
                >
                    {
                        props.isEditableOther !== undefined &&
                        <LabelCheckBoxComponent
                            title={'編集可能項目とする'}
                            value={''}
                            htmlForId={'isEditableOther'}
                            initValue={props.isEditableOther}
                            onChangeBl={props.setIsEditableOther}
                            disabled={!props.isSettingEditable}
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