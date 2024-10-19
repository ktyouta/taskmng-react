import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    deleteButtomObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
    isTaskDeletable: boolean,
}

//外側のスタイル
const OuterDiv = styled.div`
    height:100%;
    display:flex;
    box-sizing: border-box;
    padding-left: 7%;
    padding-right: 4%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function TaskEditFooter(props: propsType) {

    console.log("TaskEditFooter render");

    return (
        <OuterDiv>
            {
                props.backPageButtonObj &&
                props.backPageButtonObj.title &&
                props.backPageButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.backPageButtonObj.type}
                    title={props.backPageButtonObj.title}
                    onclick={props.backPageButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                    }}
                />
            }
            <SpaceDiv />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                    }}
                />
            }
            <SpaceComponent
                space={"3%"}
            />
            {
                props.positiveButtonObj &&
                props.positiveButtonObj.title &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.positiveButtonObj.type}
                    title={props.positiveButtonObj.title}
                    onclick={props.positiveButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                    }}
                />
            }
            <SpaceComponent
                space={"3%"}
            />
            {
                props.isTaskDeletable &&
                props.deleteButtomObj &&
                props.deleteButtomObj.title &&
                props.deleteButtomObj.onclick &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.deleteButtomObj.type}
                    title={props.deleteButtomObj.title}
                    onclick={props.deleteButtomObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                    }}
                />
            }
        </OuterDiv>
    );
}

export default TaskEditFooter;