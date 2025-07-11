import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";


//ローディング領域のスタイル
const LoadingDiv = styled.div<{ height: string | undefined }>`
  height: ${({ height }) => (height ? height : "100vh")};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
`;

//引数の型
type propsType = {
    height?: string,
}


function Loading(props: propsType) {

    return (
        <LoadingDiv
            className="sweet-loading"
            height={props.height}
        >
            <LoadingBase />
        </LoadingDiv>
    );
}

export default Loading;