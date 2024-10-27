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


//引数の型
type propsType = {
    updTaskId: string,
    closeFn?: () => void,
    backBtnTitle?: string,
}

function TaskDetailInfoArea(props: propsType) {

    console.log("TaskDetailInfoArea render");

    const {
        updTask,
        generalDataList,
        taskSettingList,
        viewMode,
        openViewPage,
        openEditPage,
    } = useTaskDetail({ ...props });

    return (
        <React.Fragment>
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
                                    updTaskId={props.updTaskId}
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
        </React.Fragment>
    );
}

export default TaskDetailInfoArea;