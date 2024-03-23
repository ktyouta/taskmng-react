import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { displayMemoType, viewMemoType } from './Type/MemoType';
import useMemoViewForm from './Hook/useMemoViewForm';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

//引数の型
type propsType = {
    memoTitle: string,
    memoContent: string,
}

//タイトルのスタイル
const TitleH1 = styled.h1`
    margin-left: 11%;
    text-align: left;
`;

//マークダウンエリアのスタイル
const ContentAreaDiv = styled.div`
    height:87%;
    width:80%;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    margin-left: 10%;
    text-align: left;
    padding-left: 2%;
`;

function MemoViewForm(props: propsType) {

    console.log("MemoViewForm render");

    // let {
    //     viewList
    // } = useMemoViewForm({ ...props });

    return (
        <React.Fragment>
            <TitleH1>
                {props.memoTitle}
            </TitleH1>
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