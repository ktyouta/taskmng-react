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
                    props.displayTaskList.map((element) => {
                        return (
                            <React.Fragment>
                                <li key={element.id as string}>
                                    <TaskContent
                                        {...element}
                                    />
                                </li>
                                <VerticalSpaceComponent
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