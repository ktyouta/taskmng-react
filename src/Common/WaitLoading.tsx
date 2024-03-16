import React from "react";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";
import { LoadingDiv } from "./CenterLoading";


//ローディング領域のスタイル
const WaitLoadingDiv = styled(LoadingDiv) <{ backGroudColor?: string }>`
  background-color:${({ backGroudColor }) => (backGroudColor ?? "#3333331a")};
  z-index: 2000;
`;

//引数の型
type propsType = {
    backGroudColor?: string
}


function WaitLoading(props: propsType) {

    return (
        <WaitLoadingDiv
            backGroudColor={props.backGroudColor}
        >
            <LoadingBase />
        </WaitLoadingDiv>
    );
}

export default WaitLoading;