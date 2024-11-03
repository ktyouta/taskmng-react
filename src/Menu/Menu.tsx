import '../App.css';
import { Link } from 'react-router-dom';
import useMenuLogic from './Hook/useMenuLogic';
import IconComponent from '../Common/IconComponent';
import { RxCross1 } from "react-icons/rx";
import styled from 'styled-components';
import { MenuAreaTestId, MenuCloseIconTestId } from '../tests/AppTest/DataTestId';
import { IoIosArrowBack } from "react-icons/io";

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
  background: linear-gradient(to bottom, #3f86ed, #4481eb, #04befe, #3f86ed);  
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

//メニューUL用のスタイル
const MenuUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  overflow: auto;
  padding-top: 5%;
  height:80%;
  overflow-y:auto;
  box-sizing: border-box;
  padding-bottom: 1%;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: linear-gradient(to bottom, #3f86ed, #4481eb, #04befe, #3f86ed); 
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

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
      <MenuUl>
        {
          menuList && menuList.length > 0 &&
          menuList.map((element) => {
            return element;
          })
        }
      </MenuUl>
    </MenuDiv>
  );

}

export default Menu;
