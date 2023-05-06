import '../App.css';
import { displayTaskListType } from './Type/TaskType';


function TaskContent(props:displayTaskListType) {

    console.log("TaskContent render");

    return (
        <div>
            <div>
                {props.content}
            </div>
            <div>
                登録日付：{props.registerTime} {props.status}
            </div>
        </div>
    );
}

export default TaskContent;