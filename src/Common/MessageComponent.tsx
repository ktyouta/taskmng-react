import React from "react";
import styled from "styled-components";

//引数の型
type propsType = {
  message: string,
  styleTypeNumber: number,
}

//ラベルの種類
export const labelType = {
  default: 0,
  primary: 1,
  danger: 2,
  run: 3,
}

//ラベルの基本スタイル
const BaseLabel = styled.div`
  display:flex;
  align-items: center;
  background:#d3d3d3;
  color: black;
  height:30px;
  margin-top:1%;
  margin-bottom:1%;
`;

//緑色のラベル
const LabelPrimary = styled(BaseLabel)`
  background: green;
  color:white;
`;

//赤色のラベル
const LabelDanger = styled(BaseLabel)`
  background: red;
  color:white;
`;

//青色のラベル
const LabelRun = styled(BaseLabel)`
  background:#0000ff;
  color:white;
`;

//全ラベルコンポーネント
const buttonStyleLists = [
  BaseLabel,
  LabelPrimary,
  LabelDanger,
  LabelRun,
];

const MessageComponent = (props: propsType) => {
  const Component = buttonStyleLists[props.styleTypeNumber] || buttonStyleLists[labelType.default];
  // Component変数に格納したコンポーネントでReact要素を作成
  return (
    <React.Fragment>
      {
        props.message && <Component>{props.message}</Component>
      }
    </React.Fragment>
  );
};

export default MessageComponent;