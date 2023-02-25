import styled from "styled-components";

//引数の型
type propsType = {
  styleTypeNumber: number,
  title: string,
  onclick: () => void,
}

//ボタンの種類
export const buttonType = {
  default: 0,
  primary: 1,
  danger: 2,
  run:3,
}

//ボタンの基本スタイル
const BaseButton = styled.button`
  text-align: center;
  background:#d3d3d3;
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

//全ボタンコンポーネント
const buttonStyleLists = [
  BaseButton,
  ButtonPrimary,
  ButtonDanger,
  ButtonRun,
];

const ButtonComponent = (props: propsType) => {
  const Component = buttonStyleLists[props.styleTypeNumber] || buttonStyleLists[buttonType.default];
  // Component変数に格納したコンポーネントでReact要素を作成
  return <Component onClick={() => { props.onclick() }}>{props.title}</Component>;
};

export default ButtonComponent;