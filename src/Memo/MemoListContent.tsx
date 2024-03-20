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


//エラーメッセージエリア
const ErrAreaDiv = styled.div`
    padding: 0 1 %;
`;

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
        isModalOpen,
        offFlag,
        displayMemoList,
        errMessage,
        updMemoId,
        isLoading,
    } = useMemoListContent({ ...props });

    //該当データが存在しない
    if (errMessage) {
        return (
            <ErrAreaDiv>
                <MessageComponent
                    message={errMessage}
                    styleTypeNumber={labelType.danger}
                />
            </ErrAreaDiv>
        );
    }

    return (
        <HeightDiv
            height='78%'
        >
            <DispLabel
                width='93%'
            >
                <LabelComponent
                    title={`表示件数：${displayMemoList ? displayMemoList.length : "0"}件`}
                />
            </DispLabel>
            {/* メモ一覧 */}
            <MemoList
                displayMemoList={displayMemoList}
                isLoading={isLoading}
            />
            {/* メモ詳細表示用モーダル */}
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <MemoDetail
                    updMemoId={updMemoId}
                    closeFn={offFlag}
                    backBtnTitle="閉じる"
                />
            </ModalComponent>
        </HeightDiv>
    );
}

export default MemoListContent;