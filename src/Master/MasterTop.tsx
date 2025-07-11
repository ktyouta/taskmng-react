import { useContext } from 'react';
import '../App.css';
import TableComponent from '../Common/TableComponent';
import { selectedMasterAtom } from './Master';
import ComboComponent from '../Common/ComboComponent';
import useMasterTopLogic from './Hook/useMasterTopLogic';
import './css/MasterTop.css';
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import MasterTableComponent from './MasterTableComponent';
import { useAtomValue } from 'jotai';
import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { useGlobalAtom, useGlobalAtomValue } from '../Common/Hook/useGlobalAtom';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import LabelComponent from '../Common/LabelComponent';


function MasterTop() {

  console.log("mastertop render");

  //MasterTopコンポーネントのビジネスロジック
  const {
    masterDataList,
    selectedMasterBody,
    selectedMaster,
    isLoading,
    viewData,
    createData,
    updateData,
    deleteData,
    changeCombo } = useMasterTopLogic();

  return (
    <div className="mastertop">
      <div className="masteredit-header-area">
        {
          selectedMaster && <LabelComponent
            title={`ファイル名：${selectedMaster}.json`}
            width="100%"
          />
        }
      </div>
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
          title={"編集"}
          onclick={updateData}
        />
        <ButtonComponent
          styleTypeNumber="DANGER"
          title={"削除"}
          onclick={deleteData}
        />
        <span className={"selected-mastername-span"}>選択中のマスタ</span>
        <ComboComponent combo={masterDataList} onChange={changeCombo} initValue={selectedMaster} />
      </div>
      <MasterTableComponent
        selectedMasterBody={selectedMasterBody}
      />
      {/* ローディング */}
      {
        isLoading &&
        <WaitLoading />
      }
    </div>
  );
}

export default MasterTop;