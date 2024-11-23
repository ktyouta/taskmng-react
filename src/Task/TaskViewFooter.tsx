import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';
import { apiTaskDetailType } from './Type/TaskType';
import { FLG } from '../Common/Const/CommonConst';
import useTaskViewFooter from './Hook/useTaskViewFooter';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
    outerHeight: string,
    updTask: apiTaskDetailType | undefined,
    closeFn?: () => void,
    updTaskId: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
    padding-left: 7%;
    padding-right: 10%;
    box-sizing: border-box;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function TaskViewFooter(props: propsType) {

    console.log("TaskViewFooter render");

    const {
        recoveryButtonObj,
        isRestorableFlg,
        isEditableFlg,
    } = useTaskViewFooter({ ...props });

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
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "14%",
                        "height": "43%",
                    }}
                />
            }
            <SpaceDiv />
            {
                isEditableFlg && (
                    props.updTask?.default.deleteFlg === FLG.OFF ?
                        (
                            //編集ボタン
                            <ButtonComponent
                                styleTypeNumber={props.positiveButtonObj.type}
                                title={props.positiveButtonObj.title}
                                onclick={props.positiveButtonObj.onclick}
                                style={{
                                    "fontWeight": "bold",
                                    "fontSize": "0.9rem",
                                    "width": "14%",
                                    "height": "43%",
                                }}
                            />
                        )
                        :
                        (
                            //復元ボタン
                            isRestorableFlg &&
                            <ButtonComponent
                                styleTypeNumber={recoveryButtonObj.type}
                                title={recoveryButtonObj.title}
                                onclick={recoveryButtonObj.onclick}
                                style={{
                                    "fontWeight": "bold",
                                    "fontSize": "0.9rem",
                                    "width": "14%",
                                    "height": "43%",
                                }}
                            />
                        )
                )
            }
        </OuterDiv>
    );
}

export default TaskViewFooter;