import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import useSettingCategoryTop from '../SettingCategory/Hook/useSettingCategoryTop';
import SettingCategoryTable from '../SettingCategory/SettingCategoryTable';
import SpaceComponent from '../../Common/SpaceComponent';
import TaskSearchConditionTab from '../../Task/TaskSearchConditionTab';
import { HeightDiv } from '../../Common/StyledComponent/CommonStyledComponent';
import Loading from '../../Common/Loading';
import CenterLoading from '../../Common/CenterLoading';
import React from 'react';
import useSettingSearchConditionMain from './Hook/useSettingSearchConditionMain';
import WaitLoading from '../../Common/WaitLoading';
import useSettingSearchConditionMemoMain from './Hook/useSettingSearchConditionMemoMain';
import DynamicFormComponent from '../../Common/DynamicFormComponent';
import { checkAuthAction } from '../../Common/Function/Function';
import { USER_AUTH } from '../../Common/Const/CommonConst';


//ボタンのスタイル
const BtnDiv = styled.div`
    width: 100%;
    display:flex;
    height:12%;
    padding-top: 2%;
    padding-right: 5%;
    box-sizing: border-box;
`;

//入力欄のスタイル
const InputAreaDiv = styled(HeightDiv)`
    overflow-y: auto;
    padding-top: 3%;
    box-sizing: border-box;
    padding-left: 8%;
    padding-right: 5%;
`;

//ボタン間隔のスタイル
const SpaceDiv = styled.div`
    flex:1;
`;

//エラーメッセージのスタイル
const ErrMessageDiv = styled.div`
    box-sizing: border-box;
    padding-left: 2%;
    margin-top: 2%;
`;


function SettingSearchConditionMemoMain() {

    console.log("SettingSearchConditionMemoMain render");

    const {
        backPageButtonObj,
        isLoading,
        errMessage,
        isUpdLoading,
        memoSearchRefInfo,
        settingSearchConditionAuthority,
    } = useSettingSearchConditionMemoMain();

    //ローディング
    if (isLoading) {
        return <CenterLoading />;
    }

    //データ取得時エラー
    if (errMessage) {
        return (
            <ErrMessageDiv>
                {errMessage}
            </ErrMessageDiv>
        );
    }

    return (
        <React.Fragment>
            <InputAreaDiv
                height='77%'
            >
                <DynamicFormComponent
                    refInfoArray={memoSearchRefInfo}
                />
            </InputAreaDiv>
            <BtnDiv>
                <SpaceDiv />
                {
                    checkAuthAction(settingSearchConditionAuthority, USER_AUTH.PUBLIC) &&
                    <ButtonComponent
                        styleTypeNumber={backPageButtonObj.type}
                        title={backPageButtonObj.title}
                        onclick={backPageButtonObj.onclick ? backPageButtonObj.onclick : () => { }}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "78%",
                            "width": "13%",
                        }}
                    />
                }
            </BtnDiv>
            {/* ローディング */}
            {
                isUpdLoading &&
                <WaitLoading />
            }
        </React.Fragment>
    );
}

export default SettingSearchConditionMemoMain;