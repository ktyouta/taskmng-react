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
import MessageComponent, { labelType } from '../Common/MessageComponent';


//引数の型
type propsType = {
  updTaskUrl: string,
  closeFn?: () => void,
}


function TaskEdit(props: propsType) {

  console.log("taskedit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    isLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    errMessage, } = useTaskEdit({ ...props });


  //ローディング
  if (isLoading) {
    return <Loading height='50vh' />;
  }

  return (
    <TaskEditForm
      refInfoArray={refInfoArray}
      updErrMessage={errMessage}
      isLoading={isLoading}
      backPageButtonObj={backPageButtonObj}
      negativeButtonObj={negativeButtonObj}
      positiveButtonObj={positiveButtonObj}
    />
  );
}

export default TaskEdit;