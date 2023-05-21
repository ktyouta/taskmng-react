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
import TaskEditForm from './TaskEditForm';
import { refConditionType, refInfoType } from '../Common/Type/CommonType';
import useTaskCondition from './Hook/useTaskCondition';
import TaskConditionFooter from './TaskConditionFooter';


//引数の型
type propsType = {
    refInfoArray: refInfoType[],
    closeFn:()=>void,
}


function TaskCondition(props: propsType) {

    console.log("TaskCondition render");

    const {
        backPageButtonObj,
        negativeButtonObj,
    } = useTaskCondition({ ...props });


    return (
        <div className="taskedit">
            <TaskEditForm
                title={'検索条件'}
                refInfoArray={props.refInfoArray}
                isUpDelLoading={false}
                errMessage={""}
                outerHeight='85%'
            />
            <TaskConditionFooter
                backPageButtonObj={backPageButtonObj}
                negativeButtonObj={negativeButtonObj}
                outerHeight='15%'
            />
        </div>
    );
}

export default TaskCondition;