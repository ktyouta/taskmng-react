import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";
import CenterLoading from "./CenterLoading";


//背景色
const MaskDiv = styled.div`
position: fixed;
background:rgba(171, 171, 171,0.5);
top: 0;
left: 0;
right: 0;
bottom: 0;
`;


function MaskLoading() {

    return (
        <MaskDiv>
            <CenterLoading />
        </MaskDiv>
    );
}

export default MaskLoading;