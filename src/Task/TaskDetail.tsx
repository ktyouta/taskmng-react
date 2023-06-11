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


//引数の型
type propsType = {
    updTaskId: string,
    closeFn?: () => void,
}


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
        <React.Fragment>
            {
                (() => {
                    switch (viewMode) {
                        //閲覧
                        case 1:
                            return (
                                <TaskView
                                    taskSettingList={taskSettingList}
                                    generalDataList={generalDataList}
                                    updTask={updTask}
                                    openEditPage={openEditPage}
                                    closeFn={props.closeFn}
                                />
                            )
                        //編集
                        case 2:
                            return (
                                <div></div>
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

export default TaskDetail;