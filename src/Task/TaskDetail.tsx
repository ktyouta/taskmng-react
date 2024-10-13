import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';
import React from 'react';
import useTaskDetail from './Hook/useTaskDetail';
import TaskView from './TaskView';
import TaskEdit from './TaskEdit';
import { VIEW_MODE } from '../Common/Const/CommonConst';
import { HeaderDiv, HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


//引数の型
type propsType = {
    updTaskId: string,
    closeFn?: () => void,
    backBtnTitle?: string,
}

//ヘッダー
const TaskHeaderDiv = styled(HeaderDiv) <{ height: string | undefined }>`
  padding-left:3%;
  padding-top:1%;
  height:${({ height }) => (height)};
  box-sizing:border-box;
`;

//フォーム
const TaskFormAreaDiv = styled.div<{ height: string | undefined }>`
  height:${({ height }) => (height)};
  box-sizing:border-box;
  padding-top:1%;
`;

//外側のスタイル
const OuterDiv = styled.div<{ height?: string, width?: string }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
`;


function TaskDetail(props: propsType) {

    console.log("TaskDetail render");

    const {
        updTask,
        generalDataList,
        taskSettingList,
        viewMode,
        openViewPage,
        openEditPage,
    } = useTaskDetail({ ...props });

    return (
        <OuterDiv
            height='100%'
        >
            <TaskHeaderDiv
                height='8%'
            >
                タスク詳細
            </TaskHeaderDiv>
            <TaskFormAreaDiv
                height='92%'
            >
                {
                    (() => {
                        switch (viewMode) {
                            //閲覧
                            case VIEW_MODE.view:
                                return (
                                    <TaskView
                                        taskSettingList={taskSettingList}
                                        generalDataList={generalDataList}
                                        updTask={updTask}
                                        openEditPage={openEditPage}
                                        closeFn={props.closeFn}
                                        backBtnTitle={props.backBtnTitle}
                                    />
                                )
                            //編集
                            case VIEW_MODE.edit:
                                return (
                                    <TaskEdit
                                        updTaskId={props.updTaskId}
                                        taskSettingList={taskSettingList}
                                        generalDataList={generalDataList}
                                        updTask={updTask}
                                        backFn={openViewPage}
                                        closeFn={props.closeFn}
                                    />
                                )
                            default:
                                return (
                                    <React.Fragment></React.Fragment>
                                )
                        }
                    })()
                }
            </TaskFormAreaDiv>

        </OuterDiv>
    );
}

export default TaskDetail;