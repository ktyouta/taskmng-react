import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "#a9a9a9",
};

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
            <ClipLoader
                color="#a9a9a9"
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </LoadingDiv>
    );
}

export default Loading;