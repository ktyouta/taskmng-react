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
    margin-left: 75%;
    width: 10%;
    margin-top:1%;
    margin-bottom:1%;
    display:flex;
`;


function SettingSearchConditionMain() {

    console.log("SettingSearchConditionMain render");

    const {
        backPageButtonObj,
        searchConditionComponent,
        isLoading,
        errMessage,
        isUpdLoading
    } = useSettingSearchConditionMain();

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
                <TaskSearchConditionTab
                    searchConditionComponent={searchConditionComponent}
                />
            </HeightDiv>
            <BtnDiv>
                <ButtonComponent
                    styleTypeNumber={backPageButtonObj.type}
                    title={backPageButtonObj.title}
                    onclick={backPageButtonObj.onclick ? backPageButtonObj.onclick : () => { }}
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem", "white-space": "nowrap" }}
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