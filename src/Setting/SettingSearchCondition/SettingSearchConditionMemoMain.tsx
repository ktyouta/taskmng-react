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
import DynamicForm from '../../Common/DynamicForm';


//ボタンのスタイル
const BtnDiv = styled.div`
    margin-left: 75%;
    width: 10%;
    margin-top:1%;
    margin-bottom:1%;
    display:flex;
`;

//入力欄のスタイル
const InputAreaDiv = styled(HeightDiv)`
    margin-left: 5%;
    overflow-y: auto;
`;


function SettingSearchConditionMemoMain() {

    console.log("SettingSearchConditionMemoMain render");

    const {
        backPageButtonObj,
        isLoading,
        errMessage,
        isUpdLoading,
        memoSearchRefInfo
    } = useSettingSearchConditionMemoMain();

    //ローディング
    if (isLoading) {
        return <CenterLoading />;
    }

    //データ取得時エラー
    if (errMessage) {
        return <div>{errMessage}</div>;
    }

    return (
        <React.Fragment>
            <HeightDiv
                height='75%'
            >
                <InputAreaDiv
                    height='85%'
                >
                    <DynamicForm
                        refInfoArray={memoSearchRefInfo}
                        titleWidth='20%'
                        childWidth='59%'
                    />
                </InputAreaDiv>
            </HeightDiv>
            <BtnDiv>
                <ButtonComponent
                    styleTypeNumber={backPageButtonObj.type}
                    title={backPageButtonObj.title}
                    onclick={backPageButtonObj.onclick ? backPageButtonObj.onclick : () => { }}
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

export default SettingSearchConditionMemoMain;