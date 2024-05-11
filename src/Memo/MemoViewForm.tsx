import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

//引数の型
type propsType = {
    memoTitle: string,
    memoContent: string,
}

//タイトルのスタイル
const TitleDiv = styled.div`
    text-align: left;
    font-size: 1.5em;
    margin-left: 11%;
    font-weight: 550;
    margin-bottom: 1%;
`;

//マークダウンエリアのスタイル
const ContentAreaDiv = styled.div`
    height:90%;
    width:80%;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    margin-left: 10%;
    text-align: left;
    padding-left: 2%;
    overflow-y: auto;
    background-color:white;
`;

function MemoViewForm(props: propsType) {

    console.log("MemoViewForm render");

    return (
        <React.Fragment>
            <TitleDiv>
                {props.memoTitle}
            </TitleDiv>
            <ContentAreaDiv>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {props.memoContent}
                </ReactMarkdown>
            </ContentAreaDiv>
        </React.Fragment>
    );
}

export default MemoViewForm;