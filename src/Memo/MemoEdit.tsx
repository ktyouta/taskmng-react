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


//引数の型
type propsType = {
  updMemoId: string,
  backFn?: () => void,
  closeFn?: () => void,
  memoSettingList: inputMemoSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updMemo: apiMemoDetailType | undefined,
}


function MemoEdit(props: propsType) {

  console.log("MemoEdit render");

  const {
    refInfoArray,
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    deleteButtonObj,
    errMessage, } = useMemoEdit({ ...props });


  //ローディング
  if (!refInfoArray || refInfoArray.default.length === 0) {
    return <Loading height='50vh' />;
  }

  return (
    <HeightDiv
      height='100%'
    >
      <HeightDiv
        height='85%'
      >
        <HeaderDiv>
          <LabelComponent
            title="メモ編集"
          />
        </HeaderDiv>
        <VerticalFlowDiv
          height='85%'
        >
          {/* デフォルト属性 */}
          <MemoEditForm
            refInfoArray={refInfoArray.default}
            errMessage={errMessage}
            outerHeight='auto'
          />
          {/* カスタム属性 */}
          {
            refInfoArray &&
            refInfoArray.customAttribute &&
            refInfoArray.customAttribute.length > 0 &&
            <React.Fragment>
              <HorizonLabelItemComponent
                title={<BoldSpan>カスタム属性</BoldSpan>}
                marginLt='15%'
                width="20%"
              >
              </HorizonLabelItemComponent>
              <MemoEditForm
                refInfoArray={refInfoArray.customAttribute}
                errMessage={errMessage}
                outerHeight='auto'
              />
            </React.Fragment>
          }
          {/* エラーメッセージ用スナックバー */}
          <SnackbarComponent
            open={!!errMessage}
            message={errMessage}
            severity='error'
          />
        </VerticalFlowDiv>
      </HeightDiv>
      <HeightDiv
        height='15%'
      >
        <MemoEditFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          deleteButtomObj={deleteButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='15%'
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

export default MemoEdit;