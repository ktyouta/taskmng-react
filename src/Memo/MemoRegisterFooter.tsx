import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
    saveButtonObj: buttonObjType,
    clearButtonObj: buttonObjType,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
    box-sizing: border-box;
    padding-top: 1%;
    padding-left:4%;
    padding-right:7%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function MemoRegisterFooter(props: propsType) {

    console.log("MemoRegisterFooter render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
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
                        "height": "71%",
                    }}
                />
            }
            <SpaceDiv />
            {
                props.clearButtonObj &&
                props.clearButtonObj.title &&
                props.clearButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.clearButtonObj.type}
                    title={props.clearButtonObj.title}
                    onclick={props.clearButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "71%",
                    }}
                />
            }
            <SpaceComponent
                space='2%'
            />
            {
                props.saveButtonObj &&
                props.saveButtonObj.title &&
                props.saveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.saveButtonObj.type}
                    title={props.saveButtonObj.title}
                    onclick={props.saveButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "71%",
                    }}
                />
            }
            <SpaceComponent
                space='2%'
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
                        "height": "71%",
                    }}
                />
            }
        </OuterDiv>
    );
}

export default MemoRegisterFooter;