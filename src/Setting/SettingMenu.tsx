import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import './css/SettingMenu.css';
import useMenuLogic from '../Menu/Hook/useMenuLogic';
import useSettingMenu from './Hook/useSettingMenu';


//外側のスタイル
const OuterDiv = styled.div<{ width: string }>`
    width: ${({ width }) => (width)};
    height: 100%;
    min-height: 100%;
`;

type propsType = {
  width: string,
  path:string,
}


function SettingMenu(props: propsType) {

  console.log("SettingMenu render");

  //メニューのビジネスロジック
  const {
    menuList,
  } = useSettingMenu({...props});

  return (
    <OuterDiv
      width={props.width}
    >
      <div className="sidemenu">
        <ul className='sidemenu-ul'>
          {
            menuList && menuList.length > 0 &&
            menuList.map((element) => {
              return element;
            })
          }
        </ul>
      </div>
    </OuterDiv>
  );
}

export default SettingMenu;