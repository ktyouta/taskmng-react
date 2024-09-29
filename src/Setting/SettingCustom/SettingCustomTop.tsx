import styled from 'styled-components';
import SettingCustomTable from './SettingCustomTable';
import ButtonComponent from '../../Common/ButtonComponent';
import useSettingCustomTop from './Hook/useSettingCustomTop';
import LabelComponent from '../../Common/LabelComponent';
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
        <SpaceComponent
          space={'14%'}
        />
        <ButtonComponent
          styleTypeNumber="GRAD_BLUE"
          title={"カスタム属性を追加"}
          onclick={createNewCustomAttribute}
          style={{
            "fontSize": "0.9rem",
            "height": "74%",
            "width": "14%",
          }}
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