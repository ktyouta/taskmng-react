import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../../Common/Type/CommonType';



//引数の型
type propsType = {
    positiveButtonObj: buttonObjType,
    runButtonObj: buttonObjType,
    outerHeight: string,
    isSettingEditable: boolean,
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
                space={"60%"}
            />
            {
                props.isSettingEditable &&
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