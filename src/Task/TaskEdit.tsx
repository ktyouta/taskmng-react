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
import { HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import LabelComponent from '../Common/LabelComponent';
import { TaskEditTestId } from '../tests/AppTest/DataTestId';


//カスタム属性の文言のスタイル
export const CustomTitleDiv = styled.div`
    margin-left: 15%;
    padding-top: 2%;
    padding-bottom: 1%;
    text-align: left;
    font-weight: bold;
`;

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
    errMessage,
    isTaskDeletable, } = useTaskEdit({ ...props });


  //ローディング
  if (!refInfoArray || refInfoArray.default.length === 0) {
    return <Loading height='50vh' />;
  }

  return (
    <HeightDiv
      height='100%'
      data-testid={TaskEditTestId}
    >
      <HeightDiv
        height='85%'
      >
        <VerticalFlowDiv
          height='89%'
        >
          {/* デフォルト属性 */}
          <TaskEditForm
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
              <CustomTitleDiv>
                カスタム属性
              </CustomTitleDiv>
              <TaskEditForm
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
        <TaskEditFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          deleteButtomObj={deleteButtonObj}
          positiveButtonObj={positiveButtonObj}
          isTaskDeletable={isTaskDeletable}
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

export default TaskEdit;