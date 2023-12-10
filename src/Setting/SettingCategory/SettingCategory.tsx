import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;

//ボタンのスタイル
const BtnDiv = styled.div`
    width: 40%;
    margin-top:1%;
    margin-bottom:1%;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    height: 7%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//引数の型
type propsType = {
    url: string,
}

function SettingCategory(props: propsType) {

    console.log("SettingCategory render");

    return (
        <OuterDiv>
            <TitleDiv>
                <LabelComponent
                    title={`カテゴリ一覧`}
                    width="100%"
                />
            </TitleDiv>
            少々お待ちください。
        </OuterDiv>
    );
}

export default SettingCategory;