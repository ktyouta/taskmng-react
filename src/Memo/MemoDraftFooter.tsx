import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';
import useMemoDraftFooter from './Hook/useMemoDraftFooter';
import { checkAuthAction } from '../Common/Function/Function';
import { USER_AUTH } from '../Common/Const/CommonConst';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    deleteButtomObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
    saveButtonObj: buttonObjType,
    outerHeight: string,
    isMatchUser: boolean,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
    box-sizing: border-box;
    padding-top: 1%;
    padding-right: 4%;
    padding-left: 3%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function MemoDraftFooter(props: propsType) {

    console.log("MemoDraftFooter render");

    const { memoAuthority } = useMemoDraftFooter();

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
                        "height": "70%",
                    }}
                />
            }
            <SpaceDiv />
            {
                //メモの作成者または管理者権限以上の場合編集可能
                (props.isMatchUser || checkAuthAction(memoAuthority, USER_AUTH.ADMIN)) &&
                props.negativeButtonObj &&
                props.negativeButtonObj.title &&
                props.negativeButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.negativeButtonObj.type}
                    title={props.negativeButtonObj.title}
                    onclick={props.negativeButtonObj.onclick}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "70%",
                    }}
                />
            }
            <SpaceComponent
                space={"3%"}
            />
            {
                //メモの作成者または管理者権限以上の場合編集可能
                (props.isMatchUser || checkAuthAction(memoAuthority, USER_AUTH.ADMIN)) &&
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
                        "height": "70%",
                    }}
                />
            }
            <SpaceComponent
                space={"3%"}
            />
            {
                //メモの作成者または管理者権限以上の場合編集可能
                (props.isMatchUser || checkAuthAction(memoAuthority, USER_AUTH.ADMIN)) &&
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
                        "height": "70%",
                    }}
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
                    style={{
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "70%",
                    }}
                />
            }
        </OuterDiv>
    );
}

export default MemoDraftFooter;