import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import { refInfoType } from '../Common/Type/CommonType';
import styled from 'styled-components';
import { tagListResType } from './Type/MemoType';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../Common/BaseInputComponent';
import LabelTextAreaComponent from '../Common/LabelTextAreaComponent';
import BaseTextAreaComponent from '../Common/BaseTextAreaComponent';
import { VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import ReactMarkdown from 'react-markdown';
import MarkDownArea from '../Common/MarkDownArea';
import SpaceComponent from '../Common/SpaceComponent';
import MemoHeadMenu from './MemoHeadMenu';
import useMemoEditForm from './Hook/useMemoEditForm';
import { MEMO_VIEW_MODE } from './Const/MemoConst';
import MemoTag from './MemoTag';
import { tagType } from '../Common/TagsComponent';


//引数の型
type propsType = {
    memoTitle: string,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    memoContent: string,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
    memoTagList: tagType[],
    addTag: (newTag: tagType) => void,
    deleteTag: (tagIndex: number) => void,
    tagSuggestList: tagListResType[],
}

//入力欄
const MainAreaDiv = styled.div`
    padding-left: 5%;
    padding-top: 2%;
    height: 100%;
    text-align:left;
    box-sizing: border-box;
`;

//タイトル
const TitleAreaDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//テキストエリアのスタイル
const MemoTextAreaDiv = styled(VerticalFlowDiv)`
  display:flex;
  width: 90%;
`;


function MemoEditForm(props: propsType) {

    console.log("MemoEditForm render");

    const {
        viewMode,
        clickMarkdownOnly,
        clickTeaxtAreaOnly,
        clickMultiView,
    } = useMemoEditForm();

    return (
        <MainAreaDiv>
            {/* 入力欄 */}
            <TitleAreaDiv
                height="8%"
            >
                <BaseInputComponent
                    placeholder='タイトル'
                    textWidth='90%'
                    value={props.memoTitle}
                    onChange={props.setMemoTitle}
                />
            </TitleAreaDiv>
            {/* タグ */}
            <MemoTag
                height='7%'
                width='90%'
                tagList={props.memoTagList}
                suggestions={props.tagSuggestList}
                addTag={props.addTag}
                deleteTag={props.deleteTag}
            />
            {/* ヘッダメニュー */}
            <MemoHeadMenu
                height='5%'
                width='90%'
                viewMode={viewMode}
                clickMarkdownOnly={clickMarkdownOnly}
                clickTeaxtAreaOnly={clickTeaxtAreaOnly}
                clickMultiView={clickMultiView}
            />
            {/* メモ入力欄 */}
            <MemoTextAreaDiv
                height='84%'
            >
                {
                    (() => {
                        switch (viewMode) {
                            //markdownのみ表示
                            case MEMO_VIEW_MODE.markdownOnly:
                                return (
                                    <React.Fragment>
                                        <MarkDownArea
                                            content={props.memoContent}
                                            height='91%'
                                            width='100%'
                                        />
                                    </React.Fragment>
                                );
                            //テキストエリアのみ表示
                            case MEMO_VIEW_MODE.textareaOnly:
                                return (
                                    <React.Fragment>
                                        <BaseTextAreaComponent
                                            textWidth='100%'
                                            height='90%'
                                            value={props.memoContent}
                                            onChange={props.setMemoContent}
                                            isNotResize={true}
                                            placeholder='Markdown形式で入力してください。'
                                        />
                                    </React.Fragment>
                                );
                            //markdownとテキストエリアの両方を表示
                            case MEMO_VIEW_MODE.multiView:
                                return (
                                    <React.Fragment>
                                        <BaseTextAreaComponent
                                            textWidth='90%'
                                            height='90%'
                                            value={props.memoContent}
                                            onChange={props.setMemoContent}
                                            isNotResize={true}
                                            placeholder='Markdown形式で入力してください。'
                                        />
                                        <SpaceComponent
                                            space='2%'
                                        />
                                        <MarkDownArea
                                            content={props.memoContent}
                                            height='91%'
                                            width='90%'
                                        />
                                    </React.Fragment>
                                );
                        }
                    })()
                }
            </MemoTextAreaDiv>
        </MainAreaDiv>
    );
}

export default MemoEditForm;