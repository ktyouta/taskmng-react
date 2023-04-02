import { useContext } from 'react';
import '../App.css';
import TableComponent from '../Common/TableComponent';
import { selectedMasterContext, selectedDataContext } from './Master';
import ComboComponent from '../Common/ComboComponent';
import useMasterTopLogic from './Hook/useMasterTopLogic';
import './css/MasterTop.css';
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import MasterTableComponent from './MasterTableComponent';
import { useAtomValue } from 'jotai';
import { masterDataListAtom } from '../Main/Hook/useMainLogic';


function MasterTop() {

  console.log("mastertop render");
  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const masterDataList = useAtomValue(masterDataListAtom);
  //現在選択(テーブルに表示)しているマスタ
  const { selectedMaster, setSelectedMaster } = useContext(selectedMasterContext);
  //テーブルで選択したデータ
  const { selectedData, setSelectedData } = useContext(selectedDataContext);

  //MasterTopコンポーネントのビジネスロジック
  const { selectedMasterBody, viewData, createData, updateData, deleteData, changeCombo } = useMasterTopLogic({ selectedMaster, selectedData, setSelectedData, setSelectedMaster });

  return (
    <div className="mastertop">
      <div className='mastertop-button-area'>
        <ButtonComponent
          styleTypeNumber="BASE"
          title={"閲覧"}
          onclick={viewData}
        />
        <ButtonComponent
          styleTypeNumber="PRIMARY"
          title={"新規登録"}
          onclick={createData}
        />
        <ButtonComponent
          styleTypeNumber="PRIMARY"
          title={"更新"}
          onclick={updateData}
        />
        <ButtonComponent
          styleTypeNumber="DANGER"
          title={"削除"}
          onclick={deleteData}
        />
        <span className={"selected-mastername-span"}>選択中のマスタ</span>
        <ComboComponent combo={masterDataList} onChange={changeCombo} />
      </div>
      <MasterTableComponent
        selectedMasterBody={selectedMasterBody}
      />
    </div>
  );
}

export default MasterTop;