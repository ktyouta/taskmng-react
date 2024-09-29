import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import useSettingUserTop from '../SettingUser/Hook/useSettingUserTop';
import SettingUserTable from '../SettingUser/SettingUserTable';
import SpaceComponent from '../../Common/SpaceComponent';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;

//ボタンのスタイル
const BtnDiv = styled.div`
    width: 100%;
    margin-top:3%;
    height: 8%;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    height: 7%;
    font-size: 20px;
    text-align: center;
    padding-top: 1%;
    box-sizing: border-box;
`;

//引数の型
type prospType = {
  path: string,
}

function SettingUserTop(props: prospType) {

  console.log("SettingUserTop render");

  const { createNewUser } = useSettingUserTop({ ...props });

  return (
    <OuterDiv>
      <TitleDiv>
        <LabelComponent
          title={`ユーザー一覧`}
          width="100%"
        />
      </TitleDiv>
      <BtnDiv>
        <SpaceComponent
          space={'14%'}
        />
        <ButtonComponent
          styleTypeNumber="GRAD_BLUE"
          title={"ユーザーを追加"}
          onclick={createNewUser}
          style={{
            "fontSize": "0.9rem",
            "height": "74%",
            "width": "14%",
          }}
        />
      </BtnDiv>
      <SettingUserTable
        height='75%'
        width='85%'
        path={props.path}
      />
    </OuterDiv>
  );
}

export default SettingUserTop;