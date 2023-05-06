import React, { useState } from 'react';
import '../App.css';
import useTaskList from './Hook/useTaskList';
import TaskContent from './TaskContent';
import { displayTaskListType } from './Type/TaskType';


//引数の型
type propsType = {
    displayTaskList:displayTaskListType[]
}

function TaskList(props:propsType) {

    console.log("TaskList render");
    
    return (
        <div className="tasklist">
            <ul>
                {
                    props.displayTaskList.map((element) => {
                        return (
                            <li>
                                <TaskContent
                                    {...element}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default TaskList;