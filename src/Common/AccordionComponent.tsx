import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';


//引数の型
type propsType = {
    text: ReactNode,
    defaultHeight: string,
    closeWord?: string,
    openWord?: string,
}

//続きを読むボタンのスタイル
const ShowMoreButton = styled.button`
    cursor: pointer;
    color: #696969;
    border: none;
    background: none;
    outline: none;
`;

//テキスト表示エリアのスタイル
const AccordionTextAreaDiv = styled.div<{ isShowMore: boolean, defaultHeight: string, }>`
    height: ${({ isShowMore, defaultHeight }) => (isShowMore ? "100%" : defaultHeight)};
    overflow: hidden; /* 超過分を非表示 */
    transition: max-height 0.1s ease; /* アニメーションを追加 */
`;

/**
 * アコーディオンコンポーネント
 * @param props 
 * @returns 
 */
const AccordionComponent = (props: propsType) => {

    //続きを読むボタン表示フラグ
    const [showMore, setShowMore] = useState(false);
    //ボタンテキスト
    const { closeWord = "閉じる", openWord = "続きを読む" } = props;

    return (
        <div>
            <AccordionTextAreaDiv
                isShowMore={showMore}
                defaultHeight={props.defaultHeight}
            >
                <p>
                    {props.text}
                </p>
            </AccordionTextAreaDiv>
            <ShowMoreButton onClick={() => setShowMore(!showMore)}>
                {showMore ? closeWord : openWord}
            </ShowMoreButton>
        </div>
    );
};

export default AccordionComponent;