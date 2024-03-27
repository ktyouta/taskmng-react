import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useMemoEdit from './Hook/useMemoEdit';
import './css/MemoEdit.css';
import MemoEditFooter from './MemoEditFooter';
import MemoEditForm from './MemoEditForm';
import { generalDataType } from '../Common/Type/CommonType';
import { apiMemoDetailType, inputMemoSettingType, memoListType } from './Type/MemoType';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { BoldSpan, HeaderDiv, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import LabelComponent from '../Common/LabelComponent';


//外側のスタイル
const OuterDiv = styled(HeightDiv)`
  background-color: #f5f5f5;
`;


//引数の型
type propsType = {
  updMemoId: string,
  backFn?: () => void,
  closeFn?: () => void,
  memoTitle: string,
  setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
  memoContent: string,
  setMemoContent: React.Dispatch<React.SetStateAction<string>>,
  initMemoTitle: string | undefined,
  initMemoContent: string | undefined,
}


function MemoEdit(props: propsType) {

  console.log("MemoEdit render");

  const {
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    deleteButtonObj,
  } = useMemoEdit({ ...props });

  return (
    <OuterDiv
      height='100%'
    >
      <HeightDiv
        height='87%'
      >
        <MemoEditForm
          memoTitle={props.memoTitle}
          setMemoTitle={props.setMemoTitle}
          memoContent={props.memoContent}
          setMemoContent={props.setMemoContent}
        />
      </HeightDiv>
      <HeightDiv
        height='13%'
      >
        <MemoEditFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          deleteButtomObj={deleteButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='100%'
        />
      </HeightDiv>
      {/* ローディング */}
      {
        isUpDelLoading &&
        <WaitLoading />
      }
    </OuterDiv>
  );
}

export default MemoEdit;