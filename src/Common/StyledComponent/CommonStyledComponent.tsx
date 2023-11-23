import styled from "styled-components";

//太文字のスタイル
export const BoldSpan = styled.span`
    font-weight: bold;
`;

//高さのスタイル
export const HeightDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//オーバーフロー(縦方向)
export const VerticalFlowDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    overflow-y: auto;
`;

//ヘッダー
export const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;