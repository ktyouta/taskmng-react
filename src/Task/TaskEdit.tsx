import '../App.css';
import { useAtomValue } from 'jotai';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import WaitLoading from '../Common/WaitLoading';
import AddMasterForm from '../Common/AddMasterForm';
import React from 'react';
import MasterEditFooter from '../Master/MasterEditFooter';
import { taskListType } from './Type/TaskType';
import useTaskEdit from './Hook/useTaskEdit';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import DynamicFrom from '../Common/DynamicFrom';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';


//引数の型
type propsType = {
  updTaskId: string,
  closeFn?: () => void,
}


function TaskEdit(props: propsType) {

  console.log("taskedit render");

  //MasterEditコンポーネントのビジネスロジック
  const {
    refInfoArray,
    isLoading,
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    deleteButtonObj,
    errMessage, } = useTaskEdit({ ...props });


  //ローディング
  if (isLoading) {
    return <Loading height='50vh' />;
  }

  return (
    <div className="taskedit">
      <div className="taskedit-header-area">
        <LabelComponent
          title="タスク編集"
          width="100%"
        />
      </div>
      <div className="taskedit-main-area">
        <div className="taskedit-input-main-area">
          {/* 入力欄 */}
          <DynamicFrom
            refInfoArray={refInfoArray}
          />
        </div>
        {/* エラーメッセージ用スナックバー */}
        <SnackbarComponent
          open={!!errMessage}
          message={errMessage}
          severity='error'
        />
      </div>
      <div className="taskedit-footer-area">
        {/* 編集画面用フッター */}
        <TaskEditFooter
          backPageButtonObj={backPageButtonObj}
          negativeButtonObj={negativeButtonObj}
          deleteButtomObj={deleteButtonObj}
          positiveButtonObj={positiveButtonObj}
        />
      </div>
      {/* ローディング */}
      <WaitLoading
        isLoading={isUpDelLoading}
      />
    </div>
  );
}

export default TaskEdit;