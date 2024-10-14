import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useTaskEdit from './Hook/useTaskEdit';
import './css/TaskEdit.css';
import TaskEditFooter from './TaskEditFooter';
import TaskEditForm from './TaskEditForm';
import React, { ReactNode } from 'react';
import useTaskDetail from './Hook/useTaskDetail';
import TaskView from './TaskView';
import TaskEdit from './TaskEdit';
import { VIEW_MODE } from '../Common/Const/CommonConst';
import { HeaderDiv, HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';
import TaskDetailInfoArea from './TaskDetailInfoArea';
import IconComponent from '../Common/IconComponent';
import { RxCross1 } from 'react-icons/rx';


//引数の型
type propsType = {
    updTaskId: string,
    closeFn?: () => void,
    backBtnTitle?: string,
}

//ヘッダー
const TaskHeaderDiv = styled(HeaderDiv) <{ height: string | undefined }>`
  padding-left:1%;
  padding-top:1%;
  height:${({ height }) => (height)};
  box-sizing:border-box;
  font-size:18px;
`;

//ヘッダー
const HeaderTitleDiv = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #3f86ed, #4481eb, #04befe, #3f86ed);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  border-radius: 9px;
  position:relative;
`;

//フォーム
const TaskFormAreaDiv = styled.div<{ height: string | undefined }>`
  height:${({ height }) => (height)};
  box-sizing:border-box;
  padding-top:2%;
`;

//外側のスタイル
const OuterDiv = styled.div<{ height?: string, width?: string }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
`;


function TaskDetailModal(props: propsType) {

    console.log("TaskDetailModal render");

    return (
        <OuterDiv
            height='100%'
        >
            <TaskHeaderDiv
                height='8%'
            >
                <HeaderTitleDiv>
                    タスク詳細
                    <IconComponent
                        icon={RxCross1}
                        onclick={props.closeFn}
                        style={{
                            "text-align": "right",
                            "position": "absolute",
                            "right": "2%",
                        }}
                    />
                </HeaderTitleDiv>
            </TaskHeaderDiv>
            <TaskFormAreaDiv
                height='92%'
            >
                <TaskDetailInfoArea
                    updTaskId={props.updTaskId}
                    closeFn={props.closeFn}
                    backBtnTitle={props.backBtnTitle}
                />
            </TaskFormAreaDiv>
        </OuterDiv>
    );
}

export default TaskDetailModal;