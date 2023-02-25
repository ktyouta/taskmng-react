import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Main.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { masterColumnListType, resUserInfoType } from '../Common/Type/CommonType';
import useMainLogic from './Hook/useMainLogic';
import { menuListType } from '../Common/Hook/useGetViewName';

//マスタのリスト
export type masterDataListType = {
  value: string,
  label: string,
  remarks: string
};

export const masterDataListContext = React.createContext({} as {
  masterDataList: masterDataListType[]
});

//引数の型
type propsType = {
  menu: menuListType[],
  userInfo: resUserInfoType | null,
}

function Main(props: propsType) {

  //Mainのビジネスロジック
  const { masterDataList, componentList } = useMainLogic({ menu: props.menu, userInfo: props.userInfo });

  return (
    <div className="main">
      <masterDataListContext.Provider value={{ masterDataList }}>
        <Routes>
          {
            componentList && componentList.length > 0 && componentList.map((element) => {
              return element
            })
          }
        </Routes>
      </masterDataListContext.Provider>
    </div>
  );
}

export default Main;
