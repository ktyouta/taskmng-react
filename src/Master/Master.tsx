import React, { useState } from 'react';
import '../App.css';
import './css/Master.css';
import MasterTop from './MasterTop';
import { Routes, Route, Navigate } from "react-router-dom";
import MasterEdit from './MasterEdit';
import useMasterLogic from './Hook/useMasterLogic';
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtomValue } from 'jotai';


//編集モードの種類
export const editModeEnum = {
  noselect: -1,
  view: 0,
  create: 1,
  update: 2,
}

//現在選択しているマスタ
export const selectedMasterAtom = atom("");
//現在選択(テーブルに表示)しているマスタの名称
export const selectedMasterNmAtom = atom("");
//テーブルで選択した行データ
export const selectedDataAtom = atom<{ [key: string]: string | JSX.Element }>({});
//テーブルで選択したデータ(更新ボタン押下時の再取得データ)
export const selectedDataElementsAtom = atom<{ [key: string]: string }>({});
//編集モード
export const editModeAtom = atom(editModeEnum.noselect);


type propsType = {
  testId: string,
}

function Master(props: propsType) {

  console.log("master render");
  //編集モード
  const editMode = useAtomValue(editModeAtom);

  //Masterコンポーネントのビジネスロジック
  useMasterLogic();

  return (
    <div
      className="master"
      data-testid={`${props.testId}`}
    >
      <Routes>
        <Route path="/" element={<MasterTop />} />
        <Route path="edit" element={editMode === editModeEnum.noselect ? <Navigate to="/master" /> : <MasterEdit />} />
      </Routes>
    </div>
  );
}

export default Master;