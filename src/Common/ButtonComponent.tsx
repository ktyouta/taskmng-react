import styled from "styled-components";

//引数の型
type propsType = {
  styleTypeNumber: buttonType,
  bgColor?: string,
  title: string,
  onclick: () => void,
}

//ボタンの種類
export type buttonType = "BASE" | "PRIMARY" | "DANGER" | "RUN" | "LOGOUT";

//ボタンの基本スタイル
const BaseButton = styled.button<{ bgColor?: string }>`
  text-align: center;
  background:${({ bgColor }) => (bgColor ?? "#d3d3d3")};
  color: black;
  width: 130px;
  min-width: 100px;
  height:45px;
  min-height:30px;
  cursor:pointer;
`;

//緑色のボタン
const ButtonPrimary = styled(BaseButton)`
  background: green;
  color:white;
`;

//赤色のボタン
const ButtonDanger = styled(BaseButton)`
  background: red;
  color:white;
`;

//青色のボタン
const ButtonRun = styled(BaseButton)`
  background:#0000ff;
  color:white;
`;

//水色のボタン
const ButtonLogout = styled(BaseButton)`
  background:#00ffff;
  color:white;
  border: 2px solid #1e90ff;
`;

//ボタンのリスト
const buttonStyleLists = {
  BASE: BaseButton,
  PRIMARY: ButtonPrimary,
  DANGER: ButtonDanger,
  RUN: ButtonRun,
  LOGOUT: ButtonLogout,
}

const ButtonComponent = (props: propsType) => {
  const Component = buttonStyleLists[props.styleTypeNumber] || buttonStyleLists["BASE"];
  // Component変数に格納したコンポーネントでReact要素を作成
  return <Component
    bgColor={props.bgColor}
    onClick={() => { props.onclick() }}
  >
    {props.title}
  </Component>;
};

export default ButtonComponent;