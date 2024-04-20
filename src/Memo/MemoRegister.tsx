import '../App.css';
import WaitLoading from '../Common/WaitLoading';
import './css/MemoEdit.css';
import MemoEditForm from './MemoEditForm';
import useMemoRegister from './Hook/useMemoRegister';
import MemoRegisterFooter from './MemoRegisterFooter';
import Loading from '../Common/Loading';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import LabelComponent from '../Common/LabelComponent';
import { BoldSpan, HeaderDiv, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';


//引数の型
type propsType = {
  path: string,
}

//外側のスタイル
const OuterDiv = styled(HeightDiv)`
  background-color: #f5f5f5;
`;


function MemoRegister(props: propsType) {

  console.log("MemoRegister render");

  const {
    isRegistLoading,
    backPageButtonObj,
    positiveButtonObj,
    saveButtonObj,
    memoTitle,
    setMemoTitle,
    memoContent,
    setMemoContent,
    clearButtonObj,
    addTag,
    deleteTag,
    memoTagList
  } = useMemoRegister({ ...props });


  return (
    <OuterDiv
      height='100%'
    >
      <HeightDiv
        height='90%'
      >
        <MemoEditForm
          memoTitle={memoTitle}
          setMemoTitle={setMemoTitle}
          memoContent={memoContent}
          setMemoContent={setMemoContent}
          addTag={addTag}
          deleteTag={deleteTag}
          memoTagList={memoTagList}
        />
      </HeightDiv>
      <HeightDiv
        height='10%'
      >
        <MemoRegisterFooter
          backPageButtonObj={backPageButtonObj}
          positiveButtonObj={positiveButtonObj}
          saveButtonObj={saveButtonObj}
          clearButtonObj={clearButtonObj}
          outerHeight='100%'
        />
      </HeightDiv>
      {/* ローディング */}
      {
        isRegistLoading &&
        <WaitLoading />
      }
    </OuterDiv>
  );
}

export default MemoRegister;