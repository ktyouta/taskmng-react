import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";


//ローディング領域のスタイル
const LoadingDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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