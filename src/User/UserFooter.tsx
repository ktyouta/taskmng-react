import styled from "styled-components";
import { buttonObjType } from "../Common/Type/CommonType";
import SpaceComponent from "../Common/SpaceComponent";
import ButtonComponent from "../Common/ButtonComponent";
import React from "react";
import useUserFooter from "./Hook/useUserFooter";
import { checkAuthAction } from "../Common/Function/Function";
import { USER_AUTH } from "../Common/Const/CommonConst";



//引数の型
type propsType = {
    positiveButtonObj: buttonObjType,
    runButtonObj: buttonObjType,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    display:flex;
    box-sizing: border-box;
    padding-left: 7%;
    padding-right: 6%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function UserFooter(props: propsType) {

    console.log("UserFooter render");

    const { userInfoAuthority } = useUserFooter();

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            {
                props.positiveButtonObj &&
                props.positiveButtonObj.title &&
                props.positiveButtonObj.onclick &&
                <ButtonComponent
                    styleTypeNumber={props.positiveButtonObj.type}
                    title={props.positiveButtonObj.title}
                    onclick={props.positiveButtonObj.onclick}
                    style={{
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "width": "12%",
                        "height": "43%",
                    }}
                />
            }
            <SpaceDiv />
            <React.Fragment>
                {
                    checkAuthAction(userInfoAuthority, USER_AUTH.PUBLIC) &&
                    props.runButtonObj &&
                    props.runButtonObj.title &&
                    props.runButtonObj.onclick &&
                    <ButtonComponent
                        styleTypeNumber={props.runButtonObj.type}
                        title={props.runButtonObj.title}
                        onclick={props.runButtonObj.onclick}
                        style={{
                            "fontWeight": "bold",
                            "fontSize": "0.9rem",
                            "width": "12%",
                            "height": "43%",
                        }}
                    />
                }
            </React.Fragment>
        </OuterDiv>
    );
}

export default UserFooter;