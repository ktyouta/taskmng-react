import '../App.css';
import { useAtomValue } from 'jotai';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';
import AddMasterForm from '../Common/AddMasterForm';
import React from 'react';
import TaskEditForm from './TaskEditForm';
import MasterEditFooter from '../Master/MasterEditFooter';
import { taskListType } from './Type/TaskType';
import useTaskEdit from './Hook/useTaskEdit';


//引数の型
type propsType = {
  updTask: taskListType | undefined
}


function TaskEdit(props: propsType) {

  console.log("taskedit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    isLoading,
    updErrMessage,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj } = useTaskEdit({ ...props });

  //ローディング
  if (!refInfoArray || refInfoArray.length === 0 || isLoading) {
    return <Loading height='50vh' />;
  }

  return (
    <TaskEditForm
      refInfoArray={refInfoArray}
      updErrMessage={updErrMessage}
      isLoading={isLoading}
      backPageButtonObj={backPageButtonObj}
      negativeButtonObj={negativeButtonObj}
      positiveButtonObj={positiveButtonObj}
    />
  );
}

export default TaskEdit;