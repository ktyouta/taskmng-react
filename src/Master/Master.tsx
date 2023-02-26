import React, { useState } from 'react';
import '../App.css';
import './css/Master.css';
import MasterTop from './MasterTop';
import { Routes, Route, Navigate } from "react-router-dom";
import MasterEdit from './MasterEdit';
import useMasterLogit from './Hook/useMasterLogit';
import { selectedMasterDataType } from '../Common/Type/CommonType';


export const selectedMasterContext = React.createContext({} as {
  selectedMaster: string
  setSelectedMaster: React.Dispatch<React.SetStateAction<string>>
});

export const selectedDataContext = React.createContext({} as {
  selectedData: { [key: string]: string | JSX.Element }
  setSelectedData: React.Dispatch<React.SetStateAction<{ [key: string]: string | JSX.Element }>>
});

export const editModeContext = React.createContext({} as {
  editMode: number
  setEditMode: React.Dispatch<React.SetStateAction<number>>
});

export const selectedDataElementsContext = React.createContext({} as {
  selectedDataElements: selectedMasterDataType
  setSelectedDataElement: React.Dispatch<React.SetStateAction<selectedMasterDataType>>
});



//編集モードの種類
export const editModeEnum = {
  noselect: -1,
  view: 0,
  create: 1,
  update: 2,
}

function Master() {

  console.log("master render");
  //現在選択しているマスタ
  const [selectedMaster, setSelectedMaster] = useState("");
  //テーブルで選択した行データ
  const [selectedData, setSelectedData] = useState<{ [key: string]: string | JSX.Element }>({});
  //テーブルで選択したデータ(更新ボタン押下時の再取得データ)
  const [selectedDataElements, setSelectedDataElement] = useState<selectedMasterDataType>({ id: "", name: "", remarks: "" });
  //編集モード
  const [editMode, setEditMode] = useState<number>(editModeEnum.noselect);

  //Masterコンポーネントのビジネスロジック
  useMasterLogit({ setSelectedMaster });

  return (
    <div className="master">
      <selectedDataElementsContext.Provider value={{ selectedDataElements, setSelectedDataElement }}>
        <selectedMasterContext.Provider value={{ selectedMaster, setSelectedMaster }}>
          <selectedDataContext.Provider value={{ selectedData, setSelectedData }}>
            <editModeContext.Provider value={{ editMode, setEditMode }}>
              <Routes>
                <Route path="/" element={<MasterTop />} />
                <Route path="edit" element={editMode === editModeEnum.noselect ? <Navigate to="/master" /> : <MasterEdit />} />
              </Routes>
            </editModeContext.Provider>
          </selectedDataContext.Provider>
        </selectedMasterContext.Provider>
      </selectedDataElementsContext.Provider>
    </div>
  );
}

export default Master;