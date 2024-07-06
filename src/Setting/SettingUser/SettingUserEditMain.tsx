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
import { editModeEnum } from '../Const/SettingConst';
import useSettingUserEditMain from './Hook/useSettingUserEditMain';
import { ADMIN_ID, SELECT_ICON_TYPE } from './Const/SettingUserConst';
import RadioComponent from '../../Common/RadioComponent';
import LabelRadioComponent from '../../Common/LabelRadioComponent';
import SettingUserSelectStandardMessage from './SettingUserSelectStandardMessage';


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
    userId: string | undefined,
    id: string | undefined,
    setId: React.Dispatch<React.SetStateAction<string | undefined>>,
    userName: string | undefined,
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>,
    password: string | undefined,
    setPassword: React.Dispatch<React.SetStateAction<string | undefined>>,
    authList: radioType[] | undefined,
    auth: string | undefined,
    setAuth: React.Dispatch<React.SetStateAction<string | undefined>>,
    registerTime: string,
    updTime: string,
    editMode: number,
    userIcon: string | undefined,
    setUserIcon: React.Dispatch<React.SetStateAction<string | undefined>>,
    iconType: string | undefined,
    setIconType: React.Dispatch<React.SetStateAction<string | undefined>>,
}


function SettingUserEditMain(props: propsType) {

    console.log("SettingUserMain render");

    const {
        userInfo
    } = useSettingUserEditMain();

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                <HorizonLabelItemComponent
                    title={'ユーザーID'}
                    width='30%'
                    position='left'
                >
                    {
                        props.id !== undefined &&
                        <BaseInputComponent
                            value={props.id}
                            length={50}
                            onChange={props.setId}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
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
                        <BaseInputComponent
                            value={props.password}
                            length={50}
                            onChange={props.setPassword}
                            textWidth='80%'
                        />
                    }
                </HorizonLabelItemComponent>
                {
                    userInfo && userInfo.auth === ADMIN_ID &&
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
                <HorizonLabelItemComponent
                    title={'アイコン'}
                    width='30%'
                    position='left'
                >
                    {
                        props.iconType !== undefined &&
                        <React.Fragment>
                            <LabelRadioComponent
                                key={'noIconSelect'}
                                title={'アイコンを設定しない'}
                                value={SELECT_ICON_TYPE.NO_SELECT}
                                selectedValue={props.iconType}
                                htmlForId={'noIconSelect'}
                                onChange={props.setIconType}
                                isTitlePositionRight={true}
                            />
                            <LabelRadioComponent
                                key={'standardIconSelect'}
                                title={
                                    <SettingUserSelectStandardMessage
                                        isInactive={props.iconType !== SELECT_ICON_TYPE.STANDARD}
                                    />
                                }
                                value={SELECT_ICON_TYPE.STANDARD}
                                selectedValue={props.iconType}
                                htmlForId={'standardIconSelect'}
                                onChange={props.setIconType}
                                isTitlePositionRight={true}
                            />
                        </React.Fragment>
                    }
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingUserEditMain;