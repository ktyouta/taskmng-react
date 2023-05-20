import '../App.css';
import WaitLoading from '../Common/WaitLoading';
import './css/TaskEdit.css';
import TaskEditForm from './TaskEditForm';
import useTaskRegister from './Hook/useTaskRegister';
import TaskRegisterFooter from './TaskRegisterFooter';


//引数の型
type propsType = {
  closeFn?: () => void,
}


function TaskRegister(props: propsType) {

  console.log("TaskRegister render");

  const {
    refInfoArray,
    isUpDelLoading,
    backPageButtonObj,
    negativeButtonObj,
    positiveButtonObj,
    errMessage, } = useTaskRegister({ ...props });


  return (
    <div className="taskedit">
      <TaskEditForm
        title={'タスク作成'}
        refInfoArray={refInfoArray}
        isUpDelLoading={isUpDelLoading}
        errMessage={errMessage}
        outerHeight='85%'
      />
      <TaskRegisterFooter
        backPageButtonObj={backPageButtonObj}
        negativeButtonObj={negativeButtonObj}
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

export default TaskRegister;