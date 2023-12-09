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
import { generalDataType } from '../Common/Type/CommonType';
import { apiTaskDetailType, inputTaskSettingType, taskListType } from './Type/TaskType';
import TaskViewFooter from './TaskViewFooter';
import TaskViewForm from './TaskViewForm';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';


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

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;


//引数の型
type propsType = {
  taskSettingList: inputTaskSettingType[] | undefined,
  generalDataList: generalDataType[] | undefined,
  updTask: apiTaskDetailType | undefined,
  openEditPage: () => void,
  closeFn?: () => void,
  backBtnTitle?: string,
}


function TaskView(props: propsType) {

  console.log("TaskView render");

  const {
    viewTask,
    backPageButtonObj,
    positiveButtonObj,
  } = useTaskView({ ...props });

  //ローディング
  if (!viewTask || !viewTask.default || viewTask.default.length === 0) {
    return <Loading height='50vh' />;
  }

  return (
    <HeightDiv
      height='100%'
    >
      <OuterDiv
        height='85%'
      >
        <HeaderDiv>
          <LabelComponent
            title="タスク詳細"
          />
        </HeaderDiv>
        <MainAreaDiv>
          {/* デフォルト属性 */}
          <TaskViewForm
            viewTaskList={viewTask.default}
          />
          {/* カスタム属性 */}
          {
            viewTask &&
            viewTask.customAttribute &&
            viewTask.customAttribute.length > 0 &&
            <React.Fragment>
              <HorizonLabelItemComponent
                title={<BoldSpan>カスタム属性</BoldSpan>}
                width="20%"
              >
              </HorizonLabelItemComponent>
              <TaskViewForm
                viewTaskList={viewTask.customAttribute}
              />
            </React.Fragment>
          }
        </MainAreaDiv>
      </OuterDiv>
      <TaskViewFooter
        backPageButtonObj={backPageButtonObj}
        positiveButtonObj={positiveButtonObj}
        outerHeight='15%'
      />
    </HeightDiv>
  );
}

export default TaskView;