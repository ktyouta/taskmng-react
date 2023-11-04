import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';
import { generalDataType } from '../Common/Type/CommonType';
import { apiTaskDetailType, inputTaskSettingType, taskListType } from './Type/TaskType';


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
  if (!refInfoArray || refInfoArray.length === 0) {
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