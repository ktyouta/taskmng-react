import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';


//ボタン用
export type buttonObjType = {
    title: string,
    type: buttonType,
    onclick: (() => void) | undefined,
}

//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
`;


function TaskConditionFooter(props: propsType) {

    console.log("TaskConditionFooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <SpaceComponent
                space={"10%"}
            />
            {
                props.backPageButtonObj &&
                props.backPageButtonObj.title &&
                props.backPageButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.backPageButtonObj.type}
                    title={props.backPageButtonObj.title}
                    onclick={props.backPageButtonObj.onclick}
                />
            }
            <SpaceComponent
                space={"55%"}
            />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                />
            }
        </OuterDiv>
    );
}

export default TaskConditionFooter;