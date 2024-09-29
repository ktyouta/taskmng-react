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
        <SpaceComponent
          space={'14%'}
        />
        <ButtonComponent
          styleTypeNumber="GRAD_BLUE"
          title={"カテゴリを追加"}
          onclick={createNewCategory}
          style={{
            "fontSize": "0.9rem",
            "height": "74%",
            "width": "14%",
          }}
        />
        <SpaceComponent
          space={'2%'}
        />
        <ButtonComponent
          styleTypeNumber="GRAD_BLUE"
          title={"表示順を更新"}
          onclick={changeCategoryOrder}
          style={{
            "fontSize": "0.9rem",
            "height": "74%",
            "width": "14%",
          }}
        />
      </BtnDiv>
      <SettingCategoryTable
        height='75%'
        width='85%'
        path={props.path}
        refInfoArray={refInfoArray}
        isLoading={isLoading}
      />
    </OuterDiv>
  );
}

export default SettingCategoryTop;