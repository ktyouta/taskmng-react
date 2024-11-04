import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Location, useLocation } from 'react-router-dom'


/**
 * URLが切り替わった際に処理を実行
 * @param props 
 */
function useChangeUrlFunction(setSelectedMenuId: () => void) {

  const location = useLocation();

  //URL切り替え時のイベント
  useEffect(() => {
    setSelectedMenuId();
  }, [location])

}

export default useChangeUrlFunction;