import React, { useState } from 'react';
import '../App.css';
import useTaskList from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/TaskList.css';


//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[]
}


function TaskList(props: propsType) {

    console.log("TaskList render");

    return (
        <div className="tasklist">
            <ul>
                {
                    props.displayTaskList && props.displayTaskList.map((element, index) => {
                        let id = element.id as string;
                        return (
                            <React.Fragment key={`tasklist-${id}-${index}`}>
                                <li key={`li-${id}`}>
                                    <TaskContent
                                        key={`content-${id}`}
                                        {...element}
                                    />
                                </li>
                                <VerticalSpaceComponent
                                    key={`verticalspace-${id}`}
                                    space='2%'
                                />
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default TaskList;