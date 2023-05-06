import React, { useState } from 'react';
import '../App.css';
import useTaskList from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import { displayTaskListType } from './Type/TaskType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/TaskList.css';


//引数の型
type propsType = {
    displayTaskList: displayTaskListType[]
}

function TaskList(props: propsType) {

    console.log("TaskList render");

    return (
        <div className="tasklist">
            <ul>
                {
                    props.displayTaskList.map((element) => {
                        return (
                            <li key={element.id}>
                                <TaskContent
                                    {...element}
                                />
                                <VerticalSpaceComponent
                                    space='10px'
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