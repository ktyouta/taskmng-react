import { ReactNode } from "react";
import styled from "styled-components";

//引数の型
type propsType = {
    title: ReactNode,
    onclick?: () => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
}


//ボタンの基本スタイル
const BaseButton = styled.button`
    margin: 0 .25rem .25rem 0;
    padding: .375rem .5rem;
    border: 0;
    border-radius: 3px;
    background: #b0e0e6;
    font-size: inherit;
    line-height: inherit;
    &:after {
        content: "";
        display: inline-block;
        width: .65rem;
        height: .65rem;
        clip-path: polygon(10% 0, 0 10%, 40% 50%, 0 90%, 10% 100%, 50% 60%, 90% 100%, 100% 90%, 60% 50%, 100% 10%, 90% 0, 50% 40%);
        margin-left: .5rem;
        font-size: .875rem;
        background-color: #7c7d86;
    }
`;

//spanの基本スタイル
const TitleSpan = styled.span`
    margin: 0 .25rem .25rem 0;
    padding: .375rem .5rem;
    border: 0;
    border-radius: 3px;
    background: #b0e0e6;
    font-size: inherit;
    line-height: inherit;
`;


const TagButtonComponent = (props: propsType) => {
    return (
        <BaseButton>
            <TitleSpan>{props.title}</TitleSpan>
        </BaseButton>
    )
};

export default TagButtonComponent;