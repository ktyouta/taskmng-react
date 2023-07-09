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
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
`;


function SettingCustomEditFooter(props: propsType) {

    console.log("mastereditfooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <SpaceComponent
                space={"10%"}
            />
            <SpaceComponent
                space={"55%"}
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
        </OuterDiv>
    );
}

export default SettingCustomEditFooter;