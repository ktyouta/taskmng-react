import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../../Common/Type/CommonType';



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


function SettingCustomEditFooter(props: propsType) {

    console.log("SettingCustomEditFooter render");

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
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
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
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
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
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                />
            }
        </OuterDiv>
    );
}

export default SettingCustomEditFooter;