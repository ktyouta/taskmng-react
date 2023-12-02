import '../App.css';
import './css/TaskEdit.css';
import TaskEditForm from './TaskEditForm';
import { refInfoType } from '../Common/Type/CommonType';
import useTaskCondition from './Hook/useTaskCondition';
import TaskConditionFooter from './TaskConditionFooter';
import Loading from '../Common/Loading';
import LabelComponent from '../Common/LabelComponent';
import styled from 'styled-components';
import { HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';


//引数の型
type propsType = {
    refInfoArray: refInfoType[],
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
    if (!props.refInfoArray || props.refInfoArray.length === 0) {
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
                    <TaskEditForm
                        refInfoArray={props.refInfoArray}
                        isUpDelLoading={false}
                        errMessage={""}
                        outerHeight='85%'
                    />
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