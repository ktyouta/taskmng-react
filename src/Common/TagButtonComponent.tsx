import { ReactNode } from "react";
import styled from "styled-components";

//引数の型
type propsType = {
    title: ReactNode,
    onclick?: () => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
    btnStyle?: { [key: string]: string },
    spanStyle?: { [key: string]: string },
    width?: string,
    heght?: string,
    isDispCross?: boolean,
}


//ボタンの基本スタイル
const BaseButton = styled.button<{ width?: string, heght?: string, isDispCross?: boolean, }>`
    width:${({ width }) => (width ?? "")};
    heght:${({ heght }) => (heght ?? "")};
    padding: .375rem .5rem;
    border: 0;
    border-radius: 3px;
    background: #b0e0e6;
    font-size: inherit;
    line-height: inherit;
    cursor:pointer;
    &:after {
        content: "";
        display: inline-block;
        width: ${({ isDispCross }) => (isDispCross ? ".65rem" : "")};
        height: ${({ isDispCross }) => (isDispCross ? ".65rem" : "")};
        clip-path: ${({ isDispCross }) => (isDispCross ? "polygon(10% 0, 0 10%, 40% 50%, 0 90%, 10% 100%, 50% 60%, 90% 100%, 100% 90%, 60% 50%, 100% 10%, 90% 0, 50% 40%)" : "")};
        margin-left: .5rem;
        font-size: .875rem;
        background-color: ${({ isDispCross }) => (isDispCross ? "#7c7d86" : "")};
    };
    &:hover {
        color: #fff;
        background-color: #4f46e5;
    }
`;

//spanの基本スタイル
const TitleSpan = styled.span`
    margin: 0 .25rem .25rem 0;
    background-color: inherit;
`;


const TagButtonComponent = (props: propsType) => {
    return (
        <BaseButton
            heght={props.heght}
            width={props.width}
            isDispCross={props.isDispCross}
            style={props.btnStyle}
            onClick={props.onclick}
        >
            <TitleSpan
                style={props.spanStyle}
            >
                {props.title}
            </TitleSpan>
        </BaseButton>
    )
};

export default TagButtonComponent;