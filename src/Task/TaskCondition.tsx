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


//引数の型
type propsType = {
    taskSearchRefInfo: taskSearchConditionRefType,
    closeFn: () => void,
}

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;


function TaskCondition(props: propsType) {

    console.log("TaskCondition render");

    const {
        backPageButtonObj,
        negativeButtonObj,
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
                height='85%'
            >
                <HeaderDiv>
                    <LabelComponent
                        title="検索条件"
                    />
                </HeaderDiv>
                <VerticalFlowDiv
                    height='85%'
                >
                    {/* デフォルト属性 */}
                    <TaskEditForm
                        refInfoArray={props.taskSearchRefInfo.default}
                        errMessage={""}
                        outerHeight='auto'
                    />
                    {/* カスタム属性 */}
                    {
                        <React.Fragment>
                            <HorizonLabelItemComponent
                                title={<BoldSpan>カスタム属性</BoldSpan>}
                                marginLt='15%'
                                width="20%"
                            >
                            </HorizonLabelItemComponent>
                            <TaskEditForm
                                refInfoArray={props.taskSearchRefInfo.custom}
                                errMessage={""}
                                outerHeight='auto'
                            />
                        </React.Fragment>

                    }
                </VerticalFlowDiv>
            </HeightDiv>
            <HeightDiv
                height='15%'
            >
                <TaskConditionFooter
                    backPageButtonObj={backPageButtonObj}
                    negativeButtonObj={negativeButtonObj}
                    outerHeight='15%'
                />
            </HeightDiv>
        </HeightDiv>
    );
}

export default TaskCondition;