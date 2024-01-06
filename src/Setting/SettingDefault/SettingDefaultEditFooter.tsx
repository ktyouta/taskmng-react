import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';


//ボタン用
export type buttonObjType = {
    title: string,
    type: buttonType,
    onclick: (() => void) | undefined,
}

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


function SettingDefaultEditFooter(props: propsType) {

    console.log("SettingDefaultEditFooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <SpaceComponent
                space={"10%"}
            />
            {
                props.positiveButtonObj &&
                props.positiveButtonObj.title &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.positiveButtonObj.type}
                    title={props.positiveButtonObj.title}
                    onclick={props.positiveButtonObj.onclick}
                />
            }
            <SpaceComponent
                space={"50%"}
            />
            {
                props.deleteButtonObj &&
                props.deleteButtonObj.title &&
                props.deleteButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.deleteButtonObj.type}
                    title={props.deleteButtonObj.title}
                    onclick={props.deleteButtonObj.onclick}
                />
            }
            <SpaceComponent
                space={"5%"}
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

export default SettingDefaultEditFooter;