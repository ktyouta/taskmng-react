import '../App.css';
import ButtonComponent, { buttonType } from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../Common/Type/CommonType';
import useMemoViewFooter from './Hook/useMemoViewFooter';
import { checkAuthAction } from '../Common/Function/Function';
import { USER_AUTH } from '../Common/Const/CommonConst';



//引数の型
type propsType = {
    backPageButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
    outerHeight: string,
    isMatchUser: boolean,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
    padding-top: 1%;
    box-sizing: border-box;
    padding-left:3%;
    padding-right:5%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function MemoViewFooter(props: propsType) {

    console.log("MemoViewFooter render");

    const { memoAuthority } = useMemoViewFooter();

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
                        "width": "13%",
                        "height": "70%",
                    }}
                />
            }
            <SpaceDiv />
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
                        "width": "13%",
                        "height": "70%",
                    }}
                />
            }
        </OuterDiv>
    );
}

export default MemoViewFooter;