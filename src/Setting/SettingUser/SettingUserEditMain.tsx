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
import { ADMIN_ID, SELECT_ICON_TYPE, USERINFO_ACTION_TYPE } from './Const/SettingUserConst';
import RadioComponent from '../../Common/RadioComponent';
import LabelRadioComponent from '../../Common/LabelRadioComponent';
import SettingUserSelectStandardMessage from './SettingUserSelectStandardMessage';
import UserIconComponent from '../../Common/UserIconComponent';
import FileUploadComponent from '../../Common/FileUploadComponent';
import SettingUserSelectOriginalMessage from './SettingUserSelectOriginalMessage';
import { userInputType } from './Type/SettingUserType';
import ModalComponent from '../../Common/ModalComponent';
import { authType } from '../../Common/Hook/useCheckAuth';
import SettingUserInputAuthList from './SettingUserInputAuthList';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    width: 100%;
    height: ${({ height }) => (height)};
`;

//入力欄のスタイル
const MainDiv = styled.div`
    height: 90%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 8%;
    box-sizing: border-box;
`;

//アイコン選択項目間のスタイル
const MaringDiv = styled.div`
    margin-top:1%;
`;

//タイトルのスタイル
const TitleSpan = styled.span`
    color:blue;
    cursor:pointer;
    white-space: nowrap;
`;

//選択アイコンのスタイル
const SelectedIconDiv = styled.div`
    
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    authList: radioType[] | undefined,
    registerTime: string,
    updTime: string,
    orgIconUrl: string,
    editMode: number,
    isEditable: boolean,
    userDatas: userInputType,
    userDatasDisptch: React.Dispatch<{
        type: string;
        payload?: string;
    }>
    inputUserAuthList: authType[],
    setInputUserAuthList: React.Dispatch<React.SetStateAction<authType[]>>,
}


function SettingUserEditMain(props: propsType) {

    console.log("SettingUserMain render");

    const {
        settingUserAuthority,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
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
                            props.userDatas.userId !== undefined &&
                            <BaseInputComponent
                                value={props.userDatas.userId}
                                length={50}
                                onChange={(e) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ID, payload: e });
                                }}
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
                        props.userDatas.userName !== undefined &&
                        <React.Fragment>
                            {
                                props.isEditable ?
                                    <BaseInputComponent
                                        value={props.userDatas.userName}
                                        length={50}
                                        onChange={(e) => {
                                            props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.NAME, payload: e });
                                        }}
                                        textWidth='80%'
                                    />
                                    :
                                    <div>
                                        {props.userDatas.userName}
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
                            props.userDatas.password !== undefined &&
                            <BaseInputComponent
                                value={props.userDatas.password}
                                length={50}
                                onChange={(e) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.PASS, payload: e });
                                }}
                                textWidth='80%'
                            />
                        }
                    </HorizonLabelItemComponent>
                }
                {/* {
                    settingUserAuthority && settingUserAuthority === ADMIN_ID &&
                    <HorizonLabelItemComponent
                        title={'権限'}
                        width='30%'
                        position='left'
                    >
                        {
                            props.authList &&
                            props.userDatas !== undefined &&
                            props.userDatas.auth !== undefined &&
                            <ComboComponent
                                combo={props.authList}
                                initValue={props.userDatas.auth}
                                disabled={false}
                                onChange={(e) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.AUTH, payload: e });
                                }}
                            />
                        }
                    </HorizonLabelItemComponent>
                } */}
                {
                    settingUserAuthority && settingUserAuthority === ADMIN_ID &&
                    <HorizonLabelItemComponent
                        title={'権限'}
                        width='30%'
                        position='left'
                    >
                        <TitleSpan
                            onClick={openAuthModal}
                        >
                            権限を設定する
                        </TitleSpan>
                        <ModalComponent
                            modalIsOpen={isAuthModalOpen}
                            closeModal={closeAuthModal}
                        >
                            <SettingUserInputAuthList
                                closeFn={closeAuthModal}
                                inputUserAuthList={props.inputUserAuthList}
                                setInputUserAuthList={props.setInputUserAuthList}
                            />
                        </ModalComponent>
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
                                props.userDatas.iconUrl &&
                                <UserIconComponent
                                    width='25%'
                                    height='68%'
                                    iconUrl={props.userDatas.iconUrl}
                                    outerStyle={{ "margin-left": "auto", "margin-right": "auto", "margin-top": "3%" }}
                                />
                            }
                        </SelectedIconDiv>
                    }
                    width='30%'
                    position='left'
                    outerHeight='28%'
                >
                    {
                        props.isEditable &&
                        props.userDatas.iconType !== undefined &&
                        <React.Fragment>
                            <LabelRadioComponent
                                key={'noIconSelect'}
                                title={'アイコンを設定しない'}
                                value={SELECT_ICON_TYPE.NO_SELECT}
                                selectedValue={props.userDatas.iconType}
                                htmlForId={'noIconSelect'}
                                onChange={(e: string,) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_TYPE, payload: e });
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_URL, payload: "" });
                                }}
                                isTitlePositionRight={true}
                                gap='1%'
                            />
                            <MaringDiv />
                            <LabelRadioComponent
                                key={'standardIconSelect'}
                                title={
                                    <SettingUserSelectStandardMessage
                                        isInactive={props.userDatas.iconType !== SELECT_ICON_TYPE.STANDARD}
                                        iconUrl={props.userDatas.iconUrl}
                                        setIconUrl={(e) => {
                                            props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_URL, payload: e });
                                        }} />
                                }
                                value={SELECT_ICON_TYPE.STANDARD}
                                selectedValue={props.userDatas.iconType}
                                htmlForId={'standardIconSelect'}
                                onChange={(e: string,) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_TYPE, payload: e });
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.ICON_URL, payload: props.orgIconUrl });
                                }}
                                isTitlePositionRight={true}
                                gap='1%'
                            />
                            <MaringDiv />
                            {/* <LabelRadioComponent
                                key={'originalconSelect'}
                                title={
                                    <SettingUserSelectOriginalMessage
                                        isInactive={props.iconType !== SELECT_ICON_TYPE.ORIGINAL}
                                        setIconUrl={props.setIconUrl}
                                    />
                                }
                                value={SELECT_ICON_TYPE.ORIGINAL}
                                selectedValue={props.iconType}
                                htmlForId={'originalconSelect'}
                                onChange={(e: string,) => {
                                    props.setIconType(e);
                                    props.setIconUrl("");
                                }}
                                isTitlePositionRight={true}
                                width='100%'
                                gap='1%'
                            /> */}
                        </React.Fragment>
                    }
                </HorizonLabelItemComponent>
            </MainDiv>
        </OuterDiv>
    );
}

export default SettingUserEditMain;