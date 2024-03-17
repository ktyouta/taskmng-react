import styled from "styled-components";
import { buttonObjType } from "../Common/Type/CommonType";
import SpaceComponent from "../Common/SpaceComponent";
import ButtonComponent from "../Common/ButtonComponent";



//引数の型
type propsType = {
    positiveButtonObj: buttonObjType,
    deleteButtonObj: buttonObjType,
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
                space={"80%"}
            />
            {
                props.runButtonObj &&
                props.runButtonObj.title &&
                props.runButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.runButtonObj.type}
                    title={props.runButtonObj.title}
                    onclick={props.runButtonObj.onclick}
                />
            }
        </OuterDiv>
    );
}

export default UserFooter;