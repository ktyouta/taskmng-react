import ButtonComponent, { buttonType } from '../../Common/ButtonComponent';
import SpaceComponent from '../../Common/SpaceComponent';
import styled from 'styled-components';
import { buttonObjType } from '../../Common/Type/CommonType';
import React from 'react';



//引数の型
type propsType = {
    onclick: () => void,
    resetAuthList: () => void
}

//外側のスタイル
const OuterDiv = styled.div`
    height:100%;
    display:flex;
    box-sizing: border-box;
    padding-left: 7%;
    padding-right: 4%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;


function SettingUserInputAuthListFooter(props: propsType) {

    console.log("SettingUserInputAuthListFooter render");

    return (
        <OuterDiv>
            <ButtonComponent
                styleTypeNumber="GRAD_GRAY"
                title="リセット"
                onclick={props.resetAuthList}
                style={{
                    "fontSize": "0.9rem",
                    "height": "51%",
                    "width": "14%",
                }}
            />
            <SpaceDiv />
            <ButtonComponent
                styleTypeNumber="GRAD_BLUE"
                title="閉じる"
                onclick={props.onclick}
                style={{
                    "fontSize": "0.9rem",
                    "height": "51%",
                    "width": "14%",
                }}
            />
        </OuterDiv>
    );
}

export default SettingUserInputAuthListFooter;