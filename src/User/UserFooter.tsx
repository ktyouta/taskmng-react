import styled from "styled-components";
import { buttonObjType } from "../Common/Type/CommonType";
import SpaceComponent from "../Common/SpaceComponent";
import ButtonComponent from "../Common/ButtonComponent";



//引数の型
type propsType = {
    positiveButtonObj: buttonObjType,
    runButtonObj: buttonObjType,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
`;


function UserFooter(props: propsType) {

    console.log("UserFooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <SpaceComponent
                space={"8%"}
            />
            {
                props.positiveButtonObj &&
                props.positiveButtonObj.title &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.positiveButtonObj.type}
                    title={props.positiveButtonObj.title}
                    onclick={props.positiveButtonObj.onclick}
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                />
            }
            <SpaceComponent
                space={"65%"}
            />
            {
                props.runButtonObj &&
                props.runButtonObj.title &&
                props.runButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.runButtonObj.type}
                    title={props.runButtonObj.title}
                    onclick={props.runButtonObj.onclick}
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                />
            }
        </OuterDiv>
    );
}

export default UserFooter;