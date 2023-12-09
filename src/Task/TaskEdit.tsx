import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';
import { generalDataType } from '../Common/Type/CommonType';
import { apiTaskDetailType, inputTaskSettingType, taskListType } from './Type/TaskType';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { BoldSpan, HeaderDiv, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import LabelComponent from '../Common/LabelComponent';


//引数の型
type propsType = {
  updTaskId: string,
  backFn?: () => void,
  closeFn?: () => void,
  taskSettingList: inputTaskSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updTask: apiTaskDetailType | undefined,
}


function TaskEdit(props: propsType) {

  console.log("taskedit render");

  const {
    refInfoArray,
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    deleteButtonObj,
    errMessage, } = useTaskEdit({ ...props });


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
            title="タスク編集"
          />
        </HeaderDiv>
        <VerticalFlowDiv
          height='85%'
        >
          {/* デフォルト属性 */}
          <TaskEditForm
            refInfoArray={refInfoArray.default}
            isUpDelLoading={isUpDelLoading}
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
              <TaskEditForm
                refInfoArray={refInfoArray.customAttribute}
                isUpDelLoading={isUpDelLoading}
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
        <TaskEditFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          deleteButtomObj={deleteButtonObj}
          positiveButtonObj={positiveButtonObj}
          outerHeight='15%'
        />
      </HeightDiv>

      {/* ローディング */}
      <WaitLoading
        isLoading={isUpDelLoading}
      />
    </HeightDiv>
  );
}

export default TaskEdit;