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
import SettingUserSelectStandardIcon from './SettingUserSelectStandardIcon';
import UserIconComponent from '../../Common/UserIconComponent';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

//入力欄のスタイル
const MainDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 2%;
`;

//選択アイコンのスタイル
const SelectedIconDiv = styled.div`
    
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
    iconUrl: string | undefined,
    setIconUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
    iconType: string | undefined,
    setIconType: React.Dispatch<React.SetStateAction<string | undefined>>,
    isEditable: boolean,
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
                {
                    props.isEditable &&
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
                }
                <HorizonLabelItemComponent
                    title={'ユーザー名'}
                    width='30%'
                    position='left'
                >
                    {
                        props.userName !== undefined &&
                        <React.Fragment>
                            {
                                props.isEditable ?
                                    <BaseInputComponent
                                        value={props.userName}
                                        length={50}
                                        onChange={props.setUserName}
                                        textWidth='80%'
                                    />
                                    :
                                    <div>
                                        {props.userName}
                                    </div>
                            }
                        </React.Fragment>
                    }
                </HorizonLabelItemComponent>
                {
                    props.isEditable &&
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
                }
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
                    title={
                        <SelectedIconDiv>
                            アイコン
                            {
                                props.iconType !== undefined &&
                                props.iconType !== SELECT_ICON_TYPE.NO_SELECT &&
                                props.iconUrl &&
                                <UserIconComponent
                                    width='25%'
                                    height='20%'
                                    iconUrl={props.iconUrl ?? ""}
                                    outerStyle={{ "margin-left": "auto", "margin-right": "auto", "margin-top": "3%" }}
                                />
                            }
                        </SelectedIconDiv>
                    }
                    width='30%'
                    position='left'
                    outerHeight='20%'
                >
                    {
                        props.isEditable &&
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
                                        iconUrl={props.iconUrl}
                                        setIconUrl={props.setIconUrl} />
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