import '../App.css';
import './css/Menu.css';
import { Link } from 'react-router-dom';
import useMenuLogic from './Hook/useMenuLogic';
import IconComponent from '../Common/IconComponent';
import { RxCross1 } from "react-icons/rx";
import styled from 'styled-components';
import { MenuAreaTestId, MenuCloseIconTestId } from '../tests/AppTest/DataTestId';

//引数の型
type propsType = {
  selectedMenu: string,
  isOpenMenu: boolean,
  switchMenu: () => void,
}

//メニュークローズ用のスタイル
const CloseIconAreaDiv = styled.div`
  height: 7%;
  text-align: right;
  padding-top: 6%;
  box-sizing: border-box;
  padding-right: 5%;
`;

//メニューのスタイル
const MenuDiv = styled.div<{ isOpenMenu: boolean }>`
  background-color: #4169e1;
  width:${({ isOpenMenu }) => (isOpenMenu ? "15%" : "0%")};
  text-align: center;
  font-size: 100%;
  font-weight: bold;
  float: left;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 5px;
  margin-left: 0px;
  padding: 0px;
  border: 1px solid #808080;
  transition: 0.5s ease;
  ${({ isOpenMenu }) => (isOpenMenu ? "" : "transform: translateX(-100%)")};
`;


function Menu(props: propsType) {

  console.log("Menu render");

  //メニューのビジネスロジック
  const {
    menuList,
  } = useMenuLogic({ ...props });

  return (
    <MenuDiv
      isOpenMenu={props.isOpenMenu}
      data-testid={MenuAreaTestId}
    >
      <CloseIconAreaDiv>
        {
          props.isOpenMenu &&
          <IconComponent
            icon={RxCross1}
            onclick={props.switchMenu}
            data-testid={MenuCloseIconTestId}
          />
        }
      </CloseIconAreaDiv>
      <ul className='menu-ul'>
        {
          menuList && menuList.length > 0 &&
          menuList.map((element) => {
            return element;
          })
        }
      </ul>
    </MenuDiv>
  );

}

export default Menu;
