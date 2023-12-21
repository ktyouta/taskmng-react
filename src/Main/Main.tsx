import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Main.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { masterColumnListType, resUserInfoType } from '../Common/Type/CommonType';
import useMainLogic from './Hook/useMainLogic';


function Main() {

  //Mainのビジネスロジック
  const { componentList } = useMainLogic();

  return (
    <div className="main">
      <Routes>
        {
          componentList && componentList.length > 0 && componentList.map((element) => {
            return element
          })
        }
      </Routes>
    </div>
  );
}

export default Main;
