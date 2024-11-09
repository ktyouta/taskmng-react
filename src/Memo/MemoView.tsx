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
import { tagType } from '../Common/TagsComponent';



//入力欄
const MainAreaDiv = styled(HeightDiv)`
    padding-top:1%;
    box-sizing:border-box;
    padding-left:3%;
    overflow-y: auto;
`;

//外側のスタイル
const OuterDiv = styled(HeightDiv)`
  background-color: #f5f5f5;
`;

//引数の型
type propsType = {
  openEditPage: () => void,
  closeFn?: () => void,
  backBtnTitle?: string,
  memoTitle: string,
  setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
  memoContent: string,
  setMemoContent: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
  isMatchUser: boolean,
  memoTagList: tagType[],
}


function MemoView(props: propsType) {

  console.log("MemoView render");

  const {
    backPageButtonObj,
    positiveButtonObj,
  } = useMemoView({ ...props });

  //ローディング
  if (props.isLoading) {
    return <Loading height='50vh' />;
  }

  return (
    <OuterDiv
      height='100%'
    >
      <MainAreaDiv
        height='90%'
      >
        <MemoViewForm
          memoTitle={props.memoTitle}
          memoContent={props.memoContent}
          memoTagList={props.memoTagList}
        />
      </MainAreaDiv>
      <MemoViewFooter
        backPageButtonObj={backPageButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='10%'
        isMatchUser={props.isMatchUser}
      />
    </OuterDiv>
  );
}

export default MemoView;