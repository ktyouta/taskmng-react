import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';
import styled from 'styled-components';
import LabelComponent from '../Common/LabelComponent';
import useTaskView from './Hook/useTaskView';
import { generalDataType, inputTaskSettingType } from '../Common/Type/CommonType';
import { taskListType } from './Type/TaskType';
import TaskViewFooter from './TaskViewFooter';
import TaskViewForm from './TaskViewForm';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//入力欄
const MainAreaDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    margin-left: 15%;
`;


//引数の型
type propsType = {
  taskSettingList: inputTaskSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updTask: taskListType | undefined,
  openEditPage: () => void,
  closeFn?: () => void,
}


function TaskView(props: propsType) {

  console.log("TaskView render");

  const {
    viewTask,
    backPageButtonObj,
    positiveButtonObj,
  } = useTaskView({ ...props });

  //ローディング
  if (!viewTask || viewTask.length === 0) {
    return <Loading height='50vh' />;
  }

  return (
    <div className="taskedit">
      <OuterDiv
        height='85%'
      >
        <HeaderDiv>
          <LabelComponent
            title="タスク詳細"
            width="100%"
          />
        </HeaderDiv>
        <MainAreaDiv>
          <TaskViewForm
            viewTaskList={viewTask}
          />
        </MainAreaDiv>
      </OuterDiv>
      <TaskViewFooter
        backPageButtonObj={backPageButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='15%'
      />
    </div>
  );
}

export default TaskView;