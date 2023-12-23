import styled from 'styled-components';
import SettingCustomTable from './SettingCustomTable';
import ButtonComponent from '../../Common/ButtonComponent';
import useSettingCustomTop from './Hook/useSettingCustomTop';
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
  path: string,
}

function SettingCustomTop(props: propsType) {

  console.log("SettingCustomTop render");

  const { createNewCustomAttribute } = useSettingCustomTop({ ...props });

  return (
    <OuterDiv>
      <TitleDiv>
        <LabelComponent
          title={`カスタム属性一覧`}
          width="100%"
        />
      </TitleDiv>
      <BtnDiv>
        <ButtonComponent
          styleTypeNumber="RUN"
          title={"カスタム属性を追加"}
          onclick={createNewCustomAttribute}
        />
      </BtnDiv>
      <SettingCustomTable
        height='70%'
        width='85%'
        path={props.path}
      />
    </OuterDiv>
  );
}

export default SettingCustomTop;