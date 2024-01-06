import styled from 'styled-components';
import SettingDefaultTable from './SettingDefaultTable';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import VerticalSpaceComponent from '../../Common/VerticalSpaceComponent';
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

function SettingDefaultTop(props: propsType) {

  console.log("SettingDefaultTop render");

  return (
    <OuterDiv>
      <TitleDiv>
        <LabelComponent
          title={`デフォルト属性一覧`}
          width="100%"
        />
      </TitleDiv>
      <VerticalSpaceComponent
        space={'10%'}
      />
      <SettingDefaultTable
        height='70%'
        width='85%'
        path={props.path}
      />
    </OuterDiv>
  );
}

export default SettingDefaultTop;