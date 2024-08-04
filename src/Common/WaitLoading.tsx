import React from "react";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";
import { LoadingDiv } from "./CenterLoading";
import { Z_INDEX_PARAM } from "./Const/CommonConst";


//ローディング領域のスタイル
const WaitLoadingDiv = styled(LoadingDiv) <{ backGroudColor?: string, top?: string, left?: string, }>`
  background-color:${({ backGroudColor }) => (backGroudColor ?? "#3333331a")};
  z-index: ${Z_INDEX_PARAM.WAITLOADING};
  top:${({ top }) => (top ?? "0")};
  left: ${({ left }) => (left ?? "0")};
`;

//引数の型
type propsType = {
    backGroudColor?: string,
    top?: string,
    left?: string,
    spinerTop?: string,
    spinerLeft?: string,
}


function WaitLoading(props: propsType) {

    return (
        <WaitLoadingDiv
            backGroudColor={props.backGroudColor}
            top={props.top}
            left={props.left}
        >
            <LoadingBase
                top={props.spinerTop}
                left={props.spinerLeft}
            />
        </WaitLoadingDiv>
    );
}

export default WaitLoading;