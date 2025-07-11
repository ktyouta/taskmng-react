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
    padding-top: 2%;
    box-sizing: border-box;
    padding-left: 2%;
    padding-right: 2%;
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


function SettingSearchConditionMain() {

    console.log("SettingSearchConditionMain render");

    const {
        backPageButtonObj,
        searchConditionComponent,
        isLoading,
        errMessage,
        isUpdLoading,
        settingSearchConditionAuthority,
    } = useSettingSearchConditionMain();

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
                <TaskSearchConditionTab
                    searchConditionComponent={searchConditionComponent}
                />
            </InputAreaDiv>
            <BtnDiv>
                <SpaceDiv />
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
            </BtnDiv>
            {/* ローディング */}
            {
                isUpdLoading &&
                <WaitLoading />
            }
        </React.Fragment>
    );
}

export default SettingSearchConditionMain;