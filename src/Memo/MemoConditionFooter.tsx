import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';



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
    box-sizing:border-box;
    padding-left:7%;
    padding-right: 5%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;

function MemoConditionFooter(props: propsType) {

    console.log("MemoConditionFooter render");

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
                        "height": "61%",
                        "width": "16%",
                    }}
                />
            }
            <SpaceDiv />
            {
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "height": "61%",
                        "width": "auto",
                        "box-sizing": "border-box",
                        "padding": "1%"
                    }}
                />
            }
        </OuterDiv>
    );
}

export default MemoConditionFooter;