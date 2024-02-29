import React, { useState } from 'react';
import styled from 'styled-components';


//引数の型
type propsType = {
    text: string,
}

//続きを読むボタンのスタイル
const ShowMoreButton = styled.button`
    cursor: pointer;
    color: blue;
    border: none;
    background: none;
    outline: none;
`;

//テキスト表示エリアのスタイル
const AccordionTextAreaDiv = styled.div<{ isShowMore: boolean }>`
    max-height: ${({ isShowMore }) => (isShowMore ? "100%" : "30px")};
    overflow: hidden; /* 超過分を非表示 */
    transition: max-height 0.1s ease; /* アニメーションを追加 */
`;


const AccordionComponent = (props: propsType) => {

    //続きを読むボタン表示フラグ
    const [showMore, setShowMore] = useState(false);

    return (
        <div>
            <AccordionTextAreaDiv
                isShowMore={showMore}
            >
                <p>
                    {props.text}
                </p>
            </AccordionTextAreaDiv>
            <ShowMoreButton onClick={() => setShowMore(!showMore)}>
                {showMore ? '閉じる' : '続きを読む'}
            </ShowMoreButton>
        </div>
    );
};

export default AccordionComponent;