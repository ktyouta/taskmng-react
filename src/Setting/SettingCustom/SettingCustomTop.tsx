import styled from 'styled-components';
import SettingCustomTable from './SettingCustomTable';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


function SettingCustomTop() {

  console.log("SettingCustomTop render");

  return (
    <OuterDiv>
      {/* <SettingCustomEdit /> */}
      <div>
        カスタム属性一覧
      </div>
      <SettingCustomTable />
    </OuterDiv>
  );
}

export default SettingCustomTop;