import React from "react";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";
import { LoadingDiv } from "./CenterLoading";


//ローディング領域のスタイル
const WaitLoadingDiv = styled(LoadingDiv) <{ backGroudColor?: string, top?: string, left?: string, }>`
  background-color:${({ backGroudColor }) => (backGroudColor ?? "#3333331a")};
  z-index: 2000;
  top:${({ top }) => (top ?? "0")};
  left: ${({ left }) => (left ?? "0")};
`;

//引数の型
type propsType = {
    backGroudColor?: string,
    top?: string,
    left?: string,
}


function WaitLoading(props: propsType) {

    return (
        <WaitLoadingDiv
            backGroudColor={props.backGroudColor}
            top={props.top}
            left={props.left}
        >
            <LoadingBase />
        </WaitLoadingDiv>
    );
}

export default WaitLoading;