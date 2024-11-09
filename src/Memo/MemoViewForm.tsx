import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { tagType } from '../Common/TagsComponent';
import TagButtonComponent from '../Common/TagButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';

//引数の型
type propsType = {
    memoTitle: string,
    memoContent: string,
    memoTagList: tagType[],
}

//タイトルのスタイル
const TitleDiv = styled.div`
    text-align: left;
    font-size: 1.5em;
    font-weight: 550;
    margin-bottom: 1%;
`;

//マークダウンエリアのスタイル
const ContentAreaDiv = styled.div`
    height:82%;
    width:95%;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    text-align: left;
    padding-left: 2%;
    overflow-y: auto;
    background-color:white;
    box-sizing: border-box;
`;

//タグのスタイル
const TagDiv = styled.div`
    min-height:7%;
    width:95%;
    background-color:white;
    margin-bottom:1%;
    display: flex;
    align-items: center;
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    box-sizing:border-box;
    padding-left: 1%;
    overflow-wrap: break-word;
    height: auto;
    flex-wrap: wrap;
    gap:1%;
`;


function MemoViewForm(props: propsType) {

    console.log("MemoViewForm render");

    return (
        <React.Fragment>
            <TitleDiv>
                {props.memoTitle}
            </TitleDiv>
            <TagDiv>
                タグ：
                {
                    props.memoTagList &&
                        props.memoTagList.length > 0
                        ?
                        <React.Fragment>
                            {
                                props.memoTagList.map((element) => {
                                    return (
                                        <TagButtonComponent
                                            title={element.label}
                                        />
                                    )
                                })
                            }
                        </React.Fragment>
                        :
                        <span>
                            未設定
                        </span>
                }
            </TagDiv>
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