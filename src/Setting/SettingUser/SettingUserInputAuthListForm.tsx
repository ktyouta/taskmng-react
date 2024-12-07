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
import { selectAuthType } from './Hook/useSettingUserInputAuthList';


//入力欄のスタイル
const MainDiv = styled.div`
    height: 90%;
    overflow-y: auto;
    padding-top:2%;
    padding-left: 16%;
    box-sizing: border-box;
`;

//引数の型
type propsType = {
    selectAuthList: selectAuthType[],
}


function SettingUserInputAuthListForm(props: propsType) {

    console.log("SettingUserInputAuthListForm render");

    return (
        <MainDiv>
            {
                props.selectAuthList.map((element) => {
                    return (
                        <HorizonLabelItemComponent
                            title={element.menuName}
                            width='30%'
                            position='left'
                        >
                            {
                                element.authLabelList &&
                                <ComboComponent
                                    combo={element.authLabelList}
                                    initValue={element.value}
                                    disabled={false}
                                    onChange={(e) => {

                                    }}
                                />
                            }
                        </HorizonLabelItemComponent>
                    )
                })
            }
        </MainDiv>
    );
}

export default SettingUserInputAuthListForm;