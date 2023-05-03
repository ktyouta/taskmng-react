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
export const summaryInputAtom = atom<{ [key: string]: string }>({});
//データ追加画面の入力値
export const addDataInputAtom = atom<{ [key: string]: string }>({});


function AddMaster() {

    console.log("AddMaster render");

    //概要画面の入力値
    const summaryInput = useAtomValue(summaryInputAtom);
    //入力用の設定を取得
    const { inputsSettingList } = useAddMaster();

    return (
        <div className="addmaster">
            <Routes>
                <Route path="/" element={<AddMasterSummary addMasterSummarySetting={inputsSettingList?inputsSettingList.addMasterSummarySetting:undefined} />} />
                <Route path="data" element={Object.keys(summaryInput).length ? <AddMasterData inputMasterSetting={inputsSettingList?inputsSettingList.inputMasterSetting:undefined}  /> : <Navigate to="/addmaster" />} />
            </Routes>
        </div>
    );
}

export default AddMaster;