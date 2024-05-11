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
import SettingSearchConditionMain from './SettingSearchConditionMain';
import ComboComponent from '../../Common/ComboComponent';
import useSettingSearchConditionTop from './Hook/useSettingSearchConditionTop';
import React from 'react';
import { DISP_MODE } from './Const/SettingSearchConditionConst';
import SettingSearchConditionMemoMain from './SettingSearchConditionMemoMain';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    height: 7%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;


function SettingSearchConditionTop() {

    console.log("SettingSearchConditionTop render");

    const {
        comboList,
        changeCombo,
        dispMode
    } = useSettingSearchConditionTop();

    return (
        <OuterDiv>
            <TitleDiv>
                <LabelComponent
                    title={`検索条件初期設定`}
                    width="100%"
                />
                <ComboComponent
                    combo={comboList}
                    onChange={changeCombo}
                    initValue={dispMode}
                    height='40px'
                    width='240px'
                />
            </TitleDiv>
            {
                (() => {
                    switch (dispMode) {
                        //タスク
                        case DISP_MODE.task:
                            return (
                                <SettingSearchConditionMain />
                            )
                        //メモ
                        case DISP_MODE.memo:
                            return <SettingSearchConditionMemoMain />
                        default:
                            return (
                                <React.Fragment></React.Fragment>
                            )
                    }
                })()
            }
        </OuterDiv>
    );
}

export default SettingSearchConditionTop;