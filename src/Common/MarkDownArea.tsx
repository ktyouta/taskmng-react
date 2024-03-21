import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import LoadingBase from "./LoadingBase";
import CenterLoading from "./CenterLoading";
import ReactMarkdown from "react-markdown";


//引数の型
type propsType = {
    content: string,
    height: string,
    width: string,
}

//外側のdiv
const OuterDiv = styled.div<{ height: string | undefined, width: string | undefined }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
    border: 1px solid #a9a9a9;
    border-radius: 6px;
`;


function MarkDownArea(props: propsType) {

    return (
        <OuterDiv
            height={props.height}
            width={props.width}
        >
            <ReactMarkdown>
                {props.content}
            </ReactMarkdown>
        </OuterDiv>
    );
}

export default MarkDownArea;