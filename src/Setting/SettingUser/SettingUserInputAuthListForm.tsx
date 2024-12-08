import React, { ReactNode, useContext, useEffect } from 'react';
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
import { selectAuthType } from './Hook/useSettingUserInputAuthList';
import IconComponent from '../../Common/IconComponent';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import useSettingUserInputAuthListForm from './Hook/useSettingUserInputAuthListForm';


//入力欄のスタイル
const MainDiv = styled.div`
    height: 95%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 16%;
    box-sizing: border-box;
`;

//タイトルのスタイル
const TitleSpan = styled.span<{ isContainSubMenu: boolean }>`
    font-weight:${({ isContainSubMenu }) => (isContainSubMenu ? "bold" : "")}; 
`;

//タイトル領域のスタイル
const TitleDiv = styled.div`
    position:relative; 
`;


//引数の型
type propsType = {
    selectAuthList: selectAuthType[],
    changeAuthCombo: (selectValue: string, menuId: string) => void
}


function SettingUserInputAuthListForm(props: propsType) {

    console.log("SettingUserInputAuthListForm render");

    const {
        selectMenuList,
        openCloseParentMenu,
    } = useSettingUserInputAuthListForm();

    return (
        <MainDiv>
            {
                props.selectAuthList.reduce((prev: ReactNode[], element: selectAuthType) => {

                    //親メニューが展開されていないサブメニュー
                    if (element.parentMenuId && !selectMenuList.includes(element.parentMenuId)) {
                        return prev;
                    }

                    prev.push(
                        <HorizonLabelItemComponent
                            title={
                                <TitleDiv>
                                    <TitleSpan
                                        isContainSubMenu={element.isContainSubMenu}
                                    >
                                        {element.menuName}
                                    </TitleSpan>
                                    {
                                        element.isContainSubMenu &&
                                        <IconComponent
                                            icon={selectMenuList.includes(element.menuId)
                                                ?
                                                IoIosArrowDown
                                                :
                                                IoIosArrowForward
                                            }
                                            style={{
                                                "position": "absolute",
                                                "right": "10%",
                                                "top": "17%",
                                            }}
                                            onclick={() => {
                                                openCloseParentMenu(element.menuId);
                                            }}
                                        />
                                    }
                                </TitleDiv>
                            }
                            width='30%'
                            position='left'
                        >
                            {
                                element.authLabelList &&
                                !element.isContainSubMenu &&
                                <ComboComponent
                                    combo={element.authLabelList}
                                    initValue={element.auth}
                                    disabled={false}
                                    onChange={(e) => {
                                        props.changeAuthCombo(e, element.menuId);
                                    }}
                                />
                            }
                        </HorizonLabelItemComponent>
                    );

                    return prev;
                }, [])
            }
        </MainDiv>
    );
}

export default SettingUserInputAuthListForm;