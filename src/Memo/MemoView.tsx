import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useMemoEdit from './Hook/useMemoEdit';
import './css/MemoEdit.css';
import MemoEditFooter from './MemoEditFooter';
import MemoEditForm from './MemoEditForm';
import styled from 'styled-components';
import LabelComponent from '../Common/LabelComponent';
import useMemoView from './Hook/useMemoView';
import { generalDataType } from '../Common/Type/CommonType';
import { apiMemoDetailType, inputMemoSettingType, memoListType } from './Type/MemoType';
import MemoViewFooter from './MemoViewFooter';
import MemoViewForm from './MemoViewForm';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//入力欄
const MainAreaDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    margin-left: 15%;
`;

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;


//引数の型
type propsType = {
  memoSettingList: inputMemoSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updMemo: apiMemoDetailType | undefined,
  openEditPage: () => void,
  closeFn?: () => void,
  backBtnTitle?: string,
}


function MemoView(props: propsType) {

  console.log("MemoView render");

  const {
    viewMemo,
    backPageButtonObj,
    positiveButtonObj,
  } = useMemoView({ ...props });

  //ローディング
  if (!viewMemo || !viewMemo.default || viewMemo.default.length === 0) {
    return <Loading height='50vh' />;
  }

  return (
    <HeightDiv
      height='100%'
    >
      <OuterDiv
        height='85%'
      >
        <HeaderDiv>
          <LabelComponent
            title="メモ詳細"
          />
        </HeaderDiv>
        <MainAreaDiv>
          {/* デフォルト属性 */}
          <MemoViewForm
            viewMemoList={viewMemo.default}
          />
          {/* カスタム属性 */}
          {
            viewMemo &&
            viewMemo.customAttribute &&
            viewMemo.customAttribute.length > 0 &&
            <React.Fragment>
              <HorizonLabelItemComponent
                title={<BoldSpan>カスタム属性</BoldSpan>}
                width="20%"
              >
              </HorizonLabelItemComponent>
              <MemoViewForm
                viewMemoList={viewMemo.customAttribute}
              />
            </React.Fragment>
          }
        </MainAreaDiv>
      </OuterDiv>
      <MemoViewFooter
        backPageButtonObj={backPageButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='15%'
      />
    </HeightDiv>
  );
}

export default MemoView;