import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import useSettingCategoryTop from '../SettingCategory/Hook/useSettingCategoryTop';
import SettingCategoryTable from '../SettingCategory/SettingCategoryTable';
import SpaceComponent from '../../Common/SpaceComponent';
import useSettingSearchConditionTop from './Hook/useSettingSearchConditionTop';
import TaskSearchConditionTab from '../../Task/TaskSearchConditionTab';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;

//ボタンのスタイル
const BtnDiv = styled.div`
    margin-left: 14%;
    width: 47%;
    margin-top:1%;
    margin-bottom:1%;
    display:flex;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    height: 7%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//引数の型
type prospType = {
    path: string,
}

function SettingSearchConditionTop(props: prospType) {

    console.log("SettingSearchConditionTop render");

    const {
        backPageButtonObj,
        searchConditionComponent
    } = useSettingSearchConditionTop();

    return (
        <OuterDiv>
            <TitleDiv>
                <LabelComponent
                    title={`検索条件初期設定`}
                    width="100%"
                />
            </TitleDiv>
            <BtnDiv>
                <ButtonComponent
                    styleTypeNumber={backPageButtonObj.type}
                    title={backPageButtonObj.title}
                    onclick={backPageButtonObj.onclick ? backPageButtonObj.onclick : () => { }}
                />
            </BtnDiv>
            <TaskSearchConditionTab
                searchConditionComponent={searchConditionComponent}
            />
        </OuterDiv>
    );
}

export default SettingSearchConditionTop;