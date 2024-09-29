import { ReactNode } from "react";
import styled from "styled-components";

//引数の型
type propsType = {
  styleTypeNumber: buttonType,
  bgColor?: string,
  title: ReactNode,
  onclick?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  style?: { [key: string]: string },
}

//ボタンの種類
export type buttonType =
  "BASE" |
  "PRIMARY" |
  "DANGER" |
  "RUN" |
  "LOGOUT" |
  "GRAD_BLUE" |
  "GRAD_GREEN" |
  "GRAD_RED" |
  "GRAD_GRAY";

//ボタンの基本スタイル
const BaseButton = styled.button<{ bgColor?: string }>`
  text-align: center;
  background:${({ bgColor }) => (bgColor ?? "#d3d3d3")};
  color: black;
  width: auto;
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

//水色(グラデーション)のボタン
const GradBlueButton = styled(BaseButton)`
  border-radius: 10px;
  background: linear-gradient(to right, #3f86ed, #25aae1, #25aae1, #3f86ed);
  border: none;
  box-shadow: 0 1px 7px 0 rgba(49, 196, 190, 0.55);
  color: white;
  font-weight: bold;
  background-size: 200%;
  &:hover {
    background-position: 100%;
    transition: all .4s ease-in-out;
  }
`;

//緑色(グラデーション)のボタン
const GradGreenButton = styled(BaseButton)`
  border-radius: 10px;
  background: linear-gradient(to right, #0ba360, #2bb673, #2bb673, #0ba360);
  box-shadow: 0 1px 7px 0 rgba(23, 168, 108, 0.75);
  border: none;
  color: white;
  font-weight: bold;
  background-size: 200%;
  &:hover {
    background-position: 100%;
    transition: all .4s ease-in-out;
  }
`;

//赤色(グラデーション)のボタン
const GradRedButton = styled(BaseButton)`
  border-radius: 10px;
  background: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);
  box-shadow: 0 1px 7px rgba(242, 97, 103, 0.4);
  border: none;
  color: white;
  font-weight: bold;
  background-size: 200%;
  &:hover {
    background-position: 100%;
    transition: all .4s ease-in-out;
  }
`;

//灰色(グラデーション)のボタン
const GradGrayButton = styled(BaseButton)`
  border-radius: 10px;
  box-shadow: 0 1px 5px 0 rgba(45, 54, 65, 0.75);
  border: none;
  background: linear-gradient(to right, #29323c, #485563, #2b5876, #29323c);
  color: white;
  font-weight: bold;
  background-size: 200%;
  &:hover {
    background-position: 100%;
    transition: all .4s ease-in-out;
  }
`;

//ボタンのリスト
const buttonStyleLists = {
  BASE: BaseButton,
  PRIMARY: ButtonPrimary,
  DANGER: ButtonDanger,
  RUN: ButtonRun,
  LOGOUT: ButtonLogout,
  GRAD_BLUE: GradBlueButton,
  GRAD_GREEN: GradGreenButton,
  GRAD_RED: GradRedButton,
  GRAD_GRAY: GradGrayButton,
}

const ButtonComponent = (props: propsType) => {
  const Component = buttonStyleLists[props.styleTypeNumber] || buttonStyleLists["BASE"];
  // Component変数に格納したコンポーネントでReact要素を作成
  return <Component
    bgColor={props.bgColor}
    onClick={() => { if (props.onclick) props.onclick() }}
    onMouseEnter={() => { if (props.onMouseEnter) props.onMouseEnter() }}
    onMouseLeave={() => { if (props.onMouseLeave) props.onMouseLeave() }}
    style={props.style}
  >
    {props.title}
  </Component>;
};

export default ButtonComponent;