import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from './Login/Login';
import { resUserInfoType } from './Common/Type/CommonType';
import { useEffect, useState } from 'react';
import React from 'react';
import Content from './Content/Content';
import { useCookies } from "react-cookie";


function App() {

  //認証クッキー
  const [cookies] = useCookies();

  return (
    <Routes>
      {/* クッキーが存在する場合：ホーム画面に遷移
        クッキーが存在しない場合：ログイン画面に遷移 */}
      <Route path="/login" element={Object.keys(cookies).length ? <Navigate to="/" /> : <Login />} />
      <Route path="/*" element={Object.keys(cookies).length ? <Content /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
