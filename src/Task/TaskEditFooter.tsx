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
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
`;


function TaskEditFooter(props: propsType) {

    console.log("TaskEditFooter render");

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
                    style={{
                        "borderRadius": "10px",
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                        "box-shadow": "0 1px 5px 0 rgba(45, 54, 65, 0.75)",
                        "border": "none",
                        "background": "linear-gradient(to right, #29323c, #485563, #2b5876)",
                        "color": "white",
                    }}
                />
            }
            <SpaceComponent
                space={"31%"}
            />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                    style={{
                        "borderRadius": "10px",
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                        "background": "linear-gradient(to right, #3f86ed, #25aae1)",
                        "border": "none",
                        "box-shadow": "0 1px 7px 0 rgba(49, 196, 190, 0.55)",
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
                        "borderRadius": "10px",
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                        "background": "linear-gradient(to right, #3f86ed, #25aae1)",
                        "border": "none",
                        "box-shadow": "0 1px 7px 0 rgba(49, 196, 190, 0.55)",
                    }}
                />
            }
            <SpaceComponent
                space={"3%"}
            />
            {
                props.deleteButtomObj &&
                props.deleteButtomObj.title &&
                props.deleteButtomObj.onclick &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.deleteButtomObj.type}
                    title={props.deleteButtomObj.title}
                    onclick={props.deleteButtomObj.onclick}
                    style={{
                        "borderRadius": "10px",
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                        "background": "linear-gradient(to right, #eb3941, #e2373f)",
                        "box-shadow": "0 1px 7px rgba(242, 97, 103, 0.4)",
                        "border": "none"
                    }}
                />
            }
        </OuterDiv>
    );
}

export default TaskEditFooter;