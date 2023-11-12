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


//引数の型
type propsType = {
  updTaskId: string,
  backFn?: () => void,
  closeFn?: () => void,
  taskSettingList: inputTaskSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updTask: apiTaskDetailType | undefined,
}

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;


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
    <div className="taskedit">
      {/* デフォルト属性 */}
      {
        refInfoArray &&
        refInfoArray.default &&
        refInfoArray.default.length > 0 &&
        <TaskEditForm
          title={'タスク編集'}
          refInfoArray={refInfoArray.default}
          isUpDelLoading={isUpDelLoading}
          errMessage={errMessage}
          outerHeight='85%'
        />
      }
      {/* カスタム属性 */}
      {
        refInfoArray &&
        refInfoArray.customAttribute &&
        refInfoArray.customAttribute.length > 0 &&
        <React.Fragment>
          <HorizonLabelItemComponent
            title={<BoldSpan>カスタム属性</BoldSpan>}
            width="20%"
          >
          </HorizonLabelItemComponent>
          <TaskEditForm
            title={''}
            refInfoArray={refInfoArray.customAttribute}
            isUpDelLoading={isUpDelLoading}
            errMessage={errMessage}
            outerHeight='85%'
          />
        </React.Fragment>
      }
      {/* エラーメッセージ用スナックバー */}
      <SnackbarComponent
        open={!!errMessage}
        message={errMessage}
        severity='error'
      />
      <TaskEditFooter
        backPageButtonObj={backPageButtonObj}
        negativeButtonObj={negativeButtonObj}
        deleteButtomObj={deleteButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='15%'
      />
      {/* ローディング */}
      <WaitLoading
        isLoading={isUpDelLoading}
      />
    </div>
  );
}

export default TaskEdit;