import React, { useState } from 'react';
import '../App.css';
import './css/AddMaster.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtom, useAtomValue } from 'jotai';
import AddMasterSummary from './AddMasterSummary';
import AddMasterData from './AddMasterData';
import useAddMaster from './Hook/useAddMaster';


//概要画面の入力値
export const summaryInputBodyAtom = atom<{ [key: string]: string }>({});
//データ追加画面の入力値
export const addDataInputBodyAtom = atom<{ [key: string]: string }>({});


function AddMaster() {

    console.log("AddMaster render");

    //入力用の設定を取得
    const { inputsSettingList } = useAddMaster();

    return (
        <div className="addmaster">
            <Routes>
                <Route path="/" element={<AddMasterSummary addMasterSummarySetting={inputsSettingList?inputsSettingList.addMasterSummarySetting:undefined} />} />
                <Route path="data" element={inputsSettingList ? <AddMasterData inputMasterSetting={inputsSettingList.inputMasterSetting}  /> : <Navigate to="/addmaster" />} />
            </Routes>
        </div>
    );
}

export default AddMaster;