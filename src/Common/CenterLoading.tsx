import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";


//ローディング領域のスタイル
export const LoadingDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
`;


function CenterLoading() {

    return (
        <LoadingDiv
            className="sweet-loading"
        >
            <LoadingBase />
        </LoadingDiv>
    );
}

export default CenterLoading;