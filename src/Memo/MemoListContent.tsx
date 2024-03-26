import React, { useState } from 'react';
import '../App.css';
import useMemoListContent from './Hook/useMemoListContent';
import MemoContent from './MemoContent';
import MemoList from './MemoList';
import ModalComponent from '../Common/ModalComponent';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import './css/MemoListContent.css';
import MemoEdit from './MemoEdit';
import LabelComponent from '../Common/LabelComponent';
import MemoDetail from './MemoDetail';
import { HeightDiv, WidthDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


//表示件数
const DispLabel = styled(WidthDiv)`
    text-align: right;
`;

//引数の型
type propsType = {
    path: string,
}

function MemoListContent(props: propsType) {

    console.log("MemoListContent render");

    const {
        memoList,
    } = useMemoListContent();

    return (
        <HeightDiv
            height='78%'
        >
            <DispLabel
                width='93%'
            >
                <LabelComponent
                    title={memoList ? `検索結果：${memoList.length}件` : ``}
                />
            </DispLabel>
            {/* メモ一覧 */}
            <MemoList
                path={props.path}
                memoList={memoList}
            />
        </HeightDiv>
    );
}

export default MemoListContent;