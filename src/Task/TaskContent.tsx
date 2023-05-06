import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayTaskListType } from './Type/TaskType';
import './css/TaskContent.css';


function TaskContent(props: displayTaskListType) {

    console.log("TaskContent render");

    return (
        <div className='taskcontent'>
            <div className='taskcontent-content'>
                {props.content}
            </div>
            <div className='taskcontent-info'>
                <div>
                    登録日時：{props.registerTime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    更新日時：{props.updTime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    期限：{props.limiTtime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    優先度：{props.priority}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    ステータス：{props.status}
                </div>
                <div className='taskcontent-editarea'>
                    {props.editButton}
                </div>
            </div>
        </div>
    );
}

export default TaskContent;