import styled from "styled-components";
import { authType } from "../Common/Hook/useCheckAuth";
import HorizonLabelItemComponent from "../Common/HorizonLabelItemComponent";
import BaseInputComponent from "../Common/BaseInputComponent";
import React from "react";
import { checkAuthAction } from "../Common/Function/Function";
import { USER_AUTH } from "../Common/Const/CommonConst";
import ModalComponent from "../Common/ModalComponent";
import UserIconComponent from "../Common/UserIconComponent";
import LabelRadioComponent from "../Common/LabelRadioComponent";
import SettingUserSelectStandardMessage from "../Setting/SettingUser/SettingUserSelectStandardMessage";
import { SELECT_ICON_TYPE } from "../Setting/SettingUser/Const/SettingUserConst";
import { userInfoInputType } from "./Type/UserType";
import { USERINFO_ACTION_TYPE } from "./Const/UserConst";



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


//選択アイコンのスタイル
const SelectedIconDiv = styled.div`
    
`;

//引数の型
type propsType = {
    outerHeight: string | undefined,
    orgIconUrl: string,
    editMode: number,
    userDatas: userInfoInputType,
    userDatasDisptch: React.Dispatch<{
        type: string;
        payload?: string;
    }>
    inputUserAuthList: authType[],
    setInputUserAuthList: React.Dispatch<React.SetStateAction<authType[]>>,
    orgAuthList: authType[],
    userId: string,
}


function UserEditMain(props: propsType) {

    console.log("UserEditMain render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainDiv>
                {
                    <HorizonLabelItemComponent
                        title={'ユーザーID'}
                        width='30%'
                        position='left'
                    >
                        {props.userId}
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
                            <BaseInputComponent
                                value={props.userDatas.userName}
                                length={50}
                                onChange={(e) => {
                                    props.userDatasDisptch({ type: USERINFO_ACTION_TYPE.NAME, payload: e });
                                }}
                                textWidth='80%'
                            />
                        </React.Fragment>
                    }
                </HorizonLabelItemComponent>
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

export default UserEditMain;