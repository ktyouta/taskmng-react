import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';


//引数の型
type propsType = {
  updTaskId: string,
  closeFn?: () => void,
}


function TaskEdit(props: propsType) {

  console.log("taskedit render");

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
      <TaskEditForm
        title={'タスク編集'}
        refInfoArray={refInfoArray}
        isUpDelLoading={isUpDelLoading}
        errMessage={errMessage}
        outerHeight='85%'
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