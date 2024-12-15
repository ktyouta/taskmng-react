import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../../Common/Type/CommonType';
import useSettingDefaultEditFooter from './Hook/useSettingDefaultEditFooter';
import React from 'react';
import { checkAuthAction } from '../../Common/Function/Function';
import { USER_AUTH } from '../../Common/Const/CommonConst';



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
    box-sizing: border-box;
    padding-left: 7%;
    padding-right: 4%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function SettingDefaultEditFooter(props: propsType) {

    console.log("SettingDefaultEditFooter render");

    const { settingDefalutAuth } = useSettingDefaultEditFooter();

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
                        "fontSize": "0.9rem",
                        "height": "42%",
                        "width": "16%",
                    }}
                />
            }
            <SpaceDiv />
            {
                //管理者権限以上のみ操作可能
                checkAuthAction(settingDefalutAuth, USER_AUTH.ADMIN) &&
                <React.Fragment>
                    {
                        props.isSettingEditable &&
                        props.runButtonObj &&
                        props.runButtonObj.title &&
                        props.runButtonObj.onclick &&
                        <ButtonComponent
                            styleTypeNumber={props.runButtonObj.type}
                            title={props.runButtonObj.title}
                            onclick={props.runButtonObj.onclick}
                            style={{
                                "fontSize": "0.9rem",
                                "height": "42%",
                                "width": "16%",
                            }}
                        />
                    }
                </React.Fragment>
            }
        </OuterDiv>
    );
}

export default SettingDefaultEditFooter;