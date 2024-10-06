import '../App.css';
import './css/TaskEdit.css';
import TaskEditForm from './TaskEditForm';
import { refInfoType } from '../Common/Type/CommonType';
import useTaskCondition from './Hook/useTaskCondition';
import TaskConditionFooter from './TaskConditionFooter';
import Loading from '../Common/Loading';
import LabelComponent from '../Common/LabelComponent';
import styled from 'styled-components';
import { BoldSpan, HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import { taskSearchConditionRefType } from './Type/TaskType';
import { TabComponent } from '../Common/TabComponent';
import TaskSearchConditionTab from './TaskSearchConditionTab';
import IconComponent from '../Common/IconComponent';
import { RxCross1 } from "react-icons/rx";


//引数の型
type propsType = {
    taskSearchRefInfo: taskSearchConditionRefType,
    closeFn: () => void,
    closeModal: () => void,
}

//ヘッダー
const HeaderDiv = styled.div`
  width: 100%;
  height: 7%;
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

//検索条件表示エリア
const ConditionAreaDiv = styled(HeightDiv)`
    box-sizing: border-box;
    padding-top: 2%;
    padding-right: 3%;
`;


function TaskCondition(props: propsType) {

    console.log("TaskCondition render");

    const {
        backPageButtonObj,
        negativeButtonObj,
        searchConditionComponent,
    } = useTaskCondition({ ...props });

    //ローディング
    if (!props.taskSearchRefInfo ||
        props.taskSearchRefInfo.default.length === 0) {
        return <Loading height='50vh' />;
    }

    return (
        <HeightDiv
            height='100%'
        >
            <HeightDiv
                height='90%'
            >
                <HeaderDiv>
                    検索条件
                    <IconComponent
                        icon={RxCross1}
                        onclick={props.closeModal}
                        style={{
                            "text-align": "right",
                            "position": "absolute",
                            "right": "2%",
                        }}
                    />
                </HeaderDiv>
                <ConditionAreaDiv
                    height='85%'
                >
                    <TaskSearchConditionTab
                        searchConditionComponent={searchConditionComponent}
                    />
                </ConditionAreaDiv>
            </HeightDiv>
            <HeightDiv
                height='10%'
            >
                <TaskConditionFooter
                    backPageButtonObj={backPageButtonObj}
                    negativeButtonObj={negativeButtonObj}
                    outerHeight='100%'
                />
            </HeightDiv>
        </HeightDiv>
    );
}

export default TaskCondition;