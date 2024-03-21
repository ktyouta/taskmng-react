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


function MemoRegister(props: propsType) {

  console.log("MemoRegister render");

  const {
    isUpDelLoading,
    backPageButtonObj,
    positiveButtonObj,
    memoTitle,
    setMemoTitle,
    memoContent,
    setMemoContent,
  } = useMemoRegister({ ...props });


  return (
    <HeightDiv
      height='100%'
    >
      <HeightDiv
        height='85%'
      >
        <MemoEditForm
          memoTitle={memoTitle}
          setMemoTitle={setMemoTitle}
          memoContent={memoContent}
          setMemoContent={setMemoContent} />
      </HeightDiv>
      <HeightDiv
        height='15%'
      >
        <MemoRegisterFooter
          backPageButtonObj={backPageButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='100%'
        />
      </HeightDiv>
      {/* ローディング */}
      {
        isUpDelLoading &&
        <WaitLoading />
      }
    </HeightDiv>
  );
}

export default MemoRegister;