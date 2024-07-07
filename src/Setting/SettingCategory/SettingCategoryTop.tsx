import styled from 'styled-components';
import ButtonComponent from '../../Common/ButtonComponent';
import LabelComponent from '../../Common/LabelComponent';
import useSettingCategoryTop from '../SettingCategory/Hook/useSettingCategoryTop';
import SettingCategoryTable from '../SettingCategory/SettingCategoryTable';
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

function SettingCategoryTop(props: prospType) {

  console.log("SettingCategoryTop render");

  const {
    createNewCategory,
    changeCategoryOrder,
    refInfoArray,
    isLoading,
  } = useSettingCategoryTop({ ...props });

  return (
    <OuterDiv>
      <TitleDiv>
        <LabelComponent
          title={`カテゴリ一覧`}
          width="100%"
        />
      </TitleDiv>
      <BtnDiv>
        <ButtonComponent
          styleTypeNumber="RUN"
          title={"カテゴリを追加"}
          onclick={createNewCategory}
          style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
        />
        <SpaceComponent
          space={'2%'}
        />
        <ButtonComponent
          styleTypeNumber="RUN"
          title={"表示順を更新"}
          onclick={changeCategoryOrder}
          style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
        />
      </BtnDiv>
      <SettingCategoryTable
        height='70%'
        width='85%'
        path={props.path}
        refInfoArray={refInfoArray}
        isLoading={isLoading}
      />
    </OuterDiv>
  );
}

export default SettingCategoryTop;