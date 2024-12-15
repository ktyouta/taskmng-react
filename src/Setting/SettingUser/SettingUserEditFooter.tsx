import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../../Common/Type/CommonType';
import React from 'react';
import useSettingUserEditFooter from './Hook/useSettingUserEditFooter';
import { USER_AUTH } from '../../Common/Const/CommonConst';
import { checkAuthAction } from '../../Common/Function/Function';



//引数の型
type propsType = {
    positiveButtonObj: buttonObjType,
    deleteButtonObj: buttonObjType,
    runButtonObj: buttonObjType,
    outerHeight: string,
    isEditable: boolean,
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


function SettingUserEditFooter(props: propsType) {

    console.log("SettingUserEditFooter render");

    const { settingUserAuth } = useSettingUserEditFooter();

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
                        "width": "14%",
                    }}
                />
            }
            <SpaceDiv />
            {
                //管理者権限以上のみ操作可能
                checkAuthAction(settingUserAuth, USER_AUTH.ADMIN) &&
                <React.Fragment>
                    {
                        props.isEditable &&
                        <React.Fragment>
                            {
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
                                        "width": "14%",
                                    }}
                                />
                            }
                            <SpaceComponent
                                space={"5%"}
                            />
                            {
                                props.deleteButtonObj &&
                                props.deleteButtonObj.title &&
                                props.deleteButtonObj.onclick &&
                                <ButtonComponent
                                    styleTypeNumber={props.deleteButtonObj.type}
                                    title={props.deleteButtonObj.title}
                                    onclick={props.deleteButtonObj.onclick}
                                    style={{
                                        "fontSize": "0.9rem",
                                        "height": "42%",
                                        "width": "14%",
                                    }}
                                />
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </OuterDiv>
    );
}

export default SettingUserEditFooter;