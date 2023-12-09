import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import useSettingUserTop from '../SettingUser/Hook/useSettingUserTop';
import SettingUserTable from '../SettingUser/SettingUserTable';
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


function SettingUserTop() {

  console.log("SettingUserTop render");

  const { createNewUser } = useSettingUserTop();

  return (
    <OuterDiv>
      <TitleDiv>
        <LabelComponent
          title={`ユーザー一覧`}
          width="100%"
        />
      </TitleDiv>
      <BtnDiv>
        <ButtonComponent
          styleTypeNumber="RUN"
          title={"ユーザーを追加"}
          onclick={createNewUser}
        />
      </BtnDiv>
      <SettingUserTable
        height='70%'
        width='85%'
      />
    </OuterDiv>
  );
}

export default SettingUserTop;