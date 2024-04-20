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
import useMemoDraft from './Hook/useMemoDraft';
import { MEMO_STATUS } from './Const/MemoConst';
import MemoDraftFooter from './MemoDraftFooter';
import { tagType } from '../Common/TagsComponent';


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
  memoStatus: string | undefined,
  addTag: (newTag: tagType) => void,
  deleteTag: (tagIndex: number) => void,
  memoTagList: tagType[]
}


function MemoEdit(props: propsType) {

  console.log("MemoEdit render");

  const {
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    deleteButtonObj,
    positiveButtonObj,
  } = useMemoEdit({ ...props });

  const {
    isCreateLoading,
    createButtonObj,
    saveButtonObj,
  } = useMemoDraft({ ...props });

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
          addTag={props.addTag}
          deleteTag={props.deleteTag}
          memoTagList={props.memoTagList}
        />
      </HeightDiv>
      <HeightDiv
        height='13%'
      >
        {
          (() => {
            switch (props.memoStatus) {
              //編集
              case MEMO_STATUS.regist:
                return (
                  <MemoEditFooter
                    backPageButtonObj={backPageButtonObj}
                    negativeButtonObj={negativeButtonObj}
                    deleteButtomObj={deleteButtonObj}
                    positiveButtonObj={positiveButtonObj}
                    outerHeight='100%'
                  />
                );
              //下書き
              case MEMO_STATUS.draft:
                return (
                  <MemoDraftFooter
                    backPageButtonObj={backPageButtonObj}
                    negativeButtonObj={negativeButtonObj}
                    deleteButtomObj={deleteButtonObj}
                    saveButtonObj={saveButtonObj}
                    positiveButtonObj={createButtonObj}
                    outerHeight='100%'
                  />
                );
              default:
                return <></>;
            }
          })()
        }
      </HeightDiv>
      {/* ローディング */}
      {
        isUpDelLoading || isCreateLoading &&
        <WaitLoading />
      }
    </OuterDiv>
  );
}

export default MemoEdit;