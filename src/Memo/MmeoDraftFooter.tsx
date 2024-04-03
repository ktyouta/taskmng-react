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


function MmeoDraftFooter(props: propsType) {

    console.log("MmeoDraftFooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <SpaceComponent
                space={"5%"}
            />
            {
                props.backPageButtonObj &&
                props.backPageButtonObj.title &&
                props.backPageButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.backPageButtonObj.type}
                    title={props.backPageButtonObj.title}
                    onclick={props.backPageButtonObj.onclick}
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                />
            }
            <SpaceComponent
                space={"48%"}
            />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
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
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
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
                    style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                />
            }
        </OuterDiv>
    );
}

export default MmeoDraftFooter;